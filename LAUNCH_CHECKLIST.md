# Black Friday launch checklist (landing / licensing)

Sale window: 2026-11-27 00:00 PT to 2026-12-01 23:59 PT (`SALE` in `src/lib/pricing.ts`).

## 1. Env vars on Vercel (Production + Preview)

| Var | Value |
|---|---|
| `DATABASE_URL` | Neon connection string (already set) |
| `NEXT_PUBLIC_WEBSITE_URL` | `https://focusmode.app` |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | live keys (already set) |
| `STRIPE_PRICE_PERSONAL` / `STRIPE_PRICE_PLUS` / `STRIPE_PRICE_UNLIMITED` | price ids printed by step 3 |
| `STRIPE_SALE_COUPON_PERSONAL` / `_PLUS` / `_UNLIMITED` | `bf2026_personal` / `bf2026_plus` / `bf2026_unlimited` |
| `RESEND_API_KEY` | Resend API key (focusmode.app domain verified in Resend) |
| `RESEND_FROM_EMAIL` | `FocusMode <hey@focusmode.app>` |

Email goes through Resend only. Local `.env` still has `PLUNK_API_KEY` / `EMAIL_FROM`, which nothing reads.

One coupon per tier, because $20→$5, $30→$9 and $45→$15 are different amounts off. The coupon is applied only inside the sale window. Outside it, Checkout shows a promo-code field instead.

## 2. Database migration

`pnpm build` runs `prisma migrate deploy`, so a Vercel deploy applies pending migrations. Before deploying, check what is pending:

```sh
DATABASE_URL=<neon> npx prisma migrate status
```

Expected pending: `20261105075037_add_license_keys` (if never deployed) and `20261108000000_add_license_tiers_and_activations`. Both are additive: new columns are nullable or have defaults, and they create new tables. To apply them manually instead:

```sh
DATABASE_URL=<neon> npx prisma migrate deploy
```

Take a Neon branch or snapshot first.

## 3. Stripe products, prices, coupons

```sh
npx tsx --env-file=.env scripts/create-stripe-products.ts          # dry run (read-only API calls)
npx tsx --env-file=.env scripts/create-stripe-products.ts --apply  # creates them
```

This is idempotent: prices are matched by `lookup_key` and coupons by id. Prices carry metadata `{tier, max_activations}`. Copy the printed env lines to Vercel. Use live keys for prod and run it once more with test keys for Preview.

Webhook endpoint `https://focusmode.app/api/webhook/` events:
`checkout.session.completed`, `checkout.session.async_payment_succeeded`, `customer.subscription.deleted`, `charge.refunded`, `charge.dispute.created`.

## 4. Grandfather backfill

Every user with `isSubscribed = true` gets an unlimited key with `grandfathered = true` and no subscription id, so cancelling never revokes it.

```sh
pnpm backfill:license-keys            # dry run, lists who would get a key
pnpm backfill:license-keys -- --send  # creates keys and emails at most 95
pnpm backfill:license-keys -- --send --limit 50  # custom cap
```

Resend free plan caps at 100 emails/day, shared with buyer and resend emails. 279 users → run `--send` once a day for 3 days, all before the sale starts. Each run skips users already emailed.

The backfill is idempotent (`stripeSessionId = backfill_<userId>`) and safe to re-run. It also upgrades that user's older keys (an earlier `backfill_<userId>` row, or keys issued by legacy subscription checkouts) to unlimited, grandfathered and no subscription id. If one of those keys was already emailed, no second key is created. New tier checkouts never set `isSubscribed`, so buyers after launch are not picked up. Emails can't be unsent, so read the dry-run list first.

The cancel webhook sets `isSubscribed = false`, so users who lapsed before launch are not included. `stripeCustomerId` is no help here because sign-up creates a Stripe customer for every user. To include lapsed users, export the customers who ever had a subscription from Stripe and set `isSubscribed = true` on them before running.

## 5. Verification

```sql
-- migration applied
SELECT column_name FROM information_schema.columns WHERE table_name = 'license_keys';
SELECT count(*) FROM license_activations;

-- backfill
SELECT count(*) FILTER (WHERE grandfathered) AS grandfathered,
       count(*) FILTER (WHERE grandfathered AND "emailedAt" IS NULL) AS not_emailed
FROM license_keys;
SELECT count(*) FROM users u
WHERE u."isSubscribed" AND NOT EXISTS (
  SELECT 1 FROM license_keys k WHERE k."stripeSessionId" = 'backfill_' || u.id);

-- sales by tier
SELECT tier, "maxActivations", status, count(*) FROM license_keys
WHERE NOT grandfathered GROUP BY 1, 2, 3;

-- keys bought but not emailed (webhook/email failures)
SELECT email, "createdAt" FROM license_keys WHERE "emailedAt" IS NULL;

-- seat usage
SELECT k.tier, k."maxActivations", count(a.id) AS used
FROM license_keys k LEFT JOIN license_activations a ON a."licenseKeyId" = k.id
GROUP BY k.id ORDER BY used DESC LIMIT 20;
```

API checks against the deployed site:

```sh
curl -sX POST https://focusmode.app/api/checkout/ -H 'content-type: application/json' -d '{"tier":"personal"}'
curl -sX POST https://focusmode.app/api/license/validate/ -H 'content-type: application/json' -d '{"key":"<key>"}'
curl -sX POST https://focusmode.app/api/license/validate/ -H 'content-type: application/json' -d '{"license_key":"<personal key>","instance_id":"a"}'
curl -sX POST https://focusmode.app/api/license/validate/ -H 'content-type: application/json' -d '{"license_key":"<personal key>","instance_id":"b"}'   # seat_limit
curl -sX POST https://focusmode.app/api/license/deactivate/ -H 'content-type: application/json' -d '{"license_key":"<personal key>","instance_id":"a"}'
curl -sX POST https://focusmode.app/api/license/resend/ -H 'content-type: application/json' -d '{"email":"<you>"}'
```

Do a full test-mode purchase on a Preview deploy with card `4242 4242 4242 4242`, then refund it and dispute it with `4000 0000 0000 0259`. Check that the key gets `status = 'revoked'`.

## 6. Rollback

- **Code:** redeploy the previous Vercel deployment. Old code ignores the new columns and table, and old extension builds keep sending `{key}`, which still works.
- **Migration:** leave it in place, since it is additive. If you must drop it:
  ```sql
  DROP TABLE license_activations;
  ALTER TABLE license_keys DROP COLUMN tier, DROP COLUMN "maxActivations", DROP COLUMN grandfathered;
  DELETE FROM _prisma_migrations WHERE migration_name = '20261108000000_add_license_tiers_and_activations';
  ```
- **Sale:** unset the `STRIPE_SALE_COUPON_*` vars, or delete the coupons in Stripe. Coupons also expire on their own at the sale end (`redeem_by`).
- **Bad key:** `UPDATE license_keys SET status = 'revoked' WHERE key = '...';` and to reinstate it, `status = 'granted'`.
- **Free a seat for a customer:** `DELETE FROM license_activations WHERE "licenseKeyId" = (SELECT id FROM license_keys WHERE key = '...');`

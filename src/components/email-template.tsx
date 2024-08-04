import { Button } from "@react-email/components";
import { Html } from "@react-email/html";

export function MagicLinkEmail({ url }: { url: string }) {
  return (
    <Html>
      <Button href={url}>Click here to sign in</Button>
    </Html>
  );
}

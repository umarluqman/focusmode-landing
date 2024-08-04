import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY!);

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) {
  await plunk.emails.send({
    to,
    subject,
    react,
  });
}

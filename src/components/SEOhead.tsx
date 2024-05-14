import Head from "next/head";

function SEOHead({
  title,
  description,
  path,
  ogPath = "/og.png",
}: {
  title: string;
  description: string;
  path: string;
  ogPath: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://focusmode.app" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>

      {/* Facebook Meta Tags */}
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={`https://focusmode.app${path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://focusmode.app${ogPath}`} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:creator" content="@umarlqmn" />
      <meta name="twitter:site" content="@umarlqmn" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="focusmode.app" />
      <meta property="twitter:url" content={`https://focusmode.app${path}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://focusmode.app${ogPath}`} />
    </Head>
  );
}

export default SEOHead;

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

const AppName = "browse";
const AppDescription = "A web application for browsing files";
const AppUrl = "https://browse.ezirmusitua.site";

class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={AppName}></meta>
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          ></meta>
          <meta name="apple-mobile-web-app-title" content={AppName}></meta>
          <meta name="description" content={AppDescription}></meta>
          <meta name="format-detection" content="telephone=no"></meta>
          <meta name="mobile-web-app-capable" content="yes"></meta>
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          ></meta>
          <meta name="msapplication-TileColor" content="#0A0A0A"></meta>
          <meta name="msapplication-tap-highlight" content="no"></meta>
          <meta name="theme-color" content="#0A0A0A"></meta>

          <link
            rel="apple-touch-icon"
            href="/icons/touch-icon-iphone.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          ></link>

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          ></link>
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          ></link>
          <link rel="shortcut icon" href="/favicon.ico"></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
          ></link>

          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:url" content={AppUrl}></meta>
          <meta name="twitter:title" content={AppName}></meta>
          <meta name="twitter:description" content={AppDescription}></meta>
          <meta
            name="twitter:image"
            content={`${AppUrl}/icons/android-chrome-192x192.png`}
          ></meta>
          <meta name="twitter:creator" content="@ezirmusitua"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:title" content={AppName}></meta>
          <meta property="og:description" content={AppDescription}></meta>
          <meta property="og:site_name" content={AppName}></meta>
          <meta property="og:url" content={AppUrl}></meta>
          <meta
            property="og:image"
            content={`${AppUrl}/icons/apple-touch-icon.png`}
          ></meta>
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}

export default _Document;

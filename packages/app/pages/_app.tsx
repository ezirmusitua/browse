import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        ></meta>
      </Head>
      <Component {...pageProps}></Component>
    </>
  );
}

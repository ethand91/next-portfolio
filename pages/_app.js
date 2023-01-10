import 'tailwindcss/tailwind.css';
import Script from 'next/script';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import Navbar from './../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ethan Portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ethan Denvir development portfolio. Developer blog containing mostly media related tutorials"/>
        <meta property="og:title" content="Ethan Developer Blog" />
        <meta property="og:description" content="Ethan Denvir development portfolio. Developer blog containing mostly media related tutorials" />
        <meta property="og:url" content="https://ethan-dev.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/neko.jpeg" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5474571366428116" crossorigin="anonymous"></script>
      </Head>

      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-GHX6RCSBCX"/>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GHX6RCSBCX', {
          page_path: window.location.pathname,
          });
           `,
        }}
      />

      <ThemeProvider attribute="class">
        <div className="dark:bg-gray-900 bg-gray-50 w-full min-h-screen">
          <Navbar />
          <Component { ...pageProps } />
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp

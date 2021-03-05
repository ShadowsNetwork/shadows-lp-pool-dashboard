import Head from 'next/head'
import 'normalize.css'
import '../styles/globals.css'
import useCustomer from '../hooks/customer.hook';
import CustomerContext from '../contexts/customer.context';
import OneSignal from 'react-onesignal';
import { useEffect } from 'react';
 
function App({ Component, pageProps }) {
  const customer = useCustomer();

  return (
    <>
      <Head>
        <title>Shadows</title>
        <link rel="icon" href="/images/favicon.ico" />

        {/* <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link href="//db.onlinewebfonts.com/c/05e476e067ffef74ca5686f229c40a63?family=PingFang+SC" rel="stylesheet" type="text/css"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" /> */}
      </Head>
      <CustomerContext.Provider value={customer}>
        <Component {...pageProps} />
      </CustomerContext.Provider>
    </>
  );
}

export default App

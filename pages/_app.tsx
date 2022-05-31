import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { NextWebVitalsMetric } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { appTheme } from "../lib/themes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import Head from "next/head";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNav = router.pathname === "/login" ? false : true;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider maxSnack={2}>
          <CssBaseline />
          {showNav && <Navbar />}
          <Component {...pageProps} />
          {showNav && <Footer />}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";

// root component for the app
// wraps every page in the app
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

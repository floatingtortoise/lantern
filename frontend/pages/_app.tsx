import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from 'react';
import { DataProvider } from '../contexts/DataContext';  // Correct the import to use the named export for DataProvider

export default function App({ Component, pageProps }: AppProps) {
  // No need to use useState here, as data management is handled in DataContext

  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

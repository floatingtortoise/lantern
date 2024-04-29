// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from 'react';
import DataContext from "@/contexts/DataContext";  // Adjust the path if necessary

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}

// Explanation
// useState Hook: This hook initializes the state variable data with null. This state will hold the data that you want to share across your application. The setData function will be used to update this data.
// DataContext.Provider: This component wraps your entire application. It provides the data and setData context to all child components in the application tree. Any component can now access and modify data via the context.
// Path to DataContext: Make sure that the path to DataContext is correct relative to your _app.tsx file. I've used an alias @ assuming it's mapped to your project's root src directory. If you haven't set up such an alias, you'll need to adjust the import path accordingly, possibly to '../contexts/DataContext' if your contexts directory is directly under src.
// By setting up your _app.tsx this way, every page in your Next.js application can now access and manipulate the shared data state via the DataContext. This setup ensures that the state is consistently available and up-to-date across all components, improving the maintainability and functionality of your app.
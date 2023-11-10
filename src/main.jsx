import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import Router from "./Router";

import "./main.css";
import { Toaster } from "react-hot-toast";


console.log(import.meta.env.VITE_TEST_FIRST);
console.log(import.meta.env.VITE_TEST_SECOND);
console.log(import.meta.env.VITE_TEST_THIRD);


const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, suspense: true } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </React.StrictMode>
  </Provider>
);

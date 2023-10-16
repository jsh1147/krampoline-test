import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import Router from "./Router";

import "./main.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, suspense: true } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </React.StrictMode>
  </Provider>
);

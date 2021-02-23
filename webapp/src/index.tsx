import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Router from "views/Router";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Router />
      <ReactQueryDevtools />
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById("root")
);

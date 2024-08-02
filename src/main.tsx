import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/Root.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Planning from "./pages/Planning";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";

const theme = createTheme({
  primaryColor: "indigo",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "planning",
        element: <Planning />,
      },
      {
        path: "budget",
        element: <Budget />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

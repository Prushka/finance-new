import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Root from "@/Root.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import Accounts, {AddAccount, CO, TD} from "./pages/Accounts";
import Planning from "./pages/Planning";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import {RecoilRoot} from "recoil";

const theme = createTheme({
  primaryColor: "indigo",
});

const router = createHashRouter([
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
        path: "accounts-add",
        element: <AddAccount />
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
      {
        path: "accounts/td",
        element: <TD/>,
      },
      {
        path: "accounts/capital-one",
        element: <CO/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
);

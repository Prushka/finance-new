import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App.tsx";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <div className="w-full pb-8">
        <header className="text-center p-4">Finance Fellas</header>
        <main className="h-[10000px] bg-green-500">
          <RouterProvider router={router} />
        </main>
        <footer className="grid grid-cols-4 text-center fixed bottom-0 left-0 w-full bg-blue-300 p-4">
          <div>Home</div>
          <div>Accounts</div>
          <div>Budget</div>
          <div>Planning</div>
        </footer>
      </div>
    </MantineProvider>
  </React.StrictMode>
);

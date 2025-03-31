import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router"; // <-- Cambiar BrowserRouter por HashRouter
import CargarArchivos from "./components/CargarArchivos";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./pages/Home";

let router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cargar",
    element: <CargarArchivos />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

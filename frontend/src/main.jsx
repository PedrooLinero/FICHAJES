import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import CargarArchivos from "./components/CargarArchivos";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./pages/Home";


let router = createBrowserRouter([
  // errorElement: <PaginaError />,
  {
    path: "/", // Ruta independiente para la página de inicio
    element: <Home />,
    children: [
      {
        path: "/",
        element: <CargarArchivos />,
      },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

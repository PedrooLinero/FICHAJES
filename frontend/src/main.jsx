import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import CargarArchivos from "./components/CargarArchivos";

let router = createBrowserRouter([
  // errorElement: <PaginaError />,
  {
    path: "/", // Ruta independiente para la página de inicio
    element: <CargarArchivos />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

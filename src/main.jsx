import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createHashRouter, RouterProvider } from "react-router";

import Main from "./routes/main/index.jsx";
import Register from "./routes/register/index.jsx";
import Data from "./routes/dados/index.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/register",
    element: <Register />,
  },
   {
    path: "/data/:id",
    element: <Data />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

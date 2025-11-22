import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router";

import Main from "./routes/main/index.jsx";
import Register from "./routes/register/index.jsx";
import Data from "./routes/dados/index.jsx";
import SearchPacient from "./routes/searshPacient/index.jsx";

const router = createBrowserRouter([
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
    {
    path: "/search",
    element: <SearchPacient />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

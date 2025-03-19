import { lazy, startTransition } from "react";
import { Navigate } from "react-router-dom";

import Loadable from "app/components/Loadable";

// Lazy loading of components
let NotFound, Unauthorized;

startTransition(() => {
  NotFound = lazy(() => import("app/pages/errors/NotFound"));
  Unauthorized = Loadable(lazy(() => import("app/pages/errors/Unauthorized")));
});

const routes = [
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

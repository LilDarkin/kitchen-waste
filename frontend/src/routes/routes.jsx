import { lazy, startTransition } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "app/components/Loadable";

// Lazy loading components
let NotFound, Unauthorized, LandingPage, Login, ForgotPassword, CreateAccount;

startTransition(() => {
  NotFound = lazy(() => import("app/pages/errors/NotFound"));
  Unauthorized = Loadable(lazy(() => import("app/pages/errors/Unauthorized")));
  LandingPage = Loadable(lazy(() => import("app/pages/Login/LandingPage")));
  Login = Loadable(lazy(() => import("app/pages/Login/Login")));
  ForgotPassword = Loadable(lazy(() => import("app/pages/Login/ForgotPassword")));
  CreateAccount = Loadable(lazy(() => import("app/pages/Login/CreateAccount")));
});

const routes = [
  { path: "/login", element: <Login /> },
  { path: "/landing", element: <LandingPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

import { lazy, startTransition } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "app/components/Loadable";

// Lazy loading components
let NotFound,
  Unauthorized,
  LandingPage,
  Login,
  ForgotPassword,
  CreateAccount,
  Home,
  Dashboard,
  TermsOfUse;

startTransition(() => {
  NotFound = lazy(() => import("app/pages/errors/NotFound"));
  Unauthorized = Loadable(lazy(() => import("app/pages/errors/Unauthorized")));
  LandingPage = Loadable(lazy(() => import("app/pages/Login/LandingPage")));
  Login = Loadable(lazy(() => import("app/pages/Login/Login")));
  ForgotPassword = Loadable(
    lazy(() => import("app/pages/Login/ForgotPassword"))
  );
  CreateAccount = Loadable(lazy(() => import("app/pages/Login/CreateAccount")));
  Home = Loadable(lazy(() => import("app/pages/dashboard/Home")));
  Dashboard = Loadable(lazy(() => import("app/pages/dashboard/Dashboard")));
  TermsOfUse = Loadable(lazy(() => import("app/pages/login/TermsOfUse")));
});

const routes = [
  { path: "/login", element: <Login /> },
  { path: "/landing", element: <LandingPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/create-account", element: <CreateAccount /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  { path: "/terms-of-use", element: <TermsOfUse /> },
  { path: "/dashboard/home", element: <Home /> },
  { path: "/", element: <Navigate to="/dashboard/home" /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

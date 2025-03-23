import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "app/components/Loadable";
import Template from "../components/Template";

const NotFound = Loadable(lazy(() => import("app/pages/errors/NotFound")));
const Unauthorized = Loadable(lazy(() => import("app/pages/errors/Unauthorized")));
const LandingPage = Loadable(lazy(() => import("app/pages/Login/LandingPage")));
const Login = Loadable(lazy(() => import("app/pages/Login/Login")));
const ForgotPassword = Loadable(lazy(() => import("app/pages/Login/ForgotPassword")));
const CreateAccount = Loadable(lazy(() => import("app/pages/Login/CreateAccount")));
const TermsOfUse = Loadable(lazy(() => import("app/pages/Login/TermsOfUse")));
const Splash = Loadable(lazy(() => import("app/pages/splashing/Splash")));
const Analysis = Loadable(lazy(() => import("app/pages/analysis/Analysis")));
const Welcome = Loadable(lazy(() => import("app/pages/dashboard/Welcome")));
const Dashboard = Loadable(lazy(() => import("app/pages/dashboard/Dashboard")));
const PNS = Loadable(lazy(() => import("app/pages/pns/PNS")));
const Profile = Loadable(lazy(() => import("app/pages/profile/Profile")));

const routes = [
  { path: "/", element: <Navigate to="/splash" /> },

  { path: "/splash", element: <Splash /> },
  { path: "/login", element: <Login /> },
  { path: "/landing", element: <LandingPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/terms-of-use", element: <TermsOfUse /> },
  { path: "/unauthorized", element: <Unauthorized /> },

  {
    path: "/dashboard",
    element: <Template />,
    children: [
      { path: "", element: <Dashboard /> },
    ]
  },

  {
    path: "/analysis",
    element: <Template />,
    children: [
      { path: "", element: <Analysis /> }
    ]
  },

  {
    path: "/welcome",
    element: <Template hasNavigation />,
    children: [
      { path: "", element: <Welcome /> }
    ]
  },

  {
    path: "/pns",
    element: <Template />,
    children: [
      { path: "", element: <PNS /> }
    ]
  },

  {
    path: "/profile",
    element: <Template  />,
    children: [
      { path: "", element: <Profile /> }
    ]
  },

  { path: "*", element: <NotFound /> },
];

export default routes;
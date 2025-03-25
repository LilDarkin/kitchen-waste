import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "app/components/Loadable.jsx";
import Template from "app/components/Template.jsx";
import ProtectedRoute from "app/routes/ProtectedRoute.jsx";

const NotFound = Loadable(lazy(() => import("app/pages/errors/NotFound.jsx")));
const Unauthorized = Loadable(lazy(() => import("app/pages/errors/Unauthorized.jsx")));
const LandingPage = Loadable(lazy(() => import("app/pages/login/LandingPage.jsx")));
const Login = Loadable(lazy(() => import("app/pages/login/Login.jsx")));
const ForgotPassword = Loadable(lazy(() => import("app/pages/login/ForgotPassword.jsx")));
const CreateAccount = Loadable(lazy(() => import("app/pages/login/CreateAccount.jsx")));
const TermsOfUse = Loadable(lazy(() => import("app/pages/login/TermsOfUse.jsx")));
const ResetPassword = Loadable(lazy(() => import("app/pages/login/ResetPassword.jsx")));
const Splash = Loadable(lazy(() => import("app/pages/splashing/Splash.jsx")));
const Analysis = Loadable(lazy(() => import("app/pages/analysis/Analysis.jsx")));
const Welcome = Loadable(lazy(() => import("app/pages/dashboard/Welcome.jsx")));
const Dashboard = Loadable(lazy(() => import("app/pages/dashboard/Dashboard.jsx")));
const PNS = Loadable(lazy(() => import("app/pages/pns/PNS.jsx")));
const Profile = Loadable(lazy(() => import("app/pages/profile/Profile.jsx")));
const CheckUser = Loadable(lazy(() => import("app/pages/login/CheckUser.jsx")));
const UserManual = Loadable(lazy(() => import("app/pages/dashboard/UserManual.jsx")));

const routes = [
  { path: "/", element: <Navigate to="/splash" /> },
  { path: "/splash", element: <Splash /> },
  { path: "/login", element: <Login /> },
  { path: "/landing", element: <LandingPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/terms-of-use", element: <TermsOfUse /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "/verify/:code", element: <CheckUser /> },
  
  // Consolidated reset password routes
  { 
    path: "/reset-password", 
    element: <ResetPassword /> 
  },
  { 
    path: "/reset-password/:token", 
    element: <ResetPassword /> 
  },
  { 
    path: "/reset-password/:code", 
    element: <ResetPassword /> 
  },

  {
    path: "/dashboard",
    element: <Template />,
    children: [
      { path: "", element: <ProtectedRoute element={<Dashboard />} /> },
    ],
  },

  {
    path: "/analysis",
    element: <Template />,
    children: [
      { path: "", element: <ProtectedRoute element={<Analysis />} /> },
    ],
  },

  {
    path: "/user-manual",
    element: <Template hasNavigation />,
    children: [
      { path: "", element: <ProtectedRoute element={<UserManual />} /> },
    ],
  },
  {
    path: "/welcome",
    element: <Template hasNavigation />,
    children: [{ path: "", element: <ProtectedRoute element={<Welcome />} /> }],
  },
  {
    path: "/pns",
    element: <Template />,
    children: [{ path: "", element: <ProtectedRoute element={<PNS />} /> }],
  },
  {
    path: "/profile",
    element: <Template />,
    children: [{ path: "", element: <ProtectedRoute element={<Profile />} /> }],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
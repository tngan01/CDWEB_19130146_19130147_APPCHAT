import { lazy } from "react";
import { Redirect } from "react-router-dom";
import LoginPage from "containers/Authencation/Login";
import Register from "containers/Authencation/Register";
import ForgotPassword from "containers/Authencation/ForgotPassword";


// import Home from "containers/Home/index"

const Home = lazy(() => import("containers/Home"));
const Profile = lazy(() => import("containers/Profile"));


const NotFoundRedirect = (): JSX.Element => <Redirect to="/404-not-found" />;

const RedirectToLogin = (): JSX.Element => {
  return <Redirect to="/login" />;
};

const indexRoutes = [
  // {
  //   path: '/404-not-found',
  //   component: NotFoundPage,
  //   exact: true,
  // },

  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
    exact: true,
  },
  {
    path: "/home/:id",
    component: Home,
    exact: true,
  },
  {
    path: "/home",
    component: Home,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
  },
  {
    path: '/',
    component: RedirectToLogin,
    exact: true,
  },
];
export default indexRoutes;

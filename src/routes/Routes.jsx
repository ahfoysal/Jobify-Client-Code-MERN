import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import SecondaryLayout from "../layout/SecondaryLayout";
import UpdateJob from "../pages/UpdateAJob";
import Jobs from "../pages/Jobs";
import DashboardLayout from "../pages/Dashboard";
import Blogs from "../pages/Blogs";
import JobDetails from "../pages/JobDetail";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },

      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/jobs",

        element: <Jobs />,
      },

      {
        path: "job/update/:id",

        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },

      {
        path: "/job/:id",

        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/:id",

        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    element: <SecondaryLayout />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

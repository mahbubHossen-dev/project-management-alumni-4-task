import { createBrowserRouter } from "react-router";


import AllProjects from "../pages/AllProjects/AllProjects";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AddProjects from "../pages/Dashboard/AddProjects/AddProjects";
import TaskManagement from "../pages/Dashboard/TaskManagement/TaskManagement";
import Insight from "../pages/Dashboard/insight/Insight";
import WorkloadSummery from "../pages/Dashboard/WorkloadSummery/WorkloadSummery";
import DashboardAnalytics from "../pages/Dashboard/DashboardAndAnalytics/DashboardAnalytics";
import AdminRoute from "./AdminRoute";
import HomeRedirect from "../components/HomeRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },

  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/register",
    Component: Register,
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'addProjects',
        element:<PrivateRoute><AddProjects /></PrivateRoute> ,
      },
      {
        path: 'taskManagement',
        element: <PrivateRoute> <TaskManagement /></PrivateRoute>,
      },
      {
        path: 'insights',
        element: <PrivateRoute><AdminRoute><Insight /></AdminRoute></PrivateRoute> ,
      },
      {
        path: 'workloadSummery',
        element: <PrivateRoute><WorkloadSummery /></PrivateRoute>,
      },
      {
        path: 'dashboardAnalytics',
        element: <PrivateRoute><DashboardAnalytics /></PrivateRoute> ,
      },
      {
        path: 'allProjects',
        element: <PrivateRoute><AllProjects></AllProjects></PrivateRoute>,
        loader: async () => {
          const res = await fetch('https://alumni-4-task-server.onrender.com/projects');
          return res.json();
        }
      },
    ]
  }
]);

export default router;
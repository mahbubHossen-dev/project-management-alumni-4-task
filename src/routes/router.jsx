import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'addProjects',
        element: <AddProjects />,
      },
      {
        path: 'taskManagement',
        element: <TaskManagement />,
      },
      {
        path: 'insights',
        element: <Insight />,
      },
      {
        path: 'workloadSummery',
        element: <WorkloadSummery />,
      },
      {
        path: 'dashboardAnalytics',
        element: <DashboardAnalytics />,
      },
      {
        path: 'allProjects',
        element: <PrivateRoute><AllProjects></AllProjects></PrivateRoute>,
        loader: async () => {
          const res = await fetch('http://localhost:3000/projects');
          return res.json();
        }
      },
    ]
  }
]);

export default router;
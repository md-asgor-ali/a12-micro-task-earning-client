import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  PrivateRoute,
  AdminRoute,
  BuyerRoute,
  WorkerRoute,
} from "../routes/ProtectedRoutes";

// Pages
import Home from "../pages/Home/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Forbidden from "../pages/Forbidden/Forbidden";

import RoleBasedHome from "../pages/Dashboard/RoleBasedHome";
import BuyerHome from "../pages/Dashboard/BuyerHome";
import WorkerHome from "../pages/Dashboard/WorkerHome";
import AdminHome from "../pages/Dashboard/AdminHome";
import AddTask from "../pages/Dashboard/AddTask";
import MyTasks from "../pages/Dashboard/MyTasks";
import PurchaseCoin from "../pages/Dashboard/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTasks from "../pages/Dashboard/ManageTasks";
import TaskList from "../pages/Dashboard/TaskList";
import Withdrawals from "../pages/Dashboard/Withdrawals";
import Payment from "../pages/Dashboard/Payment/Payment";
import TaskDetails from "../pages/Dashboard/TaskDetails";
import MySubmissions from "../pages/Dashboard/MySubmissions";
import NotFound from "../pages/NotFound/NotFound";
import LoadingSpinner from "./../pages/LoadingSpinner/LoadingSpinner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      { path: "forbidden",
        element: <Forbidden /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <RoleBasedHome /> },

      {
        path: "buyer-home",
        element: (
          <BuyerRoute>
            <BuyerHome />
          </BuyerRoute>
        ),
      },
      {
        path: "worker-home",
        element: (
          <WorkerRoute>
            <WorkerHome />
          </WorkerRoute>
        ),
      },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <BuyerRoute>
            <AddTask />
          </BuyerRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <BuyerRoute>
            <PurchaseCoin />
          </BuyerRoute>
        ),
      },
      {
        path: "payment/:coins",
        element: (
          <BuyerRoute>
            <Payment />
          </BuyerRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <BuyerRoute>
            <PaymentHistory />
          </BuyerRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-tasks",
        element: (
          <AdminRoute>
            <ManageTasks />
          </AdminRoute>
        ),
      },
      {
        path: "tasklist",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "task-details/:id",
        element: (
          <WorkerRoute>
            <TaskDetails />
          </WorkerRoute>
        ),
      },
      {
        path: "submissions",
        element: (
          <WorkerRoute>
            <MySubmissions />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <Withdrawals />
          </WorkerRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

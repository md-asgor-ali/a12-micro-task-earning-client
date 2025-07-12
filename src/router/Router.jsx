import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import DashboardHome from "../pages/Dashboard/DashboardHome";
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
import Submissions from "../pages/Dashboard/Submissions";
import Withdrawals from "../pages/Dashboard/Withdrawals";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "buyer-home",
        element: <BuyerHome />,
      },
      {
        path: "worker-home",
        element: <WorkerHome />,
      },
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
      {
        path: "my-tasks",
        element: <MyTasks />,
      },
      {
        path: "purchase-coin",
        element: <PurchaseCoin />,
      },
      {
        path: "payment/:coins",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-tasks",
        element: <ManageTasks />,
      },
      {
        path: "tasklist",
        element: <TaskList />,
      },
      {
        path: "submissions",
        element: <Submissions />,
      },
      {
        path: "withdrawals",
        element: <Withdrawals />,
      },
    ],
  },
]);

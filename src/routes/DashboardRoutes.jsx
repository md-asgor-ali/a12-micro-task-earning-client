import DashboardLayout from "../components/DashboardLayout";
import RoleBasedHome from "../components/RoleBasedHome";

import AddTask from "../pages/dashboard/AddTask";
import MyTasks from "../pages/dashboard/MyTasks";
import PurchaseCoin from "../pages/dashboard/PurchaseCoin";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageTasks from "../pages/dashboard/ManageTasks";

export const dashboardRoutes = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { path: "home", element: <RoleBasedHome /> }, // ✅ dynamic switch based on role
    { path: "tasklist", element: <div>Task List</div> },
    { path: "submissions", element: <div>My Submissions</div> },
    { path: "withdrawals", element: <div>Withdrawals</div> },
    { path: "add-task", element: <AddTask></AddTask> },
    { path: "my-tasks", element: <MyTasks /> },
    { path: "purchase-coin", element: <PurchaseCoin /> },
    { path: "payment-history", element: <PaymentHistory /> },
    { path: "manage-users", element: <ManageUsers /> },
    { path: "manage-tasks", element: <ManageTasks /> },
  ],
};

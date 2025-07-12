// Buyer Dashboard Routes

import AddTask from "../pages/dashboard/AddTask";
import MyTasks from "../pages/dashboard/MyTasks";
import PurchaseCoin from "../pages/dashboard/PurchaseCoin";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import BuyerHome from "../pages/Dashboard/BuyerHome";

export const buyerRoutes = {
  path: "/dashboard",
  element: <BuyerDashboardLayout />,
  children: [
    { path: "home", element: <BuyerHome /> },
    { path: "add-task", element: <AddTask /> },
    { path: "my-tasks", element: <MyTasks /> },
    { path: "purchase-coin", element: <PurchaseCoin /> },
    { path: "payment-history", element: <PaymentHistory /> },
  ],
};

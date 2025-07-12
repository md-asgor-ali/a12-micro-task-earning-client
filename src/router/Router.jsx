import { Component } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
   {
     index: true,
     Component:Home,
    
   }
    ]
  },
    {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        index:true,
        Component:DashboardHome,
      }
    ]
  }
]);

import React, { lazy, useState } from "react";
import { useSelector } from "react-redux";
const SuperAdminHome = lazy(() => import("./DashBoards/SuperAdminHome"));
const DesignerHome = lazy(() => import("./DashBoards/DesignerHome"));
const CustomerHome = lazy(() => import("./DashBoards/CustomerHome"));

const Home = () => {
  const userrole = useSelector((state) => state.auth.role || "");
  return (
    <>
      {userrole === "Designer" ? (
        <DesignerHome />
      ) : userrole === "customer_admin" ? (
        <CustomerHome />
      ) : userrole === "Super admin" ? (
        <SuperAdminHome />
      ) : userrole === "customer" ? (
        <CustomerHome />
      ): (<p>No User Role Found!</p>)}
    </>
  );
};

export default Home;

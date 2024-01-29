import React, { useState } from "react";
import { useSelector } from "react-redux";
import SuperAdminHome from "./DashBoards/SuperAdminHome";
import DesignerHome from "./DashBoards/DesignerHome";
import CustomerHome from "./DashBoards/CustomerHome";

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
      ) : (<p>No User Role Found!</p>)}
    </>
  );
};

export default Home;

import React from "react";
import { useSelector } from "react-redux";
import SuperAdminHome from "../DashBoards/SuperAdminHome";
import DesignerHome from "../DashBoards/DesignerHome";
import CustomerHome from "../DashBoards/CustomerHome";

const Home = () => {
  const userrole = useSelector((state) => state.auth.role || '')

  return (
    <>
      {userrole === 'Designer' ? <DesignerHome />
      :userrole === 'Customer' ? <CustomerHome />
      :userrole === 'SuperAdmin' ? <SuperAdminHome/>
      :<p>No User Type Found!!!</p>
      }
    </>
  )
}

export default Home;

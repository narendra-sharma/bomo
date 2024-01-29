import React from "react";
import { useSelector } from "react-redux";
import DesignerPastRequests from "./Designer/PastRequests";
import CustomerPastRequests from "./Customer/PastRequests";
const PastRequests = () => {
  const userrole = useSelector((state) => state.auth.role || '')
  return (
    <>
      {userrole === 'Designer' ? <DesignerPastRequests />
      :<CustomerPastRequests />
      }
    </>
  )
}

export default PastRequests;
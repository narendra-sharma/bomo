import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'react-tagsinput/react-tagsinput.css';
import $ from "jquery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect, useDispatch } from "react-redux";
import { get_customer_card, get_user_subscription } from "./reduxdata/rootAction";
import LoadingSpinner from "./LoadingSpinner";

const Signup = lazy(() => import("./auth/Signup"));
const Login = lazy(() => import("./auth/Login"));
const Home = lazy(() => import("./Home"));
const Bomohome = lazy(() => import("./auth/Home"));
const Sidebar = lazy(() => import("./Sidebar"));
const Header = lazy(() => import("./Header"));
const PastRequest = lazy(() => import("./PastRequests"));
const Subscription = lazy(() => import("./Customer/Subscription/Index"));
const Members = lazy(() => import("./Customer/members/Members"));
const Profile = lazy(() => import("./Customer/Profile"));
const Setting = lazy(() => import("./Setting"));
const AllCustomers = lazy(() => import("./SuperAdmin/AllCustomers"));
const AllRequests = lazy(() => import("./SuperAdmin/AllRequests"));
const Payments = lazy(() => import("./Payments"));
const SiteEdit = lazy(() => import("./SuperAdmin/SiteEdit"));
const ActiveRequests = lazy(() => import("./Designer/ActiveRequests"));
const MotionTips = lazy(() => import("./Designer/MotionTips"));
const Forgotpassword = lazy(() => import("./auth/Forgotpassword"));
const Changepassword = lazy(() => import("./auth/Changepassword"));
const Updatepassword = lazy(() => import("./Modals/Updatepassword"));
const EditProfile = lazy(() => import("./Modals/EditProfile"));
const NewRequest = lazy(() => import("./Customer/NewRequest"));
const RequestStatus = lazy(() => import("./Customer/RequestStatus"));
const BrandProfile = lazy(() => import("./Customer/BrandProfiles/BrandProfile"));
const AllDesigners = lazy(() => import("./SuperAdmin/AllDesigners/AllDesigners"));
const CalculatorShared = lazy(() => import("./CalculatorShared"));
const DelieverRequest = lazy(() => import("./Designer/DelieverRequest"));
const DesignerRequest = lazy(() => import("./Customer/Requests/DesignerRequest"));
const RequestExpand = lazy(() => import("./Customer/Requests/RequestExpand"));

function App({ user }) {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    $(document).ready(() => {
      $("#open-sidebar").click(() => {
        // add class active on #sidebar
        $("#sidebar").addClass("active");

        // show sidebar overlay
        $("#sidebar-overlay").removeClass("d-none");
      });

      $("#sidebar-overlay").click(function () {
        // add class active on #sidebar
        $("#sidebar").removeClass("active");

        // show sidebar overlay
        $(this).addClass("d-none");
      });
      $("input[type=file]").change(function (e) {
        $(this).parents(".uploadFile").find(".filename").text(e.target.files[0].name);
      });
     
    });
    

  }, []);

  useEffect(() => {
    setIsAuth(user ? true : false);
    if(user && (user.role!=='superadmin') && (user.role!=='designer')){
      get_customer_card(user?.token,dispatch);
    }
  }, [user]);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(user && (user.role!=='superadmin') && (user.role!=='designer')){
      get_user_subscription(user,dispatch);
    }
  },[])
  useEffect(() => {
    const handleEndConcert = () => {
      localStorage.setItem("path", window.location.pathname);
      localStorage.setItem("time", new Date());
    };
    window.addEventListener("beforeunload", handleEndConcert);
    return () => {
      window.removeEventListener("beforeunload", handleEndConcert);
    };
  }, []);

  const AuthRoutes = () =>
    useRoutes([
      { path: "/", element: <Bomohome /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <Forgotpassword /> },
      { path: "/reset-password", element: <Changepassword /> },
      { path: "/calculator", element: <CalculatorShared /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ]);
  const AfterLoginCustomerRoutes = () =>
    useRoutes([
      { path: "/", element: <Home /> },
      { path: "/new-request", element: <NewRequest /> },
      { path: "/request-status", element: <RequestStatus /> },
      { path: "/past-requests", element: <PastRequest /> },
      { path: "/brand-profile", element: <BrandProfile /> },
      { path: "/subscription", element: <Subscription /> },
      { path: "/members", element: <Members /> },
      { path: "/user-profile", element: <Profile /> },
      { path: "/settings", element: <Setting /> },
      { path: "/all-Customers", element: <AllCustomers /> },
      { path: "/all-Designers", element: <AllDesigners /> },
      { path: "/all-requests", element: <AllRequests /> },
      { path: "/payments", element: <Payments /> },
      { path: "/site-edit", element: <SiteEdit /> },
      { path: "/active-requests", element: <ActiveRequests /> },
      { path: "/motion-tips", element: <MotionTips /> },
      { path: "/update-password", element: <Updatepassword /> },
      { path: "/edit-profile", element: <EditProfile /> },
      { path: "/deleiver-request", element: <DelieverRequest /> },
      { path: "/acceptance-request", element: <DesignerRequest /> },
      { path: "/request-expand", element: <RequestExpand/> },
      { path: "*", element: <Navigate to="/" replace /> },
    ]);
  return (
    <BrowserRouter>
    <ToastContainer />
    <LoadingSpinner />
    {isAuth ? <>
        <Sidebar />
        <Header />
        <AfterLoginCustomerRoutes />
        </>  : (
        <AuthRoutes />
    )}
  </BrowserRouter>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};


export default connect(mapStateToProps)(App);

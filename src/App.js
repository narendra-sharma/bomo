/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Signup from './auth/Signup';
import Login from './auth/Login';
import { useEffect, useState } from 'react';
import Home from './Customer/Home';
import Bomohome from './auth/Home';
import Sidebar from './Sidebar';
import Header from './Header';
import PastRequest from './Customer/PastRequests';
import BrandProfile from './Customer/BrandProfile';
import Subscription from './Customer/Subscription';
import Members from './Customer/Members';
import Profile from './Customer/Profile';
import Setting from './Customer/Setting';
import AllCustomers from './SuperAdmin/AllCustomers';
import AllDesigners from './SuperAdmin/AllDesigners';
import AllRequests from './SuperAdmin/AllRequests';
import Payments from './SuperAdmin/Payments';
import SiteEdit from './SuperAdmin/SiteEdit';
import ActiveRequests from './Designer/ActiveRequests';
import MotionTips from './Designer/MotionTips';
import $ from 'jquery';
import store from './reduxdata/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from './auth/Forgotpassword';
import Changepassword from './auth/Changepassword';
import Updatepassword from './Modals/Updatepassword';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    $(document).ready(()=>{
  
      $('#open-sidebar').click(()=>{
         
          // add class active on #sidebar
          $('#sidebar').addClass('active');
          
          // show sidebar overlay
          $('#sidebar-overlay').removeClass('d-none');
        
       });
      
      
       $('#sidebar-overlay').click(function(){
         
          // add class active on #sidebar
          $('#sidebar').removeClass('active');
          
          // show sidebar overlay
          $(this).addClass('d-none');
        
       });
      
    });
  }, [])
  useEffect(() => {
    store.subscribe(() => {
      setUser(store.getState()?.auth?.user);
    });
  }, [ store ]);
  useEffect(() => {
    setIsAuth(user?true:false);
  }, [user]);
  const AuthRoutes = () => useRoutes([
    { path: "/", element: <Bomohome /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgot-password", element: <Forgotpassword/> },
    { path: "/reset-password", element: <Changepassword/> },
    { path: "*", element: <Navigate to={{ pathname: '/' }} replace /> }
  ])
  const AfterLoginCustomerRoutes = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/past-requests", element: <PastRequest /> },
    { path: "/brand-profile", element: <BrandProfile /> },
    { path: "/subscription", element: <Subscription /> },
    { path: "/members", element: <Members /> },
    { path: "/user-profile", element: <Profile /> },
    { path: "/setting", element: <Setting /> },
    { path: "/all-Customers", element: <AllCustomers />},
    { path: "/all-Designers", element: <AllDesigners />},
    { path: "/all-requests", element: <AllRequests />},
    { path: "/payments", element: <Payments /> },
    { path: "/site-edit", element: <SiteEdit /> },
    { path: "/active-requests", element: <ActiveRequests /> },
    { path: "/motion-tips", element: <MotionTips /> },
    { path: "/update-password", element: <Updatepassword/> },
    { path: "*", element: <Navigate to={{ pathname: '/' }} replace /> }
  ])
  return (
    <BrowserRouter>
    <ToastContainer/>
      {isAuth ? <>
        <Sidebar />
        <Header />
        <AfterLoginCustomerRoutes />
      </> : <AuthRoutes />}
    </BrowserRouter>
  );
}
export default App;

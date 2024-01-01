/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Signup from './auth/Signup';
import Login from './auth/Login';
import { useEffect, useState } from 'react';
import Home from './Home';
import Bomohome from './auth/Home';
import Sidebar from './Sidebar';
import Header from './Header';
import PastRequest from './PastRequests';
import BrandProfile from './Customer/BrandProfile';
import Subscription from './Customer/Subscription/Index';
import Members from './Customer/Members';
import Profile from './Customer/Profile';
import Setting from './Setting';
import AllCustomers from './SuperAdmin/AllCustomers';
import AllDesigners from './SuperAdmin/AllDesigners';
import AllRequests from './SuperAdmin/AllRequests';
import Payments from './Payments';
import SiteEdit from './SuperAdmin/SiteEdit';
import ActiveRequests from './Designer/ActiveRequests';
import MotionTips from './Designer/MotionTips';
import $ from 'jquery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from './auth/Forgotpassword';
import Changepassword from './auth/Changepassword';
import Updatepassword from './Modals/Updatepassword';
import { connect } from 'react-redux';
import EditProfile from './Modals/EditProfile';
import NewRequest from './Customer/NewRequest';
import RequestStatus from './Customer/RequestStatus';

function App({user}) {
  const [isAuth, setIsAuth] = useState(false);
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
    setIsAuth(user?true:true);
  }, [user]);
  useEffect(() => {
    const handleEndConcert = () => {
      localStorage.setItem('path',window.location.pathname);
      localStorage.setItem('time',new Date());
    }
    window.addEventListener('beforeunload', handleEndConcert);
    return () => {
      window.removeEventListener('beforeunload', handleEndConcert);
    }
  }, []);
   

  const AuthRoutes = () => useRoutes([
    { path: "/", element: <Bomohome /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgot-password", element: <Forgotpassword/> },
    { path: "/reset-password", element: <Changepassword/> },
    { path: "*", element: <Navigate to='/' replace /> }
  ])
  const AfterLoginCustomerRoutes = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/new-request", element: <NewRequest /> },
    { path: "/request-status", element: <RequestStatus /> },
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
    { path: "/edit-profile", element: <EditProfile/> },
    { path: "*", element: <Navigate to='/' replace /> }
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
const mapStateToProps = (state) => {
  return {
    user:state.auth.user
  };
};


export default connect(mapStateToProps, null)(App);

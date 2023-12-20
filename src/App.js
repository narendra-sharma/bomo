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

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let checkuser = localStorage.getItem('LoginuserDetails');
    if (checkuser) {
      setIsAuth(true)
    }
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
  const AuthRoutes = () => useRoutes([
    { path: "/", element: <Bomohome /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
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
    { path: "payments", element: <Payments /> },
    { path: "/site-edit", element: <SiteEdit /> },
    { path: "/active-requests", element: <ActiveRequests /> },
    { path: "/motion-tips", element: <MotionTips /> },
    { path: "*", element: <Navigate to={{ pathname: '/' }} replace /> }
  ])
  return (
    <BrowserRouter>
      {isAuth ? <>
        <Sidebar />
        <Header />
        <AfterLoginCustomerRoutes />
      </> : <AuthRoutes />}
    </BrowserRouter>
  );
}

export default App;

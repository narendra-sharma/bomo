import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
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
import { Provider } from 'react-redux';
import store from './reduxdata/Store/store';
function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let checkuser = localStorage.getItem('userDetails');
    if (checkuser) {
      setIsAuth(true)
    }
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
    { path: "*", element: <Navigate to={{ pathname: '/' }} replace /> }
  ])
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          {isAuth ? <>
            <Header />
            <Sidebar />
            <AfterLoginCustomerRoutes />
          </> : <AuthRoutes />}
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

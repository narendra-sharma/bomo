import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './auth/Signup';
import Login from './auth/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

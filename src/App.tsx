import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import OtpVerify from './components/OtpVerify';
import Register from './components/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/api/user/:table' element={<Landing />} />
          <Route path='/api/user/verify-otp' element={<OtpVerify />} />
        </Routes>
      </Router>
    </>
  );
}

export default App

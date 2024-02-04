import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import OtpVerify from './components/OtpVerify';
import Register from './components/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Table from './components/Table';
import Menu from './components/Menu';
function App() {

  return (
    <>
      <Router>
        <Routes>

          {/* Admin routes */}
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/table/create' element={<Table />} />

          {/* User routes */}
          <Route path='/user/:table_number' element={<Landing />} />
          <Route path='/user/verify-otp/:table_number/:id' element={<OtpVerify />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App

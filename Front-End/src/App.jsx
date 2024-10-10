import Home from './Page/Home/Home';
import './App.css';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import ForgotPassword from './Page/ForgotPassword/ForgotPassword'
import PaymentMethods from './Page/Payment-Methods/PaymentMethod';
import Manager from './Page/Manager/Manager'
import DeliveryTracking from './Page/View-Order-Tracking/ViewOrderTracking'
import AddNewAccount from './Page/Add-new-account/Add-new-account'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPass" element={<ForgotPassword />} />
        <Route path="/Payment" element={<PaymentMethods />} />

        <Route path="/Manager" element={<Manager />} />
        <Route path="/DeliveryTracking" element={<DeliveryTracking />} />
        <Route path="/AddNewAccount" element={<AddNewAccount />} />

      </Routes>
    </Router>

  );
}

export default App
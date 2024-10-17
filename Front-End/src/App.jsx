import Home from "./Page/Home/Home";
import "./App.css";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import ForgotPassword from "./Page/ForgotPassword/ForgotPassword";
import PaymentMethods from "./Page/Payment-Methods/PaymentMethod";
import Manager from "./Page/Manager/Manager";
import DeliveryTracking from "./Page/View-Order-Tracking/ViewOrderTracking";
import AddNewAccount from "./Page/Add-new-account/Add-new-account";
import DeliveryStatus from "./Page/Delivery-Status/DeliveryStatus.jsx";
import DeliveryPriceList from "./Page/Delivery-Price-List/DeliveryPriceList.jsx";
import PriceList from "./Components/PriceList.jsx";
import ManagerPrice from "./Components/ManagerPrice.jsx";
import ManagerOrder from "./Components/ManagerOrder.jsx";
import ViewOrder from "../src/Page/SaleStaff/ViewOrder_SaleStaff.jsx";
import HomeCus from './Page/Home/Home_Customer.jsx'
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
        <Route path="/PriceManager" element={<ManagerPrice />} />
        <Route path="/ManagerOrder" element={<ManagerOrder />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/DeliveryStatus" element={<DeliveryStatus />} />
        <Route path="/PriceList" element={<PriceList />} />
        <Route path="/DeliveryTracking" element={<DeliveryTracking />} />
        <Route path="/AddNewAccount" element={<AddNewAccount />} />
        <Route path="/ViewOrder" element={<ViewOrder />} />
        <Route path="/HomeCus" element={<HomeCus />} />
      </Routes>
    </Router>
  );
}

export default App;

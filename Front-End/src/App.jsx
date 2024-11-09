import Home from "./Page/Home/Home";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import ForgotPassword from "./Page/ForgotPassword/ForgotPassword";
import PaymentMethods from "./Page/Payment-Methods/PaymentMethod";
import Manager from "./Page/Manager/Manager";
import DeliveryTracking from "./Page/View-Order-Tracking/ViewOrderTracking";
import AddNewAccount from "./Page/Add-new-account/Add-new-account";
import DeliveryStatus from "./Page/Delivery-Status/DeliveryStatus.jsx";
import PriceList from "./Components/PriceList.jsx";
import ManagerPrice from "./Components/ManagerPrice.jsx";
import ManagerOrder from "./Components/ManagerOrder.jsx";
import ViewOrder from "./Page/SaleStaff/ViewOrder_SaleStaff.jsx";
import HomeCus from "./Page/Home/Home_Customer.jsx";
import ViewOrderCustomer from "./Page/View-Order/ViewOrder.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderInformation from "./Page/View-Order/ViewOrder.jsx";
import DeleteOrder from "./Page/Delete-Order/DeleteOrder.jsx";
import DeliveryViewOrder from "./Page/DeliveryViewOrder/DeliveryViewOrder.jsx";
import MomoMethod from "./Page/Payment-Methods/MomoMethod.jsx";
import VNPayMethod from "./Page/Payment-Methods/VnPayMethod.jsx";
import ConfirmOrder from "./Page/SaleStaff/ConfirmOrder.jsx";
import DeliveryStatusD from "./Page/Delivery-Status/DeliveryStatusD.jsx";
import CheckoutForm from "./Page/PaymentStripe/Stripe.jsx";
import PaymentModal from "./Page/PaymentStripe/PaymentModal.jsx";

const stripePromise = loadStripe(
  "pk_test_51QFJ0X00eXNAQ7PXp9HL5W2c2hEeuHpp3HUieCFUG1rzvM78O9LPo2KNDKimiyuBulhhPBKIWLbkVph4QKeBh1Uj00PuKXqh2d"
);

function App() {
  return (
    <>
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
          <Route path="/DeliveryStatus/:orderId" element={<DeliveryStatus />} />
          <Route
            path="/DeliveryStatusD/:orderId"
            element={<DeliveryStatusD />}
          />
          <Route path="/PriceList" element={<PriceList />} />
          <Route
            path="/DeliveryTracking/:orderId"
            element={<DeliveryTracking />}
          />
          <Route path="/AddNewAccount" element={<AddNewAccount />} />
          <Route path="/ViewOrder" element={<ViewOrder />} />
          <Route path="/HomeCus" element={<HomeCus />} />
          <Route path="/view" element={<ViewOrderCustomer />} />
          <Route path="/OrderInformation" element={<OrderInformation />} />
          <Route path="/DeleteOrder" element={<DeleteOrder />} />
          <Route path="/DeliveryViewOrder" element={<DeliveryViewOrder />} />
          <Route path="/ConfirmOrder" element={<ConfirmOrder />} />

          <Route path="/momoo" element={<MomoMethod />} />
          <Route path="/vnpayy" element={<VNPayMethod />} />
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            }
          />
          <Route
            path="/payment-modal"
            element={
              <Elements stripe={stripePromise}>
                <PaymentModal />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

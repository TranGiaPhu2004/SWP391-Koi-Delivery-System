import { Link, useLocation, useNavigate } from 'react-router-dom';  // Import useLocation
import './OrderPaymentMethods.css';
import momo from '../assets/image/momo.png';
import vnpay from '../assets/image/vnpay.png';
import { useState } from 'react';

function OrderPaymentMethods() {
    const navigate = useNavigate();

    const location = useLocation();
    const { orderData } = location.state || {};
    const { totalPrice, startPlace, endPlace, deliveryID } = orderData || {};

    const DeliveryType = () => {
        return deliveryID === 1 ? 300000 : 850000;
    };

    // CHUYỂN SANG ĐƠN VỊ TIỀN TỂ LÀ VNĐ
    const formatCurrencyy = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

    const handlePaymentSelection = (e) => {
        setSelectedPaymentMethod(e.target.value);
    }

    const handleQRCodeOrderCompletion = () => {
        if (!selectedPaymentMethod) {
            alert('Please select one of the payment methods!');
            return;
        }
        switch (selectedPaymentMethod) {
            case 'momo':
                navigate('/momoo', {
                    state: {
                        totalPrice,
                        startPlace,
                        endPlace
                    }
                });
                break;
            case 'vnpay':
                navigate('/vnpayy', {
                    state: {
                        totalPrice,
                        startPlace,
                        endPlace
                    }
                });
                break;
            default:
                alert('Please select one of two payment methods!');
                return;
        }
    }

    return (
        <>
            <div className="OrderPaymentMethods-paymentmethods">Payment Methods</div>
            <div className="OrderPaymentMethods-message">Please choose your payment below❤️</div>

            <div className="OrderPaymentMethods-order-information">
                <div className="OrderPaymentMethods-main-order">
                    <div className="OrderPaymentMethods-order-details">
                        <h2>Order Information</h2>
                        <div className="OrderPaymentMethods-line"></div>
                        <p>Total order: {formatCurrencyy(totalPrice - DeliveryType())}</p>
                        <p>Delivery Cost: {formatCurrencyy(DeliveryType())}</p>
                        <span>Total Amount: {formatCurrencyy(totalPrice)}</span>
                        <p>Sent from: {startPlace}</p>

                        <p>Delivery to: {endPlace}</p>
                        <p>
                            By pressing the button, I agree to the <a href="#">Terms and Conditions.</a>
                        </p>
                        <button className="OrderPaymentMethods-payment-button">
                            {formatCurrencyy(totalPrice)} Payment
                        </button>

                        <div className="OrderPaymentMethods-cancel">
                            <a href="#">Cancel</a>
                        </div>
                    </div>

                    <div className="OrderPaymentMethods-methods">
                        <div className="OrderPaymentMethods-payment-option">
                            <label>
                                <input type="radio" name="payment" value="momo"
                                    onChange={handlePaymentSelection}
                                    checked={selectedPaymentMethod === 'momo'}
                                />
                                <img src={momo} alt="MOMO e-wallet" className="icon" />
                                <div className="OrderPaymentMethods-Text2">MOMO e-wallet</div>
                            </label>
                        </div>
                        <div className="OrderPaymentMethods-payment-option">
                            <label>
                                <input type="radio" name="payment" value="vnpay"
                                    onChange={handlePaymentSelection}
                                    checked={selectedPaymentMethod === 'vnpay'}

                                />
                                <img src={vnpay} alt="VNPay" className="icon" />
                                <div className="OrderPaymentMethods-Text3">VNPay</div>
                            </label>
                        </div>

                        <button className="OrderPaymentMethods-Completion"
                            onClick={handleQRCodeOrderCompletion}
                        >
                            Order Completion</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderPaymentMethods;

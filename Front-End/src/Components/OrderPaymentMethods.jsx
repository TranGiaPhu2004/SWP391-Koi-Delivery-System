import PropTypes from 'prop-types';

import './OrderPaymentMethods.css'

import cash from '../assets/image/cash.png'
import momo from '../assets/image/momo.png'
import vnpay from '../assets/image/vnpay.png'
function OrderPaymentMethods({ totalOrder, deliveryCost, totalAmount, deliveryTo }) {
    return (
        <div className="OrderPaymentMethods-order-information">
            <div className="OrderPaymentMethods-main-order">
                <div className='OrderPaymentMethods-order-details'>
                    <h2>Order Information</h2>
                    <div className='OrderPaymentMethods-line'></div>
                    <p>Total order: {totalOrder} vnđ</p>
                    <p>Delivery Cost: {deliveryCost} vnđ</p>
                    <span>Total Amount: {totalAmount} vnđ</span>
                    <p>Delivery to: {deliveryTo}</p>
                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    <button className="OrderPaymentMethods-payment-button">{totalAmount} vnđ Payment</button>

                    <div className="OrderPaymentMethods-cancel">
                        <a href='#'>Cancel</a>
                    </div>
                </div>

                <div className="OrderPaymentMethods-methods">
                    
                    <div className="OrderPaymentMethods-payment-option">
                        <label>
                            <input type="radio" name="payment" value="momo" />
                            <img src={momo} alt="MOMO e-wallet" className="icon" />
                           <div className="OrderPaymentMethods-Text2">MOMO e-wallet</div>
                        </label>
                    </div>
                    <div className="OrderPaymentMethods-payment-option">
                        <label>
                            <input type="radio" name="payment" value="vnpay" />
                            <img src={vnpay} alt="VNPay" className="icon" />
                            <div className="OrderPaymentMethods-Text3">VNPay</div>
                        </label>
                    </div>

                    <button className="OrderPaymentMethods-Completion">
                        Order Completion
                    </button>
                </div>
            </div>

        </div>
    );
}

OrderPaymentMethods.propTypes = {
    totalOrder: PropTypes.string.isRequired,
    deliveryCost: PropTypes.string.isRequired,
    totalAmount: PropTypes.string.isRequired,
    deliveryTo: PropTypes.string.isRequired,
};

export default OrderPaymentMethods
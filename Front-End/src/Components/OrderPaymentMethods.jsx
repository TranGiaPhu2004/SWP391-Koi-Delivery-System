import PropTypes from 'prop-types';

import './OrderPaymentMethods.css'

import cash from '../assets/image/cash.png'
import momo from '../assets/image/momo.png'
import vnpay from '../assets/image/vnpay.png'
function OrderPaymentMethods({ totalOrder, deliveryCost, totalAmount, deliveryTo }) {
    return (
        <div className="order-information">
            <div className="main-order">
                <div className='order-details'>
                    <h2>Order Information</h2>
                    <div className='line'></div>
                    <p>Total order: {totalOrder} vnđ</p>
                    <p>Delivery Cost: {deliveryCost} vnđ</p>
                    <span>Total Amount: {totalAmount} vnđ</span>
                    <p>Delivery to: {deliveryTo}</p>
                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    <button className="payment-button">{totalAmount} vnđ Payment</button>

                    <div className="cancel">
                        <a href='#'>Cancel</a>
                    </div>
                </div>

                <div className="methods">
                    <div className="payment-option">
                        <label>
                            <input type="radio" name="payment" value="cash" />
                            <img src={cash} alt="Cash" className="icon" />
                            <div className="Text">Cash</div>
                        </label>
                    </div>
                    <div className="payment-option">
                        <label>
                            <input type="radio" name="payment" value="momo" />
                            <img src={momo} alt="MOMO e-wallet" className="icon" />
                           <div className="Text2">MOMO e-wallet</div>
                        </label>
                    </div>
                    <div className="payment-option">
                        <label>
                            <input type="radio" name="payment" value="vnpay" />
                            <img src={vnpay} alt="VNPay" className="icon" />
                            <div className="Text3">VNPay</div>
                        </label>
                    </div>

                    <button className="Completion">
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
import PropTypes from 'prop-types';
import './OrderInformationDelete.css'

import HeaderOrderDelete from './HeaderOrderDelete.jsx';
const OrderInformationDelete = ({ totalOrder, deliveryCost, totalAmount, deliveryTo }) => {
    <HeaderOrderDelete></HeaderOrderDelete>
    return (
        <div>

            <div className="order-information">
                <div className='order-details'>
                    <h2>Order Information</h2>
                    <div className='line'></div>
                    <p>Total order: {totalOrder} vnđ</p>
                    <p>Delivery Cost: {deliveryCost} vnđ</p>
                    <span>Total Amount: {totalAmount} vnđ</span>
                    <p>Delivery to: {deliveryTo}</p>
                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    <div className="text">
                        Do you really wanna delete order ?
                    </div>
                    <button className='delete_button'>Delete</button>
                </div>

            </div>


        </div>
    );
}

OrderInformationDelete.propTypes = {
    totalOrder: PropTypes.string.isRequired,
    deliveryCost: PropTypes.string.isRequired,
    totalAmount: PropTypes.string.isRequired,
    deliveryTo: PropTypes.string.isRequired,
};

export default OrderInformationDelete
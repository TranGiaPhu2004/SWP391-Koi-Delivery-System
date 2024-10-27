import './OrderInformationDelete.css'
import { useLocation } from 'react-router-dom';
import HeaderOrderDelete from './HeaderOrderDelete.jsx';
const OrderInformationDelete = () => {
    <HeaderOrderDelete></HeaderOrderDelete>
    const location = useLocation();
    const { orderData } = location.state || {};
    const { totalPrice, startPlace, endPlace, deliveryID } = orderData || {};

    const DeliveryType = () => {
        return deliveryID === 1 ? 300000 : 850000;
    };
    
    const formatCurrencyyy = (amount) => {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
    }

    
    return (
        <div>

            <div className="OrderInformationDelete-order-information">
                <div className='OrderInformationDelete-order-details'>
                    <h2>Order Information</h2>
                    <div className='OrderInformationDelete-line'></div>
                    <p>Total order:  {formatCurrencyyy(totalPrice - DeliveryType())}</p>
                    <p>Delivery Cost: {formatCurrencyyy(DeliveryType())} </p>
                    <span>Total Amount: {formatCurrencyyy(totalPrice)} </span>
                    <p>Sent from: {startPlace} </p>

                    <p>Delivery to: {endPlace} </p>
                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    <div className="OrderInformationDelete-text">
                        Do you really wanna delete order ?
                    </div>
                    <button className='OrderInformationDelete-delete_button'>Delete</button>
                </div>

            </div>


        </div>
    );
}


export default OrderInformationDelete
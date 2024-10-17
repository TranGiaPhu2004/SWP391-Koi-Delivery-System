import './OrderInformationDelete.css'

import HeaderOrderDelete from './HeaderOrderDelete.jsx';
const OrderInformationDelete = () => {
    <HeaderOrderDelete></HeaderOrderDelete>
    return (
        <div>

            <div className="OrderInformationDelete-order-information">
                <div className='OrderInformationDelete-order-details'>
                    <h2>Order Information</h2>
                    <div className='OrderInformationDelete-line'></div>
                    <p>Total order:  vnđ</p>
                    <p>Delivery Cost:  vnđ</p>
                    <span>Total Amount:  vnđ</span>
                    <p>Delivery to: </p>
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
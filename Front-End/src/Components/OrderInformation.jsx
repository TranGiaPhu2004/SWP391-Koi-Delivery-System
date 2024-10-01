import PropTypes from 'prop-types';
import './OrderInformation.css'
import pickoi1 from '../assets/image/pickoi1.png'
import pickoi2 from '../assets/image/pickoi2.png'
import pickoi3 from '../assets/image/pickoi3.png'


const OrderInformation = ({ totalOrder, deliveryCost, totalAmount, deliveryTo }) => {

    return (
        <div className="OrderInformation-main-order">
            <div className="OrderInformation-main-pic">
                <div className="OrderInformation-pic-koi1">
                    <img src={pickoi1} alt="PIC KOI 1" />
                    <div className="OrderInformation-pic1">
                        <p>Small Box</p>
                        <button className='OrderInformation-button'>Delete</button>
                    </div>
                    <div className="OrderInformation-amount">
                        <button>
                            -
                        </button>
                        <button>
                            1
                        </button>
                        <button>
                            +
                        </button>

                        
                    </div>
                </div>


                <div className="OrderInformation-pic-koi2">
                    <img src={pickoi2} alt="PIC KOI 2" />
                    <div className="OrderInformation-pic1">
                        <p>Small Box</p>
                        <button className='OrderInformation-button'>Delete</button>
                    </div>
                    <div className="OrderInformation-amount">
                        <button>
                            -
                        </button>
                        <button>
                            1
                        </button>
                        <button>
                            +
                        </button>
                    </div>
                </div>
                <div className="OrderInformation-pic-koi3">
                    <img src={pickoi3} alt="PIC KOI 3" />
                    <div className="OrderInformation-pic1">
                        <p>Small Box</p>
                        <button className='OrderInformation-button'>Delete</button>
                    </div>
                    <div className="OrderInformation-amount">
                        <button>
                            -
                        </button>
                        <button>
                            1
                        </button>
                        <button>
                            +
                        </button>
                    </div>
                </div>
            </div>


            <div className="OrderInformation-order-information">
                <div className='OrderInformation-order-details'>
                    <h2>Order Information</h2>
                    <div className='OrderInformation-line'></div>
                    <p>Total order: {totalOrder} vnđ</p>
                    <p>Delivery Cost: {deliveryCost} vnđ</p>
                    <span>Total Amount: {totalAmount} vnđ</span>
                    <p>Delivery to: {deliveryTo}</p>
                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    <button className="OrderInformation-payment-button">{totalAmount} vnđ Payment <a href="#"><span>→</span></a></button>
                    
                <div className="OrderInformation-cancel">
                    <a href='#'>Delete</a>
                </div>
                </div>

            </div>


        </div>
    );
}

OrderInformation.propTypes = {
    totalOrder: PropTypes.string.isRequired,
    deliveryCost: PropTypes.string.isRequired,
    totalAmount: PropTypes.string.isRequired,
    deliveryTo: PropTypes.string.isRequired,
};

export default OrderInformation
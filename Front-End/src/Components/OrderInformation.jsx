import PropTypes from 'prop-types';
import { useState } from 'react';
import './OrderInformation.css'
import pickoi1 from '../assets/image/pickoi1.png'
import pickoi2 from '../assets/image/pickoi2.png'
import pickoi3 from '../assets/image/pickoi3.png'


const OrderInformation = ({ totalOrder, deliveryCost, totalAmount, deliveryTo }) => {


    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);


    const increment1 = () => {
        setCount1((c) => c + 1);
    }
    const increment2 = () => {
        setCount2((c) => c + 1);
    }
    const increment3 = () => {
        setCount3((c) => c + 1);
    }
    const decrement1 = () => {
        if (count1 > 0) {
            setCount1((c) => c - 1);
        } else {
            alert('Sorry, you could not decrement ...')
        }
    }
    const decrement2 = () => {
        if (count2 > 0) {
            setCount2((c) => c - 1);
        } else {
            alert('Sorry, you could not decrement ...')
        }
    }
    const decrement3 = () => {
        if (count3 > 0) {
            setCount3((c) => c - 1);
        } else {
            alert('Sorry, you could not decrement ...')
        }
    }

    const Delete1 = () => {
        setCount1(0);
    }
    const Delete2 = () => {
        setCount2(0);
    }
    const Delete3 = () => {
        setCount3(0);
    }

    return (
        <div className="OrderInformation-main-order">
            <div className="OrderInformation-main-pic">
                <div className="OrderInformation-pic-koi1">
                    <img src={pickoi1} alt="PIC KOI 1" />
                    <div className="OrderInformation-pic1">
                        <p>Big Box</p>
                        <button className='OrderInformation-button' onClick={Delete1}>Delete</button>
                    </div>
                    <div className="OrderInformation-amount1">
                        <button className={`decrement-button1 ${count1 > 0 ? 'active' : 'blurred'}`}
                            onClick={decrement1}>
                            -
                        </button>
                        <button>
                            {count1}
                        </button>
                        <button onClick={increment1}>
                            +
                        </button>


                    </div>
                </div>


                <div className="OrderInformation-pic-koi2">
                    <img src={pickoi2} alt="PIC KOI 2" />
                    <div className="OrderInformation-pic1">
                        <p>Traditional Box</p>
                        <button className='OrderInformation-button' onClick={Delete2}>Delete</button>
                    </div>
                    <div className="OrderInformation-amount2">
                        <button className={`decrement-button2 ${count2 > 0 ? 'active' : 'blurred'}`}
                            onClick={decrement2}>
                            -
                        </button>
                        <button>
                            {count2}
                        </button>
                        <button onClick={increment2}>
                            +
                        </button>
                    </div>
                </div>
                <div className="OrderInformation-pic-koi3">
                    <img src={pickoi3} alt="PIC KOI 3" />
                    <div className="OrderInformation-pic1">
                        <p>Small Box</p>
                        <button className='OrderInformation-button' onClick={Delete3}>Delete</button>
                    </div>
                    <div className="OrderInformation-amount3">
                        <button className={`decrement-button3 ${count3 > 0 ? 'active' : 'blurred'}`}
                            onClick={decrement3}>
                            -
                        </button>
                        <button>
                            {count3}
                        </button>
                        <button onClick={increment3}>
                            +
                        </button>
                    </div>
                </div>
            </div>


            <div className="OrderInformation-order-information">
                <div className='OrderInformation-order-details'>
                    <h2>Order Information</h2>
                    <div className='OrderInformation-line'></div>
                    <p>Total order: {totalOrder} {(count1 + count2) * parseFloat(1000000)} vnđ</p>
                    <p>Delivery Cost: {deliveryCost} vnđ</p>
                    <span>Total Amount: {totalAmount} {(count1 + count2) * parseFloat(1000000)} vnđ</span>
                    <p>Delivery to: {deliveryTo}</p>
                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    <button className="OrderInformation-payment-button">{(count1 + count2) * parseFloat(100000000)} vnđ Payment 
                        <a href="#"><span>→</span></a></button>

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
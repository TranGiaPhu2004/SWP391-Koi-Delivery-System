
import { useState } from 'react';
import './OrderInformation.css'
import pickoi1 from '../assets/image/pickoi1.png'
import pickoi2 from '../assets/image/pickoi2.png'
import pickoi3 from '../assets/image/pickoi3.png'

import { Link } from 'react-router-dom';

const OrderInformation = ({ totalOrder, deliveryCost, totalAmount, deliveryTo }) => {

    return (
        <>
            <div className="OrderInformation-paymentmethods">
                <p>📦Your order is getting ready🚚 <br></br> 🌐🎏❤️</p>
            </div>
            <div className="OrderInformation-main-order">
                <div className="OrderInformation-main-pic">
                    <div className="OrderInformation-pic-koi1">
                        <img src={pickoi1} alt="PIC KOI 1" />
                        <div className="OrderInformation-pic1">
                            <p>Large Box (S03)</p>
                            <div className="OrderInformation-info-box">
                                <p>contains <br /> <span>10-20</span> Koi Fish totality</p>

                            </div>
                            <button className='OrderInformation-button'>Delete</button>
                        </div>
                        <div className="OrderInformation-amount1">
                            <button className='decrement-button1'
                            >
                                -
                            </button>
                            <button className='OrderInformation-count1'>
                                
                            </button>
                            <button className='increment-button1'>
                                +
                            </button>


                        </div>
                    </div>


                    <div className="OrderInformation-pic-koi2">
                        <img src={pickoi2} alt="PIC KOI 2" />
                        <div className="OrderInformation-pic2">
                            <p>Medium Box (S02)</p>
                            <div className="OrderInformation-info-box">
                                <p>contains at least <span>5-10</span> Koi Fish</p>

                            </div>
                            <button className='OrderInformation-button'>Delete</button>
                        </div>
                        <div className="OrderInformation-amount2">
                            <button className='decrement-button2'
                            >
                                -
                            </button>
                            <button className='OrderInformation-count2'>
                                
                            </button>
                            <button className='increment-button2'>
                                +
                            </button>
                        </div>
                    </div>
                    <div className="OrderInformation-pic-koi3">
                        <img src={pickoi3} alt="PIC KOI 3" />
                        <div className="OrderInformation-pic3">
                            <p>Small Box (S01)</p>
                            <div className="OrderInformation-info-box">
                                <p>contains at least <span>3-5</span> Koi Fish maximum</p>

                            </div>
                            <button className='OrderInformation-button'>Delete</button>
                        </div>
                        <div className="OrderInformation-amount3">
                            <button className='decrement-button3'
                            >
                                -
                            </button>
                            <button className='OrderInformation-count3'>
                              
                            </button>
                            <button className='increment-button3'>
                                +
                            </button>
                        </div>
                    </div>
                </div>


                <div className="OrderInformation-order-information">
                    <div className='OrderInformation-order-details'>
                        <h2>Order Information</h2>
                        <div className='OrderInformation-line'></div>
                        <p>Total order: {totalOrder} { parseFloat(1000000)} vnđ</p>
                        <p>Delivery Cost: {deliveryCost} vnđ</p>
                        <span>Total Amount: {totalAmount} { parseFloat(1000000)} vnđ</span>
                        <p>Delivery to: {deliveryTo}</p>
                        <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>

                        <Link to='/Payment'>
                            <button className="OrderInformation-payment-button">{ parseFloat(100000000)} vnđ Payment
                                <a href="#"><span>→</span></a></button>
                        </Link>
                        <div className="OrderInformation-cancel">
                            <a href='#'>Delete</a>
                        </div>
                    </div>

                </div>


            </div>

        </>

    );
}


export default OrderInformation
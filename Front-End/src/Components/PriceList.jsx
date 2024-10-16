
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import pickoi1 from '../assets/image/pickoi1.png'
import pickoi2 from '../assets/image/pickoi2.png'
import pickoi3 from '../assets/image/pickoi3.png'
import packaging from '../assets/image/packaging.png'
import deliveryInsurance from '../assets/image/deliveryInsurance.png'
import health from '../assets/image/health.png'

import standardDelivery from '../assets/image/standardDelivery.png'
import fastDelivery from '../assets/image/fastDelivery.png'
import './PriceList.css'
function PriceList() {

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
            alert('Sorry, you could not decrement when amount of boxes begin from Zero ...')
        }
    }
    const decrement2 = () => {
        if (count2 > 0) {
            setCount2((c) => c - 1);
        } else {
            alert('Sorry, you could not decrement when amount of boxes begin from Zero ...')
        }
    }
    const decrement3 = () => {
        if (count3 > 0) {
            setCount3((c) => c - 1);
        } else {
            alert('Sorry, you could not decrement when amount of boxes begin from Zero ...')
        }
    }

    const Delete3 = () => {
        setCount3(0);
    }

    const Delete2 = () => {
        setCount2(0);
    }

    const Delete1 = () => {
        setCount1(0);
    }

    return (
        <>

            <div className="PriceList-main-priceList">
                <p>🚚Koi Delivery Service Price List🎏</p>

            </div>
            <div className="PriceList-BoxChoosing">
                <div className="PriceList-paymentmethods">
                    Box Choosing
                </div>
                <div className="PriceList-message">
                    📦📦Please choose boxes suited for you📦📦
                </div>
            </div>

            <div className="PriceList-main-order">
                <div className="PriceList-main-pic">
                    <div className="PriceList-pic-koi1">
                        <div className="PriceList-price">
                            <img src={pickoi1} alt="PIC KOI 1" />
                            <p>1.200.000 vnđ</p>
                        </div>
                        <div className="PriceList-pic1">
                            <p>Large Box (S01)</p>
                            <div className="PriceList-info-box">
                                <p>contains at least <br /> <span>10-20</span> Koi Fish totality</p>

                            </div>

                            <div className="PriceList-amount1">
                                <button className={`decrement-button1 ${count2 > 0 ? 'active' : 'blurred'}`}
                                    onClick={decrement1}>
                                    -
                                </button>
                                <button className='PriceList-count1'>
                                    {count1}
                                </button>
                                <button onClick={increment1} className='increment-button1'>
                                    +
                                </button>
                            </div>

                            <div className="PriceList-amount1">

                                <div className='PriceList-amount1-button'>
                                    {/* Nút giảm số lượng */}

                                    <br />
                                    <br />
                                    <button className='PriceList-button' onClick={Delete1}

                                    >Delete</button>

                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="PriceList-pic-koi2">
                        <div className="PriceList-price">
                            <img src={pickoi2} alt="PIC KOI 1" />
                            <p>700.000 vnđ</p>
                        </div>
                        <div className="PriceList-pic2">
                            <p>Medium Box (S02)</p>
                            <div className="PriceList-info-box">
                                <p>contains at least <br /> <span>5-10</span> Koi Fish</p>

                            </div>
                            <div className="PriceList-amount2">
                                <button className={`decrement-button2 ${count2 > 0 ? 'active' : 'blurred'}`}
                                    onClick={decrement2}>
                                    -
                                </button>
                                <button className='PriceList-count2'>
                                    {count2}
                                </button>
                                <button onClick={increment2} className='increment-button2'>
                                    +
                                </button>
                            </div>

                            <div className="PriceList-amount2">

                                <div className='PriceList-amount2-button'>
                                    {/* Nút giảm số lượng */}

                                    <br />
                                    <br />
                                    <button className='PriceList-button' onClick={Delete2}

                                    >Delete</button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="PriceList-pic-koi3">
                        <div className="PriceList-price">
                            <img src={pickoi3} alt="PIC KOI 1" />
                            <p>400.000 vnđ</p>
                        </div>
                        <div className="PriceList-pic3">
                            <p>Small Box (S01)</p>
                            <div className="PriceList-info-box">
                                <p>contains at least <br /> <span>3-5</span> Koi Fish maximum</p>

                            </div>
                            <div className="PriceList-amount3">
                                <button className={`decrement-button3 ${count3 > 0 ? 'active' : 'blurred'}`}
                                    onClick={decrement3}>
                                    -
                                </button>
                                <button className='PriceList-count3'>
                                    {count3}
                                </button>
                                <button onClick={increment3} className='increment-button3'>
                                    +
                                </button>
                            </div>

                            <div className="PriceList-amount3">

                                <div className='PriceList-amount3-button'>
                                    {/* Nút giảm số lượng */}

                                    <br />
                                    <br />
                                    <button className='PriceList-button' onClick={Delete3}

                                    >Delete</button>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="PriceList-Servicess">
                <div className="PriceList-paymentmethods">
                    Services
                </div>
                <div className="PriceList-message">
                    ❤️Taking care is our responsibilities❤️ <br />
                    😍You could also choose services that makes yourself comfort😍
                </div>

                <div className="PriceList-Services">
                    {/* Professional Packaging */}
                    <div className='PriceList-package'>
                        <label>
                            <input
                                type="checkbox"
                                name='packaging'
                                value='packaging'

                            />
                            <img src={packaging} alt="Professional Packing" />
                            <h4>Profession Packaging</h4>
                            <p>200.000 vnđ</p>
                        </label>
                    </div>

                    {/* Health Checking */}

                    <div className='PriceList-health'>
                        <label>
                            <input
                                type="checkbox"
                                name='health'
                                value='health'

                            />
                            <img src={health} alt="Health Checking" />
                            <h4>Health Checking</h4>
                            <p>150.000 vnđ</p>
                            <br />
                            <br />

                        </label>
                    </div>

                    {/* Delivery Insurance */}
                    <div className='PriceList-insurance'>
                        <label>
                            <input
                                type="checkbox"
                                name='deliveryInsurance'
                                value='deliveryInsurance'

                            />
                            <img src={deliveryInsurance} alt="Delivery Insurance" />
                            <h4>Delivery Insurance</h4>
                            <p>500.000 vnđ</p>
                        </label>
                    </div>


                </div>



                <div className='PriceList-Informationnn'>
                    <div className="PriceList-DeliveryAddress">
                        <div className='PriceList-form'>
                            <h3>Delivery Information Form</h3>

                            <div className='PriceList-input'>
                                <label htmlFor="pickupPoint">Pick-up</label>
                                <textarea type="text" id="pickupPoint" name="pickupPoint" placeholder="From" />
                            </div>
                            <div className='PriceList-input'>
                                <label htmlFor="deliveryPoint">Destination</label>
                                <textarea type="text" id="deliveryPoint" name="deliveryPoint" placeholder="To" />
                                
                            </div>
                        </div>
                    </div>

                    <div className="PriceList-DeliveryTypes">
                        <div className="PriceList-paymentmethodss">
                            Delivery Categories
                        </div>
                        <div className="PriceList-line"></div>
                        <div className="PriceList-message">
                            🚚Customer is our Core Priority🚚 <br></br>
                            We could not step in operation process smoothly <br></br>without you❤️
                        </div>

                        <div className="PriceList-Delivery">
                            <div className='PriceList-Delivery-map'>
                                <label>
                                    <input type="radio" name="Delivery" />
                                    <h4>Standard Delivery</h4>
                                    <p>300.000 vnđ</p>
                                </label>
                            </div>
                            <div className='PriceList-Delivery-map'>
                                <label>
                                    <input type="radio" name="Delivery" />
                                    <h4>Express Delivery</h4>
                                    <p>850.000 vnđ</p>
                                </label>
                            </div>
                        </div>
                    </div>


                </div>

                <Link to='/view'>
                    <div className="PriceList-buttonn">
                        <button type='submit'>Order Completion</button>
                    </div>
                </Link>

            </div>

        </>

    );
}

export default PriceList


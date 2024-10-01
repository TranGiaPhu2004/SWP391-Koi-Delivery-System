import { useState } from 'react'

import track1 from '../assets/image/track1.png'
import track2 from '../assets/image/track2.png'
import track3 from '../assets/image/track3.png'
import track4 from '../assets/image/track4.png'
import track5 from '../assets/image/track5.png'


import './OrderDeliveryStatus.css'
function OrderDeliveryStatus() {


    const [isObvious, setIsObvious] = useState(false);
    const [isObvious1, setIsObvious1] = useState(false);
    const [isObvious2, setIsObvious2] = useState(false);
    const [isObvious3, setIsObvious3] = useState(false);
    const [isObvious4, setIsObvious4] = useState(false);
    const handleRadioChange = () => {
        setIsObvious(!isObvious);
    }
    const handleRadioChange1 = () => {
        setIsObvious1(!isObvious1);
    }

    const handleRadioChange2 = () => {
        setIsObvious2(!isObvious2);
    }
    const handleRadioChange3 = () => {
        setIsObvious3(!isObvious3);
    }
    const handleRadioChange4 = () => {
        setIsObvious4(!isObvious4);
    }
    return (
        <div className="OrderDeliveryStatus-main-tracking">
            <div className="OrderDeliveryStatus-header-tracking">
                <p>DELIVERY STATUS</p>
            </div>

            <div className='OrderDeliveryStatus-tracking-order'>
                <div className='OrderDeliveryStatus-tracking'>
                    <img className={`pic ${isObvious ? 'active' : 'blurred'}`} src={track1} alt="" />
                    <p>Order Received</p>
                    <label htmlFor="">Your order has been received
                        by your courier partner</label>
                    <br />
                    <input type="radio" name="payment" value="cash"
                        onChange={handleRadioChange}
                    />
                </div>
                <div className='OrderDeliveryStatus-tracking1'>
                    <img className={`pic ${isObvious1 ? 'active' : 'blurred'}`} src={track2} alt="" />
                    <p>Order Picked</p>
                    <label htmlFor="">Your order has been picked
                        up by your courier partner</label>
                    <br />
                    <input type="radio" name="payment" value="cash"
                        onChange={handleRadioChange1}
                    />
                </div>
                <div className='OrderDeliveryStatus-tracking2'>
                    <img className={`pic ${isObvious2 ? 'active' : 'blurred'}`} src={track3} alt="" />

                    <p>Order In Transit</p>
                    <label htmlFor="">Your order is on it’s way
                        to your customer’s address</label>
                    <br />
                    <input type="radio" name="payment" value="cash"
                        onChange={handleRadioChange2}
                    />
                </div>
                <div className='OrderDeliveryStatus-tracking3'>
                    <img className={`pic ${isObvious3 ? 'active' : 'blurred'}`} src={track4} alt="" />
                    <p>Out For Delivery</p>
                    <label htmlFor="">The courier executive is on its way
                        to deliver the order at your
                        customer’s doorstep</label>
                    <br />
                    <input type="radio" name="payment" value="cash"
                        onChange={handleRadioChange3}
                    />


                </div>
                <div className='OrderDeliveryStatus-tracking4'>
                    <img className={`pic ${isObvious4 ? 'active' : 'blurred'}`} src={track5} alt="" />

                    <p>Reached Destination</p>
                    <label className='info' htmlFor="">Your order has reached
                        your customer’s city</label>
                    <br />
                    <input type="radio" name="payment" value="cash"
                        onChange={handleRadioChange4}
                    />
                </div>
            </div>

            <div className="OrderDeliveryStatus-submit">
                <button>Submit</button>
            </div>
        </div>

    );
}

export default OrderDeliveryStatus
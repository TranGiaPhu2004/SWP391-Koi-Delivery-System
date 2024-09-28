

import track1 from '../assets/image/track1.png'
import track2 from '../assets/image/track2.png'
import track3 from '../assets/image/track3.png'
import track4 from '../assets/image/track4.png'
import track5 from '../assets/image/track5.png'


import './OrderInformationTracking.css'
function OrderInformationTracking() {
    return (
        <div className="main-tracking">
            <div className="header-tracking">
                <p>ORDER TRACKING</p>
            </div>

            <div className='tracking-order'>
                <div className='tracking'>
                    <img className='pic' src={track1} alt="" />
                    <p>Order Received</p>
                    <label htmlFor="">Your order has been received
                        by your courier partner</label>
                </div>
                <div className='tracking'>
                    <img className='pic' src={track2} alt="" />
                    <p>Order Picked</p>
                    <label htmlFor="">Your order has been picked
                        up by your courier partner</label>
                </div>
                <div className='tracking'>
                    <img className='pic' src={track3} alt="" />
                    <p>Order In Transit</p>
                    <label htmlFor="">Your order is on it’s way
                        to your customer’s address</label>
                </div>
                <div className='tracking'>
                    <img className='pic' src={track4} alt="" />
                    <p>Out For Delivery</p>
                    <label htmlFor="">The courier executive is on its way
                        to deliver the order at your
                        customer’s doorstep</label>
                </div>
                <div className='tracking'>
                    <img className='pic' src={track5} alt="" />
                    <p>Reached Destination</p>
                    <label className='info' htmlFor="">Your order has reached
                        your customer’s city</label>
                </div>
            </div>
        </div>

    );
}

export default OrderInformationTracking
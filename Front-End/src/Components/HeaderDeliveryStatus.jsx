

import './HeaderDeliveryStatus.css'; // CSS file for header styling

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi1 from '../assets/image/pickoi1.png'
import cart from '../assets/image/shoppingcart.png'
function HeaderDeliveryStatus() {

    return (
        <div className='main'>

            <div className="header">
                <img className="koi-logo" src={koi1} alt="koi pic" />
                <div className="express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="user-actions">
                    <a href='#'><img className="user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="choice">
                <ul className='list'>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/tracking">Delivery Tracking</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/news">News</a></li>
                </ul>
            </div>

            <div className='line'></div>
        </div>



    );
}

export default HeaderDeliveryStatus;
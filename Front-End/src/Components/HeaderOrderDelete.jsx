

import './HeaderOrderDelete.css'; 

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi1 from '../assets/image/pickoi1.png'
import cart from '../assets/image/shoppingcart.png'
function HeaderOrderDelete() {

    return (
        <div className='HeaderOrderDelete-main'>

            <div className="HeaderOrderDelete-header">
                <img className="HeaderOrderDelete-koi-logo" src={koi1} alt="koi pic" />
                <div className="HeaderOrderDelete-express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="HeaderOrderDelete-user-actions">
                    <a href='#'><img className="HeaderOrderDelete-user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="HeaderOrderDelete-cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="HeaderOrderDelete-choice">
                <ul className='HeaderOrderDelete-list'>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/DeliveryTracking">Order Tracking</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/news">News</a></li>
                </ul>
            </div>

            <div className='HeaderOrderDelete-line'></div>
        </div>



    );
}

export default HeaderOrderDelete;

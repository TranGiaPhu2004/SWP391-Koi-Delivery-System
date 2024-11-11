

import './HeaderOrderTracking.css'; // CSS file for header styling

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi2 from '../assets/image/pickoi2.png'
import cart from '../assets/image/shoppingcart.png'
function HeaderOrderTracking() {

    return (
        <div className='HeaderOrderTracking-main'>

            <div className="HeaderOrderTracking-header">
                <img className="HeaderOrderTracking-koi-logo" src={koi2} alt="koi pic" />
                <div className="HeaderOrderTracking-express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="HeaderOrderTracking-user-actions">
                    <a href='#'><img className="HeaderOrderTracking-user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="HeaderOrderTracking-cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="HeaderOrderTracking-choice">
                <ul className='HeaderOrderTracking-list'>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/news">News</a></li>
                </ul>
            </div>

            <div className='HeaderOrderTracking-line'></div>
        </div>



    );
}

export default HeaderOrderTracking;

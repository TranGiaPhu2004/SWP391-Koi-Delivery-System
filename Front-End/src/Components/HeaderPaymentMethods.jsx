

import './HeaderPaymentMethods.css'; 

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi1 from '../assets/image/pickoi1.png'
import cart from '../assets/image/shoppingcart.png'
function HeaderPaymentMethods() {

    return (
        <div className='HeaderPaymentMethods-main'>

            <div className="HeaderPaymentMethods-header">
                <img className="HeaderPaymentMethods-koi-logo" src={koi1} alt="koi pic" />
                <div className="HeaderPaymentMethods-express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="HeaderPaymentMethods-user-actions">
                    <a href='#'><img className="HeaderPaymentMethods-user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="HeaderPaymentMethods-cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="HeaderPaymentMethods-choice">
                <ul className='HeaderPaymentMethods-list'>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/tracking">Delivery Tracking</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/news">News</a></li>
                </ul>
            </div>

            <div className='HeaderPaymentMethods-line'></div>
        </div>



    );
}

export default HeaderPaymentMethods;

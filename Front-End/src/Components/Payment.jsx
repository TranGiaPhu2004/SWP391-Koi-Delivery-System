

import './Payment.css';

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi from '../assets/image/koi.png'
import cart from '../assets/image/shoppingcart.png'
function Payment() {

    return (
        <div className='Payment-main'>

            <div className="Payment-header">
                <img className="Payment-koi-logo" src={koi} alt="koi pic" />
                <div className="Payment-express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="Payment-user-actions">
                    <a href='#'><img className="Payment-user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="Payment-cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="Payment-choice">
                <ul className='Payment-list'>
                    <li className='headerPaymentList' ><a href="/about">About us</a></li>
                    <li className='headerPaymentList'><a href="/">Home</a></li>
                    <li className='headerPaymentList'><a href="/services">Services</a></li>
                    <li className='headerPaymentList'><a href="/contact">Contact</a></li>
                    <li className='headerPaymentList'><a href="/news">News</a></li>
                </ul>
            </div>

            <div className='Payment-line'></div>
        </div>



    );
}

export default Payment;

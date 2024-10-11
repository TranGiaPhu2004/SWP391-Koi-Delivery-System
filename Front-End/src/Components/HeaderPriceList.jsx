


import './HeaderPriceList.css';

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi from '../assets/image/Koi.png'
import cart from '../assets/image/shoppingcart.png'
const HeaderPriceList = () => {
    return (
        <div className='HeaderPriceList-main'>

            <div className="HeaderPriceList-header">
                <img className="HeaderPriceList-koi-logo" src={koi} alt="koi pic" />
                <div className="HeaderPriceList-express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="HeaderPriceList-user-actions">
                    <a href='#'><img className="HeaderPriceList-user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="HeaderPriceList-cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="HeaderPriceList-choice">
                <ul className='HeaderPriceList-list'>
                    <li  className='headerList' ><a href="/about">About us</a></li>
                    <li className='headerList'><a href="/">Home</a></li>
                    <li className='headerList'><a href="/services">Services</a></li>
                    <li className='headerList'><a href="/tracking">Delivery Tracking</a></li>
                    <li className='headerList'><a href="/contact">Contact</a></li>
                    <li className='headerList'><a href="/news">News</a></li>
                </ul>
            </div>

            <div className='HeaderPriceList-line'></div>
        </div>
    );
}

export default HeaderPriceList
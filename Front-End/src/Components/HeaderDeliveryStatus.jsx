

import './HeaderDeliveryStatus.css'; // CSS file for header styling

import pic from '../assets/image/KoiExpress.png'
import user from '../assets/image/user.png'
import koi1 from '../assets/image/pickoi1.png'
import cart from '../assets/image/shoppingcart.png'
function HeaderDeliveryStatus() {

    return (
        <div className='HeaderDeliveryStatus-main'>

            <div className="HeaderDeliveryStatus-header">
                <img className="HeaderDeliveryStatus-koi-logo" src={koi1} alt="koi pic" />
                <div className="HeaderDeliveryStatus-express-logo">
                    <img src={pic} alt="koi express" />
                    <span>KOIEXPRESS</span>
                </div>
                <div className="HeaderDeliveryStatus-user-actions">
                    <a href='#'><img className="HeaderDeliveryStatus-user-icon" src={user} alt="user" /></a>
                    <a href='#'><img className="HeaderDeliveryStatus-cart-icon" src={cart} alt="cart" /></a>
                </div>
            </div>

            <div className="HeaderDeliveryStatus-choice">
                <ul className='HeaderDeliveryStatus-list'>
                    
                    <li><a href="/">Home</a></li>
                    
                </ul>
            </div>

            <div className='HeaderDeliveryStatus-line'></div>
        </div>



    );
}

export default HeaderDeliveryStatus;

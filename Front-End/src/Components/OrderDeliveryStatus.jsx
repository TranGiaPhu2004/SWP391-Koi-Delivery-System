import { useState } from 'react';
import axios from 'axios';
import track1 from '../assets/image/track1.png';
import track2 from '../assets/image/track2.png';
import track3 from '../assets/image/track3.png';
import track4 from '../assets/image/track4.png';
import track5 from '../assets/image/track5.png';
import './OrderDeliveryStatus.css';

function OrderDeliveryStatus() {
    const [status, setStatus] = useState(0);
    const [orderId, setOrderId] = useState(''); // New state for orderId
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!orderId) {
            setError('Please enter a valid Order ID.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const statusId = status; // Use the status state as statusId
            const response = await axios.put(`http://localhost:8080/orders/${orderId}/status/${statusId+1}`);

            console.log('Order status updated successfully:', response.data);
            alert('Order status updated successfully!');
        } catch (err) {
            console.error('Error updating order status:', err);
            setError('Failed to update order status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="OrderDeliveryStatus-main-tracking">
            <div className="OrderDeliveryStatus-header-tracking">
                <p>DELIVERY STATUS</p>
            </div>

            <div className="OrderDeliveryStatus-order-id">
                <label htmlFor="orderId">Order ID:</label>
                <input 
                    type="text" 
                    id="orderId" 
                    value={orderId} 
                    onChange={(e) => setOrderId(e.target.value)} 
                    placeholder="Enter your order ID"
                />
            </div>

            <div className='OrderDeliveryStatus-tracking-order'>
                {[track1, track2, track3, track4, track5].map((track, index) => (
                    <div key={index} className={`OrderDeliveryStatus-tracking${index}`}>
                        <img className={`pic ${status >= index ? 'active' : 'blurred'}`} src={track} alt="" />
                        <p>{["Order Received", "Order Picked", "Order In Transit", "Out For Delivery", "Reached Destination"][index]}</p>
                        <label>
                            <input 
                                type="radio" 
                                name="status" 
                                value={index} 
                                checked={status === index} 
                                onChange={() => setStatus(index)} 
                            />
                            {`Your order is currently ${["received", "picked", "in transit", "out for delivery", "at destination"][index]}.`}
                        </label>
                    </div>
                ))}
            </div>

            <div className="OrderDeliveryStatus-submit">
                <button onClick={handleSubmit} disabled={loading || !orderId}>
                    {loading ? 'Updating...' : 'Submit'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default OrderDeliveryStatus;

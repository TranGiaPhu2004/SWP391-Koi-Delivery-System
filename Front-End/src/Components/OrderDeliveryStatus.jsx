import { useEffect, useState } from 'react';
import track1 from '../assets/image/track1.png';
import track2 from '../assets/image/track2.png';
import track3 from '../assets/image/track3.png';
import track4 from '../assets/image/track4.png';
import track5 from '../assets/image/track5.png';
import './OrderDeliveryStatus.css';

function OrderDeliveryStatus() {
    const [status, setStatus] = useState(0);
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchOrderStatus = async () => {
        if (!orderId) {
            setError('Please enter a valid Order ID.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:8080/orders/${orderId}/status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order status.');
            }

            const data = await response.json();
            console.log('Received data:', data); // Kiểm tra dữ liệu nhận được từ API
            const statusId = data.orderStatusID-1; // Lấy orderStatusID từ phản hồi
            setStatus(statusId); // Cập nhật trạng thái đơn hàng

        } catch (err) {
            console.error('Error fetching order status:', err);
            setError('Failed to fetch order status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!orderId) {
            setError('Please enter a valid Order ID.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const statusId = status+1;
            const response = await fetch(`http://localhost:8080/orders/${orderId}/status/${statusId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update order status.');
            }

            const data = await response.json();
            console.log('Order status updated successfully:', data);
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
                <button onClick={fetchOrderStatus} disabled={loading || !orderId}>
                    {loading ? 'Loading...' : 'Check Status'}
                </button>
            </div>

            <div className='OrderDeliveryStatus-tracking-order'>
                {[track1, track2, track3, track4, track5].map((track, index) => (
                    <div key={index} className={`OrderDeliveryStatus-tracking${index}`}>
                        <img 
                            className={`pic ${status >= index ? 'active' : 'blurred'}`} 
                            src={track} 
                            alt={`Status ${index}`} 
                        />
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

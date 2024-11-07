import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import track1 from '../assets/image/track1.png';
import track2 from '../assets/image/track2.png';
import track3 from '../assets/image/track3.png';
import track4 from '../assets/image/track4.png';
import track5 from '../assets/image/track5.png';
import './OrderDeliveryStatus.css';

function OrderInformationTracking() {
    const { orderId } = useParams(); // Get orderId from the URL parameter
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (orderId) {
            fetchOrderStatus();
        }
    }, [orderId]);

    const fetchOrderStatus = async () => {
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
            console.log('Received data:', data); // Check the data received from the API
            const statusId = data.orderStatusID - 1; // Adjust the status to match the index
            setStatus(statusId);

        } catch (error) {
            console.error('Error fetching order status:', error);
            setError('Failed to fetch order status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const statusImages = [track1, track2, track3, track4, track5];
    const statusTexts = ["Order Received", "Order Picked", "Order In Transit", "Out For Delivery", "Reached Destination"];
    const statusDescriptions = ["received", "picked", "in transit", "out for delivery", "at destination"];

    return (
        <div className="OrderDeliveryStatus-main-tracking">
            <div className="OrderDeliveryStatus-header-tracking">
                <p>DELIVERY STATUS</p>
            </div>

            <div className="OrderDeliveryStatus-order-id">
                <label htmlFor="orderId">Current Order ID:</label>
                <input 
                    type="text" 
                    id="orderId" 
                    value={orderId} 
                    readOnly 
                />
            </div>

            <div className='OrderDeliveryStatus-tracking-order'>
                <div className={`OrderDeliveryStatus-tracking${status}`}>
                    <img 
                        className="pic active" 
                        src={statusImages[status]} 
                        alt={`Status ${status}`} 
                    />
                    <p>{statusTexts[status]}</p>
                    <p>Your order is currently {statusDescriptions[status]}.</p>
                </div>
            </div>
        </div>
    );
}

export default OrderInformationTracking;

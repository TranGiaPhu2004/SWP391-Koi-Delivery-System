import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import track1 from '../../assets/image/track1.png';
import track2 from '../../assets/image/track2.png';
import track3 from '../../assets/image/track3.png';
import track4 from '../../assets/image/track4.png';
import track5 from '../../assets/image/track5.png';
import '../../Components/OrderDeliveryStatus.css';
import { Link, useNavigate } from "react-router-dom";
import HeaderDeliveryStatus from '../../Components/HeaderDeliveryStatus';
import FooterDeliveryStatus from '../../Components/FooterDeliveryStatus';

function DeliveryStatusD() {
    const { orderId } = useParams(); // Get orderId from the URL parameter
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

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

        } catch (err) {
            console.error('Error fetching order status:', err);
            setError('Failed to fetch order status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const statusId = status + 1;
            const response = await fetch(`http://localhost:8080/orders/${orderId}/status/${statusId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update order status.');
            }else {
                const data = await response.json();
                console.log("Order status updated successfully:", data);
                setAlertMessage("Order status updated successfully!");
                setShowAlert(true);
                
              }
            } catch (err) {
              console.error("Error updating order status:", err);
        
              setAlertMessage("The order delivery status is not change!");
              setShowAlert(true);
            } finally {
              setLoading(false);
            }
    };

    return (
        <>
        <HeaderDeliveryStatus/>
        
        
        
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
                    readOnly 
                />
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
            {showAlert && (
        <div className="custom-alert">
          <span>{alertMessage}</span>
          {/* Khi nhấn nút "Close", sẽ tắt alert và chuyển hướng */}
          <button
            onClick={() => {
              setShowAlert(false); // Tắt alert
              navigate("/DeliveryViewOrder"); // Chuyển hướng sau khi tắt alert
            }}
          >
            Close
          </button>
        </div>
      )}
        </div>
        <FooterDeliveryStatus/>
        </>
    );
    
}

export default DeliveryStatusD;

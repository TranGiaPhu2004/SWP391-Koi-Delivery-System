import React, { useState, useEffect } from 'react';
import track1 from '../assets/image/track1.png';
import track2 from '../assets/image/track2.png';
import track3 from '../assets/image/track3.png';
import track4 from '../assets/image/track4.png';
import track5 from '../assets/image/track5.png';
import './OrderInformationTracking.css';

function OrderInformationTracking() {
    const [orderStatus, setOrderStatus] = useState(null); // Trạng thái đơn hàng cụ thể
    const [orderId, setOrderId] = useState(''); // Để người dùng nhập mã đơn hàng
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    // Hàm để lấy trạng thái đơn hàng khi người dùng nhấn "Check Status"
    const fetchOrderStatus = async () => {
        if (!orderId) {
            setError("Please enter a valid Order ID.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:8080/orders/${orderId}/status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Sử dụng token nếu cần
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrderStatus(data); // Lưu trạng thái đơn hàng
            } else {
                setError("Failed to fetch order status.");
            }
        } catch (error) {
            setError("Error fetching order status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Map giữa tên trạng thái và hình ảnh tương ứng
    const statusImages = {
        "Order Received": track1,
        "Order Picked": track2,
        "Order In Transit": track3,
        "Out For Delivery": track4,
        "Reach Destination": track5
    };

    return (
        <div className="OrderInformationTracking-main-tracking">
            <div className="OrderInformationTracking-header-tracking">
                <p>ORDER TRACKING</p>
            </div>

            <div className="OrderInformationTracking-order-id">
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

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className='OrderInformationTracking-tracking-order'>
                {orderStatus ? (
                    <div className='OrderInformationTracking-tracking'>
                        <img 
                            className='OrderInformationTracking-pic' 
                            src={statusImages[orderStatus.statusName] || track1} 
                            alt={orderStatus.statusName} 
                        />
                        <p>{orderStatus.statusName}</p>
                        <label>
                            {getStatusDescription(orderStatus.statusName)}
                        </label>
                    </div>
                ) : (
                    <p>No order status available</p>
                )}
            </div>
        </div>
    );
}

// Hàm để trả về mô tả chi tiết của từng trạng thái
function getStatusDescription(status) {
    switch (status) {
        case "Order Received":
            return "Your order has been received by your courier partner";
        case "Order Picked":
            return "Your order has been picked up by your courier partner";
        case "Order In Transit":
            return "Your order is on its way to your customer’s address";
        case "Out For Delivery":
            return "The courier executive is on its way to deliver the order at your customer’s doorstep";
        case "Reach Destination":
            return "Your order has reached your customer’s city";
        default:
            return "Unknown status";
    }
}

export default OrderInformationTracking;

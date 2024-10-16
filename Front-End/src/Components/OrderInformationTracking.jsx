import React, { useState, useEffect } from 'react';
import track1 from '../assets/image/track1.png';
import track2 from '../assets/image/track2.png';
import track3 from '../assets/image/track3.png';
import track4 from '../assets/image/track4.png';
import track5 from '../assets/image/track5.png';
import './OrderInformationTracking.css';

function OrderInformationTracking() {
    const [orders, setOrders] = useState([]); // Khởi tạo với mảng rỗng để tránh lỗi undefined
    const [error, setError] = useState("");

    useEffect(() => {
        // Hàm để lấy danh sách đơn hàng từ API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8080/orderStatus/allStatus', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: `Bearer ${token}`, // Nếu cần token
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders || []); // Đảm bảo rằng orders luôn là một mảng
                } else {
                    setError("Failed to fetch orders.");
                }
            } catch (error) {
                setError("Error fetching orders. Please try again.");
            }
        };

        fetchOrders();
    }, []);

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

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className='OrderInformationTracking-tracking-order'>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.orderID} className='OrderInformationTracking-tracking'>
                            <img 
                                className='OrderInformationTracking-pic' 
                                src={statusImages[order.status] || track1} 
                                alt={order.status} 
                            />
                            <p>{order.status}</p>
                            <label htmlFor="">
                                {getStatusDescription(order.status)}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No orders available</p>
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

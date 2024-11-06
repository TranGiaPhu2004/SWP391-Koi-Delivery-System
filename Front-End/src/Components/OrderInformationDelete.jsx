import './OrderInformationDelete.css';
import { useLocation, useNavigate } from 'react-router-dom';  // Use navigate to redirect after deletion
import { useState } from 'react';  // To handle loading and error states

const OrderInformationDelete = () => {
    const location = useLocation();
    const navigate = useNavigate();  // To redirect after deletion
    const createdOrderID = localStorage.getItem("orderID");  // Get order ID from localStorage

    const { orderData } = location.state || {};
    const {
        totalPrice = 0,
        startPlace = 'N/A',
        endPlace = 'N/A',
        deliveryID = 1
    } = orderData || {};

    const [isLoading, setIsLoading] = useState(false);  // To show a loading state
    const [error, setError] = useState(null);  // To display error messages

    const deliveryCost = deliveryID === 1 ? 300000 : 850000;

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const totalWithoutDelivery = totalPrice - deliveryCost;

    // Function to handle the order deletion
    const handleDelete = async () => {
        if (!createdOrderID) {
            setError('Order ID not found in localStorage.');
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (!confirmDelete) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/orders/${createdOrderID}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
            });

            if (response.ok) {
                alert('Order deleted successfully');
                // After successful deletion, redirect to another page
                navigate('/HomeCus');  // Redirect to the orders page or another relevant page
            } else {
                throw new Error('Failed to delete the order');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="OrderInformationDelete-order-information">
                <div className='OrderInformationDelete-order-details'>
                    <h2>Order Information</h2>
                    <div className='OrderInformationDelete-line'></div>

                    <p>Total order: {formatCurrency(totalWithoutDelivery)}</p>
                    <p>Delivery Cost: {formatCurrency(deliveryCost)}</p>
                    <span>Total Amount: {formatCurrency(totalPrice)}</span>

                    <p>Sent from: {startPlace}</p>
                    <p>Delivery to: {endPlace}</p>

                    <p>By pressing the button, I agree to the <a href="#">Terms and Conditions.</a></p>
                    
                    {error && <p className="error-message">{error}</p>}  {/* Show error if any */}
                    {isLoading && <p>Deleting order...</p>}  {/* Show loading indicator */}

                    <div className="OrderInformationDelete-text">
                        Do you really want to delete this order?
                    </div>
                    
                    <button
                        className='OrderInformationDelete-delete_button'
                        onClick={handleDelete}
                        disabled={isLoading}  // Disable button during API call
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderInformationDelete;

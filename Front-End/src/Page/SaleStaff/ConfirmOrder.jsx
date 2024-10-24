import logo from "../../assets/image/Logo.png";
import avatar from "../../assets/image/avatar.png";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import necessary hooks
import "../../Components/ConfirmOrder.css";

const ConfirmOrder = () => {
  const [orders, setOrders] = useState([]); // State to store the order data
  const navigate = useNavigate();

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/orders") // API to get the list of orders
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Handle order confirmation
  const handleConfirmOrder = (orderId) => {
    fetch(`http://localhost:8080/orders/${orderId}/confirm`, {
      method: "POST", // assuming it's a POST request to confirm
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order confirmed:", data);
        // Optionally, redirect or refresh the page
        navigate(`/ConfirmOrder/${orderId}`);
      })
      .catch((error) => console.error("Error confirming order:", error));
  };

  // Handle order rejection
  const handleRejectOrder = (orderId) => {
    fetch(`http://localhost:8080/orders/${orderId}/reject`, {
      method: "POST", // assuming it's a POST request to reject
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order rejected:", data);
        // Optionally, update the state or refresh the page
      })
      .catch((error) => console.error("Error rejecting order:", error));
  };

  return (
    <div className="ConfirmOrder-Container">
      <aside className="ConfirmOrder-sidebar">
        <div className="ConfirmOrder-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ConfirmOrder-nav">
          <ul className="ConfirmOrder-nav-list">
            <li className="ConfirmOrder-nav-item">
              <Link to="/ViewOrder">View Order</Link>
            </li>
            <li className="ConfirmOrder-nav-item">
              <Link to="/ConfirmOrder">Confirm Order</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ConfirmOrder-Content">
        <header className="ConfirmOrder-header">
          <div className="Confirm-user-info">
            <img src={avatar} alt="User Avatar" className="Confirm-avatar" />
            <div className="Confirm-user-details">
              <h3>User</h3>
              <p>Sales staff</p>
            </div>
          </div>
        </header>

        <div className="ConfirmOrder-Table">
          <h1>Confirm Order From Customer</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Start Place</th>
                <th>End Place</th>
                <th>Phone</th>
                <th>Total Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.StartPlace}</td>
                  <td>{order.Endplace}</td>
                  <td>{order.phone}</td>
                  <td>{order.TotalPrice}</td>
                  <td>
                    <button
                      className="ConfirmOrder-btn"
                      onClick={() => handleConfirmOrder(order.id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="RejectOrder-btn"
                      onClick={() => handleRejectOrder(order.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ConfirmOrder;

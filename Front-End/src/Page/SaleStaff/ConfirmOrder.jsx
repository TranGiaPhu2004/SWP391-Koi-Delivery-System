import React, { useState, useEffect } from "react";
import logo from "../../assets/image/Logo.png";
import avatar from "../../assets/image/avatar.png";
import search from "../../assets/image/search.png";
import salestaff from "../../assets/image/deliveryinsurance.png";
import "../../Components/ManagerCustomer.css";
import LogoutButton from "../../Logout";

const ConfirmOrder = () => {
  const [orders, setOrders] = useState([]);

  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const username = localStorage.getItem("username");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/orders/delivery/null",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        setError("Failed to fetch orders.");
      }
    } catch (error) {
      setError(
        "Error fetching orders. Please check your network and try again."
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // New function to confirm the order
  const handleConfirmOrder = async (orderID) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/orders/${orderID}/confirm`, // Use the correct endpoint
        {
          method: "PUT", // Use PUT to update the order status
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: false }), // Assuming the API needs the status in the body
        }
      );

      if (response.ok) {
        // Refetch orders to update the state
        setAlertMessage("Order ís confirm successfully!");
        setShowAlert(true);
        fetchOrders();
        setTimeout(() => {
          setShowAlert(false);
        }, 2000); // 2000ms = 2 giây
      } else {
        setAlertMessage("Failed to confirm the order");
        setShowAlert(true);
        setError("Failed to confirm the order.");
        setTimeout(() => {
          setShowAlert(false);
        }, 2000); // 2000ms = 2 giây
      }
    } catch (error) {
      setAlertMessage("Order ís confirm successfully!");
      setShowAlert(true);
      fetchOrders();
      setTimeout(() => {
        setShowAlert(false);
      }, 2000); // 2000ms = 2 giây
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderDate.includes(searchQuery)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ManagerOrder-container">
      <aside className="ManagerOrder-sidebar">
        <div className="ManagerOrder-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="ManagerOrder-SaleStaff">
          <img src={salestaff} alt="SaleStaff" />
        </div>

        <LogoutButton />
      </aside>

      <main className="ManagerOrder-main-content">
        <header className="ManagerOrder-header">
          <div className="ManagerOrder-user-info">
            <img
              src={avatar}
              alt="User Avatar"
              className="ManagerOrder-avatar"
            />
            <div className="ManagerOrder-user-details">
              <h3>{username}</h3>
              <p>Sale Staff</p>
            </div>
          </div>
          <div className="ManagerOrder-search-container">
            <input
              type="text"
              placeholder="Search by order date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src={search}
              alt="Search Icon"
              className="ManagerOrder-search-icon"
            />
          </div>
        </header>

        <div className="ManagerOrder-order-management">
          <h1>Order Confirm</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table className="ManagerOrder-order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Start Place</th>
                <th>End Place</th>
                <th>Total Price</th>
                <th>Payment Status</th>
                <th>Action</th> {/* Add new column for actions */}
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.startPlace}</td>
                  <td>{order.endPlace}</td>
                  <td>{order.totalPrice}</td>
                  <td
                    className={
                      order.paymentStatus ? "paid-status" : "unpaid-status"
                    }
                  >
                    {order.paymentStatus ? "Paid" : "Unpaid"}
                  </td>{" "}
                  {/* Display Payment Status */}
                  <td>
                    <button
                      className="ManagerOrder-btn-confirm"
                      onClick={() => handleConfirmOrder(order.orderID)} // Call confirm function
                    >
                      Confirm Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ManagerOrder-pagination">
            {Array.from({
              length: Math.ceil(filteredOrders.length / ordersPerPage),
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => paginate(idx + 1)}
                className={currentPage === idx + 1 ? "active" : ""}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          {showAlert && (
            <div className="custom-alert">
              <span>{alertMessage}</span>
              {/* Khi nhấn nút "Close", sẽ tắt alert và chuyển hướng */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConfirmOrder;

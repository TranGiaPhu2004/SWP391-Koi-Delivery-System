import React, { useState, useEffect } from "react";
import logo from "../assets/image/Logo.png";
import avatar from "../assets/image/avatar.png";
import search from "../assets/image/search.png";
import "./ManagerOrder.css";
import LogoutButton from "../Logout";
import { Link, useNavigate } from "react-router-dom";

const ManagerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [toggleAction, setToggleAction] = useState({}); // New state to track toggle status for each order
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [ordersPerPage] = useState(10); // Number of orders per page
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/admin/allOrder", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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

    fetchOrders();
  }, []);

  // Function to handle navigation to the OrderDeliveryStatus page
  const handleViewDeliveryStatus = (orderID) => {
    navigate(`/DeliveryStatus/${orderID}`);
  };

  // Function to delete an order
  const handleDeleteOrder = async (orderID) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      `Are you sure you want to delete order ID: ${orderID}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/orders/${orderID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // If delete is successful, filter out the deleted order from the state
        setOrders(orders.filter((order) => order.orderID !== orderID));
        setAlertMessage(`Order ID: ${orderID} has been deleted successfully.`);
        setShowAlert(true);
      } else {
        setError("Failed to delete the order.");
      }
    } catch (error) {
      setError(
        "Error deleting the order. Please check your network and try again."
      );
    }
  };

  // Function to toggle between delete and update delivery status for each order
  const handleToggleAction = (orderID) => {
    setToggleAction((prevToggleAction) => ({
      ...prevToggleAction,
      [orderID]: !prevToggleAction[orderID], // Toggle between true and false for each order
    }));
  };

  // Filter orders based on the search query (search by order date)
  const filteredOrders = orders.filter((order) =>
    order.orderDate.includes(searchQuery)
  );

  // Get current orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ManagerOrder-container">
      <aside className="ManagerOrder-sidebar">
        <div className="ManagerOrder-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ManagerOrder-nav">
          <ul className="ManagerOrder-nav-list">
          <li className="ManagerCustomer-nav-item">
              <Link to="/Manager">Account Management</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/PriceManager">Price Manager</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/ManagerOrder">Order Manager</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/Dashboard" >Daily Revenue Dash Board</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/DashboardM" >Monthly Revenue Dash Board</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/DashboardY" >Yearly Revenue Dash Board</Link>
            </li>
          </ul>
        </nav>
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
              <p>Manager</p>
            </div>
          </div>
          <div className="ManagerOrder-search-container">
            <input
              type="text"
              placeholder="Search by order date..."
              value={searchQuery} // Bind searchQuery to the input field
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
            />
            <img
              src={search}
              alt="Search Icon"
              className="ManagerOrder-search-icon"
            />
          </div>
        </header>

        <div className="ManagerOrder-order-management">
          <h1>Order Management</h1>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderID}
                className={order.orderStatus === 5 ? "highlight-row" : ""}>

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
                  </td>

                  <td>
                    <div className="ManagerOrder-detail-buttons">
                      {/* Toggle button to switch between actions */}
                      <button
                        className="ManagerOrder-btn-toggle"
                        onClick={() => handleToggleAction(order.orderID)}
                      >
                        {toggleAction[order.orderID] ? "Change to Update" : "Change to Delete"}
                      </button>

                      {/* Conditionally render the appropriate button based on toggleAction state */}
                      {toggleAction[order.orderID] ? (
                        <button
                          className="ManagerOrder-btn-delete"
                          onClick={() => handleDeleteOrder(order.orderID)}
                        >
                          Delete Order
                        </button>
                      ) : (
                        <button
                          className="ManagerOrder-btn-view-status1"
                          onClick={() =>
                            handleViewDeliveryStatus(order.orderID)
                          }
                        >
                          Update Delivery Status
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
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
              <button
                onClick={() => {
                  setShowAlert(false); // Tắt alert
                  navigate("/ManagerOrder"); // Chuyển hướng sau khi tắt alert
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManagerOrder;

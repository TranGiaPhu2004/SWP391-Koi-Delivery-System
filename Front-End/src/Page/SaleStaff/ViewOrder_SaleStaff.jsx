import React, { useState, useEffect } from 'react';
import logo from '../../assets/image/Logo.png';
import avatar from '../../assets/image/avatar.png';
import search from '../../assets/image/search.png';
import Koi from '../../assets/image/Koi.png'
import EditIcon from '../../assets/image/edit.svg';
import DeleteIcon from '../../assets/image/delete.svg';
import ArrowDown from '../../assets/image/arrow-down.svg';
import ArrowUp from '../../assets/image/arrow-up.svg';
import '../../Components/ManagerCustomer.css';
import LogoutButton from "../../Logout";
import { Link, useNavigate } from "react-router-dom";

const CustomerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [ordersPerPage] = useState(10); // Number of orders per page

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/users/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (error) {
        setError('Error fetching orders. Please check your network and try again.');
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // Function to handle navigation to the OrderDeliveryStatus page
  const handleViewDeliveryStatus = (orderID) => {
    navigate(`/DeliveryTracking/${orderID}`);
  };

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
        <div className="ManagerOrder-koi">
        <img src={Koi} alt="Koi" />
        </div>
        
        <LogoutButton />
        
      </aside>

      <main className="ManagerOrder-main-content">
        <header className="ManagerOrder-header">
          <div className="ManagerOrder-user-info">
            <img src={avatar} alt="User Avatar" className="ManagerOrder-avatar" />
            <div className="ManagerOrder-user-details">
              <h3>Vũ Đức Mạnh</h3>
              <p>Customer</p>
            </div>
          </div>
          <div className="ManagerOrder-search-container">
            <input
              type="text"
              placeholder="Search by order date..."
              value={searchQuery} // Bind searchQuery to the input field
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
            />
            <img src={search} alt="Search Icon" className="ManagerOrder-search-icon" />
          </div>
        </header>

        <div className="ManagerOrder-order-management">
          <h1>Order List</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <table className="ManagerOrder-order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Start Place</th>
                <th>End Place</th>
                <th>Total Price</th>
                <th>Payment Status</th> {/* New Payment Status Column */}
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                
                  <tr key={order.orderID} onClick={() => toggleOrder(order.orderID)}>
                    <td>{order.orderID}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.startPlace}</td>
                    <td>{order.endPlace}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.paymentStatus ? 'Paid' : 'Unpaid'}</td> {/* Payment Status displayed here */}
                    <td>
                    <div className="ManagerOrder-detail-buttons">
                            <button 
                              className="ManagerOrder-btn-view-status"
                              onClick={() => handleViewDeliveryStatus(order.orderID)}
                            >
                              View Delivery Status
                            </button>
                            {/* <button className="ManagerOrder-btn-update">
                              <img src={EditIcon} alt="Edit" />
                            </button>
                            <button className="ManagerOrder-btn-delete">
                              <img src={DeleteIcon} alt="Delete" />
                            </button> */}
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
        </div>
      </main>
    </div>
  );
};

export default CustomerOrder;

import React, { useState, useEffect } from 'react';
import logo from '../assets/image/Logo.png';
import avatar from '../assets/image/avatar.png';
import search from '../assets/image/search.png';
import EditIcon from '../assets/image/edit.svg';
import DeleteIcon from '../assets/image/delete.svg';
import ArrowDown from '../assets/image/arrow-down.svg';
import ArrowUp from '../assets/image/arrow-up.svg';
import './ManagerOrder.css';
import LogoutButton from "../Logout";

const ManagerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null); // Trạng thái để theo dõi đơn hàng nào đang được mở rộng
  const [error, setError] = useState("");

  useEffect(() => {
    // Hàm để lấy danh sách đơn hàng từ API
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Nếu API yêu cầu token xác thực
        const response = await fetch('http://localhost:8080/admin/allOrder', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders); // Cập nhật state với danh sách đơn hàng từ API
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (error) {
        setError('Error fetching orders. Please check your network and try again.');
      }
    };

    fetchOrders();
  }, []);

  // Hàm bật/tắt trạng thái mở rộng cho từng order
  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div className="ManagerOrder-container">
      <aside className="ManagerOrder-sidebar">
        <div className="ManagerOrder-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ManagerOrder-nav">
          <ul className="ManagerOrder-nav-list">
            <li className="ManagerOrder-nav-item">Account Management</li>
            <li className="ManagerOrder-nav-item">Price Management</li>
            <li className="ManagerOrder-nav-item">Order Management</li>
            <li className="ManagerOrder-nav-item">Notification</li>
            <li className="ManagerOrder-nav-item">Settings</li>
            <li className="ManagerOrder-nav-item">Account</li>
            <li className="ManagerOrder-nav-item">Help</li>
          </ul>
        </nav>
       <LogoutButton></LogoutButton>
      </aside>

      <main className="ManagerOrder-main-content">
        <header className="ManagerOrder-header">
          <div className="ManagerOrder-user-info">
            <img src={avatar} alt="User Avatar" className="ManagerOrder-avatar" />
            <div className="ManagerOrder-user-details">
              <h3>Vũ Đức Mạnh</h3>
              <p>Manager</p>
            </div>
          </div>
          <div className="ManagerOrder-search-container">
            <input type="text" placeholder="Search..." />
            <img src={search} alt="Search Icon" className="ManagerOrder-search-icon" />
          </div>
        </header>

        <div className="ManagerOrder-order-management">
          <h1>Order Management</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <table className="ManagerOrder-order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Start Place</th>
                <th>End Place</th>
                <th>Total Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order.orderID}>
                  <tr onClick={() => toggleOrder(order.orderID)}>
                    <td>{order.orderID}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.startPlace}</td>
                    <td>{order.endPlace}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      <img 
                        src={expandedOrder === order.orderID ? ArrowUp : ArrowDown} 
                        alt="Toggle" 
                        className="ManagerOrder-toggle-icon" 
                      />
                    </td>
                  </tr>
                  {expandedOrder === order.orderID && (
                    <tr className="ManagerOrder-order-details">
                      <td colSpan="6">
                        <div className="ManagerOrder-order-detail-content">
                          <div>
                            <strong>Customs Image:</strong>
                            <img src={order.customsImageLink} alt="Customs" className="ManagerOrder-customs-image" />
                          </div>
                          <div className="ManagerOrder-detail-buttons">
                            <button className="ManagerOrder-btn-update">
                              <img src={EditIcon} alt="Edit" />
                            </button>
                            <button className="ManagerOrder-btn-delete">
                              <img src={DeleteIcon} alt="Delete" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManagerOrder;

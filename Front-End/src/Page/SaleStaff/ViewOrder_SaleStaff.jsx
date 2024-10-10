import React, { useEffect, useState } from "react";
import logo from "../../assets/image/Logo.png";
import avatar from "../../assets/image/avatar.png";
import search from "../../assets/image/search.png";
import { Link, useNavigate } from "react-router-dom";
import "../../Components/OrderDetail.css";
const ViewOrder_SaleStaff = () => {
  const Order = [
    {
      id: 1,
      Startplace: "Place A",
      Endplace: "Place B",
      OrderDate: "2024-10-01",
      PaymentID: "1",
      DeliveryID: "1",
      ServiceID: "1",
      ttprice: "150",
      userID: "1",
      OrderStatus: "1",
    },
    {
      id: 2,
      Startplace: "Place X",
      Endplace: "Place Y",
      OrderDate: "2024-10-05",
      PaymentID: "2",
      DeliveryID: "2",
      ServiceID: "2",
      ttprice: "200",
      userID: "2",
      OrderStatus: "2",
    },
  ];
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (orderId) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null); // Ẩn chi tiết nếu nhấn lại vào cùng đơn hàng
    } else {
      setSelectedOrder(orderId); // Hiển thị chi tiết đơn hàng
    }
  };
  return (
    <div className="ManagerCustomer-container">
      <aside className="ManagerCustomer-sidebar">
        <div className="ManagerCustomer-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ManagerCustomer-nav">
          <ul className="ManagerCustomer-nav-list">
            <li className="ManagerCustomer-nav-item">View Order</li>
            <li className="ManagerCustomer-nav-item">
              List Order From Customer
            </li>
          </ul>
        </nav>
        <button className="ManagerCustomer-logout">Logout</button>
      </aside>
      <main className="ManagerPrice-main-content">
        <header className="ManagerPrice-header">
          <div className="ManagerPrice-user-info">
            <img
              src={avatar}
              alt="User Avatar"
              className="ManagerPrice-avatar"
            />
            <div className="ManagerPrice-user-details">
              <h3>NAME</h3>
              <p>Sale Staff</p>
            </div>
          </div>
          <div className="ManagerPrice-search-container">
            <input type="text" placeholder="Search..." />
            <img
              src={search}
              alt="Search Icon"
              className="ManagerPrice-search-icon"
            />
          </div>
        </header>
        <div className="ManagerPrice-price-management">
          <h1>Order List</h1>
          <table className="ManagerPrice-price-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TotalPrice</th>
                <th>UserID</th>
                <th>OrderStatus</th>
              </tr>
            </thead>
            <tbody>
              {Order.map((Order) => (
                <React.Fragment key={Order.id}>
                  <tr>
                    <td>{Order.id}</td>
                    <td>{Order.ttprice}</td>
                    <td>{Order.userID}</td>
                    <td>{Order.OrderStatus}</td>
                    <td>
                      <button
                        className={selectedOrder === Order.id}
                        onClick={() => handleViewDetails(Order.id)}
                      >
                        {selectedOrder === Order.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>
                    </td>
                  </tr>
                  {selectedOrder === Order.id && (
                    <tr>
                      <td colSpan="5">
                        <div>
                          <p>Start Place: {Order.Startplace}</p>
                          <p>End Place: {Order.Endplace}</p>
                          <p>Order Date: {Order.OrderDate}</p>
                          <p>Payment ID: {Order.PaymentID}</p>
                          <p>Delivery ID: {Order.DeliveryID}</p>
                          <p>Service ID: {Order.ServiceID}</p>
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

export default ViewOrder_SaleStaff;

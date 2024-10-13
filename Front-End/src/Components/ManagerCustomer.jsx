import React, { useEffect, useState } from "react";
import logo from '../assets/image/Logo.png';
import avatar from '../assets/image/avatar.png';
import search from '../assets/image/search.png';
import { Link, useNavigate } from "react-router-dom";
import './ManagerCustomer.css';

const ManagerCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hàm để lấy danh sách người dùng
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://localhost:8080/admin/allUser", {
          method: "GET",
          headers: {
           
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomers(data); // Cập nhật state với danh sách người dùng
        } else if (response.status === 401) {
          // Token không hợp lệ, điều hướng người dùng về trang đăng nhập
          navigate("/login");
        } else {
          setError("Failed to fetch users.");
        }
      } catch (error) {
        setError("Error fetching users. Please try again.");
      }
    };

    fetchCustomers();
  }, [navigate]);

  return (
    <div className="ManagerCustomer-container">
      <aside className="ManagerCustomer-sidebar">
        <div className="ManagerCustomer-logo">
          <img src={logo} alt="Logo" /> 
        </div>
        <nav className="ManagerCustomer-nav">
          <ul className="ManagerCustomer-nav-list">
            <li className="ManagerCustomer-nav-item">Product Management</li>
            <li className="ManagerCustomer-nav-item">Statistics</li>
            <li className="ManagerCustomer-nav-item">Report</li>
            <li className="ManagerCustomer-nav-item">Notification</li>
            <li className="ManagerCustomer-nav-item">Settings</li>
            <li className="ManagerCustomer-nav-item">Account</li>
            <li className="ManagerCustomer-nav-item">Help</li>
          </ul>
        </nav>
        <button className="ManagerCustomer-logout">Logout</button>
      </aside>

      <main className="ManagerCustomer-main-content">
        <header className="ManagerCustomer-header">
          <div className="ManagerCustomer-user-info">
            <img src={avatar} alt="User Avatar" className="ManagerCustomer-avatar" />
            <div className="ManagerCustomer-user-details">
              <h3>Vũ Đức Mạnh</h3>
              <p>Manager</p>
            </div>
          </div>
          <div className="ManagerCustomer-search-container">
            <input type="text" placeholder="Search..." />
            <img src={search} alt='Search Icon' className="ManagerCustomer-search-icon" />
          </div>
          <div className="ManagerCustomer-add-account">
            <Link to="/AddNewAccount">
              <button className="ManagerCustomer-add-button">+ Add New Account</button>
            </Link>
          </div>
        </header>

        <div className="ManagerCustomer-product-management">
          <h1>Customer Account Management</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <table className="ManagerCustomer-customer-table">
            <thead>
              <tr>
              <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.userID}>
                  <td>{customer.userID}</td>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || 'N/A'}</td>
                  <td>{customer.status || 'Active'}</td>
                  <td>
                    <button className="ManagerCustomer-btn-update">Update</button>
                    <button className="ManagerCustomer-btn-delete">Delete</button>
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

export default ManagerCustomer;

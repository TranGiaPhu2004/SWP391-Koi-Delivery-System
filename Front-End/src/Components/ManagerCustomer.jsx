import React, { useEffect, useState } from "react";
import logo from "../assets/image/Logo.png";
import avatar from "../assets/image/avatar.png";
import search from "../assets/image/search.png";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../Logout";
import "./ManagerCustomer.css";

const ManagerCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  // Pagination states
  
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [ordersPerPage] = useState(12); // Number of orders per page

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Nếu không có token, điều hướng về trang đăng nhập
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetchCustomers();
  }, [navigate]);

  // Hàm để lấy danh sách người dùng
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/admin/allUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  // Hàm để xóa người dùng
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return; // Người dùng đã hủy việc xóa
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Xóa thành công, cập nhật lại danh sách người dùng
        setCustomers(customers.filter((customer) => customer.userID !== id));
      } else {
        setError("Failed to delete user.");
      }
    } catch (error) {
      setError("Error deleting user. Please try again.");
    }
  };

  // Hàm mở form cập nhật với dữ liệu người dùng hiện tại
  const openUpdateForm = (customer) => {
    setSelectedUser(customer);
  };

  // Hàm xử lý cập nhật người dùng
  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/users/${selectedUser.userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: selectedUser.username,
            password: selectedUser.password,
            email: selectedUser.email,
            phonecontact: selectedUser.phonecontact,
          }),
        }
      );

      if (response.ok) {
        fetchCustomers();
        setSelectedUser(null); // Đóng form cập nhật
      } else {
        setError("Failed to update user.");
      }
    } catch (error) {
      setError("Error updating user. Please try again.");
    }
  };

  // Filter customers based on the searchQuery
  const filteredCustomers = customers.filter((customer) =>
    customer.username.toString().includes(searchQuery)
  );

  // Get current orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredCustomers.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ManagerCustomer-container">
      <aside className="ManagerCustomer-sidebar">
        <div className="ManagerCustomer-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ManagerCustomer-nav">
          <ul className="ManagerCustomer-nav-list">
            <li className="ManagerCustomer-nav-item">
              <Link to="/Manager">Account Management</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/PriceManager">Price Manager</Link>
            </li>
            <li className="ManagerCustomer-nav-item">
              <Link to="/ManagerOrder">Order Manager</Link>
            </li>
          </ul>
        </nav>
        <LogoutButton></LogoutButton>
      </aside>

      <main className="ManagerCustomer-main-content">
        <header className="ManagerCustomer-header">
          <div className="ManagerCustomer-user-info">
            <img
              src={avatar}
              alt="User Avatar"
              className="ManagerCustomer-avatar"
            />
            <div className="ManagerCustomer-user-details">
              <h3>Vũ Đức Mạnh</h3>
              <p>Manager</p>
            </div>
          </div>
          <div className="ManagerCustomer-search-container">
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery} // Bind searchQuery to input
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
            <img
              src={search}
              alt="Search Icon"
              className="ManagerCustomer-search-icon"
            />
          </div>
          <div className="ManagerCustomer-add-account">
            <Link to="/AddNewAccount">
              <button className="ManagerCustomer-add-button">
                + Add New Account
              </button>
            </Link>
          </div>
        </header>

        <div className="ManagerCustomer-product-management">
          <h1>Customer Account Management</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          {selectedUser && (
            <div className="ManagerCustomer-update-form">
              <h2>Update User</h2>
              <input
                type="text"
                value={selectedUser.username || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                placeholder="Username"
              />
              <input
                type="password"
                value={selectedUser.password || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
                placeholder="Password"
              />
              <input
                type="email"
                value={selectedUser.email || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="text"
                value={selectedUser.phonecontact || ""}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    phonecontact: e.target.value,
                  })
                }
                placeholder="Phone"
              />
              <button onClick={updateUser}>Save Changes</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </div>
          )}

          <table className="ManagerCustomer-customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Password</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((customer) => (
                <tr key={customer.userID}>
                  <td>{customer.userID}</td>
                  <td>{customer.username}</td>
                  <td>{customer.password}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phonecontact || "N/A"}</td>
                  <td>
                    <button
                      className="ManagerCustomer-btn-update"
                      onClick={() => openUpdateForm(customer)}
                    >
                      Update
                    </button>
                    <button
                      className="ManagerCustomer-btn-delete"
                      onClick={() => deleteUser(customer.userID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="ManagerOrder-pagination">
            {Array.from({
              length: Math.ceil(filteredCustomers.length / ordersPerPage),
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

export default ManagerCustomer;

import logo from '../assets/image/Logo.png'
import avatar from '../assets/image/avatar.png'
import search from '../assets/image/search.png'
import { Link } from "react-router-dom";
import './ManagerCustomer.css';

const ManagerCustomer = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
  ];

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
          <table className="ManagerCustomer-customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Password</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.password}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.status}</td>
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

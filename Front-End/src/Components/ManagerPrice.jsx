import logo from '../assets/image/Logo.png'
import avatar from '../assets/image/avatar.png'
import search from '../assets/image/search.png'
import EditIcon from '../assets/image/edit.svg';
import './ManagerPrice.css';
import LogoutButton from "../Logout";
import { Link, useNavigate } from "react-router-dom";

const ManagerPrice = () => {
  const navigate = useNavigate();

  const customers = [
    { id: 1, name: 'Small Box', price: '400000', status: 'Active' },
    { id: 2, name: 'Medium Box', price: '700000', status: 'Active' },
    { id: 3, name: 'Large Box', price: '1200000', status: 'Active' },
    { id: 5, name: 'packaging', price: '200000', status: 'Active' },
    { id: 6, name: 'health', price: '150000', status: 'Active' },
    { id: 7, name: 'insurance', price: '500000', status: 'Active' },
    { id: 8, name: 'standard', price: '300000', status: 'Active' },
    { id: 9, name: 'express', price: '850000', status: 'Active' },
    
  ];

  return (
    <div className="ManagerPrice-container">
      <aside className="ManagerPrice-sidebar">
        <div className="ManagerPrice-logo">
        <img src={logo} alt="Logo" /> 
        </div>
          <nav className="ManagerPrice-nav">
            <ul className="ManagerPrice-nav-list">
              <li className="ManagerPrice-nav-item"><Link to="/Manager">
            Account Management
      </Link></li>
              <li className="ManagerPrice-nav-item"><Link to="/PriceManager">
            Price Manager
      </Link></li>
              <li className="ManagerPrice-nav-item"><Link to="/ManagerOrder">
            Order Manager
      </Link></li>
              
             </ul>
          </nav>
        <LogoutButton></LogoutButton>
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
              <h3>admin</h3>
              <p>Manager</p>
            </div>
          </div>
          <div className="ManagerPrice-search-container">
          <input type="text" placeholder="Search..." />
          <img src={search} alt='Search Icon' className="ManagerPrice-search-icon" />
          </div>
        </header>

        <div className="ManagerPrice-price-management">
          <h1>Price Management</h1>
          <table className="ManagerPrice-price-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.price}</td>
                  <td>{customer.status}</td>
                  <td>                 
                    <button className="ManagerPrice-btn-update">
                          <img src={EditIcon} alt="Edit" />
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

export default ManagerPrice;

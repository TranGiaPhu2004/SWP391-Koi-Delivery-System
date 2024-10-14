import logo from '../assets/image/Logo.png'
import avatar from '../assets/image/avatar.png'
import search from '../assets/image/search.png'
import EditIcon from '../assets/image/edit.svg';
import './ManagerPrice.css';
import LogoutButton from "../Logout";

const ManagerPrice = () => {
  const customers = [
    { id: 1, name: 'Small Box', price: '100k', status: 'Active' },
    { id: 2, name: 'Medium Box', price: '200k', status: 'Inactive' },
    { id: 3, name: 'Large Box', price: '500k', status: 'Active' },
    { id: 4, name: 'Service', price: '500k', status: 'Active' },
  ];

  return (
    <div className="ManagerPrice-container">
      <aside className="ManagerPrice-sidebar">
        <div className="ManagerPrice-logo">
        <img src={logo} alt="Logo" /> 
        </div>
          <nav className="ManagerPrice-nav">
            <ul className="ManagerPrice-nav-list">
              <li className="ManagerPrice-nav-item">Account Management</li>
              <li className="ManagerPrice-nav-item">Price Management</li>
              <li className="ManagerPrice-nav-item">Order Management</li>
              <li className="ManagerPrice-nav-item">Notification</li>
              <li className="ManagerPrice-nav-item">Settings</li>
              <li className="ManagerPrice-nav-item">Account</li>
              <li className="ManagerPrice-nav-item">Help</li>
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
              <h3>Vũ Đức Mạnh</h3>
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

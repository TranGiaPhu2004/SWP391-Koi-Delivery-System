import React, { useState } from 'react';
import logo from '../assets/image/Logo.png';
import avatar from '../assets/image/avatar.png';
import search from '../assets/image/search.png';
import EditIcon from '../assets/image/edit.svg';
import DeleteIcon from '../assets/image/delete.svg';
import ArrowDown from '../assets/image/arrow-down.svg';  // Biểu tượng mũi tên xuống
import ArrowUp from '../assets/image/arrow-up.svg';  // Biểu tượng mũi tên lên
import './ManagerOrder.css';

const ManagerOrder = () => {
    const [expandedOrder, setExpandedOrder] = useState(null); // Trạng thái để theo dõi đơn hàng nào đang được mở rộng

    const orders = [
      { id: 1, name: 'Small Box', details: 'Details about Small Box...' },
      { id: 2, name: 'Medium Box', details: 'Details about Medium Box...' },
      { id: 3, name: 'Large Box', details: 'Details about Large Box...' },
      { id: 4, name: 'Service', details: 'Details about Service...' },
      { id: 5, name: 'Small Box', details: 'Details about Small Box...' },
      { id: 6, name: 'Medium Box', details: 'Details about Medium Box...' },
      { id: 7, name: 'Large Box', details: 'Details about Large Box...' },
      { id: 8, name: 'Service', details: 'Details about Service...' },
      { id: 9, name: 'Small Box', details: 'Details about Small Box...' },
      { id: 10, name: 'Medium Box', details: 'Details about Medium Box...' },
      { id: 11, name: 'Large Box', details: 'Details about Large Box...' },
      { id: 12, name: 'Service', details: 'Details about Service...' },
      { id: 13, name: 'Small Box', details: 'Details about Small Box...' },
      { id: 14, name: 'Medium Box', details: 'Details about Medium Box...' },
      { id: 15, name: 'Large Box', details: 'Details about Large Box...' },
      { id: 16, name: 'Service', details: 'Details about Service...' },
      { id: 17, name: 'Small Box', details: 'Details about Small Box...' },
      { id: 18, name: 'Medium Box', details: 'Details about Medium Box...' },
      { id: 19, name: 'Large Box', details: 'Details about Large Box...' },
      { id: 20, name: 'Service', details: 'Details about Service...' },
    ];
  
    // Hàm bật/tắt trạng thái mở rộng cho từng order
    const toggleOrder = (id) => {
      setExpandedOrder(expandedOrder === id ? null : id); // Nếu đơn hàng đã mở, thì thu lại, ngược lại thì mở ra
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
          <button className="ManagerOrder-logout">Logout</button>
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
            <table className="ManagerOrder-order-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr onClick={() => toggleOrder(order.id)}>
                      <td>{order.id}</td>
                      <td>
                        {order.name}
                        <img 
                          src={expandedOrder === order.id ? ArrowUp : ArrowDown} 
                          alt="Toggle" 
                          className="ManagerOrder-toggle-icon" 
                        />
                      </td>
                    </tr>
                    {expandedOrder === order.id && (
                      <tr className="ManagerOrder-order-details">
                         <td colSpan="2">
                            <div className="ManagerOrder-order-detail-content">
                                <div>{order.details}</div>
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
  
  

export default ManagerOrder ;

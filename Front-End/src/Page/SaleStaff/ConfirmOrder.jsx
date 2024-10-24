import logo from "../../assets/image/Logo.png";
import avatar from "../../assets/image/avatar.png";

import { Link, useNavigate } from "react-router-dom";
import "../../Components/ConfirmOrder.css";
const ConfirmOrder = () => {
  const order = [
    {
      id: 1,
      date: "24/11/2024",
      StartPlace: "hcm",
      Endplace: "dong nai",
      phone: "1234567890",
      TotalPrice: 99999,
    },
  ];

  return (
    <div className="ConfirmOrder-Container">
      <aside className="ConfirmOrder-sidebar">
        <div className="ConfirmOrder-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="ConfirmOrder-nav">
          <ul className="ConfirmOrder-nav-list">
            <li className="ConfirmOrder-nav-item">
              <Link to="/ViewOrder">View Ordert</Link>
            </li>
            <li className="ConfirmOrder-nav-item">
              <Link to="/ConfirmOrder">Confirm Order</Link>
            </li>
          </ul>
        </nav>
        {/* <LogoutButton /> */}
      </aside>

      <main className="ConfirmOrder-Content">
        <header className="ConfirmOrder-header">
          <div className="Confirm-user-info">
            <img src={avatar} alt="User Avatar" className="Confirm-avatar" />
            <div className="Confirm-user-details">
              <h3>User</h3>
              <p>Sale staff</p>
            </div>
          </div>
        </header>

        <div className="ConfirmOrder-Table">
          <h1>Confirm Order From Customer</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Start Place</th>
                <th>End Place</th>
                <th>Phone</th>
                <th>Total Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.StartPlace}</td>
                  <td>{order.Endplace}</td>
                  <td>{order.phone}</td>
                  <td>{order.TotalPrice}</td>
                  <td>
                    <button className="ConfirmOrder-btn">Confirm</button>
                    <button className="RejectOrder-btn">Reject</button>
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
export default ConfirmOrder;

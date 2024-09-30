import logo from '../assets/image/Logo.png'
import profile from '../assets/image/user.png'
import background from '../assets/image/background.png'
import glass from '../assets/image/glassicon.png'
import './ManagerCustomer.css';
function ManageCustomer() {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
        <img src={logo} alt="Logo" />      
        </div>
        <div className="search-bar">
          <div className="search-container">
          <input type="text" placeholder="Search..." />
          <img src={glass} alt='Glass' className="search-icon" />
          </div>
        </div>
        <div className="profile-icon">
          <img src={profile} alt="Profile" />
        </div>
      </header>
      <div className="main-layout">
      <div className="sidebar">
        <ul>
          <li className="sidebar-item">Account</li>
          <li className="sidebar-item">Notification</li>
          <li className="sidebar-item">Price</li>    
        </ul>
      </div>
      <div className="sidebar-image">
        <img src={background} alt="Sidebar Background" />
      </div>
      </div>
      <main className="main-content">
        <div className="list">
          <div className="list-item">
            <span className="circle">A</span>
            <span>Customer has discount 50%</span>
            <input type="checkbox" className="checkbox" />
          </div>
        <div className="list-item">
          <span className="circle">B</span>
          <span>List item</span>
          <input type="checkbox" className="checkbox" />
          </div>
        <div className="list-item">
          <span className="circle">C</span>
          <span>List item</span>
          <input type="checkbox" className="checkbox" />
          </div>
        <div className="list-item">
          <span className="circle">D</span>
          <span>List item</span>
          <input type="checkbox" className="checkbox" />
          </div>
        <div className="list-item">
          <span className="circle">E</span>
          <span>List item</span>
          <input type="checkbox" className="checkbox" />
        </div>
          <div className="list-item">
            <span className="circle">F</span>
            <span>List item</span>
            <input type="checkbox" className="checkbox" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageCustomer;


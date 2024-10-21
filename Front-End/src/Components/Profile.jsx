import React, { useState } from 'react';
import './Profile.css'; 
import eyeOn from "../assets/image/eye-on.svg";
import eyeOff from "../assets/image/eye-off.svg";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <hr/>
      <div className="profile-flex">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-header">
            <img
              alt="Profile"
              src="https://storage.googleapis.com/a1aa/image/mfzYfH60IMl3402fvXUbRq0GEmV1fosfpdoxp6hz3NT4qC2cC.jpg"
              width="50"
              height="50"
            />
            <span>Vũ Đức Mạnh</span>
          </div>
          <h2>Profile</h2>
          
          <h2>
            Update Profile
          </h2>
          
          <button className="profile-logout">Logout</button>
          
        </div>

        {/* Main Content */}
        <main className="profile-main-content">
          <p>Please provide some information about yourself.</p>
          <p>
            <strong>Full Name</strong> you provide will be displayed alongside any comments, forum posts, or ideas you make on the site.
          </p>
          <p>
            <strong>The Email Address and Phone</strong> number are required but will not be displayed on the site.
          </p>

          {/* <div className="confirm-box">
            <i className="fas fa-envelope"></i>
            <span>Your email requires confirmation.</span>
            <button>
              <i className="fas fa-envelope"></i> Confirm Email
            </button>
          </div> */}

          <h2>Your Information</h2>
          
          <form className="profile-grid profile-form-section">
    <div>
        <label>Full Name</label>
        <input type="text" value="Vũ Đức Mạnh" readOnly /> {/* Thay đổi giá trị cho phù hợp */}
    </div>
    <div>
        <label>UserName</label>
        <input type="text" value="admin" readOnly /> {/* Thay đổi giá trị cho phù hợp */}
    </div>
    <div>
        <label>Password</label>
        <div className="profile-password-container">
            <input
                type={showPassword ? 'text' : 'password'}
                value="123" // Giả sử hiển thị một chuỗi ký tự dấu sao để biểu thị cho mật khẩu
                readOnly // Thêm thuộc tính readOnly
            />
            <button type="button" className="profile-toggle-password" onClick={togglePasswordVisibility}>
                <img
                    src={showPassword ? eyeOn : eyeOff}
                    alt="Toggle password visibility"
                />
            </button>
        </div>
    </div>
    <div>
        <label>E-mail</label>
        <input type="email" value="admin@gmail.com" readOnly /> {/* Thay đổi giá trị cho phù hợp */}
    </div>
    <div>
        <label>Phone</label>
        <input type="text" value="123-456-7890" readOnly /> {/* Thay đổi giá trị cho phù hợp */}
    </div>
    <div>
        <label>Address</label>
        <input type="text" value="HCM" readOnly /> {/* Thay đổi giá trị cho phù hợp */}
    </div>
</form>

        </main>
      </div>
    </div>
  );
};

export default Profile;

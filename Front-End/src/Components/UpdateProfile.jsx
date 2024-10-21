import React, { useState } from 'react';
import './UpdateProfile.css'; 
import eyeOn from "../assets/image/eye-on.svg";
import eyeOff from "../assets/image/eye-off.svg";

const UpdateProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="update-profile-container">
      <h1>Update Profile</h1>
      <hr/>
      <div className="update-profile-flex">
        {/* Sidebar */}
        <div className="update-profile-sidebar">
          <div className="update-profile-header">
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
          
          <button className="update-profile-logout">Logout</button>
          
        </div>

        {/* Main Content */}
        <main className="update-profile-main-content">
          <p>You can change your information.</p>
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
          <hr/>
          <form className="update-profile-grid update-profile-form-section">
            <div>
              <label>Full Name</label>
              <input type="text" />
            </div>
            <div>
              <label>Login Name</label>
              <input type="text" />
            </div>
            <div>
              <label>Password</label>
              <div className="update-profile-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                />
                <button type="button" className="update-profile-toggle-password" onClick={togglePasswordVisibility}>
                <img
                    src={showPassword ? eyeOn : eyeOff}
                    alt="Toggle password visibility"
                  />
                </button>
              </div>
            </div>
            <div>
              <label>E-mail</label>
              <input type="email" />
            </div>
            <div>
              <label>Phone</label>
              <input type="text" />
            </div>
            <div>
              <label>Address</label>
              <input type="text" />
            </div>
            <div className="update-profile-update-button-container">
                  <button className="update-profile-update-button">Update</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UpdateProfile;

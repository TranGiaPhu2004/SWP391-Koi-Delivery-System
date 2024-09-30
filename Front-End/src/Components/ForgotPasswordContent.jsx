import "./ForgotPasswordContent.css";
import Logo from "../assets/image/Logo.png";
import LogoLogin from "../assets/image/LogoLogin.png";
function ForgotPasswordContent() {
  return (
    <div className="ForgotPassword-main">
      <div className="ForgotPassword-LogoForgotPassword">
        <img
          src={LogoLogin}
          alt="LogoForgotPassword"
          className="ForgotPassword-LogoForgotPassword"
        />
      </div>

      <div className="ForgotPassword-form">
        <div className="ForgotPassword-logo">
          <img src={Logo} alt="Logo" />
        </div>

        <h2>FORGOT PASSWORD PAGE</h2>
        <form>
          <div className="ForgotPassword-input-group">
            <label className="ForgotPassword-label">USERNAME</label>
            <input
              className="ForgotPassword-username-input"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="ForgotPassword-input-group">
            <label className="ForgotPassword-label">
              ENTER YOUR NEW PASSWORD
            </label>
            <input
              className="ForgotPassword-password-input"
              type="text"
              placeholder="Enter your new password"
            />
          </div>
          <div className="ForgotPassword-input-group">
            <label className="ForgotPassword-label">
              CONFIRM YOUR NEW PASSWORD
            </label>
            <input
              className="ForgotPassword-cfnpassword-input"
              type="text"
              placeholder="Comfirm your new Password"
            />
          </div>
          <button className="ForgotPassword-button" type="submit">
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordContent;

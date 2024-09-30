import "./ForgotPasswordContent.css";
import Logo from "../assets/image/Logo.png";
import LogoLogin from "../assets/image/LogoLogin.png";
function ForgotPasswordContent() {
  return (
    <div className="main">
      <div className="LogoForgotPassword">
        <img
          src={LogoLogin}
          alt="LogoForgotPassword"
          className="LogoForgotPassword"
        />
      </div>

      <div className="ForgotPassword-form">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>

        <h1>FORGOT PASSWORD PAGE</h1>
        <form>
          <div className="input-group">
            <label className="label">USERNAME</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label className="label">ENTER YOUR NEW PASSWORD</label>
            <input type="text" placeholder="Enter your new password" />
          </div>
          <div className="input-group">
            <label className="label">CONFIRM YOUR NEW PASSWORD</label>
            <input type="text" placeholder="Comfirm your new Password" />
          </div>
          <button className="button" type="submit">
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordContent;
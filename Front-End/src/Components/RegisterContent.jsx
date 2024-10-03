import "./RegisterContent.css";
import Logo from "../assets/image/Logo.png";
import LogoLogin from "../assets/image/LogoLogin.png";
function RegisterMethod() {
  return (
    <div className="Register-main">
      <div className="Register-LogoRegister">
        <img
          src={LogoLogin}
          alt="LogoRegister"
          className="Register-LogoRegisterImg"
        />
      </div>
      <div className="Register-form">
        <div className="Register-logo">
          <img src={Logo} alt="Logo" />
        </div>

        <h1>REGISTER PAGE</h1>
        <form>
          <div className="Register-input-group">
            <label className="Register-label">USERNAME</label>
            <input
              className="Register-username-input"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="Register-input-group">
            <label className="Register-label">PASSWORD</label>
            <input
              className="Register-password-input"
              type="text"
              placeholder="Enter your password"
            />
          </div>
          <div className="Register-input-group">
            <label className="Register-label">CONFIRM YOUR PASSWORD</label>
            <input
              className="Register-cfpassword-input"
              type="text"
              placeholder="Confirm Password"
            />
          </div>
          <button className="Register-button" type="submit">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterMethod;

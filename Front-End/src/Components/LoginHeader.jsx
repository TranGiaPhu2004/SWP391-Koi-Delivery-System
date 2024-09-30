import "./LoginHeader.css";
import Logo from "../assets/image/Logo.png";
import LogoLogin from "../assets/image/LogoLogin.png";
function LoginHeaderMethod() {
  return (
    <div className="Login-main">
      <div className="Login-LogoLogin">
        <img src={LogoLogin} alt="LogoLogin" className="Login-LogoLoginImg" />
      </div>
      <div className="Login-form">
        <div className="Login-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h1>LOGIN PAGE</h1>
        <form>
          <div className="Login-input-group">
            <label className="Login-label">USERNAME</label>
            <input
              className="Login-username-input"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="Login-input-group">
            <label className="Login-label">PASSWORD</label>
            <input
              className="Login-password-input"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="Login-links">
            <a href="/forgot-password">Forgot password?</a>
            <a href="/register">Register here.</a>
          </div>
          <button className="Login-button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginHeaderMethod;

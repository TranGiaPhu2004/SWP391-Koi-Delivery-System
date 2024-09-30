import "./RegisterContent.css";
import Logo from "../assets/image/Logo.png";
import LogoLogin from "../assets/image/LogoLogin.png";
function RegisterMethod() {
  return (
    <div className="main">
      <div className="LogoRegister">
        <img src={LogoLogin} alt="LogoRegister" className="LogoRegisterImg" />
      </div>
      <div className="Register-form">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>

        <h1>REGISTER PAGE</h1>
        <form>
          <div className="input-group">
            <label className="label">USERNAME</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label className="label">PASSWORD</label>
            <input type="text" placeholder="Enter your password" />
          </div>
          <div className="input-group">
            <label className="label">CONFIRM YOUR PASSWORD</label>
            <input type="text" placeholder="Comfirm Password" />
          </div>
          <button className="button" type="submit">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterMethod;
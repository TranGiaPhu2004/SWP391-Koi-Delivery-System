import './LoginHeader.css'
import Logo from '../assets/image/Logo.png'
import LogoLogin from '../assets/image/LogoLogin.png'
function LoginHeaderMethod(){
return(
    <div className = "main">
        <div className='LogoLogin'>
             <img src={LogoLogin} alt="LogoLogin" className='LogoLoginImg' />
        </div>
        <div className="login-form">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h1>LOGIN PAGE</h1>
        <form>
          <div className="input-group">
            <label>USERNAME</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label>PASSWORD</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="links">
            <a href="/forgot-password">Forgot password?</a>
            <a href="/register">Register here.</a>
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>

    </div>
    
);
}
export default LoginHeaderMethod
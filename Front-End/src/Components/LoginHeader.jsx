import './LoginHeader.css'
import Logo from '../assets/image/Logo.png'
import LogoLogin from '../assets/image/LogoLogin.png'
function LoginHeaderMethod(){
return(
    <div className = "main">
        <img src={LogoLogin} alt="LogoLogin" />
       <img  className="Logo" src={Logo} alt="Logo" />
       
    </div>
);
}
export default LoginHeaderMethod
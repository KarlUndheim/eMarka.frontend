import LoginForm from "../components/auth/LoginForm";
import logo from  "../images/eMarka_logo.png";

const Login = () => {
  return (
  <div>
    <img src={logo} alt="Logo"/>
    <LoginForm />
  </div>
  )
};

export default Login;

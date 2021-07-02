import './login.css';

const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Network App</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Social Network App.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input className="loginInput" placeholder="Email"/>
                        <input className="loginInput" placeholder="Password"/>
                        <button className="loginButton">Login</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton">Create a new account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

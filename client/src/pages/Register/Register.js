import './register.css';

const Register = () => {
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Social Network App</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on Social Network App.
                    </span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input className="registerInput" placeholder="Username"/>
                        <input className="registerInput" placeholder="Email"/>
                        <input className="registerInput" placeholder="Password"/>
                        <input className="registerInput" placeholder="Confirm Password"/>
                        <button className="registerButton">Sign up</button>
                        <button className="registerLoginButton">Log into account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

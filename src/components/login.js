import "./login.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import leftpattern from "../images/left-pattern.svg";
import rightpattern from "../images/right-pattern.svg";

class Login extends Component {
	render() {
		return (
			<div className="Login">
				<img className="pattern" src={leftpattern} alt="" />
				<div className="login-section">
					<p className="logo">ReMedi</p>
					<h1 style={{ fontSize: "60px" }}>Welcome Back!</h1>
					<button className="usertype-btn">Patient</button>
					<button className="usertype-btn">Doctor</button>
					<form className="login-form" action="">
						<div className="input-container">
							<label for="Email">Email</label>
							<input
								className="form-field"
								type="email"
								name="Email"
								id="Email"
								required
							/>
						</div>
						<div className="input-container">
							<label for="Password">Password</label>
							<input
								className="form-field"
								type="password"
								name="Password"
								id="Password"
								required
							/>
						</div>
						<a href="#">Forget password</a>
						<button className="standard-btn">Login</button>
					</form>
					<p style={{ textAlign: "center" }}>
						Don't have account?
						<span>
							<Link style={{ textDecoration: "none" }} to="/register">
								Create new one
							</Link>
						</span>
					</p>
				</div>
				<img className="pattern" src={rightpattern} alt="" />
			</div>
		);
	}
}

export default Login;

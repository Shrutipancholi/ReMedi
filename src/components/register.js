import "./register.css";
import { Component } from "react";
import pattern from "../images/Patterns.svg";

class Register extends Component {
	render() {
		return (
			<div className="Register">
				<div className="login-section">
					<p className="logo">ReMedi</p>
					<h1 style={{ fontSize: "60px" }}>Join us Now</h1>
					<button className="usertype-btn">Patient</button>
					<button className="usertype-btn">Doctor</button>
					<form className="login-form" action="">
						<div className="sameline-field">
							<div className="input-container">
								<label for="FirstName">First Name</label>
								<input
									className="form-field"
									type="text"
									name="FirstName"
									id="FirstName"
									required
								/>
							</div>

							<div className="input-container">
								<label for="LastName">Last Name</label>
								<input
									className="form-field"
									type="text"
									name="LastName"
									id="LastName"
									required
								/>
							</div>
						</div>

						<div className="sameline-field">
							<div className="input-container">
								<label for="Gender">Gender</label>
								<input
									className="form-field"
									type="text"
									name="Gender"
									id="Gender"
									required
								/>
							</div>

							<div className="input-container">
								<label for="DOB">Date of Birth</label>
								<input
									className="form-field"
									type="date"
									name="DOB"
									id="DOB"
									required
								/>
							</div>
						</div>

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
						<button className="standard-btn">Create Account</button>
					</form>
					<p style={{ textAlign: "center" }}>
						You agree to our{" "}
						<span>
							<a href="#"> Terms of use</a>
						</span>{" "}
						and{" "}
						<span>
							<a href="#"> Privacy policy</a>
						</span>
					</p>
				</div>
				<img className="pattern" src={pattern} alt="" />
			</div>
		);
	}
}

export default Register;

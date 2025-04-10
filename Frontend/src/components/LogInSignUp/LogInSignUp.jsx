import React, { useState } from "react";
import "./Style/LogInSignUp.css";

const LogInSignUp = () => {
  // State to track which form to display
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const createSignup = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const signUp = await createSignup.json();
      if (signUp.ok) {
        alert(signUp.message);
      } else {
        alert(signUp.message);
      }
    } catch (error) {
      alert({ error: error.message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle between Log In and Sign Up
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="my-5 p-4">
      <div className="card mx-auto Login">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* Toggle between Log In and Sign Up forms based on isLogin */}
          {isLogin ? (
            <LoginForm handleInputChange={handleInputChange} />
          ) : (
            <SignUpForm
              handleSignup={handleSignup}
              formData={formData}
              setFormData={setFormData}
              handleInputChange={handleInputChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Log In Form Component
const LoginForm = () => (
  <div className="login mx-4">
    <div className="input-group flex-nowrap">
      <span className="input-group-text" id="addon-wrapping">
        <i className="fa-solid fa-user"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Username or Email id"
        aria-label="Username"
        aria-describedby="addon-wrapping"
      />
    </div>

    <div className="input-group flex-nowrap my-3">
      <span className="input-group-text" id="addon-wrapping">
        <i className="fa-solid fa-lock"></i>
      </span>
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        aria-label="Password"
        aria-describedby="addon-wrapping"
      />
    </div>

    <div className="rem-forget d-flex justify-content-between mb-2">
      <div className="log-remember">
        <div className="form-check">
          <input
            className="form-check-input Remember"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label
            className="form-check-label Remember"
            htmlFor="flexCheckDefault"
          >
            Remember me
          </label>
        </div>
      </div>

      <div className="log-forget">
        <a href="#">Forgot password</a>
      </div>
    </div>

    <button className="btn btn-success log-btn">Submit</button>
  </div>
);

// Sign Up Form Component
const SignUpForm = ({ handleSignup, formData, handleInputChange }) => (
  <div className="signup mx-4">
    <form onSubmit={handleSignup}>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          <i className="fa-solid fa-user"></i>
        </span>
        <input
          type="text"
          required
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">
          <i className="fa-solid fa-envelope"></i>
        </span>
        <input
          type="email"
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="addon-wrapping"
        />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text" id="addon-wrapping">
          <i className="fa-solid fa-lock"></i>
        </span>
        <input
          type="password"
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="addon-wrapping"
        />
      </div>

      <button type="submit" className="btn btn-success log-btn">
        Sign Up
      </button>
    </form>
  </div>
);

export default LogInSignUp;

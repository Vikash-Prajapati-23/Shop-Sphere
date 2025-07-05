import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Style/LogInSignUp.css";
import { useCartData } from "../../context/allCartData";

const LogInSignUp = ({ setName }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // React Router's navigation hook
  const { setIsLoggedIn } = useCartData();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-session-user`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setIsLoggedIn(true); // Automatically set as logged in
          navigate("/"); // Redirect to home page or dashboard
        }
      })
      .catch((err) => {
        if (process.env.REACT_APP_NODE_ENV !== "production") {
          console.error(err);
        }
      });
  }, [navigate, setIsLoggedIn]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const createSignup = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const signUp = await createSignup.json();
      if (createSignup.ok) {
        toast.success(signUp.message);
      } else {
        toast.error(signUp.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include", // Include cookies in the request
        }
      );
      const loggedInUser = await userLogin.json();
      if (userLogin.ok) {
        setIsLoggedIn(true); // Set user as logged in
        toast.success(loggedInUser.message);
        navigate("/");
        setName(loggedInUser.user.name);
      } else {
        toast.error(loggedInUser.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="my-5 p-4">
      <div className="card mx-auto Login">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  isLogin ? "active" : ""
                } login-text-size`}
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  !isLogin ? "active" : ""
                } login-text-size`}
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
            <LoginForm
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
              formData={formData}
            />
          ) : (
            <SignUpForm
              handleSignup={handleSignup}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Sign Up Form Component
const SignUpForm = ({ handleSignup, formData, handleInputChange }) => (
  <div className="signup mx-lg-4 mx-md-3">
    <form className="mx-1" onSubmit={handleSignup}>
      <div className="input-group flex-nowrap">
        <span className="input-group-text input-icon-size" id="addon-wrapping">
          <i className="fa-solid fa-user"></i>
        </span>
        <input
          type="text"
          required
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          className="form-control form-text-size"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text input-icon-size" id="addon-wrapping">
          <i className="fa-solid fa-envelope"></i>
        </span>
        <input
          type="email"
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control form-text-size"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="addon-wrapping"
        />
      </div>

      <div className="input-group flex-nowrap my-3">
        <span className="input-group-text input-icon-size" id="addon-wrapping">
          <i className="fa-solid fa-lock"></i>
        </span>
        <input
          type="password"
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="form-control form-text-size"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="addon-wrapping"
        />
      </div>

      <button type="submit" className="btn btn-success form-text-size log-btn">
        Sign Up
      </button>
    </form>
  </div>
);

// Log In Form Component
const LoginForm = ({ handleLogin, formData, handleInputChange }) => (
  <div className="signup mx-lg-4 mx-md-3">
    <form className="mx-1" onSubmit={handleLogin}>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          <i className="fa-solid fa-user"></i>
        </span>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control form-text-size"
          placeholder="Email id"
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
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="form-control form-text-size"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="addon-wrapping"
        />
      </div>

      <form className="d-flex justify-content-between mb-2">
        <div className="log-remember">
          <div className="form-check">
            <input
              className="form-check-input Remember "
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className="form-check-label Remember form-text-size"
              htmlFor="flexCheckDefault"
            >
              Remember me
            </label>
          </div>
        </div>

        <div className="log-forget form-text-size">
          <a href="#">Forgot password</a>
        </div>
      </form>

      <button type="submit" className="btn btn-success form-text-size log-btn">
        Submit
      </button>
    </form>
  </div>
);

export default LogInSignUp;

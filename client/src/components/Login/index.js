import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      localStorage.setItem("token", data.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="login-form-container" onSubmit={handleSubmit}>
      <form className="login-form">
        <h2>Login</h2>
        <input
          className="login-field"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="login-field"
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="submit-btn" type="submit">
          Submit
        </button>
        <div>
          New User? Register <Link to="/register">here</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;

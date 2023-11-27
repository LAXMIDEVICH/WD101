import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("http://localhost:5000/api/signUp", formData);
    localStorage.setItem("token", data.data.token);
    navigate("/");
  };
  return (
    <div className="login-form-container" onSubmit={handleSubmit}>
      <form className="login-form">
        <h2>Sign Up</h2>
        <input
          className="login-field"
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
      </form>
    </div>
  );
};

export default Register;

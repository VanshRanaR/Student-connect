import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful ✅");
      navigate("/dashboard");
      window.location.reload();   // 👈 added this

    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="login-links">
          <Link to="/register">Create account</Link>
          <Link to="/forgot">Forgot password?</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;

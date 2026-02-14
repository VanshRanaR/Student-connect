import { useState } from "react";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // Token save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful ✅");

      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

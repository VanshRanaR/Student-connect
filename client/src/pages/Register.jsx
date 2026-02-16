import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [role, setRole] = useState("student");
  const [photo, setPhoto] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    package: "",
    batch: ""
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // STUDENT REGISTER
      if (role === "student") {
        await API.post("/auth/register-student", form);
      }

      // SENIOR REGISTER (FormData because photo upload)
      else {
        const formData = new FormData();

        Object.keys(form).forEach(key =>
          formData.append(key, form[key])
        );

        if (photo) {
          formData.append("photo", photo);
        }

        await API.post("/auth/register-senior", formData);
      }

      alert("Registered Successfully 🎉");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account ✨</h2>
        <p className="subtitle">Join Mentor Connect</p>

        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            className={role === "senior" ? "active" : ""}
            onClick={() => setRole("senior")}
          >
            Senior
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

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

          {/* SENIOR EXTRA FIELDS */}
          {role === "senior" && (
            <>
              <input
                name="company"
                placeholder="Company"
                onChange={handleChange}
              />

              <input
                name="package"
                placeholder="Package (LPA)"
                onChange={handleChange}
              />

              <input
                name="batch"
                placeholder="Passing Batch"
                onChange={handleChange}
              />

              <input
                type="file"
                onChange={e => setPhoto(e.target.files[0])}
              />
            </>
          )}

          <button type="submit">
            Register as {role}
          </button>

        </form>

        <p className="login-link">
          Already have account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;

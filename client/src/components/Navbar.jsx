import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        MentorConnect
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Mentors</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}

        {user && (
          <Link to="/dashboard">
            Chats
          </Link>
        )}

     {user && (
  <Link to="/meetings">
    Meetings
  </Link>
)}

      </div>

      {/* Authentication Section */}
      <div className="auth-area">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="username">
              {user.name}
            </span>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;

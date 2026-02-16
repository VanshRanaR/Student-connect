import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        MentorConnect
      </div>

      {/* Links */}
      <div className="nav-links">
        <Link to="/">Mentors</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}

        {/* Chat only after login */}
        {user && (
          <Link to="/dashboard">
            Chat
          </Link>
        )}

        {user && <Link to="/meetings">Meetings</Link>}
      </div>

      {/* Auth */}
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
            <span>{user.name}</span>
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

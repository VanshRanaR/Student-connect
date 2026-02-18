import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>MentorConnect</h2>
          <p>
            Connecting students with mentors for career guidance,
            growth and collaboration.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Mentors</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/meetings">Meetings</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@mentorconnect.com</p>
          <p className="copyright">
            © {new Date().getFullYear()} MentorConnect
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

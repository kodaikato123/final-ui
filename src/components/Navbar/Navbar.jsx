import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo-icon">☕</span>
          <span className="logo-text">Coffee Posts</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
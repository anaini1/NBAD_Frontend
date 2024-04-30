import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo-section">
        <img src="budget_logo.jpg" alt="Logo" />
        <h3>Budget Tracking App</h3>
      </div>
      <div className="auth-section">
        <Link to="/" className="auth-link">Home</Link>
      </div>
    </header>
  );
}

export default Header;

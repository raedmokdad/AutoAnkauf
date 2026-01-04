import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <span className="logo-badge">ARZ</span>
            <span className="logo-text">Automobile</span>
          </Link>

          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'menu-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link 
              to="/bewertung" 
              className={`nav-link ${isActive('/bewertung') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Bewertung
            </Link>
            <Link 
              to="/ankauf" 
              className={`nav-link ${isActive('/ankauf') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Auto verkaufen
            </Link>
            <Link 
              to="/ueber-uns" 
              className={`nav-link ${isActive('/ueber-uns') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Über uns
            </Link>
            <Link 
              to="/faq" 
              className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              FAQ
            </Link>
            <Link 
              to="/kontakt" 
              className={`nav-link nav-link-cta ${isActive('/kontakt') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;


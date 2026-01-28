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
            <div className="logo-icon-container">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon-svg">
                <rect width="64" height="64" rx="14" fill="#4CAF50"/>
                <path d="M54 32L50 24C49 22 47 21 45 21H19C17 21 15 22 14 24L10 32V44C10 45.1 10.9 46 12 46H14C15.1 46 16 45.1 16 44V42H48V44C48 45.1 48.9 46 50 46H52C53.1 46 54 45.1 54 44V32Z" fill="none" stroke="white" strokeWidth="2.5"/>
                <circle cx="18" cy="38" r="3" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="46" cy="38" r="3" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M16 30L20 22H44L48 30" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M20 23C20 23 25 21 32 21C39 21 44 23 44 23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="52" cy="12" r="6" fill="#52b788"/>
              </svg>
            </div>
            <div className="logo-text-container">
              <span className="logo-text-main">AutoHD</span>
              <span className="logo-text-sub">Autoankauf Rheinberg</span>
            </div>
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
              to="/ankauf" 
              className={`nav-link ${isActive('/ankauf') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Auto verkaufen
            </Link>
            <Link 
              to="/bewertung" 
              className={`nav-link ${isActive('/bewertung') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Auto bewerten
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
              className={`nav-link ${isActive('/kontakt') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Kontakt
            </Link>
            <a 
              href="tel:+4917630339020" 
              className="phone-button"
              onClick={handleLinkClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="currentColor"/>
              </svg>
              0176 30339020
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;


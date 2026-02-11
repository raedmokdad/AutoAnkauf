import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Car className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Car<span className="text-primary">xD</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">Startseite</Link>
            <Link to="/bewertung" className="text-gray-300 hover:text-white transition-colors font-medium">Bewertung</Link>
            <Link to="/kontakt" className="text-gray-300 hover:text-white transition-colors font-medium">Kontakt</Link>
            <Link 
              to="/bewertung" 
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors border border-white/10"
            >
              Jetzt verkaufen
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link to="/" className="block text-gray-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Startseite</Link>
              <Link to="/bewertung" className="block text-gray-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Bewertung</Link>
              <Link to="/kontakt" className="block text-gray-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Kontakt</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

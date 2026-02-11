import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Car className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">Car<span className="text-primary">xD</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Der moderne Weg, Ihr Auto zu verkaufen. Schnell, fair und komplett digital. 
              Erhalten Sie in wenigen Minuten ein unverbindliches Angebot.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">Startseite</Link></li>
              <li><Link to="/bewertung" className="text-gray-400 hover:text-primary transition-colors text-sm">Fahrzeug bewerten</Link></li>
              <li><Link to="/kontakt" className="text-gray-400 hover:text-primary transition-colors text-sm">Kontakt</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-white font-bold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li><Link to="/impressum" className="text-gray-400 hover:text-primary transition-colors text-sm">Impressum</Link></li>
              <li><Link to="/datenschutz" className="text-gray-400 hover:text-primary transition-colors text-sm">Datenschutz</Link></li>
              <li><Link to="/agb" className="text-gray-400 hover:text-primary transition-colors text-sm">AGB</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-white font-bold mb-4">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Musterstraße 123<br />12345 Musterstadt</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+49123456789" className="hover:text-white">+49 123 456 789</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@carxd.de" className="hover:text-white">info@carxd.de</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CarxD Autoankauf. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

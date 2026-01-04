import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BewertungPage from './pages/BewertungPage';
import AnkaufPage from './pages/AnkaufPage';
import UeberUnsPage from './pages/UeberUnsPage';
import FAQPage from './pages/FAQPage';
import KontaktPage from './pages/KontaktPage';
// Marken-Seiten
import BmwVerkaufenPage from './pages/marken/BmwVerkaufenPage';
import MercedesVerkaufenPage from './pages/marken/MercedesVerkaufenPage';
import VolkswagenVerkaufenPage from './pages/marken/VolkswagenVerkaufenPage';
import AudiVerkaufenPage from './pages/marken/AudiVerkaufenPage';
import OpelVerkaufenPage from './pages/marken/OpelVerkaufenPage';
import FordVerkaufenPage from './pages/marken/FordVerkaufenPage';
import SkodaVerkaufenPage from './pages/marken/SkodaVerkaufenPage';
import RenaultVerkaufenPage from './pages/marken/RenaultVerkaufenPage';
import SeatVerkaufenPage from './pages/marken/SeatVerkaufenPage';
import ToyotaVerkaufenPage from './pages/marken/ToyotaVerkaufenPage';
// Ratgeber-Seiten
import AutoVerkaufenCheckliste from './pages/ratgeber/AutoVerkaufenCheckliste';
import KaufvertragAutoMuster from './pages/ratgeber/KaufvertragAutoMuster';
import FahrzeugbewertungAblauf from './pages/ratgeber/FahrzeugbewertungAblauf';
import AutoOhneTuevVerkaufen from './pages/ratgeber/AutoOhneTuevVerkaufen';
import UnfallwagenVerkaufen from './pages/ratgeber/UnfallwagenVerkaufen';
import ExportAutoVerkaufen from './pages/ratgeber/ExportAutoVerkaufen';
import GebrauchtwagenPreise from './pages/ratgeber/GebrauchtwagenPreise';
import AutoAbmeldenVerkauf from './pages/ratgeber/AutoAbmeldenVerkauf';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bewertung" element={<BewertungPage />} />
              <Route path="/ankauf" element={<AnkaufPage />} />
              <Route path="/ueber-uns" element={<UeberUnsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/kontakt" element={<KontaktPage />} />
              
              {/* Marken-Seiten */}
              <Route path="/marken/bmw-verkaufen" element={<BmwVerkaufenPage />} />
              <Route path="/marken/mercedes-verkaufen" element={<MercedesVerkaufenPage />} />
              <Route path="/marken/volkswagen-verkaufen" element={<VolkswagenVerkaufenPage />} />
              <Route path="/marken/audi-verkaufen" element={<AudiVerkaufenPage />} />
              <Route path="/marken/opel-verkaufen" element={<OpelVerkaufenPage />} />
              <Route path="/marken/ford-verkaufen" element={<FordVerkaufenPage />} />
              <Route path="/marken/skoda-verkaufen" element={<SkodaVerkaufenPage />} />
              <Route path="/marken/renault-verkaufen" element={<RenaultVerkaufenPage />} />
              <Route path="/marken/seat-verkaufen" element={<SeatVerkaufenPage />} />
              <Route path="/marken/toyota-verkaufen" element={<ToyotaVerkaufenPage />} />
              
              {/* Ratgeber-Seiten */}
              <Route path="/ratgeber/auto-verkaufen-checkliste" element={<AutoVerkaufenCheckliste />} />
              <Route path="/ratgeber/kaufvertrag-auto-muster" element={<KaufvertragAutoMuster />} />
              <Route path="/ratgeber/fahrzeugbewertung-ablauf" element={<FahrzeugbewertungAblauf />} />
              <Route path="/ratgeber/auto-ohne-tuev-verkaufen" element={<AutoOhneTuevVerkaufen />} />
              <Route path="/ratgeber/unfallwagen-verkaufen" element={<UnfallwagenVerkaufen />} />
              <Route path="/ratgeber/export-auto-verkaufen" element={<ExportAutoVerkaufen />} />
              <Route path="/ratgeber/gebrauchtwagen-preise" element={<GebrauchtwagenPreise />} />
              <Route path="/ratgeber/auto-abmelden-verkauf" element={<AutoAbmeldenVerkauf />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

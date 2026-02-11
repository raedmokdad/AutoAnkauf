import React from 'react';
import VehicleForm from '../components/VehicleForm';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Shield, Banknote } from 'lucide-react';

function HomePage() {
  return (
    <div className="bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              Verkaufe dein Auto <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                zum Bestpreis
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-8"
            >
              Kostenlose Online-Bewertung in 2 Minuten. <br className="hidden md:block" />
              Fair, transparent und ohne versteckte Gebühren.
            </motion.p>
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <VehicleForm />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-dark-lighter border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Schnell & Einfach"
              description="Fülle das Formular aus und erhalte innerhalb von 24h dein persönliches Angebot."
            />
            <FeatureCard 
              icon={Shield}
              title="Sicher & Seriös"
              description="Wir garantieren eine sichere Abwicklung und sofortige Bezahlung bei Fahrzeugübergabe."
            />
            <FeatureCard 
              icon={Banknote}
              title="Fairer Marktpreis"
              description="Unsere Experten bewerten dein Fahrzeug basierend auf aktuellen Marktdaten."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Warum Kunden uns vertrauen</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TrustItem value="5000+" label="Fahrzeuge angekauft" />
            <TrustItem value="24h" label="Durchschn. Abwicklung" />
            <TrustItem value="100%" label="Kostenlose Bewertung" />
            <TrustItem value="4.9/5" label="Kundenzufriedenheit" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 bg-dark rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
        <Icon className="text-primary group-hover:text-white transition-colors" size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function TrustItem({ value, label }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-500 font-medium">{label}</div>
    </div>
  );
}

export default HomePage;

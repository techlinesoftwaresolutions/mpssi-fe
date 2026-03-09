import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Committee } from './pages/Committee';
import { Events } from './pages/Events';
import { Publications } from './pages/Publications';
import { Gallery } from './pages/Gallery';
import { Welfare } from './pages/Welfare';
import { Contact } from './pages/Contact';
import { ScholarshipForm } from './components/ScholarshipForm';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStandaloneForm, setIsStandaloneForm] = useState(false);

  useEffect(() => {
    // Check if we are in standalone form mode (new tab request)
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'scholarship-form') {
      setIsStandaloneForm(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  if (isStandaloneForm) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-saffron-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold font-heading">Scholarship Application</h1>
            <p className="opacity-90 mt-2">Maharishi Prajapati Shiksha Samiti, Sukhertaal</p>
          </div>
          <div className="p-8 md:p-12">
            <ScholarshipForm onClose={() => window.close()} />
          </div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home setActivePage={setActivePage} />;
      case 'about': return <About />;
      case 'committee': return <Committee />;
      case 'events': return <Events />;
      case 'publications': return <Publications />;
      case 'gallery': return <Gallery />;
      case 'welfare': return <Welfare />;
      case 'contact': return <Contact />;
      default: return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar activePage={activePage} setActivePage={setActivePage} isScrolled={isScrolled} />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default App;

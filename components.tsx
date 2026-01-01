import React, { useState } from 'react';
import { Menu, X, Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight, ArrowRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from './constants';

export const Navbar = ({ activePage, setActivePage, isScrolled }: { activePage: string, setActivePage: (page: string) => void, isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
           <div className="w-10 h-10 bg-saffron-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
             M
           </div>
           <div className={`font-heading font-bold leading-tight ${isScrolled ? 'text-gray-900' : 'text-white shadow-sm'}`}>
             <span className="block text-lg">Maharishi Prajapati</span>
             <span className="text-xs font-medium uppercase tracking-wider">Shiksha Samiti</span>
           </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => setActivePage(link.path)}
              className={`text-sm font-medium transition-colors hover:text-saffron-600 ${
                activePage === link.path 
                  ? 'text-saffron-600 font-semibold' 
                  : isScrolled ? 'text-gray-700' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('contact')}
            className="bg-saffron-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-saffron-700 transition-colors shadow-lg"
          >
            Donate Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={isScrolled ? "text-gray-900" : "text-white"} /> : <Menu className={isScrolled ? "text-gray-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg border-t"
          >
            <div className="flex flex-col p-4 gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    setActivePage(link.path);
                    setIsOpen(false);
                  }}
                  className={`text-left text-base font-medium ${activePage === link.path ? 'text-saffron-600' : 'text-gray-700'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActivePage('contact');
                  setIsOpen(false);
                }}
                className="bg-saffron-600 text-white px-5 py-2 rounded-lg text-center font-medium"
              >
                Donate Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = ({ setActivePage }: { setActivePage: (p: string) => void }) => (
  <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4 text-white">
            <div className="w-8 h-8 bg-saffron-600 rounded-full flex items-center justify-center font-bold">M</div>
            <span className="font-heading font-bold text-lg">Shiksha Samiti</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Dedicated to education, social welfare, and community empowerment for over 35 years. Join us in making a difference.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-saffron-600 transition-colors"><Facebook size={16} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-saffron-600 transition-colors"><Twitter size={16} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-saffron-600 transition-colors"><Instagram size={16} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.slice(0, 5).map(link => (
              <li key={link.name}>
                <button onClick={() => setActivePage(link.path)} className="hover:text-saffron-400 transition-colors flex items-center gap-2">
                  <ChevronRight size={14} /> {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-4">Welfare</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-saffron-400 transition-colors">Scholarships</a></li>
            <li><a href="#" className="hover:text-saffron-400 transition-colors">Book Bank</a></li>
            <li><a href="#" className="hover:text-saffron-400 transition-colors">Health Camps</a></li>
            <li><a href="#" className="hover:text-saffron-400 transition-colors">Women Empowerment</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-saffron-600 mt-0.5 shrink-0" />
              <span>Sukhertaal, Muzaffarnagar,<br />Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-saffron-600 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-saffron-600 shrink-0" />
              <span>info@shikshasamiti.org</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2024 Maharishi Prajapati Shiksha Samiti. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for Community Welfare</p>
      </div>
    </div>
  </footer>
);

export const Section = ({ title, subtitle, children, className = "" }: { title: string, subtitle?: string, children?: React.ReactNode, className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-saffron-600 font-semibold tracking-wider uppercase text-sm"
        >
          {subtitle}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2"
        >
          {title}
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="h-1 bg-saffron-600 mx-auto mt-4 rounded-full"
        />
      </div>
      {children}
    </div>
  </section>
);

export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title?: string, children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <X size={20} />
        </button>
        {title && <div className="p-6 border-b"><h3 className="text-xl font-bold font-heading">{title}</h3></div>}
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

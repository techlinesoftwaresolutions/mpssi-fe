import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isScrolled: boolean;
}

export const Navbar = ({ activePage, setActivePage, isScrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
           <div className="w-10 h-10 bg-saffron-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
             M
           </div>
           <div className={`font-heading font-bold leading-tight ${isScrolled ? 'text-gray-900' : 'text-white shadow-sm'}`}>
             <span className="block text-lg">Maharishi Prajapati</span>
             <span className="text-xs font-medium uppercase tracking-wider">Shiksha Samiti</span>
           </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => setActivePage(link.path)}
              className={`text-sm font-medium transition-colors relative py-1 ${
                activePage === link.path 
                  ? 'text-saffron-600 font-semibold' 
                  : isScrolled ? 'text-gray-700 hover:text-saffron-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
              {activePage === link.path && (
                <motion.div layoutId="underline" className="absolute left-0 bottom-0 w-full h-0.5 bg-saffron-600" />
              )}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('contact')}
            className="bg-saffron-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-saffron-700 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Donate Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={isScrolled ? "text-gray-900" : "text-white"} /> : <Menu className={isScrolled ? "text-gray-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-2xl border-t absolute w-full"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    setActivePage(link.path);
                    setIsOpen(false);
                  }}
                  className={`text-left text-lg font-medium py-2 border-b border-gray-50 ${activePage === link.path ? 'text-saffron-600' : 'text-gray-700'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActivePage('contact');
                  setIsOpen(false);
                }}
                className="bg-saffron-600 text-white px-5 py-4 rounded-xl text-center font-bold shadow-lg mt-2"
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
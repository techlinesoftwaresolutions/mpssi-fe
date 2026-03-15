import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useNavigation } from '../contexts/NavigationContext';

export const Footer = () => {
  const { setActivePage } = useNavigation();
  
  return (
  <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6 text-white">
            <div className="w-10 h-10 bg-saffron-600 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-saffron-600/20">M</div>
            <span className="font-heading font-bold text-xl tracking-tight">Shiksha Samiti</span>
          </div>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Dedicated to education, social welfare, and community empowerment for over 35 years. Building a brighter future for the generations to come.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-saffron-600 hover:text-white transition-all transform hover:-translate-y-1"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-saffron-600 hover:text-white transition-all transform hover:-translate-y-1"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-saffron-600 hover:text-white transition-all transform hover:-translate-y-1"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.slice(0, 6).map(link => (
              <li key={link.name}>
                <button onClick={() => setActivePage(link.path)} className="hover:text-saffron-400 transition-colors flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-6 text-lg">Welfare Programs</h3>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => setActivePage('welfare')} className="hover:text-saffron-400 transition-colors">Scholarships</button></li>
            <li><button onClick={() => setActivePage('welfare')} className="hover:text-saffron-400 transition-colors">Book Bank</button></li>
            <li><button onClick={() => setActivePage('events')} className="hover:text-saffron-400 transition-colors">Health Camps</button></li>
            <li><button onClick={() => setActivePage('events')} className="hover:text-saffron-400 transition-colors">Women Empowerment</button></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading font-semibold mb-6 text-lg">Contact Details</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-saffron-600 mt-0.5 shrink-0" />
              <span className="leading-relaxed">Prajapati Bhawan, Purun Singh Awas,<br />Sukhertaal, Muzaffarnagar,<br />Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-saffron-600 shrink-0" />
              <span>+91 90054 80808</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-saffron-600 shrink-0" />
              <span>prajapaticsf@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500 text-center">
          <p>© 2024 Maharishi Prajapati Shiksha Samiti. All rights reserved.</p>
          <span className="hidden md:inline text-gray-700">|</span>
          <a href="#" className="hover:text-saffron-400 transition-colors">Privacy Policy</a>
          <span className="hidden md:inline text-gray-700">|</span>
          <a href="#" className="hover:text-saffron-400 transition-colors">Terms of Service</a>
          <span className="hidden md:inline text-gray-700">|</span>
          <p>Made with <span className="text-red-500 animate-pulse">❤️</span> and care by <a href="#" className="text-saffron-400 hover:text-saffron-300 transition-colors font-semibold">Techline Software, Noida</a></p>
        </div>
      </div>
    </div>
  </footer>
  );
};

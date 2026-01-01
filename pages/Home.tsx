import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Heart, ZoomIn } from 'lucide-react';
import { Section } from '../components/Section';
import { EVENTS, HOME_HIGHLIGHTS } from '../constants';
import { HighlightItem } from '../types';

export const Home = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-saffron-600/20 backdrop-blur-md text-saffron-400 border border-saffron-600/30 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 inline-block shadow-xl">
              Legacy of 35 Years
            </span>
            
            {/* Reduced Heading Size to prevent overlap with Header */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight max-w-4xl mx-auto">
              Shaping <span className="text-saffron-500">Bright</span> Futures,<br className="hidden md:block" />
              Strengthening <span className="text-blue-400">Community</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Empowering students through education and social welfare initiatives in Sukhertaal, Muzaffarnagar since 1989.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActivePage('publications')}
                className="bg-saffron-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-saffron-700 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <BookOpen size={20} /> View Magazine
              </button>
              <button 
                onClick={() => setActivePage('about')}
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                Our Legacy <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/20 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 -mt-32">
            {[
              { icon: Users, count: "5000+", label: "Alumni Network" },
              { icon: Award, count: "35+", label: "Years of Service" },
              { icon: Heart, count: "100+", label: "Welfare Projects" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-b-8 border-saffron-600 text-center"
              >
                <div className="w-16 h-16 bg-saffron-50 rounded-2xl flex items-center justify-center text-saffron-600 mx-auto mb-6">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl font-bold font-heading mb-2 text-gray-900">{stat.count}</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <Section title="Community Spotlight" subtitle="Updates & Memories" className="bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {HOME_HIGHLIGHTS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-[2rem] cursor-pointer group shadow-xl ${item.span || ''}`}
              onClick={() => setSelectedHighlight(item)}
            >
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                <h4 className="text-white text-xl font-bold mb-2 font-heading">{item.alt}</h4>
                <p className="text-saffron-400 text-sm font-semibold">{item.caption}</p>
                <div className="flex items-center gap-2 text-white/50 text-xs mt-4">
                  <ZoomIn size={14} /> Tap to expand
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Highlight Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedHighlight(null)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedHighlight.src} alt={selectedHighlight.alt} className="w-full h-full object-contain bg-slate-100" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold font-heading">{selectedHighlight.alt}</h3>
                <p className="text-saffron-400 text-lg">{selectedHighlight.caption}</p>
              </div>
              <button 
                onClick={() => setSelectedHighlight(null)} 
                className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all border border-white/20"
              >
                <ArrowRight className="rotate-45" size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

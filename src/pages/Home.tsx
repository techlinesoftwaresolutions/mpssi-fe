import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Heart, ZoomIn } from 'lucide-react';
import { Section } from '../components/Section';
import ProfileCard from '../components/ProfileCard';
import { EVENTS, HOME_HIGHLIGHTS } from '../constants';
import teamData from '../data/teamData.json';
import { HighlightItem } from '../types';
import { useNavigation } from '../contexts/NavigationContext';

export const Home = () => {
  const { setActivePage } = useNavigation();
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Founders Section - Dynamic from teamData */}
      <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-saffron-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-2 sm:mb-3">Our Founders & Inspirations</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">Visionary Leaders</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-items-center">
              {teamData.founders.map((founder, index) => (
                <motion.div
                  key={founder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <ProfileCard
                    image={founder.image}
                    nameHi={founder.nameHi}
                    nameEn={founder.nameEn}
                    designationHi={founder.designationHi}
                    designationEn={founder.designationEn}
                    bioHi={founder.bio?.hi}
                    bioEn={founder.bio?.en}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-gray-900">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <span className="bg-saffron-600/20 backdrop-blur-md text-saffron-600 border border-saffron-600/30 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8 inline-block shadow-lg">
              Legacy of 35 Years
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto">
              Shaping <span className="text-saffron-500">Bright</span> Futures,<br className="hidden sm:block" />
              Strengthening <span className="text-saffron-600">Community</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Empowering students through education and social welfare initiatives in Sukhertaal, Muzaffarnagar since 1989.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => setActivePage('publications')}
                className="w-full sm:w-auto bg-saffron-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base hover:bg-saffron-700 transition-all shadow-lg sm:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <BookOpen size={18} /> View Magazine
              </button>
              <button 
                onClick={() => setActivePage('about')}
                className="w-full sm:w-auto bg-white/20 backdrop-blur-xl border border-gray-400 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-bold text-sm sm:text-base hover:bg-white/30 transition-all flex items-center justify-center gap-2"
              >
                Our Legacy <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-gray-600/30 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-gray-600/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-600/20 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-white relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 -mt-16 sm:-mt-24 md:-mt-32">
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
                className="bg-white p-6 sm:p-8 md:p-10 rounded-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-saffron-50 rounded-2xl flex items-center justify-center text-saffron-600 mx-auto mb-4 sm:mb-6">
                  <stat.icon size={28} className="sm:size-32" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold font-heading mb-2 text-gray-900">{stat.count}</h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <Section title="Community Spotlight" subtitle="Updates & Memories" className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7">
          {HOME_HIGHLIGHTS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="relative overflow-hidden rounded-[8px] cursor-pointer group h-80 sm:h-96 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-300 flex flex-col bg-white"
              onClick={() => setSelectedHighlight(item)}
            >
              {/* Image Container - Full Width, 35% Height */}
              <div className="w-full h-[35%] bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              {/* Content Container - 65% Height */}
              <div className="h-[65%] p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-gray-900 text-base sm:text-lg font-bold font-heading mb-2 line-clamp-2 group-hover:text-saffron-600 transition-colors">
                    {item.alt}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 group-hover:text-gray-800 transition-colors font-medium">
                    {item.caption}
                  </p>
                </div>
                
                {/* Interactive Indicator */}
                <div className="flex items-center gap-2 text-saffron-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                  <ZoomIn size={14} className="sm:size-16 animate-pulse" /> 
                  <span>View Full</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Highlight Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedHighlight(null)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedHighlight.src} alt={selectedHighlight.alt} className="w-full h-full object-contain bg-slate-100" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4 sm:p-6 md:p-8 text-white">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold font-heading">{selectedHighlight.alt}</h3>
                <p className="text-saffron-400 text-sm sm:text-lg">{selectedHighlight.caption}</p>
              </div>
              <button 
                onClick={() => setSelectedHighlight(null)} 
                className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all border border-white/20"
              >
                <ArrowRight className="rotate-45 sm:size-24" size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Section } from '../components/Section';
import { EVENTS } from '../constants';

export const Events = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
    <Section title="Impactful Moments" subtitle="Events & Activities">
      <div className="space-y-20 max-w-6xl mx-auto">
        {EVENTS.map((event, index) => (
          <motion.div 
            key={event.id} 
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-[3rem] shadow-2xl">
              <img src={event.image} alt={event.title} className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-2">
                   <Calendar size={16} className="text-saffron-500" /> {event.date}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <span className="text-saffron-600 font-black text-xs tracking-[0.3em] uppercase mb-4 block">{event.category}</span>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-gray-900 leading-tight">{event.title}</h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">"{event.description}"</p>
              <div className="flex flex-wrap gap-4">
                 <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-saffron-600 transition-all flex items-center gap-2 shadow-lg">
                   View Photos <ExternalLink size={18} />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </motion.div>
);

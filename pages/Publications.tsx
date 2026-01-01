import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download } from 'lucide-react';
import { Section } from '../components/Section';
import { PUBLICATIONS } from '../constants';

export const Publications = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
    <Section title="Knowledge Repository" subtitle="Our Publications">
      <div className="max-w-5xl mx-auto space-y-12">
        {PUBLICATIONS.map((pub) => (
          <motion.div 
            key={pub.id} 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
          >
            <div className="md:w-2/5 relative group cursor-pointer overflow-hidden bg-slate-200">
              <img src={pub.coverImage} alt={pub.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center">
                 <div className="text-white transform translate-y-10 group-hover:translate-y-0 transition-transform">
                    <BookOpen size={48} className="mx-auto mb-4 text-saffron-500" />
                    <p className="font-bold text-xl">Preview Magazine</p>
                 </div>
              </div>
            </div>
            <div className="md:w-3/5 p-10 lg:p-14 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold font-heading text-gray-900 leading-tight">{pub.title}</h3>
                <span className="bg-saffron-100 text-saffron-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{pub.year}</span>
              </div>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed italic">{pub.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {pub.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                    <div className="w-3 h-3 bg-saffron-500 rounded-full group-hover:scale-125 transition-transform" />
                    <span className="font-semibold">{h}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/images/publication.pdf';
                  link.download = 'publication.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="mt-auto bg-saffron-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-saffron-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-saffron-600/30 active:scale-95"
              >
                <Download size={24} /> DOWNLOAD FULL PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  </motion.div>
);
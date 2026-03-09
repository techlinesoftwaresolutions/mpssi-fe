import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { Section } from '../components/Section';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';

export const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeTab === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item => item.category === activeTab);
  const categories = ['All', 'Events', 'Students', 'Awards', 'Community'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <Section title="Photo Gallery" subtitle="Cherished Memories">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all border-2 ${
                activeTab === cat 
                  ? 'bg-saffron-600 text-white border-saffron-600 shadow-xl' 
                  : 'bg-white text-gray-500 border-gray-100 hover:border-saffron-300 hover:text-saffron-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="relative group cursor-pointer rounded-[2rem] overflow-hidden aspect-[4/3] shadow-lg hover:shadow-2xl transition-all"
                onClick={() => setSelectedImage(item)}
              >
                <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <p className="text-white font-bold text-xl mb-1">{item.caption}</p>
                  <p className="text-saffron-400 text-xs font-black uppercase tracking-widest">{item.category}</p>
                  <div className="mt-4 flex items-center gap-2 text-white/50 text-xs"><ZoomIn size={14} /> Tap to expand</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage.src} alt={selectedImage.caption} className="w-full h-full object-contain bg-slate-900" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-8 text-white">
                <h3 className="text-2xl font-bold font-heading">{selectedImage.caption}</h3>
                <p className="text-saffron-400 font-bold uppercase tracking-widest text-sm">{selectedImage.category}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

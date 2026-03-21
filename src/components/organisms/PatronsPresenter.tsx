import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Gift, Calendar } from 'lucide-react';
import { Section } from '@/components/Section';
import { PATRONS } from '@/constants';

/**
 * PatronsPresenter - Pure UI Component
 * Displays patron information cards
 */
export const PatronsPresenter: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <Section title="Generous Patrons" subtitle="Our Valued Supporters">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We express our heartfelt gratitude to our esteemed patrons who have supported our mission through generous
              contributions. Their philanthropic spirit has enabled us to reach more communities and transform lives through
              education.
            </p>
          </div>

          {/* Patrons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PATRONS.map((patron, index) => (
              <motion.div
                key={patron.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Image Section */}
                <div className="flex justify-center pt-8 pb-4">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-saffron-100 to-saffron-50 flex items-center justify-center border-4 border-saffron-200 shadow-lg">
                    {patron.image ? (
                      <img src={patron.image} alt={patron.name} className="w-full h-full object-cover" />
                    ) : (
                      <Heart size={80} className="text-saffron-400 opacity-30" />
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 font-heading">{patron.name}</h3>
                  <p className="text-saffron-600 text-sm font-bold uppercase tracking-widest mb-4">{patron.address}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">Donation: {patron.totalDonation}</p>

                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={14} />
                    <span>Joined {patron.joiningYear}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

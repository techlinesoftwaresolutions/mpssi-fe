import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Gift, Calendar } from 'lucide-react';
import { Section } from '../components/Section';
import { PATRONS } from '../constants';

export const Patrons = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
    <Section title="Generous Patrons" subtitle="Our Valued Supporters">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We express our heartfelt gratitude to our esteemed patrons who have supported our mission through generous contributions. Their philanthropic spirit has enabled us to reach more communities and transform lives through education.
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
                    <img
                      src={patron.image}
                      alt={patron.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Heart size={80} className="text-saffron-400 opacity-30" />
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-1 font-heading">
                  {patron.name}
                </h3>

                {/* Joining Year */}
                <div className="flex items-center gap-2 text-sm text-saffron-600 mb-4 font-semibold">
                  <Calendar size={16} className="text-saffron-600" />
                  Member since {patron.joiningYear}
                </div>

                {/* Address */}
                <div className="mb-5 pb-5 border-b border-gray-200">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-saffron-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {patron.address}
                    </p>
                  </div>
                </div>

                {/* Donation Details */}
                <div className="space-y-3">
                  {/* Total Donation */}
                  <div className="bg-gradient-to-r from-saffron-50 to-orange-50 p-3 rounded-lg">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Total Contribution
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift size={18} className="text-saffron-600" />
                      <p className="text-xl font-bold text-saffron-700">
                        {patron.totalDonation}
                      </p>
                    </div>
                  </div>

                  {/* Current Year Donation */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Current Year Donation
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart size={18} className="text-blue-600" />
                      <p className="text-xl font-bold text-blue-700">
                        {patron.currentYearDonation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-12 border-t border-gray-200"
        >
          {[
            { label: 'Total Patrons', value: PATRONS.length, color: 'from-saffron-600 to-orange-600' },
            {
              label: 'Total Contributions',
              value: `₹${(PATRONS.reduce((sum, p) => {
                const total = parseInt(p.totalDonation.replace(/[₹,]/g, ''));
                return sum + total;
              }, 0) / 10000000).toFixed(2)}Cr`,
              color: 'from-green-600 to-emerald-600'
            },
            {
              label: 'Current Year Total',
              value: `₹${(PATRONS.reduce((sum, p) => {
                const current = parseInt(p.currentYearDonation.replace(/[₹,]/g, ''));
                return sum + current;
              }, 0) / 100000).toFixed(2)}L`,
              color: 'from-blue-600 to-indigo-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white text-center shadow-lg`}
            >
              <p className="text-sm font-semibold opacity-90 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  </motion.div>
);

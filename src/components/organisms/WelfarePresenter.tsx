import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, ExternalLink, Award, Users, BarChart3, ChevronDown, Heart, Target } from 'lucide-react';
import { Section } from '@/components/Section';

interface WelcomePresenterProps {
  expandedFaq: number | null;
  onToggleFaq: (idx: number) => void;
  onNavigateScholarship: () => void;
}

/**
 * WelfarePresenter - Pure UI Component
 * Displays welfare programs, scholarships, FAQs
 */
export const WelfarePresenter: React.FC<WelcomePresenterProps> = ({ expandedFaq, onToggleFaq, onNavigateScholarship }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-12 pb-20">
      {/* Hero Section */}
      <section className="relative w-full mb-20 bg-gradient-to-br from-saffron-50 to-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-4 sm:mb-6">
              Student <span className="text-saffron-600">Welfare & Support</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Empowering deserving students through scholarships, financial aid, and community support programs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Users, value: '2,500+', label: 'Students Benefited', color: 'text-blue-600' },
              { icon: Award, value: '₹5 Cr+', label: 'Aid Distributed', color: 'text-green-600' },
              { icon: Target, value: '98%', label: 'Success Rate', color: 'text-saffron-600' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white p-8 sm:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-600', '-50')} flex items-center justify-center mb-4 sm:mb-6`}>
                  <stat.icon size={28} className={stat.color} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-bold text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Program */}
      <Section title="Scholarship Program" subtitle="Empowering Rural Talent">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-white to-saffron-50 p-8 sm:p-12 rounded-3xl shadow-2xl border-t-4 border-saffron-600">
            <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-saffron-100 rounded-2xl flex items-center justify-center text-saffron-600 shadow-md">
                <BookOpen size={32} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">Merit-Based Scholarship</h3>
                <p className="text-saffron-600 font-bold uppercase tracking-widest text-xs mt-1">Excellence Rewarded</p>
              </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed italic text-base sm:text-lg border-l-4 border-saffron-600 pl-4">
              "Financial constraints should never stand in the way of potential. We provide comprehensive support for high-achieving students from humble backgrounds."
            </p>

            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Eligibility Criteria</h4>
            <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
              {[
                { text: 'Score 75% or above in previous board exams', icon: '✓' },
                { text: 'Annual family income below ₹1,50,000', icon: '✓' },
                { text: 'Resident of Muzaffarnagar district', icon: '✓' },
                { text: 'Commitment to community service', icon: '✓' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-center p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 group hover:border-saffron-300 hover:bg-saffron-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{item.icon}</div>
                  <span className="text-gray-700 font-semibold text-sm sm:text-base">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <button onClick={onNavigateScholarship} className="w-full bg-saffron-600 text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-saffron-700 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
              <BookOpen size={20} /> Apply for Scholarship
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold font-heading mb-6 text-gray-900">Required Documents</h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { doc: 'Aadhaar Card', icon: '🆔' },
                  { doc: 'Income Certificate', icon: '📄' },
                  { doc: 'Previous Marksheet', icon: '📋' },
                  { doc: 'Bank Passbook', icon: '🏦' },
                  { doc: 'School ID Card', icon: '🎓' },
                  { doc: 'Passport Photos', icon: '📸' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-4 sm:p-5 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="font-semibold text-gray-700 text-sm sm:text-base">{item.doc}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 sm:p-8 bg-blue-50 border-l-4 border-blue-600 rounded-xl">
              <p className="text-blue-900 font-semibold text-sm sm:text-base leading-relaxed">
                <strong className="text-blue-700">📋 Selection Process:</strong> Applications are reviewed by the Scholarship Committee in August. Shortlisted candidates will be invited for a personal interview at the Shukteerth head office.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Other Welfare Programs */}
      <Section title="Other Support Programs" subtitle="Comprehensive Assistance">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Heart, title: 'Emergency Financial Aid', desc: 'Immediate financial support for students facing unforeseen circumstances' },
            { icon: BarChart3, title: 'Career Guidance', desc: 'Professional mentoring and career counseling for better future planning' },
            { icon: Award, title: 'Merit Recognition', desc: 'Awards and certificates for outstanding academic and co-curricular achievements' },
            { icon: Users, title: 'Mentorship Program', desc: 'One-on-one mentoring with industry professionals and alumni' },
            { icon: BookOpen, title: 'Study Materials', desc: 'Free books, notes, and online resources for exam preparation' },
            { icon: Target, title: 'Skills Development', desc: 'Vocational training and skill workshops for employability' }
          ].map((program, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all"
            >
              <div className="w-14 h-14 bg-saffron-100 rounded-xl flex items-center justify-center text-saffron-600 mb-6 group-hover:bg-saffron-600 group-hover:text-white transition-colors">
                <program.icon size={28} />
              </div>
              <h4 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-saffron-600 transition-colors">{program.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{program.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section title="Frequently Asked Questions" subtitle="Get Answers">
        <div className="max-w-3xl mx-auto">
          {[
            { q: 'What is the maximum scholarship amount?', a: 'The scholarship amount ranges from ₹10,000 to ₹50,000 per year depending on merit, need, and availability of funds.' },
            { q: 'When is the application deadline?', a: 'Applications are accepted until July 31st every year. Selection results are announced in August.' },
            { q: 'Can students from government schools apply?', a: 'Yes, students from all schools - government, private, and semi-private - are eligible to apply.' },
            { q: 'Is there a renewal process?', a: 'Yes, scholarships are renewable annually based on academic performance and continued eligibility.' },
            { q: 'How are selected students notified?', a: 'Selected candidates are notified via email and phone. Personal interview dates are communicated separately.' },
            { q: 'Is there any requirement to work for the organization?', a: 'While not mandatory, we value social service. Scholars are encouraged to participate in community initiatives.' }
          ].map((faq, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-4 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <button onClick={() => onToggleFaq(idx)} className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                <span className="font-bold text-gray-900 text-left text-sm sm:text-base">{faq.q}</span>
                <motion.div animate={{ rotate: expandedFaq === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="text-saffron-600" size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedFaq === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full py-16 sm:py-20 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 sm:mb-6">Ready to Transform Your Future?</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">Start your scholarship application today and take the first step towards achieving your dreams.</p>
          <button onClick={onNavigateScholarship} className="bg-white text-saffron-600 px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl active:scale-95">
            Apply Now <ExternalLink className="inline ml-2" size={20} />
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

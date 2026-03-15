import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ExternalLink } from 'lucide-react';
import { Section } from '../components/Section';

export const Welfare = () => {
  const openApplicationInNewTab = () => {
    const currentUrl = window.location.origin + window.location.pathname;
    window.open(`${currentUrl}?view=scholarship-form`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-20">
      <Section title="Student Welfare" subtitle="Support & Assistance">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 lg:p-14 rounded-[3.5rem] shadow-2xl border-t-8 border-saffron-600"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-saffron-50 rounded-3xl flex items-center justify-center text-saffron-600 shadow-inner">
                <BookOpen size={36} />
              </div>
              <div>
                <h3 className="text-3xl font-bold font-heading text-gray-900">Scholarship Program</h3>
                <p className="text-saffron-600 font-bold uppercase tracking-widest text-xs mt-1">Empowering Rural Talent</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-10 leading-relaxed text-xl italic">
              "Financial constraints should never stand in the way of potential. We provide support for high-achieving students from humble backgrounds."
            </p>

            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs ml-1">Eligibility Criteria</h4>
            <div className="space-y-4 mb-12">
              {[
                "Score 75% or above in previous board exams",
                "Annual family income below ₹1,50,000",
                "Resident of Muzaffarnagar district",
                "Commitment to community service"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group hover:border-saffron-200 transition-all">
                  <CheckCircle size={24} className="text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 font-bold">{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={openApplicationInNewTab}
              className="w-full bg-saffron-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-saffron-700 transition-all shadow-2xl shadow-saffron-600/30 flex items-center justify-center gap-3 active:scale-95"
            >
              Apply Now  <ExternalLink size={20} />
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">Clicking opens the official form in a new window</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center h-full pt-10"
          >
            <h3 className="text-4xl font-bold font-heading mb-10 text-gray-900">Required Documents</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Aadhaar Card (Student)",
                "Latest Income Certificate",
                "Previous Marksheet",
                "Active Bank Passbook",
                "School ID Card",
                "Recent Passport Photos"
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-[1.5rem] shadow-lg border border-gray-50 group hover:shadow-2xl transition-all">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <CheckCircle size={20} />
                  </div>
                  <span className="font-bold text-gray-700 text-lg">{doc}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-[2rem] text-blue-900 flex items-start gap-4">
               <div className="mt-1"><ExternalLink size={24} className="opacity-50" /></div>
               <p className="text-lg leading-relaxed font-medium">
                 <strong>Selection Process:</strong> Applications are reviewed by the Committee in August. Shortlisted candidates will be invited for a personal interview at the Sukhertaal head office.
               </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </motion.div>
  );
};

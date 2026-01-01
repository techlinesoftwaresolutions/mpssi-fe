import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Section } from '../components/Section';
import { Modal } from '../components/Modal';
import { MEMBERS } from '../constants';
import { Member } from '../types';

export const Committee = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <Section title="Leadership" subtitle="Management Committee">
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
          The dedicated individuals who work tirelessly behind the scenes to ensure the smooth functioning of the Samiti.
        </p>

        <h3 className="text-2xl font-bold font-heading text-center mb-10 text-royal-800">Founders & Patrons</h3>
        <div className="flex justify-center mb-20">
          {MEMBERS.filter(m => m.type === 'founder').map(member => (
            <motion.div 
              key={member.id} 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-sm text-center border-t-8 border-saffron-600 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <img src={member.image} alt={member.name} className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-8 border-saffron-50 shadow-inner" />
              <h4 className="text-2xl font-bold font-heading text-gray-900">{member.name}</h4>
              <p className="text-saffron-600 font-bold mb-4 uppercase tracking-wider text-sm">{member.designation}</p>
              <p className="text-gray-500 leading-relaxed italic line-clamp-3">"{member.bio}"</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-2xl font-bold font-heading text-center mb-10 text-royal-800">Executive Committee</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERS.filter(m => m.type === 'committee').map(member => (
             <motion.div 
               key={member.id} 
               whileHover={{ scale: 1.03 }}
               className="bg-white p-8 rounded-[2rem] shadow-lg text-center border border-gray-100 cursor-pointer hover:shadow-2xl transition-all"
               onClick={() => setSelectedMember(member)}
             >
               <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
               <h4 className="text-lg font-bold font-heading text-gray-900">{member.name}</h4>
               <p className="text-blue-600 text-sm font-bold uppercase tracking-tighter">{member.designation}</p>
             </motion.div>
          ))}
        </div>
      </Section>

      <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} title="Member Profile">
        {selectedMember && (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img src={selectedMember.image} alt={selectedMember.name} className="w-56 h-56 rounded-3xl object-cover shadow-xl" />
            <div className="text-center md:text-left">
              <h4 className="text-3xl font-bold text-gray-900 font-heading">{selectedMember.name}</h4>
              <p className="text-saffron-600 font-bold text-lg mb-6 uppercase tracking-widest">{selectedMember.designation}</p>
              <p className="text-gray-700 leading-relaxed text-lg">{selectedMember.bio || "A dedicated pillar of the Samiti, ensuring educational equity and social welfare for the community."}</p>
              <div className="mt-8 pt-6 border-t flex flex-wrap gap-4 justify-center md:justify-start">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100"><Mail size={16} /> Contact via Office</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};
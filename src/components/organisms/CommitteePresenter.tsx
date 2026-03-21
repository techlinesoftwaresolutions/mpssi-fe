import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section } from '@/components/Section';
import ProfileCard from '@/components/ProfileCard';
import teamData from '@/data/teamData.json';

interface CommitteePresenterProps {
  expandedYear: number | null;
  onToggleYear: (year: number) => void;
}

/**
 * CommitteePresenter - Pure UI Component
 * Displays committee members and founders with expandable sections
 * State is managed by container
 */
export const CommitteePresenter: React.FC<CommitteePresenterProps> = ({ expandedYear, onToggleYear }) => {
  const quoteText = {
    en: '"Education is the foundation of a nation. When we spread the light of education to every corner of society, then we build a strong nation." - Dr. S. Radhakrishnan'
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <Section title="Leadership" subtitle="Management Committee">
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 bg-gradient-to-r from-orange-50 to-blue-50 p-8 rounded-2xl border-l-4 border-orange-500"
        >
          <p className="text-center text-gray-700 text-lg italic font-semibold leading-relaxed max-w-3xl mx-auto">
            {quoteText.en}
          </p>
        </motion.div>

        {/* Committee Years - Expandable List */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Committee History</h2>

          <div className="space-y-4">
            {teamData.committees.map((committee) => (
              <motion.div
                key={committee.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Header - Clickable */}
                <motion.button
                  onClick={() => onToggleYear(committee.year)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900">{committee.termEn}</h3>
                    <p className="text-sm text-gray-500 mt-1">{committee.members.length} Members</p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-orange-500 transition-transform duration-300 ${expandedYear === committee.year ? 'rotate-180' : ''}`}
                  />
                </motion.button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedYear === committee.year && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="px-6 py-8 bg-gray-50">
                        {/* Committee Members Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {committee.members.map((member) => (
                            <motion.div
                              key={`${committee.year}-${member.id}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ProfileCard
                                image={member.image}
                                nameHi={member.nameHi}
                                nameEn={member.nameEn}
                                designationHi={member.positionHi}
                                designationEn={member.positionEn}
                              />
                            </motion.div>
                          ))}
                        </div>

                        {/* Committee Term Info */}
                        <div className="mt-8 pt-6 border-t border-gray-300 text-center">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Term:</span> {committee.termEn}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Founders Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="border-t-2 border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamData.founders.map((founder) => (
              <motion.div key={founder.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
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
        </motion.div>
      </Section>
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Section } from '../components/Section';

export const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
    <Section title="Our Legacy" subtitle="History & Vision" className="pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg text-gray-600 mx-auto leading-relaxed">
          <p className="mb-6">
            The <strong>Maharishi Prajapati Shiksha Samiti</strong> was established in 1989 by visionary community leaders in Sukhertaal. Witnessing the lack of educational resources in rural Muzaffarnagar, they came together with a pledge to serve society.
          </p>
          <p className="mb-6">
            Over the last 35 years, the Samiti has grown from a small group of volunteers to a registered organization that supports hundreds of students annually. We believe that education is the most powerful tool for social change.
          </p>
          <blockquote className="border-l-4 border-saffron-600 pl-8 italic text-gray-800 bg-saffron-50 p-8 rounded-2xl my-10 shadow-sm">
            "Our goal is not just literacy, but the holistic development of our youth so they can become responsible pillars of society."
          </blockquote>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-blue-600">
             <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Our Vision</h3>
             <p className="text-gray-600">To create an enlightened society where every child, regardless of their economic background, has access to quality education and equal opportunities for growth.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-saffron-600">
             <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Our Mission</h3>
             <ul className="space-y-4 text-gray-600">
               <li className="flex gap-3"><CheckCircle size={20} className="text-saffron-600 shrink-0" /> Financial support for needy students.</li>
               <li className="flex gap-3"><CheckCircle size={20} className="text-saffron-600 shrink-0" /> Promoting cultural values and heritage.</li>
               <li className="flex gap-3"><CheckCircle size={20} className="text-saffron-600 shrink-0" /> Encouraging merit through awards.</li>
             </ul>
          </div>
        </div>
      </div>
    </Section>
  </motion.div>
);
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Section } from '../components/Section';

export const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
    <Section title="Our Founders & Inspirations" subtitle="Visionary Leaders" className="pt-8 bg-gradient-to-b from-white to-saffron-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 justify-items-center px-4">
          {/* Founder 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              {/* Circle Shape Container */}
              <div className="w-64 h-64 bg-gradient-to-br from-saffron-100 to-saffron-200 rounded-full flex items-center justify-center overflow-hidden shadow-xl border-4 border-saffron-600">
                <img 
                  src="/images/founder11.png" 
                  alt="Swami Sushar Singh Ji" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-saffron-600 text-white px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                <p className="font-bold text-sm">संस्थापक</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">स्वामी सुशार सिंह जी</h3>
              <p className="text-saffron-600 font-semibold mb-3">Founder & Visionary</p>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Established the Maharishi Prajapati Shiksha Samiti with a divine vision to transform lives through education.
              </p>
            </div>
          </motion.div>

          {/* Founder 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              {/* Circle Shape Container */}
              <div className="w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden shadow-xl border-4 border-blue-600">
                <img 
                  src="/images/founder2.png" 
                  alt="Co-Founder" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                <p className="font-bold text-sm">सह-संस्थापक</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">Visionary Leader</h3>
              <p className="text-blue-600 font-semibold mb-3">Co-Founder & Inspiration</p>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Dedicated to empowering youth and creating sustainable educational opportunities for all.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>

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
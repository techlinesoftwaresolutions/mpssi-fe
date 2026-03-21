import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Section } from '@/components/Section';

/**
 * ContactPresenter - Pure UI Component
 * Displays contact form and location information
 */
export const ContactPresenter: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.currentTarget.reset();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <Section title="Connect With Us" subtitle="Direct Inquiries">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-12">
            <h3 className="text-4xl font-bold font-heading text-gray-900 leading-tight">We value your support and feedback.</h3>
            <p className="text-gray-600 text-lg leading-relaxed italic">
              Whether you want to contribute, volunteer, or seek assistance, our team is ready to welcome you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Our Location</h4>
                  <p className="text-gray-600 text-lg">
                    Maharishi Prajapati Shiksha Samiti,<br />
                    Sukhertaal, Dist. Muzaffarnagar,<br />
                    Uttar Pradesh - 251309
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-saffron-50 rounded-3xl flex items-center justify-center text-saffron-600 shrink-0 group-hover:bg-saffron-600 group-hover:text-white transition-all">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Direct Line</h4>
                  <p className="text-gray-600 text-lg">+91 90054 80808</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Email Support</h4>
                  <p className="text-gray-600 text-lg">prajapaticsf@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-4 border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Your Message</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-6 py-4 border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-saffron-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Section } from '@/components/Section';
import { FormGroup, ValidationMessage } from '@/components/molecules';
import { ContactFormData, ValidationErrors, SubmitStatus } from '@/containers/ContactContainer';

interface ContactPresenterProps {
  formData: ContactFormData;
  validationErrors: ValidationErrors;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  onResetForm: () => void;
  submitStatus: SubmitStatus;
  isSubmitting: boolean;
}

/**
 * ContactPresenter - Pure UI Component (Presenter)
 * Displays contact form and location information
 * No state management, only rendering based on props
 */
export const ContactPresenter: React.FC<ContactPresenterProps> = ({
  formData,
  validationErrors,
  onFormChange,
  onSubmitForm,
  onResetForm,
  submitStatus,
  isSubmitting
}) => {


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
                    Shukteerth, Dist. Muzaffarnagar,<br />
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
                  <p className="text-gray-600 text-lg">+91 80109 93612</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">Email Support</h4>
                  <p className="text-gray-600 text-lg">mpssindia1991@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100"
          >
            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-green-900">Message Sent Successfully!</h3>
                    <p className="text-green-700 text-sm mt-1">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && Object.keys(validationErrors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="text-red-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-red-900">Please Fix the Errors</h3>
                    <p className="text-red-700 text-sm mt-1">Some fields have errors. Please review and try again.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={onSubmitForm} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormGroup
                  label="First Name"
                  required
                  error={validationErrors.firstName}
                >
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onFormChange}
                    className={`w-full px-6 py-4 border-2 ${
                      validationErrors.firstName ? 'border-red-500' : 'border-slate-100'
                    } bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all`}
                    placeholder="Neeraj"
                  />
                </FormGroup>

                <FormGroup
                  label="Last Name"
                  required
                  error={validationErrors.lastName}
                >
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onFormChange}
                    className={`w-full px-6 py-4 border-2 ${
                      validationErrors.lastName ? 'border-red-500' : 'border-slate-100'
                    } bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all`}
                    placeholder="Prajapati"
                  />
                </FormGroup>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormGroup
                  label="Mobile Number"
                  required
                  error={validationErrors.mobile}
                  helperText="We'll use this to follow up on your message"
                >
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={onFormChange}
                    className={`w-full px-6 py-4 border-2 ${
                      validationErrors.mobile ? 'border-red-500' : 'border-slate-100'
                    } bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all`}
                    placeholder="9876543210"
                  />
                </FormGroup>

                <FormGroup
                  label="Email Address"
                  error={validationErrors.email}
                  helperText="Optional - leave blank if not applicable"
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onFormChange}
                    className={`w-full px-6 py-4 border-2 ${
                      validationErrors.email ? 'border-red-500' : 'border-slate-100'
                    } bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all`}
                    placeholder="techlinesoftwaresolutions@gmail.com"
                  />
                </FormGroup>
              </div>

              <FormGroup
                label="Your Message"
                required
                error={validationErrors.message}
                helperText="Please provide at least 10 characters"
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={onFormChange}
                  rows={5}
                  className={`w-full px-6 py-4 border-2 ${
                    validationErrors.message ? 'border-red-500' : 'border-slate-100'
                  } bg-slate-50 rounded-2xl focus:border-saffron-500 outline-none transition-all resize-none`}
                  placeholder="How can we help you?"
                ></textarea>
              </FormGroup>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-saffron-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-xl active:scale-95 uppercase tracking-widest"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <button
                  type="button"
                  onClick={onResetForm}
                  className="flex-1 bg-slate-100 text-gray-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all shadow-md active:scale-95 uppercase tracking-widest"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </Section>
    </motion.div>
  );
};

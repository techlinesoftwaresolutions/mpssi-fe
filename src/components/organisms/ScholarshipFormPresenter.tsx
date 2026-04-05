import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, AlertCircle, Mail, Phone, Lock, Users } from 'lucide-react';
import { Button } from '../atoms';
import type { ScholarshipFormData, ValidationErrors } from '../../containers/ScholarshipFormContainer';

// ====================
// Type Definitions
// ====================
interface ScholarshipFormPresenterProps {
  // Form Data
  formData: ScholarshipFormData;
  validationErrors: ValidationErrors;
  
  // Form Handlers
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmitForm: (e: React.FormEvent) => void;
  onResetForm: () => void;
  
  // Submission Status
  submitStatus: 'idle' | 'success' | 'error';
  isSubmitting: boolean;
  
  // OTP Modal
  showOtpModal: boolean;
  onCloseOtpModal: () => void;
  
  // OTP State & Handlers
  otpValues: string[];
  otpSent: boolean;
  otpVerified: boolean;
  otpError: string;
  otpLoading: boolean;
  resendTimer: number;
  onOtpInput: (index: number, value: string) => void;
  onSendOtp: () => Promise<void>;
  onVerifyOtp: () => Promise<void>;
  onResendOtp: () => Promise<void>;
  
  // Recommenders
  recommenders: Array<{ id: string; name: string; role: string; phone: string; email: string }>;
  selectedRecommender: any;
  onSelectRecommender: (recommender: any) => void;
}

// ====================
// ScholarshipFormPresenter
// ====================
/**
 * ScholarshipFormPresenter - Dumb Component (Presenter)
 * 
 * Responsibilities:
 * - Render all form UI sections
 * - Display validation errors
 * - Render OTP modal
 * - Call handler props (no state mutations)
 * 
 * This is the "view" of the form - all rendering logic lives here.
 * No state management, no business logic, only UI rendering.
 */
export const ScholarshipFormPresenter: React.FC<ScholarshipFormPresenterProps> = ({
  formData,
  validationErrors,
  onFormChange,
  onSubmitForm,
  onResetForm,
  submitStatus,
  isSubmitting,
  showOtpModal,
  onCloseOtpModal,
  otpValues,
  otpSent,
  otpVerified,
  otpError,
  otpLoading,
  resendTimer,
  onOtpInput,
  onSendOtp,
  onVerifyOtp,
  onResendOtp,
  recommenders,
  selectedRecommender,
  onSelectRecommender
}) => {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="pt-20 pb-20"
      >
        {/* Header Section */}
        <section className="w-full py-12 sm:py-16 bg-gradient-to-br from-saffron-600 to-saffron-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen size={32} />
                <h1 className="text-4xl sm:text-5xl font-bold font-heading">Scholarship Application</h1>
              </div>
              <p className="text-lg sm:text-xl opacity-90">Complete this form to apply for educational scholarship assistance</p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 p-4 sm:p-6 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-green-900 text-lg">Application Submitted Successfully!</h3>
                    <p className="text-green-700 text-sm mt-1">Your scholarship application has been received. We will notify you shortly with updates via the registered mobile number and email.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-8 p-4 sm:p-6 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="text-red-600 shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-red-900 text-lg">Error Processing Form</h3>
                    <p className="text-red-700 text-sm mt-1">Please try again or contact support.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 sm:p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg"
            >
              <p className="text-blue-900 font-semibold text-sm sm:text-base">
                <strong>ℹ️ Instructions:</strong> Fill all required fields carefully. Make sure all information is accurate as per your documents. Incomplete forms will be rejected.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg"
            >
              <form onSubmit={onSubmitForm}>
                {/* Personal Information Section */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">
                    Personal Information
                  </h2>
                  
                  {/* Full Name */}
                  <div className="mb-6">
                    <div id="fullName">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={onFormChange}
                        placeholder="Full name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.fullName 
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                            : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.fullName}</p>
                      )}
                    </div>
                  </div>

                  {/* Father & Mother Name */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div id="fatherName">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Father's Name *</label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={onFormChange}
                        placeholder="Father's name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.fatherName ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.fatherName && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.fatherName}</p>}
                    </div>
                    <div id="motherName">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Mother's Name *</label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={onFormChange}
                        placeholder="Mother's name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.motherName ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.motherName && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.motherName}</p>}
                    </div>
                  </div>

                  {/* DOB & Gender */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div id="dob">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={onFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.dob ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.dob && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.dob}</p>}
                    </div>
                    <div id="gender">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={onFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.gender ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Aadhar & Mobile */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div id="aadharNumber">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Aadhar Number *</label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={onFormChange}
                        maxLength="12"
                        placeholder="12-digit Aadhar"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.aadharNumber ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.aadharNumber && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.aadharNumber}</p>}
                    </div>
                    <div id="mobile">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={onFormChange}
                        maxLength="10"
                        placeholder="10-digit number"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.mobile ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.mobile && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.mobile}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div id="email">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onFormChange}
                      placeholder="email@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                      }`}
                    />
                    {validationErrors.email && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.email}</p>}
                  </div>

                  {/* Address */}
                  <div className="mt-6" id="address">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={onFormChange}
                      placeholder="Street address"
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.address ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                      }`}
                    />
                    {validationErrors.address && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.address}</p>}
                  </div>

                  {/* City, District, Pincode */}
                  <div className="grid sm:grid-cols-3 gap-6 mt-6">
                    <div id="city">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={onFormChange}
                        placeholder="City"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.city ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.city && <p className="text-red-500 text-sm mt-1" ><AlertCircle size={14} className="inline" /> {validationErrors.city}</p>}
                    </div>
                    <div id="district">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">District *</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={onFormChange}
                        placeholder="District"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.district ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                    </div>
                    <div id="pincode">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={onFormChange}
                        maxLength="6"
                        placeholder="6-digit"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.pincode ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.pincode && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* Academic Information Section */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">
                    Academic Information
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div id="qualification">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Last Class/Qualification *</label>
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={onFormChange}
                        placeholder="e.g., Class 12"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.qualification ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.qualification && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.qualification}</p>}
                    </div>
                    <div id="percentage">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Percentage (%) *</label>
                      <input
                        type="number"
                        name="percentage"
                        value={formData.percentage}
                        onChange={onFormChange}
                        placeholder="e.g., 85.5"
                        step="0.01"
                        min="0"
                        max="100"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.percentage ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.percentage && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.percentage}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div id="schoolName">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">School/College Name *</label>
                      <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={onFormChange}
                        placeholder="School/College name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.schoolName ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.schoolName && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.schoolName}</p>}
                    </div>
                    <div id="schoolDistrict">
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">School District *</label>
                      <input
                        type="text"
                        name="schoolDistrict"
                        value={formData.schoolDistrict}
                        onChange={onFormChange}
                        placeholder="District"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          validationErrors.schoolDistrict ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                        }`}
                      />
                      {validationErrors.schoolDistrict && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.schoolDistrict}</p>}
                    </div>
                  </div>

                  <div id="annualIncome">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Annual Family Income (₹) *</label>
                    <input
                      type="number"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={onFormChange}
                      placeholder="Annual income in rupees"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.annualIncome ? 'border-red-500' : 'border-gray-300 focus:border-saffron-600'
                      }`}
                    />
                    {validationErrors.annualIncome && <p className="text-red-500 text-sm mt-1"><AlertCircle size={14} className="inline" /> {validationErrors.annualIncome}</p>}
                  </div>

                  {/* Remark */}
                  <div className="mt-6" id="remark">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Additional Remarks (Optional)</label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={onFormChange}
                      placeholder="Any additional information"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-saffron-600 focus:ring-saffron-100 transition-all"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    variant="primary"
                    size="lg"
                    className="flex-1"
                  >
                    <Mail size={20} />
                    Submit Application
                  </Button>
                  <Button
                    type="button"
                    onClick={onResetForm}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-saffron-100 rounded-full mb-4">
                  <Lock className="text-saffron-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Verify Mobile Number</h2>
                <p className="text-gray-600 text-sm mt-2">Enter the OTP sent to {formData.mobile}</p>
              </div>

              {!otpSent && (
                <Button
                  onClick={onSendOtp}
                  disabled={otpLoading}
                  loading={otpLoading}
                  variant="primary"
                  className="w-full mb-4"
                >
                  Send OTP
                </Button>
              )}

              {otpSent && (
                <>
                  {/* OTP Input Fields */}
                  <div className="flex gap-2 mb-4 justify-center">
                    {otpValues.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => onOtpInput(index, e.target.value)}
                        maxLength={1}
                        className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-saffron-600 transition-all"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="text-red-500 text-sm text-center mb-4 flex items-center justify-center gap-1">
                      <AlertCircle size={14} /> {otpError}
                    </p>
                  )}

                  <Button
                    onClick={onVerifyOtp}
                    disabled={otpLoading || otpVerified}
                    loading={otpLoading}
                    variant="primary"
                    className="w-full mb-4"
                  >
                    Verify OTP
                  </Button>

                  {resendTimer > 0 ? (
                    <p className="text-center text-sm text-gray-600">
                      Resend OTP in {resendTimer}s
                    </p>
                  ) : (
                    <Button
                      onClick={onResendOtp}
                      variant="secondary"
                      className="w-full"
                    >
                      Resend OTP
                    </Button>
                  )}
                </>
              )}

              <Button
                onClick={onCloseOtpModal}
                variant="secondary"
                className="w-full mt-4"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

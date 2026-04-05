import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, AlertCircle, Mail, Phone, Lock, ArrowRight, Award } from 'lucide-react';
import { Button } from '../atoms';
import { 
  FormGroup, 
  ValidationMessage, 
  PersonalInfoFields, 
  AcademicMarksField, 
  QualificationField, 
  PassingDateFields,
  TermsAgreement 
} from '../molecules';
import { MeritFormData, ValidationErrors, SubmitStatus, OTPVerificationStatus } from '../../containers/MeritFormContainer';

interface MeritFormPresenterProps {
  /* Submission Method */
  selectedMethod: 'download' | 'online' | null;
  onSelectMethod: (method: 'download' | 'online') => void;
  
  /* Form Data */
  formData: MeritFormData;
  validationErrors: ValidationErrors;
  
  /* Form Handlers */
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onMarksTypeChange: (type: 'percentage' | 'cgpa') => void;
  onSubmitForm: (e: React.FormEvent) => void;
  onResetForm: () => void;
  
  /* Download Handler */
  onDownloadForm: () => void;
  
  /* Submission Status */
  submitStatus: SubmitStatus;
  isSubmitting: boolean;
  
  /* OTP Modal State */
  showOtpModal: boolean;
  onCloseOtpModal: () => void;
  
  /* OTP Data & Handlers */
  otpValues: string[];
  otpStatus: OTPVerificationStatus;
  otpError: string;
  resendTimer: number;
  onOtpInput: (index: number, value: string) => void;
  onSendOtp: () => Promise<void>;
  onVerifyOtp: () => Promise<void>;
  onResendOtp: () => Promise<void>;
  
  /* App Data */
  qualifications: Array<{ id: string; value: string; label: string }>;
}

/**
 * MeritFormPresenter - Dumb Component (Presenter)
 * 
 * Responsibilities:
 * - Render form UI with all sections
 * - Display validation errors
 * - Render OTP modal
 * - Call handlers from props (no state mutations)
 * 
 * This is the "view" of the form - all rendering logic lives here.
 * No state management, no business logic, only UI rendering.
 */
export const MeritFormPresenter: React.FC<MeritFormPresenterProps> = ({
  selectedMethod,
  onSelectMethod,
  formData,
  validationErrors,
  onFormChange,
  onMarksTypeChange,
  onSubmitForm,
  onResetForm,
  onDownloadForm,
  submitStatus,
  isSubmitting,
  showOtpModal,
  onCloseOtpModal,
  otpValues,
  otpStatus,
  otpError,
  resendTimer,
  onOtpInput,
  onSendOtp,
  onVerifyOtp,
  onResendOtp,
  qualifications
}) => {
  const isOtpSent = otpStatus !== 'idle' && otpStatus !== 'error' && otpStatus !== 'sending';
  const isOtpVerified = otpStatus === 'verified';
  const isOtpLoading = otpStatus === 'sending' || otpStatus === 'verifying';

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
                <Award size={32} />
                <h1 className="text-4xl sm:text-5xl font-bold font-heading">Merit Registration</h1>
              </div>
              <p className="text-lg sm:text-xl opacity-90">Submit your academic records</p>
            </motion.div>
          </div>
        </section>

        {/* Submission Choice Section - Download Banner */}
        <section className="w-full py-12 sm:py-16 bg-gradient-to-r from-saffron-500 via-saffron-600 to-orange-600 text-white relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mb-48"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
            {/* Main Download Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-10 mb-8 border border-white/20"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                {/* Left Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-saffron-100 p-3 rounded-lg">
                      <BookOpen size={32} className="text-saffron-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-saffron-700">ऑफलाइन फॉर्म डाउनलोड करें</h2>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    फॉर्म को डाउनलोड करें, ध्यान से भरें, और अपने नज़दीकी केंद्र पर जमा करें। या फिर नीचे दिया गया फॉर्म भरिये और सीधे ऑनलाइन जमा करें। दोनों ही तरीके से आप मेरिट लिस्ट में रजिस्टर कर सकते हैं।
                  </p>
                </div>

                {/* Right Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <Button
                    onClick={onDownloadForm}
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-saffron-600 to-orange-600 text-white hover:shadow-2xl whitespace-nowrap"
                  >
                    <ArrowRight size={20} className="mr-2" />
                    डाउनलोड करें
                  </Button>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Online Form Section */}
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
                    <h3 className="font-bold text-green-900 text-lg">Registration Successful!</h3>
                    <p className="text-green-700 text-sm mt-1">Your merit list entry has been submitted successfully. Your records will be reviewed for the merit program.</p>
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
                    <h3 className="font-bold text-red-900 text-lg">Submission Error</h3>
                    <p className="text-red-700 text-sm mt-1">There was an error submitting your form. Please try again.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg"
            >
              <form onSubmit={onSubmitForm}>
                {/* Personal Information Section */}
                <div id="personalInfoSection" className="mb-10">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">
                    Personal Information
                  </h2>
                  <PersonalInfoFields
                    formData={{
                      fullName: formData.fullName,
                      email: formData.email,
                      mobileNumber: formData.mobile
                    }}
                    errors={{
                      fullName: validationErrors.fullName,
                      email: validationErrors.email,
                      mobileNumber: validationErrors.mobile
                    }}
                    onChange={onFormChange}
                    contactPhoneNumberHelp="We'll send OTP to this number for verification"
                  />
                </div>

                {/* Academic Information Section */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">
                    Academic Records
                  </h2>

                  {/* Qualification Field */}
                  <div className="mb-8">
                    <QualificationField
                      formData={{
                        qualification: formData.completedQualification,
                        phdSpecialization: formData.otherQualification
                      }}
                      errors={{
                        qualification: validationErrors.completedQualification,
                        phdSpecialization: validationErrors.otherQualification
                      }}
                      onChange={onFormChange}
                      qualifications={qualifications}
                    />
                  </div>

                  {/* Passing Date Fields */}
                  <div className="mb-8">
                    <PassingDateFields
                      passingMonth={formData.passingMonth}
                      passingYear={formData.passingYear}
                      errors={{
                        passingMonth: validationErrors.passingMonth,
                        passingYear: validationErrors.passingYear
                      }}
                      onChange={onFormChange}
                    />
                  </div>

                  {/* Academic Marks Field */}
                  <div className="mb-8">
                    <AcademicMarksField
                      marksType={formData.marksType}
                      marksValue={formData.marksValue}
                      marksError={validationErrors.marksValue}
                      onMarksTypeChange={onMarksTypeChange}
                      onMarksValueChange={onFormChange}
                      markLabel="Enter Your Marks"
                    />
                  </div>
                </div>

                {/* Document Reference Section */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">
                    Document Reference
                  </h2>
                  <FormGroup
                    label="Marksheet/Certificate Reference ID"
                    required
                    error={validationErrors.documentReference}
                    helperText="This helps us track your marksheets/certificates"
                  >
                    <input
                      type="text"
                      id="documentReference"
                      name="documentReference"
                      value={formData.documentReference}
                      onChange={onFormChange}
                      placeholder="e.g., MKSH-2024-0001 (or roll number/reference ID)"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.documentReference
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100'
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                  </FormGroup>
                </div>

                {/* Additional Information Section */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">
                    Additional Information
                  </h2>
                  <FormGroup
                    label="Remarks (Optional)"
                    helperText="Any additional information about your academic achievements"
                  >
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={onFormChange}
                      placeholder="Any additional information about your academic achievements"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron-600 focus:ring-2 focus:ring-saffron-100 transition-all resize-vertical"
                    />
                  </FormGroup>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isOtpVerified}
                    isLoading={isSubmitting}
                    variant="primary"
                    size="lg"
                    className="flex-1"
                  >
                    <Mail size={20} /> Submit Registration
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Lock className="text-blue-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Verify Mobile Number</h2>
                <p className="text-gray-600 text-sm mt-2">Enter the OTP sent to {formData.mobile}</p>
              </div>

              {!isOtpSent && (
                <Button
                  onClick={onSendOtp}
                  disabled={isOtpLoading}
                  isLoading={isOtpLoading}
                  variant="primary"
                  className="w-full mb-4"
                >
                  Send OTP
                </Button>
              )}

              {isOtpSent && (
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
                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-lg font-bold"
                        disabled={isOtpVerified}
                      />
                    ))}
                  </div>

                  {/* Error Message */}
                  {otpError && (
                    <div className="mb-4">
                      <ValidationMessage message={otpError} type="error" />
                    </div>
                  )}

                  {/* Verify and Resend Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={onVerifyOtp}
                      disabled={isOtpVerified || isOtpLoading || otpValues.some(v => !v)}
                      isLoading={isOtpLoading}
                      variant="primary"
                      className="w-full"
                    >
                      {isOtpVerified ? 'Verified ✓' : 'Verify OTP'}
                    </Button>

                    {resendTimer > 0 ? (
                      <p className="text-center text-gray-600 text-sm">
                        Resend OTP in {resendTimer}s
                      </p>
                    ) : isOtpSent && !isOtpVerified ? (
                      <Button
                        onClick={onResendOtp}
                        variant="outline"
                        className="w-full"
                      >
                        Resend OTP
                      </Button>
                    ) : null}
                  </div>
                </>
              )}

              {/* Close Button */}
              <button
                onClick={onCloseOtpModal}
                disabled={isOtpLoading || isOtpVerified}
                className="w-full mt-4 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                {isOtpVerified ? 'Closing...' : 'Cancel'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

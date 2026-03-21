import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, AlertCircle, Mail, Phone, Lock, Users } from 'lucide-react';

// API Configuration - User can change this later
const API_CONFIG = {
  ENDPOINT: 'https://api.example.com/scholarship/submit',
  TIMEOUT: 30000
};

// Recommenders List
const RECOMMENDERS_LIST = [
  { 
    id: 'R001',
    name: 'Dr. Rajendra Singh', 
    role: 'Principal, Government Higher Secondary School',
    phone: '9876543210',
    email: 'rajendra.singh@ghss.edu.in'
  },
  { 
    id: 'R002',
    name: 'Mrs. Priya Sharma', 
    role: 'Educational Counselor, District Education Board',
    phone: '9765432109',
    email: 'priya.sharma@deb.gov.in'
  },
  { 
    id: 'R003',
    name: 'Sh. Vikram Patel', 
    role: 'Head, Social Welfare Department',
    phone: '9654321098',
    email: 'vikram.patel@welfare.gov.in'
  },
  { 
    id: 'R004',
    name: 'Prof. Anita Gupta', 
    role: 'Faculty, Community Development Center',
    phone: '9543210987',
    email: 'anita.gupta@cdc.org'
  },
  { 
    id: 'R005',
    name: 'Mr. Suresh Kumar', 
    role: 'District Coordinator, MPSSI',
    phone: '9432109876',
    email: 'suresh.kumar@mpssi.org'
  }
];

interface ValidationErrors {
  [key: string]: string;
}

interface ScholarshipFormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
  aadharNumber: string;
  qualification: string;
  percentage: string;
  schoolName: string;
  schoolDistrict: string;
  annualIncome: string;
  remark: string;
  recommenderId: string;
  submittedAt?: string;
}

// Dummy Data for Testing
const DUMMY_FORM_DATA: ScholarshipFormData = {
  fullName: 'Rajesh Kumar',
  fatherName: 'Mohan Kumar Singh',
  motherName: 'Priya Devi',
  dob: '2005-08-15',
  gender: 'Male',
  mobile: '9876543210',
  email: 'rajesh.kumar@email.com',
  address: 'Block No. 12, Sector 5, Sukhertaal, Near Government School',
  city: 'Muzaffarnagar',
  district: 'Muzaffarnagar',
  pincode: '251001',
  aadharNumber: '432109876543',
  qualification: 'Class 12 (PCM)',
  percentage: '87.5',
  schoolName: 'Government Higher Secondary School, Muzaffarnagar',
  schoolDistrict: 'Muzaffarnagar',
  annualIncome: '125000',
  remark: 'I am a meritorious student from a economically weaker section. I aspire to pursue engineering and contribute to society.',
  recommenderId: 'R001'
};

export const ScholarshipFormPage = () => {
  const [formData, setFormData] = useState<ScholarshipFormData>(DUMMY_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // OTP Modal States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Recommender Verification States
  const [selectedRecommender, setSelectedRecommender] = useState<any>(null);

  // Validation Functions
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.fatherName.trim()) errors.fatherName = "Father's name is required";
    if (!formData.motherName.trim()) errors.motherName = "Mother's name is required";
    if (!formData.dob) errors.dob = 'Date of birth is required';
    if (!formData.mobile) errors.mobile = 'Mobile number is required';
    else if (!/^[0-9]{10}$/.test(formData.mobile)) errors.mobile = 'Mobile must be 10 digits';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.pincode) errors.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) errors.pincode = 'Pincode must be 6 digits';
    if (!formData.aadharNumber) errors.aadharNumber = 'Aadhar number is required';
    else if (!/^[0-9]{12}$/.test(formData.aadharNumber)) errors.aadharNumber = 'Aadhar must be 12 digits';
    if (!formData.qualification.trim()) errors.qualification = 'Previous qualification is required';
    if (!formData.percentage) errors.percentage = 'Percentage is required';
    else if (parseFloat(formData.percentage) < 0 || parseFloat(formData.percentage) > 100) 
      errors.percentage = 'Percentage must be between 0-100';
    else if (parseFloat(formData.percentage) < 75) 
      errors.percentage = 'Minimum 75% required for scholarship';
    if (!formData.schoolName.trim()) errors.schoolName = 'School/College name is required';
    if (!formData.schoolDistrict.trim()) errors.schoolDistrict = 'School district is required';
    if (!formData.annualIncome) errors.annualIncome = 'Annual income is required';
    else if (parseFloat(formData.annualIncome) > 150000) 
      errors.annualIncome = 'Income must not exceed ₹1,50,000';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // OTP Functions
  const sendOtp = async () => {
    setOtpLoading(true);
    setOtpError('');
    try {
      // Simulate API call to send OTP
      console.log(`OTP sent to ${formData.mobile}`);
      // In real scenario, this would call your backend API
      // const response = await fetch(`${API_CONFIG.ENDPOINT}/send-otp`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobile: formData.mobile })
      // });
      
      setOtpSent(true);
      setResendTimer(60);
      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setOtpError('Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpInput = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    setOtpLoading(true);
    setOtpError('');
    try {
      // Simulate OTP verification
      console.log(`OTP verification: ${otpCode}`);
      // In real scenario:
      // const response = await fetch(`${API_CONFIG.ENDPOINT}/verify-otp`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobile: formData.mobile, otp: otpCode })
      // });

      // For demo: accept any 6 digit code
      if (otpCode === '000000') {
        setOtpError('Invalid OTP. Try again.');
        return;
      }

      setOtpVerified(true);
      await submitFormToApi();
    } catch (error) {
      setOtpError('OTP verification failed. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Submit Form to API
  const submitFormToApi = async () => {
    setIsSubmitting(true);
    try {
      const submissionData: ScholarshipFormData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      console.log('Submitting data:', JSON.stringify(submissionData, null, 2));

      // Mock API call - User will change the endpoint
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
      });

      if (response.ok) {
        setSubmitStatus('success');
        handleReset();
        setShowOtpModal(false);
        // Reset OTP
        setOtp(['', '', '', '', '', '']);
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      fatherName: '',
      motherName: '',
      dob: '',
      gender: 'Male',
      mobile: '',
      email: '',
      address: '',
      city: '',
      district: 'Muzaffarnagar',
      pincode: '',
      aadharNumber: '',
      qualification: '',
      percentage: '',
      schoolName: '',
      schoolDistrict: '',
      annualIncome: '',
      remark: '',
      recommenderId: ''
    });
    setValidationErrors({});
    setSubmitStatus('idle');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Show OTP modal
    setShowOtpModal(true);
    setOtpSent(false);
    setOtpVerified(false);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20 pb-20">
      {/* Header */}
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
            <form onSubmit={handleSubmitForm}>
              {/* Personal Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">Personal Information</h2>
                
                <div className="mb-6">
                  <div id="fullName">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name (first name and last name)"
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

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div id="fatherName">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Father's Name *</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      placeholder="Enter father's name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.fatherName 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.fatherName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.fatherName}</p>
                    )}
                  </div>
                  <div id="motherName">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Mother's Name *</label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                      placeholder="Enter mother's name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.motherName 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.motherName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.motherName}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div id="dob">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.dob 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.dob && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.dob}</p>
                    )}
                  </div>
                  <div id="gender">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.gender 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.gender}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div id="aadharNumber">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Aadhar Number *</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      required
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength="12"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.aadharNumber 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.aadharNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.aadharNumber}</p>
                    )}
                  </div>
                  <div id="mobile">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.mobile 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.mobile && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.mobile}</p>
                    )}
                  </div>
                </div>

                <div id="email">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.email 
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                        : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.email}</p>
                  )}
                </div>

                <div className="mt-6" id="address">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address, building name, etc."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.address 
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                        : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                    }`}
                  />
                  {validationErrors.address && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.address}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-6 mt-6">
                  <div id="city">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="City name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.city 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.city && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.city}</p>
                    )}
                  </div>
                  <div id="district">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      placeholder="District"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.district 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.district && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.district}</p>
                    )}
                  </div>
                  <div id="pincode">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      placeholder="6-digit pincode"
                      maxLength="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.pincode 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.pincode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">Academic Information</h2>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div id="qualification">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Last Class/Qualification *</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Class 12, B.Sc"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.qualification 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.qualification && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.qualification}</p>
                    )}
                  </div>
                  <div id="percentage">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Percentage (%) *</label>
                    <input
                      type="number"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 85.5"
                      step="0.01"
                      min="0"
                      max="100"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.percentage 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.percentage && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.percentage}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div id="schoolName">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">School/College Name *</label>
                    <input
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      required
                      placeholder="Institution name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.schoolName 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.schoolName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.schoolName}</p>
                    )}
                  </div>
                  <div id="schoolDistrict">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">School District *</label>
                    <input
                      type="text"
                      name="schoolDistrict"
                      value={formData.schoolDistrict}
                      onChange={handleChange}
                      required
                      placeholder="District of institution"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.schoolDistrict 
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                          : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                      }`}
                    />
                    {validationErrors.schoolDistrict && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.schoolDistrict}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">Financial Information</h2>
                
                <div className="mb-6" id="annualIncome">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Annual Family Income (₹) *</label>
                  <input
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 150000"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.annualIncome 
                        ? 'border-red-500 focus:border-red-600 focus:ring-red-100' 
                        : 'border-gray-300 focus:border-saffron-600 focus:ring-saffron-100'
                    }`}
                  />
                  {validationErrors.annualIncome && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {validationErrors.annualIncome}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Maximum limit: ₹1,50,000 (including all sources)</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3">Additional Information</h2>
                
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Remarks (Optional)</label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  placeholder="Any additional information about your situation, achievements, or goals"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron-600 focus:ring-2 focus:ring-saffron-100 transition-all"
                />
              </div>

              {/* Recommender Selection */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 border-b-2 border-saffron-600 pb-3 flex items-center gap-2">
                  <Users size={24} /> Who Recommended You?
                </h2>
                
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 font-semibold text-sm">
                    Select the person who recommended you for this scholarship. The recommender will be notified via WhatsApp/Email/SMS when you submit your application.
                  </p>
                </div>

                <div id="recommenderId">
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Recommender *</label>
                  <select
                    name="recommenderId"
                    value={formData.recommenderId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-saffron-600 focus:ring-2 focus:ring-saffron-100 transition-all mb-4"
                  >
                    <option value="">-- Select a Recommender --</option>
                    {RECOMMENDERS_LIST.map(rec => (
                      <option key={rec.id} value={rec.id}>
                        {rec.name} - {rec.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Recommender Details */}
                {formData.recommenderId && RECOMMENDERS_LIST.find(r => r.id === formData.recommenderId) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 bg-gradient-to-br from-saffron-50 to-white border border-saffron-200 rounded-2xl"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center text-saffron-600">
                        <Users size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">
                          {RECOMMENDERS_LIST.find(r => r.id === formData.recommenderId)?.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {RECOMMENDERS_LIST.find(r => r.id === formData.recommenderId)?.role}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>📧 Email:</strong> {RECOMMENDERS_LIST.find(r => r.id === formData.recommenderId)?.email}</p>
                      <p><strong>📞 WhatsApp:</strong> {RECOMMENDERS_LIST.find(r => r.id === formData.recommenderId)?.phone}</p>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                      ✓ This recommender will be notified after form submission
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting || otpVerified}
                  className="flex-1 bg-saffron-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-saffron-700 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Mail size={20} /> Submit Application
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !otpLoading && setShowOtpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 sm:p-10"
            >
              {!otpSent ? (
                // Phone Verification Step
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4 mx-auto">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">Verify Your Phone Number</h3>
                  <p className="text-gray-600 text-center mb-8">We'll send an OTP to verify your phone number before submission.</p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700 mb-2"><strong>Mobile Number:</strong></p>
                    <p className="text-lg font-bold text-gray-900">{formData.mobile}</p>
                  </div>

                  <button
                    onClick={sendOtp}
                    disabled={otpLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                  >
                    {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>

                  <button
                    onClick={() => setShowOtpModal(false)}
                    className="w-full mt-3 bg-gray-200 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </motion.div>
              ) : (
                // OTP Verification Step
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4 mx-auto">
                    <Lock className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">Enter OTP</h3>
                  <p className="text-gray-600 text-center mb-8">We've sent a 6-digit code to <strong>{formData.mobile}</strong></p>

                  {otpError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                      <p className="text-red-700 text-sm">{otpError}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-center gap-2 sm:gap-3 mb-8">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpInput(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            document.getElementById(`otp-${index - 1}`)?.focus();
                          }
                        }}
                        maxLength={1}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    ))}
                  </div>

                  <button
                    onClick={verifyOtp}
                    disabled={otpLoading || otp.join('').length !== 6}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
                  >
                    {otpLoading ? (
                      <>Verifying...</>
                    ) : (
                      <><CheckCircle size={20} /> Verify OTP</>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-600">
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Didn't receive code?"}
                    </span>
                    {resendTimer === 0 && (
                      <button
                        onClick={sendOtp}
                        disabled={otpLoading}
                        className="text-blue-600 font-bold text-sm hover:text-blue-700 disabled:opacity-50"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* API Endpoint Info Box */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 bg-green-50 border border-green-200 rounded-lg p-4 max-w-sm"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-green-900 text-sm">Submission Successful!</h4>
              <p className="text-green-700 text-xs mt-1">Your scholarship application has been submitted.</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

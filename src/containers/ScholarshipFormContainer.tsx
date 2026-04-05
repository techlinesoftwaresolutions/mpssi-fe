import React, { useState, useCallback } from 'react';
import { ScholarshipFormPresenter } from '@/components/organisms';

// ====================
// Configuration
// ====================
const API_CONFIG = {
  ENDPOINT: 'https://api.example.com/scholarship/submit',
  TIMEOUT: 30000
};

// ====================
// Data & Constants
// ====================
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

const DUMMY_FORM_DATA: ScholarshipFormData = {
  fullName: 'Rajesh Kumar',
  fatherName: 'Mohan Kumar Singh',
  motherName: 'Priya Devi',
  dob: '2005-08-15',
  gender: 'Male',
  mobile: '9876543210',
  email: 'rajesh.kumar@email.com',
  address: 'Block No. 12, Sector 5, Shukteerth, Near Government School',
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

// ====================
// Type Definitions
// ====================
export interface ScholarshipFormData {
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

export interface ValidationErrors {
  [key: string]: string;
}

// ====================
// ScholarshipFormContainer
// ====================
/**
 * ScholarshipFormContainer - Smart Component (Container)
 * 
 * Responsibilities:
 * - Manage form state (formData, validationErrors, OTP state)
 * - Handle validation logic
 * - Handle form submission and API calls
 * - Handle OTP send, verify, and resend logic
 * - Pass all props and handlers to ScholarshipFormPresenter
 * 
 * This is the "brain" of the form - all logic lives here.
 * The UI rendering is delegated to ScholarshipFormPresenter.
 */
export const ScholarshipFormContainer: React.FC = () => {
  // ==================== Form State ====================
  const [formData, setFormData] = useState<ScholarshipFormData>(DUMMY_FORM_DATA);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // ==================== Submission State ====================
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // ==================== OTP State ====================
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // ==================== Recommender State ====================
  const [selectedRecommender, setSelectedRecommender] = useState<any>(null);

  // ====================
  // Validation Functions
  // ====================
  const validateForm = useCallback((): boolean => {
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
  }, [formData]);

  // ====================
  // OTP Functions
  // ====================
  const sendOtp = useCallback(async () => {
    setOtpLoading(true);
    setOtpError('');
    try {
      console.log(`OTP sent to ${formData.mobile}`);
      // TODO: Implement real API call
      // const response = await fetch(`${API_CONFIG.ENDPOINT}/send-otp`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobile: formData.mobile })
      // });
      
      setOtpSent(true);
      setResendTimer(60);
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
  }, [formData.mobile]);

  const handleOtpInput = useCallback((index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  }, [otp]);

  const verifyOtp = useCallback(async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    setOtpLoading(true);
    setOtpError('');
    try {
      console.log(`OTP verification: ${otpCode}`);
      // TODO: Implement real API call
      // const response = await fetch(`${API_CONFIG.ENDPOINT}/verify-otp`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobile: formData.mobile, otp: otpCode })
      // });

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
  }, [otp]);

  const resendOtp = useCallback(() => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setResendTimer(0);
    sendOtp();
  }, [sendOtp]);

  // ====================
  // Form Functions
  // ====================
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);

  const handleReset = useCallback(() => {
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
  }, []);

  const handleSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setShowOtpModal(true);
    setOtpSent(false);
    setOtpVerified(false);
    setOtp(['', '', '', '', '', '']);
  }, [validateForm, validationErrors]);

  // ====================
  // API Submission
  // ====================
  const submitFormToApi = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const submissionData: ScholarshipFormData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      console.log('Submitting data:', JSON.stringify(submissionData, null, 2));

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
  }, [formData, handleReset]);

  // ====================
  // Render
  // ====================
  return (
    <ScholarshipFormPresenter
      // Form Data
      formData={formData}
      validationErrors={validationErrors}
      
      // Form Handlers
      onFormChange={handleChange}
      onSubmitForm={handleSubmitForm}
      onResetForm={handleReset}
      
      // Submission Status
      submitStatus={submitStatus}
      isSubmitting={isSubmitting}
      
      // OTP Modal
      showOtpModal={showOtpModal}
      onCloseOtpModal={() => setShowOtpModal(false)}
      
      // OTP State & Handlers
      otpValues={otp}
      otpSent={otpSent}
      otpVerified={otpVerified}
      otpError={otpError}
      otpLoading={otpLoading}
      resendTimer={resendTimer}
      onOtpInput={handleOtpInput}
      onSendOtp={sendOtp}
      onVerifyOtp={verifyOtp}
      onResendOtp={resendOtp}
      
      // Recommenders
      recommenders={RECOMMENDERS_LIST}
      selectedRecommender={selectedRecommender}
      onSelectRecommender={setSelectedRecommender}
    />
  );
};

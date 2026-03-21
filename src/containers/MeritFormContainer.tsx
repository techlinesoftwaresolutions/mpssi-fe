import React, { useState, useCallback } from 'react';
import appData from '@/data/appData.json';
import { MeritFormPresenter } from '@/components/organisms';
import { API_CONFIG } from '@/config/formConfig';

export interface MeritFormData {
  fullName: string;
  email: string;
  mobile: string;
  completedQualification: string;
  marksType: 'percentage' | 'cgpa';
  marksValue: string;
  otherQualification?: string;
  passingMonth: string;
  passingYear: string;
  documentReference: string;
  remarks: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export type OTPVerificationStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error';
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM_DATA: MeritFormData = {
  fullName: '',
  email: '',
  mobile: '',
  completedQualification: '',
  marksType: 'percentage',
  marksValue: '',
  otherQualification: '',
  passingMonth: '',
  passingYear: '',
  documentReference: '',
  remarks: ''
};

/**
 * MeritFormContainer - Smart Component (Container)
 * 
 * Responsibilities:
 * - Manage form state (formData, validationErrors, OTP state)
 * - Handle validation logic (validateForm, validateField)
 * - Handle form submission and API calls
 * - Handle OTP send, verify, and resend logic
 * - Manage file download for form template
 * - Pass all props and handlers to MeritFormPresenter
 * 
 * This is the "brain" of the form - all logic lives here.
 * The UI rendering is delegated to MeritFormPresenter.
 */
export const MeritFormContainer: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState<MeritFormData>(INITIAL_FORM_DATA);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Submission State
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // OTP State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpStatus, setOtpStatus] = useState<OTPVerificationStatus>('idle');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  /**
   * Validation Functions
   */
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const validateForm = (data: MeritFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Full Name validation
    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    // Email validation
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Mobile validation
    if (!data.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!validateMobile(data.mobile)) {
      errors.mobile = 'Mobile must be 10 digits';
    }

    // Qualification validation
    if (!data.completedQualification) {
      errors.completedQualification = 'Please select your completed qualification';
    }

    // Other/PhD Qualification validation
    if ((data.completedQualification === 'Other' || data.completedQualification === 'PhD') && 
        !data.otherQualification?.trim()) {
      errors.otherQualification = 'Please specify your qualification';
    }

    // Passing Month validation
    if (!data.passingMonth) {
      errors.passingMonth = 'Passing month is required';
    }

    // Passing Year validation
    if (!data.passingYear) {
      errors.passingYear = 'Passing year is required';
    }

    // Marks validation
    if (!data.marksValue) {
      errors.marksValue = 'Marks are required';
    } else {
      const marks = parseFloat(data.marksValue);
      if (data.marksType === 'percentage') {
        if (marks < 0 || marks > 100) {
          errors.marksValue = 'Percentage must be between 0-100';
        }
      } else {
        if (marks < 0 || marks > 10) {
          errors.marksValue = 'CGPA must be between 0-10';
        }
      }
    }

    // Document Reference validation
    if (!data.documentReference.trim()) {
      errors.documentReference = 'Document reference is required';
    }

    return errors;
  };

  /**
   * Handle Form Changes
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    setValidationErrors(prev => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  /**
   * Handle Marks Type Change (percentage/cgpa)
   */
  const handleMarksTypeChange = useCallback((type: 'percentage' | 'cgpa') => {
    setFormData(prev => ({
      ...prev,
      marksType: type,
      marksValue: '' // Reset value when changing type
    }));
  }, []);

  /**
   * Handle Form Reset
   */
  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setValidationErrors({});
    setSubmitStatus('idle');
    setShowOtpModal(false);
    setOtp(['', '', '', '', '', '']);
    setOtpStatus('idle');
    setOtpError('');
  }, []);

  /**
   * Handle Form Submit (Open OTP Modal)
   */
  const handleSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Validate form using current formData
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      // Update validation errors state
      setValidationErrors(errors);
      
      // Scroll to first error field
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Form is valid - Clear errors and open OTP modal
    setValidationErrors({});
    setShowOtpModal(true);
    setOtpStatus('idle');
    setOtpError('');
  }, [formData]);

  /**
   * Generate Form Template for Download
   */
  const downloadFormTemplate = useCallback(() => {
    const formTemplate = `
महर्षि प्रजापति समिति, शुक्रतीर्थ
Merit Registration Form
शैक्षणिक सत्र 2025-26

================================================
व्यक्तिगत जानकारी (Personal Information)
================================================

पूरा नाम (Full Name): ___________________________________
ईमेल (Email): ___________________________________
मोबाइल नंबर (Mobile Number): ___________________________________

================================================
शैक्षणिक रिकॉर्ड (Academic Records)
================================================

आपने इस वर्ष कौन सी क्लास पास की है?
(Which class did you complete this year?)
[ ] 10th UP Board
[ ] 12th UP Board
[ ] Graduation (BA/BSc/BCom/etc.)
[ ] Masters (MA/MSc/MBA/etc.)
[ ] PhD
[ ] MBBS
[ ] BAMS
[ ] अन्य (Other): ___________________________________

पास करने का महीना (Passing Month): ___________________________________
पास करने का वर्ष (Passing Year): ___________________________________

अंक का प्रकार (Marks Type):
[ ] Percentage [ ] CGPA

प्राप्त अंक (Marks/CGPA): ___________________________________

================================================
दस्तावेज संदर्भ (Document Reference)
================================================

मार्कशीट/सर्टिफिकेट संदर्भ ID
(Marksheet/Certificate Reference ID): ___________________________________

================================================
अतिरिक्त जानकारी (Additional Information)
================================================

टिप्पणियां (Remarks):
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

================================================
दिशा-निर्देश (Important Instructions)
================================================

✓ सभी विवरण मार्कशीट के अनुसार भरें
  (Fill all details according to marksheet)

✓ पूरा फॉर्म अंग्रेज़ी में भरें
  (Fill form entirely in English)

✓ यह फॉर्म शैक्षणिक सत्र 2025-26 के लिए मान्य है
  (This form is valid for academic session 2025-26)

================================================
नोट: यह फॉर्म भरकर निम्न में से किसी भी तरीके से जमा करें:
Note: Submit this form by any of the following methods:

1. ईमेल द्वारा (Via Email): applications@mpssiwelfare.org
2. व्यक्तिगत रूप से (In Person): महर्षि प्रजापति समिति कार्यालय
3. ऑनलाइन (Online): www.mpssiwelfare.org/merit-form

================================================
`;

    const element = document.createElement('a');
    const file = new Blob([formTemplate], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Merit_Registration_Form.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, []);

  /**
   * OTP Send Handler
   */
  const handleSendOtp = useCallback(async () => {
    setOtpStatus('sending');
    setOtpError('');
    
    try {
      // Simulate OTP send
      console.log(`OTP sent to ${formData.mobile}`);
      setOtpStatus('sent');
      
      // Start resend timer (60 seconds) with proper cleanup
      setResendTimer(60);
      let timeRemaining = 60;
      
      const timer = setInterval(() => {
        timeRemaining -= 1;
        setResendTimer(Math.max(0, timeRemaining));
        
        if (timeRemaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    } catch (error) {
      console.error('OTP send error:', error);
      setOtpStatus('error');
      setOtpError('Failed to send OTP. Please try again.');
    }
  }, [formData.mobile]);

  /**
   * Submit Form to API
   */
  const submitFormToApi = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitStatus('submitting');

    try {
      // Prepare clean submission data
      const { ...cleanFormData } = formData;
      const submissionData = {
        ...cleanFormData,
        submittedAt: new Date().toISOString()
      };

      console.log('Submitting data:', JSON.stringify(submissionData, null, 2));

      // Create abort controller for timeout management
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), API_CONFIG.TIMEOUT);
      
      try {
        const response = await fetch(API_CONFIG.ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
          signal: abortController.signal
        });

        if (response.ok) {
          setSubmitStatus('success');
          setShowOtpModal(false);
          // Reset form after successful submission
          setTimeout(() => {
            handleReset();
          }, 3000);
        } else {
          setSubmitStatus('error');
          console.error('API response error:', response.status, response.statusText);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setOtpError('Request timeout. Please try again.');
        } else {
          setOtpError(error.message || 'An error occurred during submission');
        }
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, handleReset]);

  /**
   * OTP Input Handler
   */
  const handleOtpInput = useCallback((index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  }, [otp]);

  /**
   * OTP Verify Handler
   */
  const handleVerifyOtp = useCallback(async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    setOtpStatus('verifying');
    setOtpError('');

    try {
      // Simulate OTP verification
      console.log(`OTP verification: ${otpCode}`);
      
      // Demo: reject OTP 000000
      if (otpCode === '000000') {
        setOtpStatus('error');
        setOtpError('Invalid OTP. Try again.');
        return;
      }

      // OTP verified successfully
      setOtpStatus('verified');
      
      // Call submit after OTP verification
      await submitFormToApi();
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpStatus('error');
      setOtpError('OTP verification failed. Please try again.');
    }
  }, [otp, submitFormToApi]);

  /**
   * Handle Resend OTP
   */
  const handleResendOtp = useCallback(() => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setResendTimer(0);
    handleSendOtp();
  }, [handleSendOtp]);

  /**
   * Render the Presenter Component with all props
   */
  return (
    <MeritFormPresenter
      /* Form Data */
      formData={formData}
      validationErrors={validationErrors}
      
      /* Form Handlers */
      onFormChange={handleChange}
      onMarksTypeChange={handleMarksTypeChange}
      onSubmitForm={handleSubmitForm}
      onResetForm={handleReset}
      
      /* Download Handler */
      onDownloadForm={downloadFormTemplate}
      
      /* Submission Status */
      submitStatus={submitStatus}
      isSubmitting={isSubmitting}
      
      /* OTP Modal State */
      showOtpModal={showOtpModal}
      onCloseOtpModal={() => setShowOtpModal(false)}
      
      /* OTP Data & Handlers */
      otpValues={otp}
      otpStatus={otpStatus}
      otpError={otpError}
      resendTimer={resendTimer}
      onOtpInput={handleOtpInput}
      onSendOtp={handleSendOtp}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      
      /* App Data */
      qualifications={appData.qualifications}
    />
  );
};

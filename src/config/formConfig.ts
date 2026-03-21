/**
 * Form Configuration File
 * 
 * Centralized configuration for the Merit Registration Form
 * Contains all form-specific constants that can be easily modified
 * without touching component code
 * 
 * Benefits:
 * - Easy to update validation rules, API endpoints, etc.
 * - Single source of truth for form configuration
 * - Enables multi-language support by changing constants
 * - Decouples configuration from presentation logic
 */

// API Configuration
export const API_CONFIG = {
  ENDPOINT: 'https://api.example.com/merit-list/submit',
  TIMEOUT: 30000,
  OTP_ENDPOINT: 'https://api.example.com/otp/send',
  OTP_VERIFY_ENDPOINT: 'https://api.example.com/otp/verify',
  RESEND_DELAY: 60 // seconds
};

// Validation Rules
export const VALIDATION_RULES = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]*$/, // Only letters and spaces
    message: 'Full name must contain only letters and spaces'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  mobile: {
    required: true,
    pattern: /^[0-9]{10}$/,
    length: 10,
    message: 'Mobile must be 10 digits'
  },
  marksPercentage: {
    required: true,
    min: 0,
    max: 100,
    message: 'Percentage must be between 0-100'
  },
  marksCGPA: {
    required: true,
    min: 0,
    max: 10,
    step: 0.01,
    message: 'CGPA must be between 0-10'
  },
  documentReference: {
    required: true,
    minLength: 3,
    maxLength: 50,
    message: 'Invalid document reference'
  },
  remarks: {
    required: false,
    maxLength: 500,
    message: 'Remarks must not exceed 500 characters'
  }
};

// Form Field Defaults
export const FORM_DEFAULTS = {
  fullName: '',
  email: '',
  mobile: '',
  completedQualification: '',
  marksType: 'percentage' as const,
  marksValue: '',
  otherQualification: '',
  passingMonth: '',
  passingYear: '',
  documentReference: '',
  remarks: ''
};

// Form Sections Order (for rendering sequence)
export const FORM_SECTIONS = {
  PERSONAL_INFO: 'Personal Information',
  ACADEMIC_RECORDS: 'Academic Records',
  DOCUMENT_REFERENCE: 'Document Reference',
  ADDITIONAL_INFO: 'Additional Information'
} as const;

// OTP Configuration
export const OTP_CONFIG = {
  LENGTH: 6,
  RESEND_DELAY: 60, // seconds
  MAX_ATTEMPTS: 5,
  DEMO_OTP: '000000' // Demo mode - use this to test invalid OTP
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Your merit list entry has been submitted successfully. Your records will be reviewed for the merit program.',
  OTP_SENT: 'OTP has been sent to your mobile number',
  OTP_VERIFIED: 'Mobile number verified successfully',
  FORM_RESET: 'Form has been cleared'
};

// Error Messages
export const ERROR_MESSAGES = {
  FORM_VALIDATION_FAILED: 'Please fill all required fields correctly',
  OTP_SEND_FAILED: 'Failed to send OTP. Please try again.',
  OTP_VERIFY_FAILED: 'OTP verification failed. Please try again.',
  OTP_INVALID: 'Invalid OTP. Try again.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  FORM_SUBMIT_FAILED: 'There was an error submitting your form. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  AGREEMENT_REQUIRED: 'कृपया पहले सहमति बॉक्स को चेक करें।'
};

// Form Download Template
export const FORM_TEMPLATE = `
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

// Month Options
export const MONTHS = [
  { value: '', label: 'Select Month' },
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
] as const;

// Year Options Generator
export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [{ value: '', label: 'Select Year' }];
  for (let i = currentYear; i >= currentYear - 40; i--) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};

// Marks Type Options
export const MARKS_TYPE_OPTIONS = [
  { value: 'percentage', label: 'Percentage (%)' },
  { value: 'cgpa', label: 'CGPA (0-10)' }
] as const;

// Feature Flags
export const FEATURES = {
  ENABLE_FORM_DOWNLOAD: true,
  ENABLE_ONLINE_SUBMISSION: true,
  ENABLE_OTP_VERIFICATION: true,
  ENABLE_EMAIL_NOTIFICATIONS: false, // Future feature
  ENABLE_SMS_NOTIFICATIONS: false // Future feature
} as const;

// Form Submission Methods
export const SUBMISSION_METHODS = {
  DOWNLOAD: 'download',
  ONLINE: 'online'
} as const;

// Export all configurations as a single object for easy access
export const FORM_CONFIG = {
  API: API_CONFIG,
  VALIDATION: VALIDATION_RULES,
  DEFAULTS: FORM_DEFAULTS,
  SECTIONS: FORM_SECTIONS,
  OTP: OTP_CONFIG,
  MESSAGES: {
    SUCCESS: SUCCESS_MESSAGES,
    ERROR: ERROR_MESSAGES
  },
  TEMPLATE: FORM_TEMPLATE,
  MONTHS,
  MARKS_TYPE_OPTIONS,
  FEATURES,
  SUBMISSION_METHODS
};

export default FORM_CONFIG;

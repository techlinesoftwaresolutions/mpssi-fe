// Merit Form Constants and Static Strings

export const MERIT_FORM_CONSTANTS = {
  // Form Configuration
  API: {
    ENDPOINT: 'https://api.example.com/merit-list/submit',
    TIMEOUT: 30000,
  },

  // OTP Configuration
  OTP: {
    LENGTH: 6,
    RESEND_TIMER: 60,
    INVALID_CODE: '000000',
  },

  // Validation Rules
  VALIDATION: {
    TENTH_MIN_MARKS: 75,
    TWELFTH_MIN_MARKS: 70,
    GRADUATION_MIN_MARKS: 60,
    MOBILE_LENGTH: 10,
  },

  // Form Year Range
  YEAR_RANGE: {
    CURRENT_OFFSET: 0,
    LAST_YEAR_OFFSET: 1,
  },
} as const;

// UI Strings - English
export const MERIT_FORM_STRINGS = {
  // Page Title and Subtitle
  PAGE: {
    TITLE: 'Merit Registration',
    SUBTITLE: 'Submit your academic records',
  },

  // Section Headings
  SECTIONS: {
    PERSONAL_INFO: 'Personal Information',
    ACADEMIC_RECORDS: 'Academic Records',
    DOCUMENT_REFERENCE: 'Document Reference',
    ADDITIONAL_INFO: 'Additional Information',
    SUBMISSION_METHOD: 'Choose Your Submission Method',
  },

  // Form Labels
  LABELS: {
    FULL_NAME: 'Full Name',
    EMAIL: 'Email Address',
    MOBILE: 'Mobile Number',
    QUALIFICATION: 'Which class did you complete this year?',
    PASSING_MONTH: 'Passing Month',
    PASSING_YEAR: 'Passing Year',
    MARKS_TYPE: 'Enter Your Marks',
    MARKS_VALUE: 'Enter your marks',
    DOCUMENT_REF: 'Marksheet/Certificate Reference ID',
    REMARKS: 'Remarks (Optional)',
  },

  // Form Placeholders
  PLACEHOLDERS: {
    FULL_NAME: 'Enter your full name',
    EMAIL: 'your.email@example.com',
    MOBILE: '10-digit mobile number',
    DOCUMENT_REF: 'e.g., MKSH-2024-0001 (or roll number/reference ID)',
    MARKS: 'Enter your marks',
    REMARKS: 'Any additional information about your academic achievements',
  },

  // Form Options
  OPTIONS: {
    MARKS_TYPE: {
      PERCENTAGE: 'Percentage',
      CGPA: 'CGPA',
    },
    MONTH: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    MONTH_SELECT: 'Select Month',
    YEAR_SELECT: 'Select Year',
    QUALIFICATION_SELECT: 'Select',
  },

  // Form Buttons
  BUTTONS: {
    SUBMIT: 'Submit Registration',
    CLEAR: 'Clear Form',
    ACCEPT: 'स्वीकार करें',
    CLOSE: 'Close',
    DOWNLOAD: 'Download Form',
    FILL_NOW: 'Fill Form Now',
    SEND_OTP: 'Send OTP',
    VERIFY_OTP: 'Verify OTP',
    RESEND_OTP: 'Resend OTP',
  },

  // Validation Messages
  VALIDATION: {
    REQUIRED: 'is required',
    FULL_NAME_REQUIRED: 'Full name is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email format',
    MOBILE_REQUIRED: 'Mobile number is required',
    MOBILE_INVALID: 'Mobile must be 10 digits',
    QUALIFICATION_REQUIRED: 'Please select your completed qualification',
    TENTH_REQUIRED: '10th marks are required',
    TWELFTH_REQUIRED: '12th marks are required',
    GRADUATION_REQUIRED: 'Graduation marks are required',
    MARKS_RANGE: 'Marks must be between 0-100',
    TENTH_MIN: 'Minimum 75% required in 10th',
    TWELFTH_MIN: 'Minimum 70% required in 12th',
    GRADUATION_MIN: 'Minimum 60% required in Graduation',
    DOCUMENT_REF_REQUIRED: 'Document reference is required',
    MONTH_REQUIRED: 'Passing month is required',
    YEAR_REQUIRED: 'Passing year is required',
    OTP_INCOMPLETE: 'Please enter all 6 digits',
    OTP_INVALID: 'Invalid OTP. Try again.',
    OTP_FAILED: 'OTP verification failed. Please try again.',
  },

  // OTP Messages
  OTP: {
    TITLE: 'Verify Mobile Number',
    SUBTITLE: 'Enter the OTP sent to',
    SENT: 'Sending...',
    VERIFYING: 'Verifying...',
    VERIFIED: 'Mobile Verified!',
    SUBMITTING: 'Your form is being submitted...',
    RESEND_IN: 's',
    LABEL: 'Enter 6-digit OTP',
  },

  // Success Messages
  SUCCESS: {
    TITLE: 'Success!',
    MESSAGE: 'Your merit list registration has been submitted successfully.',
    REGISTRATION: 'Registration Successful!',
    REGISTRATION_DESC: 'Your merit list entry has been submitted successfully. Your records will be reviewed for the merit program.',
  },

  // Error Messages
  ERROR: {
    TITLE: 'Submission Error',
    MESSAGE: 'There was an error submitting your form. Please try again.',
  },

  // Download Form Strings
  DOWNLOAD: {
    TITLE: 'Download Form',
    DESC: 'Download the merit form, fill it offline, and submit it in person or via email.',
    BUTTON: 'Download Form',
  },

  // Popup Instructions - Hindi + English
  INSTRUCTIONS: {
    TITLE: 'दिशा-निर्देश (फॉर्म भरने से पहले ध्यानपूर्वक पढ़ें)',
    PARA1: 'यह फॉर्म महर्षि प्रजापति समिति, शुक्रतीर्थ के लिए डेटा एकत्र करेगा, जिसका कोई अन्य उपयोग नहीं किया जाएगा।',
    PARA2: 'कृपया सभी विवरण मार्कशीट के अनुसार और पूरी जिम्मेदारी से भरें। बाद में सत्यापन किया जाएगा।',
    PARA3: 'कृपया पूरा फॉर्म अंग्रेज़ी में ही भरें, क्योंकि हिंदी में भरने में आपको कठिनाई हो सकती है।',
    PARA4: 'यह फॉर्म केवल शैक्षणिक सत्र 2025-26 के लिए मान्य है और इसी वर्ष का डेटा एकत्र करता है।',
    CRITERIA_TITLE: 'इस फॉर्म को केवल वही अभ्यर्थी भरें:',
    CRITERIA1: 'जिन्होंने इस वर्ष परीक्षा उत्तीर्ण की है।',
    CRITERIA2: 'जिन्होंने 10वीं में कम से कम 75% या 12वीं में कम से कम 70% अंक प्राप्त किए हैं।',
    CRITERIA3: 'जिन्होंने ग्रेजुएशन में 60% और उससे अधिक अंक प्राप्त किए हैं।',
    AGREEMENT: 'मैंने दिशा-निर्देश पढ़ लिए हैं और सहमत हूं।',
    NOT_AGREED_MSG: 'कृपया पहले सहमति बॉक्स को चेक करें।',
  },

  // Form Info Box
  INFO_BOX: {
    ICON: '📅',
    TITLE: 'Important:',
    MESSAGE: 'Only enter qualifications completed between September 2025 to November 2024',
  },

  // Submission Methods
  SUBMISSION_METHODS: {
    DOWNLOAD_TITLE: 'Download Form',
    FILL_ONLINE_TITLE: 'Fill Online',
    DOWNLOAD_DESC: 'Download the merit form, fill it offline, and submit it in person or via email.',
    FILL_ONLINE_DESC: 'Fill the form here and submit with mobile number verification for instant confirmation.',
  },

  // Months
  MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  // Aria Labels & Accessibility
  ARIA: {
    CLOSE_MODAL: 'Close modal',
    DISMISS_ALERT: 'Dismiss alert',
    SCROLL_TO_FORM: 'Scroll to form',
  },
} as const;

// Hindi Translations
export const HINDI_STRINGS = {
  // ... Hindi translations would go here
  // For now, we'll keep English as primary
} as const;

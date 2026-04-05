import React, { useState } from 'react';
import { ContactPresenter } from '@/components/organisms/ContactPresenter';
import { useScroll } from '@/hooks/useScroll';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  message: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM_DATA: ContactFormData = {
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  message: ''
};

/**
 * ContactContainer - Smart Component (Container)
 * 
 * Responsibilities:
 * - Manage form state (formData, validationErrors, submitStatus)
 * - Handle validation logic (validateForm, validateField)
 * - Handle form submission
 * - Pass all props and handlers to ContactPresenter
 * 
 * This is the "brain" of the form - all logic lives here.
 * The UI rendering is delegated to ContactPresenter.
 */
export const ContactContainer: React.FC = () => {
  useScroll();

  // Form State
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Submission State
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validation Functions
   */
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const validateForm = (data: ContactFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // First Name validation
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (data.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (data.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    // Mobile validation
    if (!data.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!validateMobile(data.mobile)) {
      errors.mobile = 'Mobile must be 10 digits';
    }

    // Email validation (optional but if provided must be valid)
    if (data.email && !validateEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Message validation
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  /**
   * Handle Form Changes
   */
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Handle Form Submission
   */
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const errors = validateForm(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitStatus('error');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus('submitting');

      // Simulate API call or actual submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus('success');
      setFormData(INITIAL_FORM_DATA);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle Form Reset
   */
  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setValidationErrors({});
    setSubmitStatus('idle');
  };

  return (
    <ContactPresenter
      formData={formData}
      validationErrors={validationErrors}
      onFormChange={handleFormChange}
      onSubmitForm={handleSubmitForm}
      onResetForm={handleResetForm}
      submitStatus={submitStatus}
      isSubmitting={isSubmitting}
    />
  );
};

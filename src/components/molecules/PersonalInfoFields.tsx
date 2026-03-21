import React from 'react';
import { Input } from '../atoms';
import { FormGroup } from './FormGroup';

interface PersonalInfoFieldsProps {
  formData: {
    fullName: string;
    email: string;
    mobileNumber: string;
  };
  errors: {
    fullName?: string;
    email?: string;
    mobileNumber?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contactPhoneNumberHelp?: string;
}

/**
 * PersonalInfoFields Molecule - Groups personal information inputs
 * Combines name, email, and mobile inputs with consistent styling
 * Handles layout, validation display, and field organization
 */
export const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  errors,
  onChange,
  contactPhoneNumberHelp
}) => {
  return (
    <div className="space-y-6">
      {/* Full Name */}
      <FormGroup
        label="Full Name"
        required
        error={errors.fullName}
      >
        <Input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="Enter your full name"
          error={!!errors.fullName}
        />
      </FormGroup>

      {/* Email */}
      <FormGroup
        label="Email Address"
        required
        error={errors.email}
      >
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter your email address"
          error={!!errors.email}
        />
      </FormGroup>

      {/* Mobile */}
      <FormGroup
        label="Contact Mobile Number"
        required
        error={errors.mobileNumber}
        helperText={contactPhoneNumberHelp}
      >
        <Input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={onChange}
          placeholder="Enter 10-digit mobile number"
          error={!!errors.mobileNumber}
        />
      </FormGroup>
    </div>
  );
};

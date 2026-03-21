import React from 'react';
import { Checkbox } from '../atoms';
import { ValidationMessage } from './ValidationMessage';

interface TermsAgreementProps {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  termsText?: string;
  termsLink?: string;
  termsLinkText?: string;
}

/**
 * TermsAgreement Molecule - Checkbox for terms and conditions acceptance
 * Displays terms text with optional link
 * Shows validation error if unchecked on submission
 */
export const TermsAgreement: React.FC<TermsAgreementProps> = ({
  isChecked,
  onChange,
  error,
  termsText = 'I agree to the terms and conditions',
  termsLink,
  termsLinkText = 'View Terms'
}) => {
  return (
    <div className="space-y-3">
      <Checkbox
        name="termsAgreement"
        checked={isChecked}
        onChange={onChange}
        label={
          <div className="flex items-center gap-2">
            <span>{termsText}</span>
            {termsLink && (
              <a
                href={termsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 underline text-sm"
              >
                {termsLinkText}
              </a>
            )}
          </div>
        }
        required
        error={!!error}
      />

      {error && (
        <ValidationMessage message={error} type="error" />
      )}
    </div>
  );
};

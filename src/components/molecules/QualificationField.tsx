import React from 'react';
import { Select, Input } from '../atoms';
import { FormGroup } from './FormGroup';

interface QualificationFieldProps {
  formData: {
    qualification: string;
    phdSpecialization?: string;
  };
  errors: {
    qualification?: string;
    phdSpecialization?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  qualifications: Array<{ value: string; label: string }>;
  phdLabel?: string;
  qualificationLabel?: string;
}

/**
 * QualificationField Molecule - Handles qualification selection with conditional PhD field
 * Shows free text input for PhD specialization when PhD is selected
 * Includes validation for both qualification and PhD specialization
 */
export const QualificationField: React.FC<QualificationFieldProps> = ({
  formData,
  errors,
  onChange,
  qualifications,
  phdLabel = 'PhD Specialization (if applicable)',
  qualificationLabel = 'Educational Qualification'
}) => {
  return (
    <div className="space-y-6">
      {/* Qualification Dropdown */}
      <FormGroup
        label={qualificationLabel}
        required
        error={errors.qualification}
      >
        <Select
          name="qualification"
          value={formData.qualification}
          onChange={onChange}
          options={qualifications}
          placeholder="Select your educational qualification"
          error={!!errors.qualification}
        />
      </FormGroup>

      {/* Conditional PhD Specialization Field */}
      {formData.qualification === 'PhD' && (
        <FormGroup
          label={phdLabel}
          error={errors.phdSpecialization}
          helperText="Mention your field of specialization or area of research"
        >
          <Input
            type="text"
            name="phdSpecialization"
            value={formData.phdSpecialization || ''}
            onChange={onChange}
            placeholder="e.g., Computer Science, Physics, Biology"
            error={!!errors.phdSpecialization}
          />
        </FormGroup>
      )}
    </div>
  );
};

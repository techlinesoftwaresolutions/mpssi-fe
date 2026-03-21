import React from 'react';
import { Input, RadioGroup } from '../atoms';
import { FormGroup } from './FormGroup';

interface AcademicMarksFieldProps {
  marksType: 'percentage' | 'cgpa';
  marksValue: string;
  marksError?: string;
  onMarksTypeChange: (type: 'percentage' | 'cgpa') => void;
  onMarksValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  markLabel?: string;
}

/**
 * AcademicMarksField Molecule - Combines marks type selection (CGPA/Percentage) with input
 * Provides radio selection toggle and conditional input field
 * Handles both CGPA (0-10) and percentage (0-100) formats
 */
export const AcademicMarksField: React.FC<AcademicMarksFieldProps> = ({
  marksType,
  marksValue,
  marksError,
  onMarksTypeChange,
  onMarksValueChange,
  markLabel = 'Academic Marks'
}) => {
  const marksOptions = [
    { value: 'percentage', label: 'Percentage (%)' },
    { value: 'cgpa', label: 'CGPA (0-10)' }
  ];

  const placeholder = marksType === 'percentage'
    ? 'Enter percentage (0-100)'
    : 'Enter CGPA (0-10)';

  return (
    <FormGroup
      label={markLabel}
      required
      error={marksError}
    >
      <div className="space-y-4">
        {/* Radio selection for marks type */}
        <RadioGroup
          name="marksType"
          value={marksType}
          options={marksOptions}
          onChange={(value) => onMarksTypeChange(value as 'percentage' | 'cgpa')}
          direction="horizontal"
        />

        {/* Input field for marks value */}
        <Input
          type="number"
          name="marks"
          value={marksValue}
          onChange={onMarksValueChange}
          placeholder={placeholder}
          min={marksType === 'percentage' ? '0' : '0'}
          max={marksType === 'percentage' ? '100' : '10'}
          step={marksType === 'percentage' ? '0.01' : '0.01'}
          error={!!marksError}
        />
      </div>
    </FormGroup>
  );
};

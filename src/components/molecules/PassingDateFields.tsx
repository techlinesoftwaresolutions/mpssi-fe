import React from 'react';
import { Select } from '../atoms';
import { FormGroup } from './FormGroup';

interface PassingDateFieldsProps {
  passingMonth: string;
  passingYear: string;
  errors: {
    passingMonth?: string;
    passingYear?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  monthLabel?: string;
  yearLabel?: string;
}

/**
 * PassingDateFields Molecule - Handles month and year selection for passing date
 * Provides dropdown selectors for both month and year
 * Validates against valid date ranges (past or current)
 */
export const PassingDateFields: React.FC<PassingDateFieldsProps> = ({
  passingMonth,
  passingYear,
  errors,
  onChange,
  monthLabel = 'Passing Month',
  yearLabel = 'Passing Year'
}) => {
  const months = [
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
  ];

  // Generate year options (current year and previous 40 years)
  const currentYear = new Date().getFullYear();
  const years = [{ value: '', label: 'Select Year' }];
  for (let i = currentYear; i >= currentYear - 40; i--) {
    years.push({ value: i.toString(), label: i.toString() });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Month Selection */}
      <FormGroup
        label={monthLabel}
        required
        error={errors.passingMonth}
      >
        <Select
          name="passingMonth"
          value={passingMonth}
          onChange={onChange}
          options={months}
          placeholder="Select passing month"
          error={!!errors.passingMonth}
        />
      </FormGroup>

      {/* Year Selection */}
      <FormGroup
        label={yearLabel}
        required
        error={errors.passingYear}
      >
        <Select
          name="passingYear"
          value={passingYear}
          onChange={onChange}
          options={years}
          placeholder="Select passing year"
          error={!!errors.passingYear}
        />
      </FormGroup>
    </div>
  );
};

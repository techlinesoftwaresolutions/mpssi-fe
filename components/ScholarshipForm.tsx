import React, { useState } from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export const ScholarshipForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    email: '',
    address: '',
    qualification: '',
    percentage: '',
    schoolName: '',
    annualIncome: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateAndDownloadPDF = () => {
    try {
      // Create HTML content for the PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Scholarship Application</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { background-color: #E9730F; color: white; padding: 20px; text-align: center; margin-bottom: 30px; border-radius: 8px; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 5px 0 0 0; font-size: 12px; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #333; font-size: 16px; border-bottom: 2px solid #E9730F; padding-bottom: 10px; }
            .field { margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .field.full { grid-template-columns: 1fr; }
            .field-label { font-weight: bold; color: #555; font-size: 12px; }
            .field-value { color: #333; font-size: 12px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: right; font-size: 10px; color: #999; }
            .print-only { display: none; }
            @media print { .print-only { display: block; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Scholarship Application Form</h1>
            <p>Maharishi Prajapati Shiksha Samiti, Sukhertaal</p>
          </div>

          <div class="section">
            <h2>Personal Information</h2>
            <div class="field">
              <div>
                <div class="field-label">First Name</div>
                <div class="field-value">${formData.firstName}</div>
              </div>
              <div>
                <div class="field-label">Last Name</div>
                <div class="field-value">${formData.lastName}</div>
              </div>
            </div>
            <div class="field">
              <div>
                <div class="field-label">Father's Name</div>
                <div class="field-value">${formData.fatherName}</div>
              </div>
              <div>
                <div class="field-label">Date of Birth</div>
                <div class="field-value">${formData.dob}</div>
              </div>
            </div>
            <div class="field">
              <div>
                <div class="field-label">Gender</div>
                <div class="field-value">${formData.gender}</div>
              </div>
              <div>
                <div class="field-label">Mobile Number</div>
                <div class="field-value">${formData.mobile}</div>
              </div>
            </div>
            <div class="field">
              <div>
                <div class="field-label">Email</div>
                <div class="field-value">${formData.email}</div>
              </div>
              <div></div>
            </div>
            <div class="field full">
              <div>
                <div class="field-label">Address</div>
                <div class="field-value">${formData.address}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Academic Information</h2>
            <div class="field">
              <div>
                <div class="field-label">Previous Class</div>
                <div class="field-value">${formData.qualification}</div>
              </div>
              <div>
                <div class="field-label">Percentage (%)</div>
                <div class="field-value">${formData.percentage}</div>
              </div>
            </div>
            <div class="field">
              <div>
                <div class="field-label">School Name</div>
                <div class="field-value">${formData.schoolName}</div>
              </div>
              <div>
                <div class="field-label">Annual Income (₹)</div>
                <div class="field-value">${formData.annualIncome}</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>Reference ID: APP-${Date.now()}</p>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      // Open in new window for printing
      const printWindow = window.open(url, '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }

      // Also create a direct download option
      const link = document.createElement('a');
      link.href = url;
      link.download = `Scholarship_${formData.firstName}_${formData.lastName}_${Date.now()}.html`;
      setTimeout(() => {
        link.click();
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all required fields
    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      fatherName: 'Father Name',
      dob: 'Date of Birth',
      mobile: 'Mobile Number',
      email: 'Email Address',
      address: 'Address',
      qualification: 'Previous Class',
      percentage: 'Percentage',
      schoolName: 'School Name',
      annualIncome: 'Annual Income'
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([key, _]) => !formData[key as keyof typeof formData])
      .map(([_, label]) => label);

    if (emptyFields.length > 0) {
      alert(`❌ Please fill in all required fields:\n\n• ${emptyFields.join('\n• ')}`);
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('❌ Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Validate mobile number (should be 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      alert('❌ Please enter a valid 10-digit mobile number');
      setIsSubmitting(false);
      return;
    }

    // Validate percentage
    const percentage = parseFloat(formData.percentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      alert('❌ Please enter a valid percentage (0-100)');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      generateAndDownloadPDF();
      setIsSubmitting(false);
      alert(`✅ Application PDF Generated Successfully!\n\n📄 Your scholarship application has been created.\n\n1. A print window has opened\n2. Select "Save as PDF" from your printer options\n3. Choose a location and save the file\n\n📧 Next Steps:\nSubmit the PDF to the Samiti office at Sukhertaal or email to contact@mpssi.org`);
      onClose();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-4 rounded-2xl mb-6">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 text-2xl">📋</div>
          <div>
            <p className="font-bold text-blue-900 text-sm mb-2">How to Generate Your Application PDF:</p>
            <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
              <li>Fill in <strong>all required fields</strong> (marked with *)</li>
              <li>Click the "Generate Application" button at the bottom</li>
              <li>A print preview window will open automatically</li>
              <li>Choose <strong>PDF printer</strong> and click <strong>"Save"</strong></li>
              <li>Your PDF is ready! Submit it to the Samiti office at Sukhertaal</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Required Fields Notice */}
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2">
        <span className="text-amber-600 font-bold text-lg">⚠️</span>
        <p className="text-xs text-amber-800">
          <strong>Important:</strong> All fields must be filled completely to generate your application PDF.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name *</label>
          <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name *</label>
          <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Father's Name *</label>
          <input required name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth *</label>
          <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
          <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-5">Academic Background</h4>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Previous Class *</label>
             <input required name="qualification" placeholder="e.g. 10th / 12th" value={formData.qualification} onChange={handleChange} className="w-full px-4 py-3 border bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
          </div>
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Marks (%) *</label>
             <input required name="percentage" value={formData.percentage} onChange={handleChange} className="w-full px-4 py-3 border bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button type="button" onClick={onClose} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="flex-1 bg-saffron-600 text-white py-4 rounded-xl font-bold hover:bg-saffron-700 transition-all shadow-xl shadow-saffron-600/30 flex items-center justify-center gap-2">
          {isSubmitting ? "Generating..." : <>Generate Application <ArrowRight size={20} /></>}
        </button>
      </div>
    </form>
  );
};
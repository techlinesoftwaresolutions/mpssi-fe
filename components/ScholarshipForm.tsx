import React, { useState } from 'react';
import { FileSpreadsheet, ArrowRight } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const headers = [
        "First Name", "Last Name", "Father Name", "DOB", "Gender", "Mobile", 
        "Email", "Address", "Qualification", "Percentage", "School Name", "Annual Income"
      ];
      
      const row = [
        `"${formData.firstName}"`, `"${formData.lastName}"`, `"${formData.fatherName}"`,
        `"${formData.dob}"`, `"${formData.gender}"`, `"${formData.mobile}"`,
        `"${formData.email}"`, `"${formData.address.replace(/\n/g, ' ')}"`,
        `"${formData.qualification}"`, `"${formData.percentage}"`,
        `"${formData.schoolName}"`, `"${formData.annualIncome}"`
      ];

      const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + row.join(",");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Application_${formData.firstName}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsSubmitting(false);
      alert("Application Saved Locally as CSV (Excel compatible).\nIn a production app, this would be sent to a database.");
      onClose();
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-saffron-50 border border-saffron-100 p-4 rounded-2xl mb-6 flex items-start gap-3">
        <FileSpreadsheet className="text-saffron-600 shrink-0 mt-1" size={24} />
        <p className="text-sm text-saffron-800 leading-relaxed">
          <strong>Excel Integration:</strong> This form dynamically generates an Excel-compatible CSV file upon submission for administrative record keeping.
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
          {isSubmitting ? "Submitting..." : <>Submit & Download <ArrowRight size={20} /></>}
        </button>
      </div>
    </form>
  );
};
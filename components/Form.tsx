
import React, { useState } from 'react';
import { FormData } from '../types';

interface FormProps {
  isGenerating: boolean;
  onSubmit: (formData: FormData) => void;
}

const Form: React.FC<FormProps> = ({ isGenerating, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    processName: '',
    processDescription: '',
    kpis: '',
    challenges: '',
    equipment: '',
    dataCollection: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.processName.trim() !== '' && formData.processDescription.trim() !== '';

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">Process Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="processName" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Process Name *</label>
          <input
            type="text"
            id="processName"
            name="processName"
            value={formData.processName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., CNC Machining Line"
          />
        </div>
        <div>
          <label htmlFor="processDescription" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Process Description *</label>
          <textarea
            id="processDescription"
            name="processDescription"
            value={formData.processDescription}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="Describe the steps and flow of the process."
          />
        </div>
        <div>
          <label htmlFor="kpis" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Key Performance Indicators (KPIs)</label>
          <textarea
            id="kpis"
            name="kpis"
            value={formData.kpis}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Cycle time, defect rate, OEE."
          />
        </div>
        <div>
          <label htmlFor="challenges" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Current Challenges / Bottlenecks</label>
          <textarea
            id="challenges"
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Unplanned downtime, high scrap rate."
          />
        </div>
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Equipment Used</label>
          <textarea
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Haas VF-2, Fanuc Robot Arm, Keyence sensors."
          />
        </div>
        <div>
          <label htmlFor="dataCollection" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Data Collection Methods</label>
          <textarea
            id="dataCollection"
            name="dataCollection"
            value={formData.dataCollection}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Manual operator logs, SCADA system."
          />
        </div>
        <button
          type="submit"
          disabled={isGenerating || !isFormValid}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-600"
        >
          {isGenerating ? 'Generating...' : 'Generate Report'}
        </button>
      </form>
    </div>
  );
};

export default Form;

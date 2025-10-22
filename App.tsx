
import React, { useState, useCallback } from 'react';
import { FormData, ReportData, HistoryItem } from './types';
import { generateReport } from './services/geminiService';
import Header from './components/Header';
import Form from './components/Form';
import Report from './components/Report';
import History from './components/History';
import Loader from './components/Loader';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BotIcon } from './components/icons/BotIcon';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('reportHistory', []);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);


  const handleFormSubmit = useCallback(async (formData: FormData) => {
    setIsGenerating(true);
    setReportData(null);
    setError(null);
    setCurrentReportId(null);

    try {
      const generatedReport = await generateReport(formData);
      
      const newReport: ReportData = {
          ...JSON.parse(generatedReport),
          processName: formData.processName,
      };

      setReportData(newReport);

      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        title: formData.processName,
        date: new Date().toLocaleDateString(),
        report: newReport,
      };
      setHistory([newHistoryItem, ...history]);
      setCurrentReportId(newHistoryItem.id);

    } catch (err) {
      console.error(err);
      setError('Failed to generate the report. Please check the console for more details.');
    } finally {
      setIsGenerating(false);
    }
  }, [history, setHistory]);

  const handleSelectHistory = (item: HistoryItem) => {
    setReportData(item.report);
    setCurrentReportId(item.id);
  };
  
  const handleClearHistory = () => {
      setHistory([]);
      setReportData(null);
      setCurrentReportId(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-8">
            <Form isGenerating={isGenerating} onSubmit={handleFormSubmit} />
            <History 
              history={history} 
              onSelect={handleSelectHistory} 
              onClear={handleClearHistory}
              currentReportId={currentReportId}
            />
          </div>
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          {isGenerating && <Loader />}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
          
          {!isGenerating && !reportData && !error && (
            <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
              <BotIcon className="w-24 h-24 text-sky-500 mb-6" />
              <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Welcome to the AI Report Generator</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md text-center">
                Fill out the form on the left to generate a detailed technical report with optimization suggestions for your industrial process.
              </p>
            </div>
          )}
          
          {reportData && (
            <Report reportData={reportData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;

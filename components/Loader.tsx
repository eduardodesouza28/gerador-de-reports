
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-500"></div>
      <p className="mt-4 text-slate-600 dark:text-slate-300 font-medium">Gerando Reporte...</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">The AI is analyzing the process details.</p>
    </div>
  );
};

export default Loader;


import React from 'react';
import { HistoryItem } from '../types';
import { HistoryIcon } from './icons/HistoryIcon';

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  currentReportId: string | null;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onClear, currentReportId }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center">
            <HistoryIcon className="w-5 h-5 mr-2 text-slate-500 dark:text-slate-400" />
            History
        </h2>
        <button 
            onClick={onClear} 
            className="text-xs text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
            Limpar
        </button>
      </div>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {history.map(item => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item)}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                currentReportId === item.id 
                  ? 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 font-semibold' 
                  : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className={`text-xs ${
                currentReportId === item.id 
                  ? 'text-sky-600 dark:text-sky-400' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>{item.date}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;


import React from 'react';
import { FileTextIcon } from './icons/FileTextIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center">
        <FileTextIcon className="h-8 w-8 text-sky-500 mr-3" />
        <h1 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          gerador de reports industriais com IA
        </h1>
      </div>
    </header>
  );
};

export default Header;

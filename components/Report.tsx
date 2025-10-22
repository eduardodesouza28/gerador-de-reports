import React from 'react';
import { ReportData } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

declare const jspdf: any;

interface ReportProps {
  reportData: ReportData;
}

const Report: React.FC<ReportProps> = ({ reportData }) => {
  const handleDownloadPdf = () => {
    if (!jspdf || !jspdf.jsPDF) {
        console.error("jsPDF is not loaded.");
        alert("PDF generation library is not available. Please try again later.");
        return;
    }
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const { 
        processName, 
        executiveSummary,
        processAnalysis,
        bottlenecks,
        optimizationSuggestions,
        recommendedTechnologies,
        conclusion
    } = reportData;

    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const addPageNumbers = () => {
        const pageTotal = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageTotal; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Page ${i} of ${pageTotal}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }
    };

    const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    };

    const addWrappedText = (text: string, options: any = {}) => {
        const { isBold = false, isTitle = false, indent = 0, fontSize = 11, color = [51, 65, 85] } = options;
        
        doc.setFont('helvetica', isBold || isTitle ? 'bold' : 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);

        const lines = doc.splitTextToSize(text, contentWidth - indent);
        const textHeight = doc.getTextDimensions(lines).h;
        
        checkPageBreak(textHeight);
        doc.text(lines, margin + indent, y);
        y += textHeight + 2;
    };

    addWrappedText(processName, { fontSize: 22, isTitle: true, color: [0, 0, 0] });
    y += 2;
    addWrappedText('Technical Optimization Report', { fontSize: 14, color: [100, 100, 100] });
    y += 10;

    const renderSectionPdf = (title: string, content: () => void) => {
        checkPageBreak(20);
        y += 8;
        addWrappedText(title, { fontSize: 16, isTitle: true, color: [40, 109, 173] });
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y - 2, pageWidth - margin, y - 2);
        y += 4;
        content();
    };
    
    renderSectionPdf('Executive Summary', () => addWrappedText(executiveSummary));
    renderSectionPdf('Process Analysis', () => addWrappedText(processAnalysis));
    renderSectionPdf('Identified Bottlenecks & Inefficiencies', () => addWrappedText(bottlenecks));

    renderSectionPdf('Optimization Suggestions', () => {
        optimizationSuggestions.forEach(item => {
            addWrappedText(`\u2022 ${item.suggestion}`, { isBold: true, indent: 5 });
            addWrappedText(item.justification, { indent: 10, color: [100, 100, 100] });
            y += 4;
        });
    });

    renderSectionPdf('Recommended Technologies', () => addWrappedText(recommendedTechnologies.join(', ')));
    renderSectionPdf('Conclusion', () => addWrappedText(conclusion));
    
    addPageNumbers();

    const safeFileName = processName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`report_${safeFileName}.pdf`);
  };

  const renderSectionHtml = (title: string, content: string | React.ReactNode) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-sky-700 dark:text-sky-400 border-b-2 border-sky-200 dark:border-sky-800 pb-2 mb-3">{title}</h3>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
        {typeof content === 'string' ? <p>{content}</p> : content}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">{reportData.processName}</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">Technical Optimization Report</p>

            {renderSectionHtml('Executive Summary', reportData.executiveSummary)}
            {renderSectionHtml('Process Analysis', reportData.processAnalysis)}
            {renderSectionHtml('Identified Bottlenecks & Inefficiencies', reportData.bottlenecks)}
            {renderSectionHtml('Optimization Suggestions', 
              <ul className="list-disc pl-5 space-y-4">
                {reportData.optimizationSuggestions.map((item, index) => (
                  <li key={index}>
                    <strong className="text-slate-700 dark:text-slate-200">{item.suggestion}</strong>
                    <p className="mt-1">{item.justification}</p>
                  </li>
                ))}
              </ul>
            )}
            {renderSectionHtml('Recommended Technologies', 
              <ul className="flex flex-wrap gap-2">
                {reportData.recommendedTechnologies.map((tech, index) => (
                  <li key={index} className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-sm font-medium px-3 py-1 rounded-full">
                    {tech}
                  </li>
                ))}
              </ul>
            )}
            {renderSectionHtml('Conclusion', reportData.conclusion)}
        </div>
      </div>
      <button
        onClick={handleDownloadPdf}
        className="absolute top-4 right-4 flex items-center bg-sky-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"
      >
        <DownloadIcon className="w-5 h-5 mr-2" />
        Download PDF
      </button>
    </div>
  );
};

export default Report;
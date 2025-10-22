
export interface FormData {
  processName: string;
  processDescription: string;
  kpis: string;
  challenges: string;
  equipment: string;
  dataCollection: string;
}

export interface ReportData {
  processName: string;
  executiveSummary: string;
  processAnalysis: string;
  bottlenecks: string;
  optimizationSuggestions: {
    suggestion: string;
    justification: string;
  }[];
  recommendedTechnologies: string[];
  conclusion: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  report: ReportData;
}

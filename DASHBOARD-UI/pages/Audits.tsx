import React from 'react';
import RecentAuditsTable from '../components/RecentAuditsTable';
import { RECENT_AUDITS } from '../constants';
import { Upload } from 'lucide-react';

const Audits: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Auditorias de Conteúdo</h2>
          <p className="text-slate-500">Histórico do seu conteúdo analisado pela IA.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <Upload className="w-4 h-4" />
          Nova Auditoria
        </button>
      </div>
      <RecentAuditsTable audits={[...RECENT_AUDITS, ...RECENT_AUDITS]} />
    </div>
  );
};

export default Audits;

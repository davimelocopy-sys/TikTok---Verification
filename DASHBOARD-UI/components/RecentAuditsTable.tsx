import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Audit } from '../types';
import { Badge } from './ui/Badge';
import { Video, FileText, ShoppingBag, ArrowRight } from 'lucide-react';

interface RecentAuditsTableProps {
  audits: Audit[];
}

const RecentAuditsTable: React.FC<RecentAuditsTableProps> = ({ audits }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-slate-500" />;
      case 'script': return <FileText className="w-4 h-4 text-slate-500" />;
      case 'product': return <ShoppingBag className="w-4 h-4 text-slate-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Auditorias Recentes</CardTitle>
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center transition-colors">
          Ver Tudo <ArrowRight className="w-3 h-3 ml-1" />
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 font-medium">Conteúdo</th>
                <th className="px-6 py-3 font-medium">Tipo</th>
                <th className="px-6 py-3 font-medium">Saúde</th>
                <th className="px-6 py-3 font-medium text-right">Violações</th>
                <th className="px-6 py-3 font-medium text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {audits.map((audit) => (
                <tr key={audit.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                    {audit.thumbnailUrl ? (
                      <img src={audit.thumbnailUrl} alt="" className="w-10 h-10 rounded object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center border border-slate-200">
                        {getIcon(audit.contentType)}
                      </div>
                    )}
                    <span className="truncate max-w-[150px] sm:max-w-xs">{audit.title}</span>
                  </td>
                  <td className="px-6 py-4 capitalize text-slate-600">
                    <span className="flex items-center gap-2">
                      {getIcon(audit.contentType)}
                      {audit.contentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${audit.healthScore >= 80 ? 'bg-emerald-500' : audit.healthScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                      <span className="font-semibold text-slate-700">{audit.healthScore}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {audit.violations.length > 0 ? (
                      <Badge variant={audit.riskLevel}>
                        {audit.violations.length} Problemas
                      </Badge>
                    ) : (
                      <Badge variant="safe">Limpo</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 group-hover:text-slate-700">
                    {formatDate(audit.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAuditsTable;

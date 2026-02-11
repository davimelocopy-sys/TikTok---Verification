import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HealthScoreHero from '../components/HealthScoreHero';
import MetricCard from '../components/MetricCard';
import AlertBanner from '../components/AlertBanner';
import RecentAuditsTable from '../components/RecentAuditsTable';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Upload, FileText, Play, Plus, ShieldCheck, ChevronRight, CheckCircle, Video } from 'lucide-react';
import { Audit, FinancialMetric, Alert } from '../types';
import { exchangeCodeForToken, getTikTokUserInfo, getTikTokVideos, getTikTokAuthUrl } from '../services/tiktokService';

const Dashboard: React.FC = () => {
  const [scriptText, setScriptText] = useState('');
  const [isUploading] = useState(false);

  // Mock Data
  const healthScore = 85;
  const trend = +5;

  const metrics: FinancialMetric[] = [
    { label: 'GMV Total', value: 'R$ 12.450,00', trend: { value: 12, direction: 'up' }, type: 'currency' },
    { label: 'Comissão Recebida', value: 'R$ 1.867,50', trend: { value: 8, direction: 'up' }, type: 'currency' },
    { label: 'Taxa de Conversão', value: '4.2%', trend: { value: 0.5, direction: 'down' }, type: 'percent' },
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'violation',
      severity: 'high',
      title: 'Potencial Violação de Diretrizes',
      description: 'Atos perigosos detectados no seu último upload. Ação necessária para evitar shadowban.',
      actionLabel: 'Ver Auditoria'
    }
  ];

  const recentAudits: Audit[] = [
    {
      id: 'audit-1',
      title: 'Revisão Coleção de Verão',
      contentType: 'video',
      healthScore: 92,
      riskLevel: 'safe',
      violations: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'audit-2',
      title: 'Roteiro de Demonstração de Produto',
      contentType: 'script',
      healthScore: 74,
      riskLevel: 'warning',
      violations: [{ id: 'v1', guidelineRef: '04.md', severity: 'medium', description: 'Alegações médicas subjetivas.' }],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ];

  const handleStartAudit = () => {
    console.log('Starting Audit with script:', scriptText);
    // Logic will be handled by IA Specialists
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userVideos, setUserVideos] = useState<any[]>([]);

  useEffect(() => {
    // With HashRouter, the search params might be before the #
    const urlParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code') || urlParams.get('code');
    const savedToken = localStorage.getItem('tiktok_access_token');

    const loadData = async (token: string) => {
      setIsLoading(true);
      const user = await getTikTokUserInfo(token);
      const videos = await getTikTokVideos(token);

      if (user) setUserProfile(user);
      if (videos) setUserVideos(videos);
      setIsLoading(false);
    };

    if (code) {
      // Handle OAuth Callback
      console.log('TikTok Code detected, exchanging for token...');
      exchangeCodeForToken(code)
        .then(data => {
          if (data.access_token) {
            localStorage.setItem('tiktok_access_token', data.access_token);
            localStorage.setItem('tiktok_refresh_token', data.refresh_token);
            // Remove code from URL for cleaner UI
            window.history.replaceState({}, document.title, window.location.pathname);
            loadData(data.access_token);
          }
        })
        .catch(err => console.error('OAuth Error:', err));
    } else if (savedToken) {
      // Load saved data
      loadData(savedToken);
    }
  }, [searchParams]);

  const handleNewAudit = () => {
    navigate('/audits/new');
  };


  const handleConnectTikTok = async () => {
    setIsLoading(true);
    try {
      const authUrl = await getTikTokAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to connect TikTok:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. TOP SECTION: HEALTH & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HealthScoreHero score={healthScore} trend={trend} />
        </div>
        <div className="lg:col-span-1">
          <AlertBanner alerts={alerts} />
          {alerts.length === 0 && (
            <Card className="h-full flex items-center justify-center border-dashed">
              <div className="text-center p-6 bg-slate-50/50 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-600">Conta Segura</p>
                <p className="text-xs text-slate-400">Nenhum alerta crítico detectado</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* 2. PERFORMANCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <MetricCard key={i} metric={m} />
        ))}
      </div>

      {/* 3. MULTIMODAL INGESTION AREA (North Star) */}
      <Card className="border-indigo-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-indigo-50/30 border-b border-indigo-50">
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Upload className="w-5 h-5" />
            Espaço de Ingestão Multimodal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Upload Zone */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Play className="w-4 h-4" /> Ingestão de Vídeo (MP4)
              </label>
              <div
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer
                  ${isUploading ? 'border-indigo-400 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-indigo-500" />
                </div>
                <p className="text-sm font-medium text-slate-900 text-center">Arraste seu vídeo aqui</p>
                <p className="text-xs text-slate-500 mt-1">MP4 até 100MB (9:16 recomendado)</p>
                <input type="file" className="hidden" accept="video/mp4" />
              </div>
            </div>

            {/* Script Ingestion Area */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Ingestão de Texto (Roteiro/Script)
              </label>
              <textarea
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                placeholder="Cole seu roteiro aqui para auditoria de compliance..."
                className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={handleNewAudit}
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Nova Auditoria
            </button>
            <button
              onClick={handleStartAudit}
              className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95"
            >
              Iniciar Auditoria
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 4. RECENT VIDEOS / AUDITS TABLE */}
      {/* If connected to TikTok, show videos. Else show audits */}
      {isLoading ? (
        <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Sincronizando com TikTok...</p>
        </div>
      ) : userVideos.length > 0 ? (
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Seus Vídeos Recentes</h3>
              <p className="text-sm text-slate-500">Sincronizado com @{userProfile?.display_name || 'TikTok'}</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1">
                <CheckCircle size={12} /> Conectado
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Vídeo</th>
                  <th className="p-4 font-semibold text-center">Postado em</th>
                  <th className="p-4 font-semibold text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userVideos.map((video: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-24 bg-slate-200 rounded-md overflow-hidden relative flex-shrink-0 group cursor-pointer">
                          {video.cover_image_url ? (
                            <img src={video.cover_image_url} className="w-full h-full object-cover" alt="Cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800">
                              <Video className="text-white opacity-50" size={20} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} fill="currentColor" />
                          </div>
                        </div>
                        <div className="max-w-xs">
                          <p className="font-medium text-slate-900 line-clamp-2 text-sm">{video.title || video.video_description || 'Sem título'}</p>
                          <a href={video.share_url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline mt-1 block">Ver no TikTok</a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm text-slate-500">
                      {new Date(video.create_time * 1000).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => navigate('/audits/new')} className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors">
                        Auditar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <Video size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-900">Conecte seu TikTok</h3>
                <p className="text-indigo-700 text-sm">Sincronize seus vídeos para auditoria automática e métricas reais.</p>
              </div>
            </div>
            <button
              onClick={handleConnectTikTok}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              Conectar TikTok Agora
              <ChevronRight size={16} />
            </button>
          </div>
          <RecentAuditsTable audits={recentAudits} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

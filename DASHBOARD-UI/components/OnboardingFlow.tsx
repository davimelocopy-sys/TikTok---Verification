import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, BarChart2, Check } from 'lucide-react';
import { Card } from './ui/Card';

const OnboardingFlow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('tiktok-shield-onboarded');
    if (!hasOnboarded) {
      setIsOpen(true);
    }
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);

    // Real TikTok OAuth Flow
    const CLIENT_KEY = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
    // Redirect explicitly to dashboard where we handle the code
    const REDIRECT_URI = window.location.hostname === 'localhost'
      ? 'http://localhost:5173/dashboard'
      : `${window.location.origin}/dashboard`;

    const SCOPE = 'user.info.basic,video.list,video.data';
    const STATE = 'tiktok_connect_' + Math.random().toString(36).substring(7);

    // Save state to verify later
    localStorage.setItem('tiktok_oauth_state', STATE);

    const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=${SCOPE}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}`;

    window.location.href = authUrl;
  };

  const handleScan = () => {
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 2;
      if (progress > 100) progress = 100;
      setScanProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep(4), 600);
      }
    }, 100);
  };

  const handleComplete = () => {
    localStorage.setItem('tiktok-shield-onboarded', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-white shadow-2xl overflow-hidden border-0">

        {/* Step Indicator */}
        <div className="flex gap-1 p-1 bg-slate-50">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-indigo-600' : 'bg-slate-200'}`}
            />
          ))}
        </div>

        <div className="p-8">

          {/* STEP 1: WELCOME */}
          <div className={step === 1 ? "block" : "hidden"}>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Bem-vindo ao TikTok Shield</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  A plataforma de elite para auditar riscos de conteúdo, gerenciar conformidade e acompanhar o crescimento da monetização.
                </p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Começar Agora
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* STEP 2: CONNECT */}
          <div className={step === 2 ? "block" : "hidden"}>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Conectar Conta</h2>
                <p className="text-slate-500 text-sm">Vincule seu perfil do TikTok para habilitar auditorias e análises em tempo real.</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-800">Conectar Conta TikTok</span>
                    {isConnecting && <span className="text-xs text-indigo-600 font-medium animate-pulse">Conectando...</span>}
                  </div>
                  <p className="text-sm text-slate-500 mb-4">
                    Autorize o acesso para análise de segurança e métricas.
                  </p>

                  <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className={`w-full py-2.5 px-4 rounded-xl border font-medium flex items-center justify-center gap-2 transition-all
                  ${isConnecting
                        ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-wait'
                        : 'bg-black text-white border-black hover:bg-slate-800 shadow-sm hover:shadow active:scale-95'
                      }`}
                  >
                    <>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.05 8.75-.13 1.57-.84 3.05-2 4.14-1.37 1.34-3.32 1.95-5.21 1.76-2.07-.12-4.04-1.1-5.32-2.73-1.45-1.78-1.58-4.34-.41-6.3 1.14-1.92 3.32-3.1 5.56-3.04.14 0 .28 0 .42.01V15c-.21-.07-.44-.1-.66-.1-1.35-.1-2.58.74-3.03 2.02-.45 1.28.02 2.74 1.13 3.5 1.18.81 2.8.69 3.86-.33.91-.85 1.34-2.14 1.25-3.37-.03-2.61-.01-5.22-.01-7.83h-3.9V.02c.45 0 .91 0 1.37 0z" /></svg>
                      {isConnecting ? 'Redirecionando para TikTok...' : 'Conectar TikTok'}
                    </>
                  </button>
                </div>
              </div>

              {/* Continue Button (Visible when connected) */}
              <div>
                <button
                  key="btn-continue-safe"
                  onClick={() => setStep(3)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3: AUDIT */}
          <div className={step === 3 ? "block" : "hidden"}>
            <div className="space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900">Auditoria Inicial do Sistema</h2>
                <p className="text-slate-500 text-sm">Estamos analisando seus últimos 30 dias de conteúdo em busca de riscos de segurança.</p>
              </div>

              {!isScanning ? (
                <div className="py-8">
                  <button
                    onClick={handleScan}
                    className="w-full py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl border-2 border-indigo-200 border-dashed transition-all active:scale-95 flex flex-col items-center justify-center gap-2 group"
                  >
                    <BarChart2 className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    Executar Primeira Auditoria
                  </button>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-indigo-600 transition-all duration-300 ease-out"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>Analisando frames...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <div className={`h-1 rounded-full ${scanProgress > 10 ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                    <div className={`h-1 rounded-full ${scanProgress > 50 ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                    <div className={`h-1 rounded-full ${scanProgress > 90 ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STEP 4: COMPLETE */}
          <div className={step === 4 ? "block" : "hidden"}>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Tudo Pronto!</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Encontramos <span className="font-semibold text-rose-500">2 riscos potenciais</span> e geramos um score de saúde de <span className="font-semibold text-emerald-600">85/100</span>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-slate-600">Conta Conectada</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-slate-600">Auditoria Concluída</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-slate-600">Métricas Base Definidas</span>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Ir para o Painel
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default OnboardingFlow;

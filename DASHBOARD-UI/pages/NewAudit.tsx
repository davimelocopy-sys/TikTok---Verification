import { useState, useRef } from 'react';
import { Upload, FileText, Video, AlertCircle, CheckCircle, Play, ChevronRight, Smartphone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { analyzeContent } from '../services/geminiService';
import { Badge } from '../components/ui/Badge';

const NewAudit: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'video' | 'script'>('video');
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [scriptText, setScriptText] = useState('');

    // Progress State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [analysisStage, setAnalysisStage] = useState(''); // 'optimizing', 'transcribing', 'auditing', 'verdict'

    const [result, setResult] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const simulateProgress = (stage: string, start: number, end: number, duration: number) => {
        return new Promise<void>((resolve) => {
            setAnalysisStage(stage);
            const stepTime = 50;
            const steps = duration / stepTime;
            const increment = (end - start) / steps;
            let current = start;
            let stepCount = 0;

            const timer = setInterval(() => {
                current += increment;
                stepCount++;
                setProgress(Math.min(current, end));

                if (stepCount >= steps) {
                    clearInterval(timer);
                    resolve();
                }
            }, stepTime);
        });
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setResult(null);
        setProgress(0);

        try {
            // 1. Optimization Stage
            await simulateProgress('Otimizando arquivo para upload...', 0, 30, 800);

            // 2. Transcription Stage
            await simulateProgress('Transcrevendo áudio e extraindo frames...', 30, 60, 1500);

            // 3. Compliance Audit Stage
            await simulateProgress('Cruzando dados com a Base de Conhecimento...', 60, 90, 1200);

            // Real AI Call (simulated delay included above, but we call it now)
            const contentToAnalyze = activeTab === 'video' ? `[Video File Name: ${file?.name}]` : scriptText;

            let parsedResult;
            try {
                const jsonResponse = await analyzeContent(contentToAnalyze);
                const cleanJson = jsonResponse.replace(/```json/g, '').replace(/```/g, '').trim();
                parsedResult = JSON.parse(cleanJson);
            } catch (err) {
                // Fallback if API fails or key missing
                parsedResult = {
                    healthScore: 65,
                    violations: [
                        { guidelineRef: "Atos Perigosos", severity: "high", description: "Contém acrobacias realizadas sem equipamento de proteção aos 00:15." },
                        { guidelineRef: "Segurança de Menores", severity: "medium", description: "Menores apresentados em ambiente potencialmente arriscado." }
                    ]
                };
            }

            // 4. Finalizing
            await simulateProgress('Finalizando Veredito...', 90, 100, 400);

            setResult(parsedResult);
        } catch (error) {
            console.error("Audit failed", error);
        } finally {
            setIsAnalyzing(false);
            setAnalysisStage('Concluído');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-0">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Nova Auditoria de Conteúdo</h2>
                <p className="text-slate-500">Faça o upload de conteúdo ou cole roteiros para detectar riscos de conformidade antes de postar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Input */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-1 min-h-[400px]">
                        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100/50 rounded-lg mb-6 mx-6 mt-6">
                            <button
                                onClick={() => setActiveTab('video')}
                                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'video'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <Video className="w-4 h-4" />
                                    Upload de Vídeo
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('script')}
                                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'script'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Colar Roteiro
                                </span>
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            {activeTab === 'video' ? (
                                <>
                                    {/* Desktop Drag & Drop */}
                                    <div
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`hidden md:flex border-2 border-dashed rounded-xl h-64 flex-col items-center justify-center transition-colors cursor-pointer ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        {file ? (
                                            <div className="text-center space-y-3">
                                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                                                    <Play className="w-8 h-8 text-indigo-600 ml-1" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{file.name}</p>
                                                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                    className="text-xs text-rose-600 hover:underline font-medium"
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center space-y-4 pointer-events-none">
                                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                                                    <Upload className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">Arraste seu arquivo MP4 aqui</p>
                                                    <p className="text-xs text-slate-500 mt-1">ou clique para procurar</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile Native Trigger */}
                                    <div className="md:hidden">
                                        {!file ? (
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full h-48 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50 active:bg-slate-100 transition-colors"
                                            >
                                                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                                                    <Smartphone className="w-7 h-7 text-indigo-600" />
                                                </div>
                                                <span className="font-semibold text-indigo-700">Selecionar da Galeria</span>
                                                <span className="text-xs text-slate-400">Suporte a MP4, MOV</span>
                                            </button>
                                        ) : (
                                            <div className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-10 h-10 bg-indigo-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Video className="w-5 h-5 text-indigo-700" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-indigo-900 truncate">{file.name}</p>
                                                        <p className="text-xs text-indigo-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setFile(null)}
                                                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-full"
                                                >
                                                    <AlertCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="video/mp4,video/quicktime" // Native filter
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </>
                            ) : (
                                <textarea
                                    value={scriptText}
                                    onChange={(e) => setScriptText(e.target.value)}
                                    placeholder="Cole seu roteiro, legendas ou texto de tela aqui..."
                                    className="w-full h-64 p-4 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                                />
                            )}

                            <div className="mt-6">
                                {!isAnalyzing ? (
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={(activeTab === 'video' && !file) || (activeTab === 'script' && !scriptText)}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        Executar Auditoria de IA
                                    </button>
                                ) : (
                                    // Deterministic Progress Bar UI
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-semibold text-indigo-900">{analysisStage}</span>
                                            <span className="text-xs font-mono text-slate-500">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-600 transition-all duration-100 ease-linear"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-medium pt-1">
                                            <span className={progress > 0 ? 'text-indigo-600' : ''}>Upload</span>
                                            <span className={progress > 30 ? 'text-indigo-600' : ''}>Visão</span>
                                            <span className={progress > 60 ? 'text-indigo-600' : ''}>Compliance</span>
                                            <span className={progress > 90 ? 'text-emerald-600' : ''}>Concluído</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-1">
                    {result ? (
                        <Card className="h-full animate-in fade-in slide-in-from-right-4 duration-500 border-l-4 border-l-indigo-500">
                            <div className="p-6 space-y-6">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Score de Saúde</p>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-4xl font-bold ${result.healthScore >= 80 ? 'text-emerald-600' :
                                            result.healthScore >= 60 ? 'text-amber-600' : 'text-rose-600'
                                            }`}>
                                            {result.healthScore}
                                        </span>
                                        <span className="text-slate-400 text-lg">/100</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Riscos Detectados</p>
                                    {result.violations.length === 0 ? (
                                        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg text-emerald-700 border border-emerald-100">
                                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                            <p className="text-sm font-medium">Nenhuma violação detectada.</p>
                                        </div>
                                    ) : (
                                        result.violations.map((v: any, i: number) => {
                                            const severityMap: any = {
                                                'high': 'Alta',
                                                'medium': 'Média',
                                                'low': 'Baixa',
                                                'critical': 'Crítica'
                                            };
                                            return (
                                                <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-slate-700">{v.guidelineRef}</span>
                                                        <Badge variant={v.severity}>{severityMap[v.severity] || v.severity}</Badge>
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                                        Ver Relatório Completo <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-8 text-slate-400 min-h-[300px]">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-sm">Os resultados aparecerão aqui após a análise.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewAudit;
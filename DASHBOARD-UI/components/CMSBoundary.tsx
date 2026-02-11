import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Card } from "./ui/Card";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class CMSBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                    <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-xl border-rose-100">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-rose-600" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900">Algo deu errado</h2>
                            <p className="text-slate-500 text-sm">
                                Ocorreu um erro inesperado ao renderizar esta tela.
                            </p>
                        </div>

                        <div className="bg-rose-50 rounded-lg p-4 text-left border border-rose-100 overflow-auto max-h-40">
                            <code className="text-xs text-rose-700 font-mono break-all">
                                {this.state.error?.message || "Erro desconhecido"}
                            </code>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Tentar Novamente
                            </button>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Home className="w-4 h-4" />
                                Voltar ao Início
                            </button>
                        </div>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Shield, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.hostname === 'localhost'
                        ? 'http://localhost:5173/dashboard'
                        : 'https://diretrizestiktok.netlify.app/dashboard',
                    queryParams: {
                        prompt: 'select_account'  // Force account selection on every login
                    }
                }
            });
            if (error) throw error;
        } catch (error: any) {
            console.error('Error logging in with Google:', error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-100">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">TikTok Shield</h1>
                    <p className="text-slate-500 mt-2 font-medium">Sua sentinela de conformidade e crescimento.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-xl font-bold text-slate-900">Boas-vindas de volta</h2>
                            <p className="text-sm text-slate-400">Acesse sua conta para gerenciar suas auditorias.</p>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Logar com Google
                                </>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-300">Acesso Restrito</span>
                            </div>
                        </div>

                        <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                            Ao acessar, você concorda com nossos termos de conformidade e diretrizes de uso de dados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

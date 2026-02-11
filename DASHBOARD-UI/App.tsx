import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import Audits from './pages/Audits';
import NewAudit from './pages/NewAudit';
import AIChat from './components/AIChat';
import { CMSBoundary } from './components/CMSBoundary';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { supabase } from './services/supabase';
import { Session } from '@supabase/supabase-js';

const Layout: React.FC<{ children: React.ReactNode; user: any }> = ({ children, user }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
          <CMSBoundary>
            {children}
            <AIChat />
          </CMSBoundary>
        </main>
      </div>
      <MobileNav user={user} />
    </div>
  );
};

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    <p className="text-slate-500 mt-2 max-w-sm">Esta funcionalidade estará disponível em breve no plano Enterprise.</p>
  </div>
);

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <CMSBoundary>
      <Router>
        <Routes>
          {/* Public Legal Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/login"
            element={session ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          <Route
            path="/*"
            element={
              session ? (
                <Layout user={session.user}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/audits" element={<Audits />} />
                    <Route path="/audits/new" element={<NewAudit />} />
                    <Route path="/campaigns" element={<PlaceholderPage title="Desafios de Campanhas" />} />
                    <Route path="/products" element={<PlaceholderPage title="Gerenciamento de Produtos" />} />
                    <Route path="/settings" element={<PlaceholderPage title="Configurações e Ajustes" />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </CMSBoundary>
  );
};

export default App;
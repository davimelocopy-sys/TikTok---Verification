import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Trophy, ShoppingBag, Settings, LogOut, Shield } from 'lucide-react';
import { supabase } from '../services/supabase';

const Sidebar: React.FC<{ user: any }> = ({ user }) => {
  const location = useLocation();

  const handleSignOut = async () => {
    // Clear Supabase session
    await supabase.auth.signOut();
    // Clear TikTok session data
    localStorage.removeItem('tiktok_access_token');
    localStorage.removeItem('tiktok_refresh_token');
    localStorage.removeItem('tiktok_oauth_state');
    localStorage.removeItem('tiktok_code_verifier');
  };

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(to)
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      {label}
    </Link>
  );

  return (
    <div className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">TikTok Shield</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Painel" />
        <NavItem to="/audits" icon={<CheckSquare />} label="Auditorias" />
        <NavItem to="/campaigns" icon={<Trophy />} label="Campanhas" />
        <NavItem to="/products" icon={<ShoppingBag />} label="Produtos" />
        <div className="pt-6 pb-2">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Configurações</p>
        </div>
        <NavItem to="/settings" icon={<Settings />} label="Ajustes" />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}`}
            alt="User"
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{user?.user_metadata?.full_name || 'Usuário'}</p>
            <p className="text-xs text-slate-500 capitalize">Plano Pro</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 transition-colors w-full px-2"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
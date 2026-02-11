import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, Trophy } from 'lucide-react';

const MobileNav: React.FC<{ user: any }> = ({ user }) => {
  const location = useLocation();

  const NavItem = ({ to, icon, label, primary }: { to: string; icon: React.ReactNode; label: string; primary?: boolean }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative flex flex-col items-center justify-center w-full h-full gap-1 ${primary
          ? 'text-indigo-600'
          : active ? 'text-indigo-600' : 'text-slate-400'
          }`}
      >
        {primary ? (
          <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center -mt-8 shadow-xl border-[6px] border-slate-50 active:scale-95 transition-transform">
            <Plus className="text-white w-7 h-7" />
          </div>
        ) : (
          React.cloneElement(icon as React.ReactElement<any>, { size: 24 })
        )}
        <span className={`text-[10px] font-medium ${primary ? 'mt-1' : ''}`}>{label}</span>
      </Link>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-slate-200 flex items-center justify-around z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Início" />
      <NavItem to="/audits/new" icon={<Plus />} label="Nova" primary />
      <NavItem to="/campaigns" icon={<Trophy />} label="Campanhas" />
      <NavItem
        to="/settings"
        icon={
          <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200">
            <img src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'U'}`} alt="Profile" />
          </div>
        }
        label="Perfil"
      />
    </div>
  );
};

export default MobileNav;
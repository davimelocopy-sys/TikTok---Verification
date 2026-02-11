import React from 'react';
import { Bell, Shield } from 'lucide-react';

const Header: React.FC<{ user: any }> = ({ user }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 h-16 flex items-center justify-between px-6 md:px-8">
      {/* Mobile Logo */}
      <div className="md:hidden flex items-center gap-2">
        <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-900 text-lg">TikTok Shield</span>
      </div>

      {/* Desktop Title (Hidden on Mobile) */}
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-slate-800">Visão Geral</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="md:hidden w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-100">
          <img
            src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}`}
            alt="User"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

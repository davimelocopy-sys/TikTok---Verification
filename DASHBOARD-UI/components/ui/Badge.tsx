import React from 'react';
import { RiskLevel, Severity } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: RiskLevel | Severity;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'safe', className = '' }) => {
  const getColors = () => {
    switch (variant) {
      case 'safe':
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'warning':
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'critical':
      case 'high':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getColors()} ${className}`}>
      {children}
    </span>
  );
};

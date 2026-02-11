import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { ShieldCheck, ShieldAlert, ShieldX, TrendingUp, TrendingDown } from 'lucide-react';
import { RiskLevel } from '../types';

interface HealthScoreHeroProps {
  score: number;
  trend: number;
}

const HealthScoreHero: React.FC<HealthScoreHeroProps> = ({ score, trend }) => {
  let status: RiskLevel = 'safe';
  if (score < 60) status = 'critical';
  else if (score < 80) status = 'warning';

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (status === 'safe') return '#10b981'; // emerald-500
    if (status === 'warning') return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  const getGradient = () => {
    if (status === 'safe') return 'from-emerald-500/10 to-emerald-500/5';
    if (status === 'warning') return 'from-amber-500/10 to-amber-500/5';
    return 'from-rose-500/10 to-rose-500/5';
  };

  const renderIcon = () => {
    if (status === 'safe') return <ShieldCheck className="w-10 h-10 text-emerald-500" />;
    if (status === 'warning') return <ShieldAlert className="w-10 h-10 text-amber-500" />;
    return <ShieldX className="w-10 h-10 text-rose-500" />;
  };

  const description = () => {
    if (score >= 80) return "Sua conta está em excelente estado. Continue seguindo as diretrizes.";
    if (score >= 60) return "Violações menores detectadas. Revise os avisos abaixo para evitar redução de alcance.";
    return "URGENTE: Sua conta corre risco de suspensão. Resolva as violações críticas imediatamente.";
  };

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-50`} />

      <CardContent className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Score de Saúde da Conta</p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="text-6xl font-bold text-slate-900">{score}</span>
              <span className="text-2xl font-light text-slate-400 self-end mb-2">/100</span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Badge variant={status}>
              {status === 'safe' ? 'Excelente' : status === 'warning' ? 'Atenção Necessária' : 'Ação Crítica'}
            </Badge>
            <span className={`text-sm font-medium flex items-center ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(trend)} pts (7d)
            </span>
          </div>

          <p className="text-sm text-slate-600 max-w-lg">
            {description()}
          </p>
        </div>

        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-slate-200"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={getColor()}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {renderIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScoreHero;

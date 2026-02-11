import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { FinancialMetric } from '../types';
import { DollarSign, TrendingUp, TrendingDown, Percent, BarChart3 } from 'lucide-react';

const MetricCard: React.FC<{ metric: FinancialMetric }> = ({ metric }) => {
  const getIcon = () => {
    const label = metric.label.toLowerCase();
    if (label.includes('gmv')) return <DollarSign className="w-4 h-4 text-slate-400" />;
    if (label.includes('commission') || label.includes('comissão')) return <DollarSign className="w-4 h-4 text-slate-400" />;
    if (label.includes('conversion') || label.includes('conversão')) return <Percent className="w-4 h-4 text-slate-400" />;
    return <BarChart3 className="w-4 h-4 text-slate-400" />;
  };

  const isPositive = metric.trend.direction === 'up';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-slate-500 normal-case">{metric.label}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
        <p className={`text-xs flex items-center mt-1 font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {metric.trend.value}% vs últimos 30d
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

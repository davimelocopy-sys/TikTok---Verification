import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Alert } from '../types';

interface AlertBannerProps {
  alerts: Alert[];
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alerts }) => {
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high');

  if (criticalAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {criticalAlerts.map(alert => (
        <div
          key={alert.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-rose-50 border border-rose-200 rounded-lg shadow-sm animate-pulse-slow"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 sm:mt-0" />
            <div>
              <h4 className="text-sm font-bold text-rose-800">{alert.title}</h4>
              <p className="text-sm text-rose-700 mt-1 sm:mt-0">{alert.description}</p>
            </div>
          </div>
          <button className="mt-3 sm:mt-0 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded shadow-sm flex items-center transition-colors">
            {alert.actionLabel || 'Resolver'}
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;

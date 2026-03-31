import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  color = 'primary',
  loading = false 
}) => {
  const getChangeIcon = () => {
    if (changeType === 'positive') return <TrendingUp className="w-4 h-4" />;
    if (changeType === 'negative') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success-600 bg-success-50';
    if (changeType === 'negative') return 'text-error-600 bg-error-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getIconBg = () => {
    const colors = {
      primary: 'bg-gradient-to-br from-blue-500 to-blue-600',
      success: 'bg-gradient-to-br from-green-500 to-green-600',
      warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      error: 'bg-gradient-to-br from-red-500 to-red-600',
      purple: 'bg-gradient-to-br from-purple-500 to-purple-600'
    };
    return colors[color] || colors.primary;
  };

  if (loading) {
    return (
      <div className="stats-card">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl loading-skeleton"></div>
          <div className="w-16 h-6 bg-gray-200 rounded-full loading-skeleton"></div>
        </div>
        <div className="w-24 h-8 bg-gray-200 rounded-lg loading-skeleton mb-2"></div>
        <div className="w-32 h-4 bg-gray-200 rounded loading-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="stats-card group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${getIconBg()} shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="stats-value">
        {value}
      </div>
      
      <div className="stats-label">
        {title}
      </div>
    </div>
  );
};

export default StatsCard;

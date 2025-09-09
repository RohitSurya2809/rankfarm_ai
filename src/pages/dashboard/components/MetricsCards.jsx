import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricsCards = ({ currentLanguage }) => {
  const [counters, setCounters] = useState({
    totalRecommendations: 0,
    successRate: 0,
    avgROI: 0,
    activeFarms: 0
  });

  const metricsData = [
    {
      id: 'recommendations',
      title: { en: 'Total Recommendations', hi: 'कुल सिफारिशें', ta: 'மொத்த பரிந்துரைகள்' },
      value: 1247,
      change: +12,
      changeType: 'increase',
      icon: 'Target',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: [65, 78, 82, 95, 88, 92, 100]
    },
    {
      id: 'success',
      title: { en: 'Success Rate', hi: 'सफलता दर', ta: 'வெற்றி விகிதம்' },
      value: 94.2,
      suffix: '%',
      change: +2.1,
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: [88, 89, 91, 92, 93, 94, 94.2]
    },
    {
      id: 'roi',
      title: { en: 'Average ROI', hi: 'औसत ROI', ta: 'சராசரி ROI' },
      value: 142,
      suffix: '%',
      prefix: '+',
      change: +8,
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      trend: [120, 125, 130, 135, 138, 140, 142]
    },
    {
      id: 'farms',
      title: { en: 'Active Farms', hi: 'सक्रिय फार्म', ta: 'செயலில் உள்ள பண்ணைகள்' },
      value: 3456,
      change: +156,
      changeType: 'increase',
      icon: 'Home',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      trend: [3200, 3250, 3300, 3350, 3400, 3420, 3456]
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      metricsData?.forEach((metric) => {
        let start = 0;
        const end = metric?.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          
          setCounters(prev => ({
            ...prev,
            [metric?.id]: Math.floor(start)
          }));
        }, 16);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const formatValue = (metric, currentValue) => {
    const value = currentValue || metric?.value;
    if (metric?.id === 'success' || metric?.id === 'roi') {
      return value?.toFixed(1);
    }
    return value?.toLocaleString('en-IN');
  };

  return (
    <div className="mb-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metricsData?.map((metric) => (
          <motion.div
            key={metric?.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-agricultural hover:shadow-agricultural-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={24} className={metric?.color} />
              </div>
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                metric?.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={metric?.changeType === 'increase' ? 'ArrowUp' : 'ArrowDown'} 
                  size={14} 
                />
                <span>{Math.abs(metric?.change)}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {metric?.title?.[currentLanguage] || metric?.title?.en}
            </h3>

            {/* Value */}
            <div className="flex items-baseline space-x-1 mb-4">
              {metric?.prefix && (
                <span className="text-lg font-bold text-foreground">{metric?.prefix}</span>
              )}
              <span className="text-2xl font-bold text-foreground">
                {formatValue(metric, counters?.[metric?.id])}
              </span>
              {metric?.suffix && (
                <span className="text-lg font-bold text-foreground">{metric?.suffix}</span>
              )}
            </div>

            {/* Mini Chart */}
            <div className="flex items-end space-x-1 h-8">
              {metric?.trend?.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(point / Math.max(...metric?.trend)) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex-1 ${metric?.bgColor} rounded-sm min-h-[4px]`}
                />
              ))}
            </div>

            {/* Change Indicator */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? 'पिछले महीने से' : 
                 currentLanguage === 'ta'? 'கடந்த மாதத்திலிருந்து' : 'vs last month'}
              </span>
              <div className={`flex items-center space-x-1 text-xs font-medium ${
                metric?.changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <span>{metric?.changeType === 'increase' ? '+' : '-'}{Math.abs(metric?.change)}</span>
                {metric?.suffix && <span>{metric?.suffix}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MetricsCards;
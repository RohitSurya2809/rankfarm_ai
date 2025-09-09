import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfidenceTracker = ({ confidenceData, currentLanguage }) => {
  const translations = {
    en: {
      title: "Prediction Confidence Tracker",
      overallAccuracy: "Overall Accuracy",
      confidenceIntervals: "Confidence Intervals",
      improvementTrend: "Improvement Trend",
      lastUpdated: "Last Updated",
      high: "High Confidence",
      medium: "Medium Confidence",
      low: "Low Confidence",
      predictions: "predictions",
      accuracy: "accuracy",
      trend: "trend"
    },
    hi: {
      title: "भविष्यवाणी विश्वास ट्रैकर",
      overallAccuracy: "समग्र सटीकता",
      confidenceIntervals: "विश्वास अंतराल",
      improvementTrend: "सुधार रुझान",
      lastUpdated: "अंतिम अपडेट",
      high: "उच्च विश्वास",
      medium: "मध्यम विश्वास",
      low: "कम विश्वास",
      predictions: "भविष्यवाणियां",
      accuracy: "सटीकता",
      trend: "रुझान"
    },
    ta: {
      title: "கணிப்பு நம்பிக்கை டிராக்கர்",
      overallAccuracy: "ஒட்டுமொத்த துல்லியம்",
      confidenceIntervals: "நம்பிக்கை இடைவெளிகள்",
      improvementTrend: "மேம்பாட்டு போக்கு",
      lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
      high: "அதிக நம்பிக்கை",
      medium: "நடுத்தர நம்பிக்கை",
      low: "குறைந்த நம்பிக்கை",
      predictions: "கணிப்புகள்",
      accuracy: "துல்லியம்",
      trend: "போக்கு"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getConfidenceColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-success bg-success/10 border-success';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning';
      case 'low':
        return 'text-error bg-error/10 border-error';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted';
    }
  };

  const getConfidenceIcon = (level) => {
    switch (level) {
      case 'high':
        return 'CheckCircle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
        <Icon name="Shield" size={24} className="text-primary" />
      </div>
      {/* Overall Accuracy */}
      <div className="bg-primary/5 rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#16a34a"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(confidenceData?.overallAccuracy / 100) * 314} 314`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{confidenceData?.overallAccuracy}%</p>
                <p className="text-sm text-muted-foreground">{t?.accuracy}</p>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{t?.overallAccuracy}</h3>
          <p className="text-sm text-muted-foreground">
            {t?.lastUpdated}: {new Date(confidenceData.lastUpdated)?.toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Confidence Intervals */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t?.confidenceIntervals}</h3>
        <div className="space-y-4">
          {confidenceData?.intervals?.map((interval) => (
            <div key={interval?.level} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getConfidenceColor(interval?.level)}`}>
                    <Icon name={getConfidenceIcon(interval?.level)} size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{interval?.percentage}% {t?.[interval?.level]}</p>
                    <p className="text-sm text-muted-foreground">{interval?.count} {t?.predictions}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{interval?.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">{t?.accuracy}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    interval?.level === 'high' ? 'bg-success' :
                    interval?.level === 'medium' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${interval?.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Trend */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t?.improvementTrend}</h3>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">+{confidenceData?.improvementTrend}%</span>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="grid grid-cols-6 gap-2">
          {confidenceData?.monthlyTrend?.map((month, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-16 flex items-end justify-center p-1">
                  <div
                    className="w-full bg-primary rounded-full transition-all duration-500"
                    style={{ height: `${(month?.accuracy / 100) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{month?.month}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-6 space-y-3">
        <h4 className="font-semibold text-foreground">Key Insights</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">High Accuracy in Crop Recommendations</p>
              <p className="text-xs text-muted-foreground">95% accuracy rate for crop selection predictions</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Improving Pest Control Predictions</p>
              <p className="text-xs text-muted-foreground">78% accuracy, showing 12% improvement this month</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Overall Trend Positive</p>
              <p className="text-xs text-muted-foreground">Consistent improvement across all recommendation categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceTracker;
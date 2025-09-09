import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics, currentLanguage }) => {
  const translations = {
    en: {
      title: "Performance Overview",
      totalRecommendations: "Total Recommendations",
      successRate: "Success Rate",
      avgROI: "Average ROI",
      costSavings: "Cost Savings",
      yieldImprovement: "Yield Improvement",
      recommendations: "recommendations",
      thisMonth: "this month",
      vsLastSeason: "vs last season"
    },
    hi: {
      title: "प्रदर्शन अवलोकन",
      totalRecommendations: "कुल सिफारिशें",
      successRate: "सफलता दर",
      avgROI: "औसत ROI",
      costSavings: "लागत बचत",
      yieldImprovement: "उत्पादन सुधार",
      recommendations: "सिफारिशें",
      thisMonth: "इस महीने",
      vsLastSeason: "पिछले सीजन की तुलना में"
    },
    ta: {
      title: "செயல்திறன் மேலோட்டம்",
      totalRecommendations: "மொத்த பரிந்துரைகள்",
      successRate: "வெற்றி விகிதம்",
      avgROI: "சராசரி ROI",
      costSavings: "செலவு சேமிப்பு",
      yieldImprovement: "விளைச்சல் மேம்பாடு",
      recommendations: "பரிந்துரைகள்",
      thisMonth: "இந்த மாதம்",
      vsLastSeason: "கடந்த பருவத்துடன் ஒப்பிடுகையில்"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
        <Icon name="TrendingUp" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Recommendations */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Target" size={20} className="text-primary" />
            <span className="text-xs text-success font-medium">+12%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{metrics?.totalRecommendations}</p>
            <p className="text-sm text-muted-foreground">{t?.totalRecommendations}</p>
            <p className="text-xs text-muted-foreground">{metrics?.monthlyRecommendations} {t?.thisMonth}</p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-xs text-success font-medium">+8%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{metrics?.successRate}%</p>
            <p className="text-sm text-muted-foreground">{t?.successRate}</p>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics?.successRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Average ROI */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <span className="text-xs text-success font-medium">+15%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{metrics?.avgROI}%</p>
            <p className="text-sm text-muted-foreground">{t?.avgROI}</p>
            <p className="text-xs text-muted-foreground">{t?.vsLastSeason}</p>
          </div>
        </div>

        {/* Cost Savings */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="PiggyBank" size={20} className="text-primary" />
            <span className="text-xs text-success font-medium">+22%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">₹{metrics?.costSavings?.toLocaleString('en-IN')}</p>
            <p className="text-sm text-muted-foreground">{t?.costSavings}</p>
            <p className="text-xs text-muted-foreground">{t?.thisMonth}</p>
          </div>
        </div>

        {/* Yield Improvement */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Wheat" size={20} className="text-success" />
            <span className="text-xs text-success font-medium">+18%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{metrics?.yieldImprovement}%</p>
            <p className="text-sm text-muted-foreground">{t?.yieldImprovement}</p>
            <p className="text-xs text-muted-foreground">{t?.vsLastSeason}</p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Shield" size={20} className="text-warning" />
            <span className="text-xs text-success font-medium">+5%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{metrics?.confidenceScore}%</p>
            <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <div className="w-2 h-2 bg-success rounded-full" />
              <div className="w-2 h-2 bg-success rounded-full" />
              <div className="w-2 h-2 bg-warning rounded-full" />
              <div className="w-2 h-2 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
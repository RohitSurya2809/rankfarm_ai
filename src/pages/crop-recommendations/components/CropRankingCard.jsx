import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CropRankingCard = ({ 
  crop, 
  rank, 
  onViewDetails, 
  onCompare, 
  isSelected = false,
  currentLanguage = 'en' 
}) => {
  const getMedalIcon = (position) => {
    if (position === 1) return { icon: '🥇', color: 'text-yellow-500', bg: 'bg-yellow-50' };
    if (position === 2) return { icon: '🥈', color: 'text-gray-500', bg: 'bg-gray-50' };
    if (position === 3) return { icon: '🥉', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { icon: `#${position}`, color: 'text-primary', bg: 'bg-primary/10' };
  };

  const medal = getMedalIcon(rank);

  const getLocalizedText = (textObj) => {
    return textObj?.[currentLanguage] || textObj?.en;
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`ranking-card transition-all duration-300 hover:scale-[1.02] ${
      isSelected ? 'ring-2 ring-primary shadow-lg' : ''
    } ${rank <= 3 ? 'border-2' : ''} ${
      rank === 1 ? 'border-yellow-400' : 
      rank === 2 ? 'border-gray-400' : 
      rank === 3 ? 'border-amber-400' : ''
    }`}>
      {/* Rank Badge */}
      <div className="absolute -top-3 -left-3 z-10">
        <div className={`w-12 h-12 rounded-full ${medal?.bg} border-2 border-white shadow-lg flex items-center justify-center`}>
          <span className={`text-lg font-bold ${medal?.color}`}>
            {typeof medal?.icon === 'string' && medal?.icon?.startsWith('#') ? medal?.icon : medal?.icon}
          </span>
        </div>
      </div>
      {/* Crop Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={crop?.image}
          alt={getLocalizedText(crop?.name)}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(crop?.riskLevel)}`}>
            {crop?.riskLevel} Risk
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Crop Name & Category */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {getLocalizedText(crop?.name)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getLocalizedText(crop?.category)}
          </p>
        </div>

        {/* Success Probability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Success Probability</span>
            <span className="text-lg font-bold text-primary">{crop?.successProbability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${crop?.successProbability}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Confidence: {crop?.confidenceInterval}</span>
            <span>AI Score: {crop?.aiScore}/10</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="IndianRupee" size={16} className="text-primary" />
              <span className="text-sm font-bold text-foreground ml-1">
                ₹{crop?.expectedROI?.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Expected ROI</p>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-bold text-foreground ml-1">
                {crop?.growthPeriod} days
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Growth Period</p>
          </div>
        </div>

        {/* Soil & Water Requirements */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Soil Suitability</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < crop?.soilSuitability ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Water Requirement</span>
            <span className="text-sm font-medium text-foreground">{crop?.waterRequirement}</span>
          </div>
        </div>

        {/* Market Price Forecast */}
        <div className="p-3 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Market Forecast</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={crop?.pricetrend === 'up' ? 'TrendingUp' : crop?.pricetrend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={crop?.pricetrend === 'up' ? 'text-green-500' : crop?.pricetrend === 'down' ? 'text-red-500' : 'text-gray-500'} 
              />
              <span className="text-sm font-medium">₹{crop?.marketPrice}/kg</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{crop?.marketForecast}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(crop)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
          <Button
            variant={isSelected ? "default" : "ghost"}
            size="sm"
            onClick={() => onCompare(crop)}
            iconName={isSelected ? "Check" : "Plus"}
            iconPosition="left"
          >
            {isSelected ? 'Selected' : 'Compare'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropRankingCard;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RankingCard = ({ 
  fertilizer, 
  rank, 
  onViewDetails, 
  onCompare, 
  isSelected = false,
  currentLanguage = 'en' 
}) => {
  const getRankIcon = (position) => {
    if (position === 1) return { icon: 'Trophy', color: '#FFD700', bg: 'bg-yellow-50' };
    if (position === 2) return { icon: 'Award', color: '#C0C0C0', bg: 'bg-gray-50' };
    if (position === 3) return { icon: 'Medal', color: '#CD7F32', bg: 'bg-orange-50' };
    return { icon: 'Hash', color: '#6b7280', bg: 'bg-gray-50' };
  };

  const rankInfo = getRankIcon(rank);

  const getEffectivenessColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const translations = {
    en: {
      effectiveness: 'Effectiveness',
      costPerAcre: 'Cost per Acre',
      yieldIncrease: 'Yield Increase',
      applicationTime: 'Application Time',
      viewDetails: 'View Details',
      compare: 'Compare',
      organic: 'Organic',
      premium: 'Premium',
      standard: 'Standard',
      economy: 'Economy',
      days: 'days',
      weeks: 'weeks'
    },
    hi: {
      effectiveness: 'प्रभावशीलता',
      costPerAcre: 'प्रति एकड़ लागत',
      yieldIncrease: 'उत्पादन वृद्धि',
      applicationTime: 'प्रयोग समय',
      viewDetails: 'विवरण देखें',
      compare: 'तुलना करें',
      organic: 'जैविक',
      premium: 'प्रीमियम',
      standard: 'मानक',
      economy: 'किफायती',
      days: 'दिन',
      weeks: 'सप्ताह'
    },
    ta: {
      effectiveness: 'செயல்திறன்',
      costPerAcre: 'ஏக்கருக்கு செலவு',
      yieldIncrease: 'விளைச்சல் அதிகரிப்பு',
      applicationTime: 'பயன்பாட்டு நேரம்',
      viewDetails: 'விவரங்களைக் காண்க',
      compare: 'ஒப்பிடுக',
      organic: 'இயற்கை',
      premium: 'பிரீமியம்',
      standard: 'நிலையான',
      economy: 'மிதமான',
      days: 'நாட்கள்',
      weeks: 'வாரங்கள்'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <div className={`relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
      isSelected ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'
    }`}>
      {/* Rank Badge */}
      <div className={`absolute -top-3 -left-3 w-12 h-12 ${rankInfo?.bg} rounded-full flex items-center justify-center border-2 border-white shadow-md`}>
        <Icon name={rankInfo?.icon} size={20} color={rankInfo?.color} />
        <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
          {rank}
        </span>
      </div>
      {/* Premium/Organic Badge */}
      {fertilizer?.category && (
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            fertilizer?.category === 'organic' ? 'bg-green-100 text-green-800' :
            fertilizer?.category === 'premium' ? 'bg-purple-100 text-purple-800' :
            fertilizer?.category === 'standard'? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {t?.[fertilizer?.category] || fertilizer?.category}
          </span>
        </div>
      )}
      <div className="p-6 pt-8">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{fertilizer?.name}</h3>
          <p className="text-sm text-gray-600">{fertilizer?.composition}</p>
        </div>

        {/* Effectiveness Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t?.effectiveness}</span>
            <span className={`px-2 py-1 text-sm font-bold rounded ${getEffectivenessColor(fertilizer?.effectiveness)}`}>
              {fertilizer?.effectiveness}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${fertilizer?.effectiveness}%` }}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="IndianRupee" size={16} className="text-green-600" />
              <span className="text-lg font-bold text-gray-900">{fertilizer?.costPerAcre?.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-gray-600">{t?.costPerAcre}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="TrendingUp" size={16} className="text-blue-600" />
              <span className="text-lg font-bold text-gray-900">+{fertilizer?.yieldIncrease}%</span>
            </div>
            <p className="text-xs text-gray-600">{t?.yieldIncrease}</p>
          </div>
        </div>

        {/* Application Timing */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">{t?.applicationTime}</span>
          </div>
          <p className="text-sm text-blue-800">{fertilizer?.applicationTiming}</p>
        </div>

        {/* Compatibility Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {fertilizer?.compatibleCrops?.slice(0, 3)?.map((crop, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {crop}
              </span>
            ))}
            {fertilizer?.compatibleCrops?.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{fertilizer?.compatibleCrops?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(fertilizer)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            {t?.viewDetails}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCompare(fertilizer)}
            className="flex-1"
            iconName="GitCompare"
            iconPosition="left"
          >
            {t?.compare}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
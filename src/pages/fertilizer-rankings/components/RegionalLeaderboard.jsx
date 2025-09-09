import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalLeaderboard = ({ 
  region = 'Maharashtra', 
  leaderboardData = [], 
  currentLanguage = 'en' 
}) => {
  const translations = {
    en: {
      regionalLeaderboard: 'Regional Leaderboard',
      popularIn: 'Popular in',
      farmers: 'farmers',
      successRate: 'Success Rate',
      avgYieldIncrease: 'Avg Yield Increase',
      viewDetails: 'View Details',
      basedOn: 'Based on',
      reviews: 'reviews',
      noData: 'No regional data available',
      loadData: 'Load regional data for better recommendations'
    },
    hi: {
      regionalLeaderboard: 'क्षेत्रीय लीडरबोर्ड',
      popularIn: 'में लोकप्रिय',
      farmers: 'किसान',
      successRate: 'सफलता दर',
      avgYieldIncrease: 'औसत उत्पादन वृद्धि',
      viewDetails: 'विवरण देखें',
      basedOn: 'आधारित',
      reviews: 'समीक्षाएं',
      noData: 'कोई क्षेत्रीय डेटा उपलब्ध नहीं',
      loadData: 'बेहतर सुझावों के लिए क्षेत्रीय डेटा लोड करें'
    },
    ta: {
      regionalLeaderboard: 'பிராந்திய தலைமை பலகை',
      popularIn: 'இல் பிரபலமான',
      farmers: 'விவசாயிகள்',
      successRate: 'வெற்றி விகிதம்',
      avgYieldIncrease: 'சராசரி விளைச்சல் அதிகரிப்பு',
      viewDetails: 'விவரங்களைக் காண்க',
      basedOn: 'அடிப்படையில்',
      reviews: 'மதிப்புரைகள்',
      noData: 'பிராந்திய தரவு எதுவும் கிடைக்கவில்லை',
      loadData: 'சிறந்த பரிந்துரைகளுக்கு பிராந்திய தரவை ஏற்றவும்'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (leaderboardData?.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t?.noData}</h3>
          <p className="text-gray-600 mb-4">{t?.loadData}</p>
          <Button variant="outline" iconName="RefreshCw">
            Load Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{t?.regionalLeaderboard}</h3>
            <p className="text-sm text-gray-600">{t?.popularIn} {region}</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {leaderboardData?.map((item, index) => (
          <div key={item?.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Rank Badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  index === 2 ? 'bg-orange-100 text-orange-800': 'bg-blue-100 text-blue-800'
                }`}>
                  {index + 1}
                </div>

                {/* Fertilizer Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item?.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Icon name="Users" size={14} />
                      <span>{item?.farmerCount?.toLocaleString('en-IN')} {t?.farmers}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span>{t?.basedOn} {item?.reviewCount} {t?.reviews}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
              >
                {t?.viewDetails}
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-4 ml-12">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-700">{item?.successRate}%</div>
                <div className="text-xs text-green-600">{t?.successRate}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-700">+{item?.avgYieldIncrease}%</div>
                <div className="text-xs text-blue-600">{t?.avgYieldIncrease}</div>
              </div>
            </div>

            {/* Success Stories Preview */}
            {item?.recentSuccess && (
              <div className="mt-3 ml-12 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Quote" size={14} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-700 italic">"{item?.recentSuccess?.quote}"</p>
                    <p className="text-xs text-gray-500 mt-1">- {item?.recentSuccess?.farmer}, {item?.recentSuccess?.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          className="w-full"
        >
          View Complete Regional Analysis
        </Button>
      </div>
    </div>
  );
};

export default RegionalLeaderboard;
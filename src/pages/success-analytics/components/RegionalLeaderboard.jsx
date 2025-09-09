import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalLeaderboard = ({ leaderboardData, currentLanguage }) => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeMetric, setActiveMetric] = useState('overall');

  const translations = {
    en: {
      title: "Regional Leaderboard",
      yourRank: "Your Rank",
      viewProfile: "View Profile",
      overall: "Overall Score",
      yield: "Yield Performance",
      roi: "ROI Achievement",
      sustainability: "Sustainability",
      allRegions: "All Regions",
      topPerformers: "Top Performers",
      rank: "Rank",
      farmer: "Farmer",
      location: "Location",
      score: "Score",
      improvement: "Improvement",
      farmSize: "Farm Size",
      acres: "acres"
    },
    hi: {
      title: "क्षेत्रीय लीडरबोर्ड",
      yourRank: "आपकी रैंक",
      viewProfile: "प्रोफाइल देखें",
      overall: "समग्र स्कोर",
      yield: "उत्पादन प्रदर्शन",
      roi: "ROI उपलब्धि",
      sustainability: "स्थिरता",
      allRegions: "सभी क्षेत्र",
      topPerformers: "शीर्ष प्रदर्शनकर्ता",
      rank: "रैंक",
      farmer: "किसान",
      location: "स्थान",
      score: "स्कोर",
      improvement: "सुधार",
      farmSize: "खेत का आकार",
      acres: "एकड़"
    },
    ta: {
      title: "பிராந்திய லீடர்போர்டு",
      yourRank: "உங்கள் தரவரிசை",
      viewProfile: "சுயவிவரத்தைப் பார்க்கவும்",
      overall: "ஒட்டுமொத்த மதிப்பெண்",
      yield: "விளைச்சல் செயல்திறன்",
      roi: "ROI சாதனை",
      sustainability: "நிலைத்தன்மை",
      allRegions: "அனைத்து பகுதிகள்",
      topPerformers: "சிறந்த செயல்திறன்",
      rank: "தரவரிசை",
      farmer: "விவசாயி",
      location: "இடம்",
      score: "மதிப்பெண்",
      improvement: "மேம்பாடு",
      farmSize: "பண்ணை அளவு",
      acres: "ஏக்கர்"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const regions = [
    { id: 'all', name: t?.allRegions },
    { id: 'north', name: 'North India' },
    { id: 'south', name: 'South India' },
    { id: 'west', name: 'West India' },
    { id: 'east', name: 'East India' }
  ];

  const metrics = [
    { id: 'overall', name: t?.overall, icon: 'Trophy' },
    { id: 'yield', name: t?.yield, icon: 'Wheat' },
    { id: 'roi', name: t?.roi, icon: 'TrendingUp' },
    { id: 'sustainability', name: t?.sustainability, icon: 'Leaf' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'text-accent bg-accent/10 border-accent';
      case 2:
        return 'text-muted-foreground bg-muted-foreground/10 border-muted-foreground';
      case 3:
        return 'text-warning bg-warning/10 border-warning';
      default:
        return 'text-foreground bg-muted/50 border-muted';
    }
  };

  const filteredData = leaderboardData?.filter(item => 
    activeRegion === 'all' || item?.region === activeRegion
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
        <Icon name="Users" size={24} className="text-primary" />
      </div>
      {/* Your Rank Card */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Rajesh Kumar</h3>
              <p className="text-sm text-muted-foreground">Pune, Maharashtra</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-lg font-bold text-primary">#7</p>
                <p className="text-xs text-muted-foreground">{t?.yourRank}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="space-y-4 mb-6">
        {/* Region Filter */}
        <div className="flex flex-wrap gap-2">
          {regions?.map((region) => (
            <Button
              key={region?.id}
              variant={activeRegion === region?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRegion(region?.id)}
              className="text-xs"
            >
              {region?.name}
            </Button>
          ))}
        </div>

        {/* Metric Filter */}
        <div className="flex flex-wrap gap-2">
          {metrics?.map((metric) => (
            <Button
              key={metric?.id}
              variant={activeMetric === metric?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveMetric(metric?.id)}
              iconName={metric?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {metric?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Leaderboard List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t?.topPerformers}</h3>
        
        {filteredData?.slice(0, 10)?.map((farmer, index) => (
          <div
            key={farmer?.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              farmer?.isCurrentUser
                ? 'bg-primary/5 border-primary/20' :'bg-muted/30 border-muted hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Rank */}
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${getRankColor(farmer?.rank)}`}>
                {typeof getRankIcon(farmer?.rank) === 'string' && getRankIcon(farmer?.rank)?.includes('#') ? (
                  <span className="text-sm">{getRankIcon(farmer?.rank)}</span>
                ) : (
                  <span className="text-lg">{getRankIcon(farmer?.rank)}</span>
                )}
              </div>

              {/* Farmer Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{farmer?.name}</h4>
                  <p className="text-sm text-muted-foreground">{farmer?.location}</p>
                  <p className="text-xs text-muted-foreground">{farmer?.farmSize} {t?.acres}</p>
                </div>
              </div>
            </div>

            {/* Score and Stats */}
            <div className="text-right">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-lg font-bold text-foreground">{farmer?.score}</p>
                  <p className="text-xs text-muted-foreground">{t?.score}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={farmer?.improvement > 0 ? "TrendingUp" : "TrendingDown"} 
                    size={16} 
                    className={farmer?.improvement > 0 ? "text-success" : "text-error"}
                  />
                  <span className={`text-sm font-medium ${farmer?.improvement > 0 ? "text-success" : "text-error"}`}>
                    {farmer?.improvement > 0 ? '+' : ''}{farmer?.improvement}%
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="text-xs"
                >
                  {t?.viewProfile}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Farmers
        </Button>
      </div>
    </div>
  );
};

export default RegionalLeaderboard;
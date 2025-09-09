import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStories = ({ stories, currentLanguage }) => {
  const [selectedStory, setSelectedStory] = useState(null);

  const translations = {
    en: {
      title: "Success Stories",
      readMore: "Read More",
      readLess: "Read Less",
      shareStory: "Share Your Story",
      location: "Location",
      farmSize: "Farm Size",
      improvement: "Improvement",
      roi: "ROI Achieved",
      challenge: "Challenge",
      solution: "Solution",
      result: "Result",
      acres: "acres",
      months: "months ago",
      verified: "Verified Success",
      category: "Category"
    },
    hi: {
      title: "सफलता की कहानियां",
      readMore: "और पढ़ें",
      readLess: "कम पढ़ें",
      shareStory: "अपनी कहानी साझा करें",
      location: "स्थान",
      farmSize: "खेत का आकार",
      improvement: "सुधार",
      roi: "प्राप्त ROI",
      challenge: "चुनौती",
      solution: "समाधान",
      result: "परिणाम",
      acres: "एकड़",
      months: "महीने पहले",
      verified: "सत्यापित सफलता",
      category: "श्रेणी"
    },
    ta: {
      title: "வெற்றிக் கதைகள்",
      readMore: "மேலும் படிக்கவும்",
      readLess: "குறைவாக படிக்கவும்",
      shareStory: "உங்கள் கதையைப் பகிரவும்",
      location: "இடம்",
      farmSize: "பண்ணை அளவு",
      improvement: "மேம்பாடு",
      roi: "அடைந்த ROI",
      challenge: "சவால்",
      solution: "தீர்வு",
      result: "முடிவு",
      acres: "ஏக்கர்",
      months: "மாதங்களுக்கு முன்பு",
      verified: "சரிபார்க்கப்பட்ட வெற்றி",
      category: "வகை"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getCategoryIcon = (category) => {
    const iconMap = {
      'crop': 'Wheat',
      'fertilizer': 'Beaker',
      'pest_control': 'Bug',
      'irrigation': 'Droplets',
      'technology': 'Smartphone',
      'sustainability': 'Leaf'
    };
    return iconMap?.[category] || 'Star';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'crop': 'text-success bg-success/10 border-success',
      'fertilizer': 'text-primary bg-primary/10 border-primary',
      'pest_control': 'text-warning bg-warning/10 border-warning',
      'irrigation': 'text-blue-600 bg-blue-600/10 border-blue-600',
      'technology': 'text-purple-600 bg-purple-600/10 border-purple-600',
      'sustainability': 'text-green-700 bg-green-700/10 border-green-700'
    };
    return colorMap?.[category] || 'text-muted-foreground bg-muted/10 border-muted';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          {t?.shareStory}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stories?.map((story) => (
          <div
            key={story?.id}
            className="bg-muted/30 rounded-lg border border-muted p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Story Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{story?.farmerName}</h3>
                  <p className="text-sm text-muted-foreground">{story?.location}</p>
                  <p className="text-xs text-muted-foreground">{story?.timeAgo} {t?.months}</p>
                </div>
              </div>
              
              {/* Verification Badge */}
              {story?.verified && (
                <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
                  <Icon name="CheckCircle" size={14} />
                  <span className="text-xs font-medium">{t?.verified}</span>
                </div>
              )}
            </div>

            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(story?.category)}`}>
                <Icon name={getCategoryIcon(story?.category)} size={14} />
                <span>{story?.categoryName}</span>
              </span>
            </div>

            {/* Story Image */}
            {story?.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <Image
                  src={story?.image}
                  alt={`${story?.farmerName}'s farm`}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="TrendingUp" size={16} className="text-success" />
                  <span className="text-xs text-muted-foreground">{t?.improvement}</span>
                </div>
                <p className="text-lg font-bold text-success">+{story?.improvement}%</p>
              </div>
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="DollarSign" size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{t?.roi}</span>
                </div>
                <p className="text-lg font-bold text-primary">{story?.roi}%</p>
              </div>
            </div>

            {/* Farm Details */}
            <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{story?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Maximize" size={14} />
                <span>{story?.farmSize} {t?.acres}</span>
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{t?.challenge}</h4>
                <p className="text-sm text-muted-foreground">{story?.challenge}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{t?.solution}</h4>
                <p className="text-sm text-muted-foreground">{story?.solution}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{t?.result}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedStory === story?.id ? story?.result : `${story?.result?.substring(0, 100)}...`}
                </p>
              </div>
            </div>

            {/* Read More/Less Button */}
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStory(selectedStory === story?.id ? null : story?.id)}
                iconName={selectedStory === story?.id ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                className="text-primary hover:text-primary/80"
              >
                {selectedStory === story?.id ? t?.readLess : t?.readMore}
              </Button>
            </div>

            {/* Expanded Content */}
            {selectedStory === story?.id && (
              <div className="mt-4 pt-4 border-t border-muted space-y-3">
                {/* Additional Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{story?.yieldIncrease}%</p>
                    <p className="text-xs text-muted-foreground">Yield Increase</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">₹{story?.costSavings?.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-muted-foreground">Cost Savings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{story?.timeToResult}</p>
                    <p className="text-xs text-muted-foreground">Time to Result</p>
                  </div>
                </div>

                {/* Recommendations Used */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Recommendations Implemented</h4>
                  <div className="flex flex-wrap gap-2">
                    {story?.recommendationsUsed?.map((rec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Load More Stories */}
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="RefreshCw" iconPosition="left">
          Load More Stories
        </Button>
      </div>
    </div>
  );
};

export default SuccessStories;
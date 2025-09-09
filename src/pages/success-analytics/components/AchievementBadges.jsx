import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements, currentLanguage }) => {
  const translations = {
    en: {
      title: "Achievement Badges",
      viewAll: "View All Achievements",
      unlocked: "Unlocked",
      locked: "Locked",
      progress: "Progress",
      nextBadge: "Next Badge"
    },
    hi: {
      title: "उपलब्धि बैज",
      viewAll: "सभी उपलब्धियां देखें",
      unlocked: "अनलॉक",
      locked: "लॉक",
      progress: "प्रगति",
      nextBadge: "अगला बैज"
    },
    ta: {
      title: "சாதனை பேட்ஜ்கள்",
      viewAll: "அனைத்து சாதனைகளையும் பார்க்கவும்",
      unlocked: "திறக்கப்பட்டது",
      locked: "பூட்டப்பட்டது",
      progress: "முன்னேற்றம்",
      nextBadge: "அடுத்த பேட்ஜ்"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getBadgeIcon = (type) => {
    const iconMap = {
      'first_success': 'Trophy',
      'cost_saver': 'PiggyBank',
      'yield_master': 'Wheat',
      'eco_warrior': 'Leaf',
      'innovation_leader': 'Lightbulb',
      'community_helper': 'Users',
      'data_expert': 'BarChart3',
      'season_champion': 'Calendar'
    };
    return iconMap?.[type] || 'Award';
  };

  const getBadgeColor = (tier) => {
    switch (tier) {
      case 'gold':
        return 'text-accent bg-accent/10 border-accent';
      case 'silver':
        return 'text-muted-foreground bg-muted-foreground/10 border-muted-foreground';
      case 'bronze':
        return 'text-warning bg-warning/10 border-warning';
      default:
        return 'text-primary bg-primary/10 border-primary';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
          {t?.viewAll}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              achievement?.unlocked
                ? `${getBadgeColor(achievement?.tier)} shadow-lg`
                : 'bg-muted/30 border-muted text-muted-foreground'
            }`}
          >
            {/* Badge Icon */}
            <div className="flex justify-center mb-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement?.unlocked
                    ? 'bg-background shadow-md'
                    : 'bg-muted'
                }`}
              >
                <Icon
                  name={getBadgeIcon(achievement?.type)}
                  size={24}
                  className={achievement?.unlocked ? 'text-current' : 'text-muted-foreground'}
                />
              </div>
            </div>

            {/* Badge Title */}
            <h3 className="text-sm font-semibold text-center mb-2 line-clamp-2">
              {achievement?.title}
            </h3>

            {/* Badge Description */}
            <p className="text-xs text-center opacity-80 mb-3 line-clamp-2">
              {achievement?.description}
            </p>

            {/* Progress Bar (for locked badges) */}
            {!achievement?.unlocked && achievement?.progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{t?.progress}</span>
                  <span>{achievement?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${achievement?.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Unlock Date */}
            {achievement?.unlocked && achievement?.unlockedDate && (
              <p className="text-xs text-center opacity-60 mt-2">
                {new Date(achievement.unlockedDate)?.toLocaleDateString()}
              </p>
            )}

            {/* Tier Indicator */}
            {achievement?.unlocked && achievement?.tier && (
              <div className="absolute top-2 right-2">
                {achievement?.tier === 'gold' && <span className="text-lg">🥇</span>}
                {achievement?.tier === 'silver' && <span className="text-lg">🥈</span>}
                {achievement?.tier === 'bronze' && <span className="text-lg">🥉</span>}
              </div>
            )}

            {/* Lock Icon for locked badges */}
            {!achievement?.unlocked && (
              <div className="absolute top-2 right-2">
                <Icon name="Lock" size={16} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Next Achievement Preview */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
        <div className="flex items-center space-x-3">
          <Icon name="Target" size={20} className="text-primary" />
          <div>
            <h4 className="text-sm font-medium text-foreground">{t?.nextBadge}</h4>
            <p className="text-xs text-muted-foreground">
              Complete 5 more successful recommendations to unlock "Expert Advisor" badge
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-muted-foreground">3/5</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;
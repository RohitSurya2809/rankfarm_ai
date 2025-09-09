import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ currentLanguage, onNavigate, isVoiceEnabled }) => {
  const quickActions = [
    {
      id: 'crop-analysis',
      title: { en: 'Crop Analysis', hi: 'फसल विश्लेषण', ta: 'பயிர் பகுப்பாய்வு' },
      description: { en: 'Get AI recommendations for your crops', hi: 'अपनी फसलों के लिए AI सिफारिशें प्राप्त करें', ta: 'உங்கள் பயிர்களுக்கான AI பரிந்துரைகளைப் பெறுங்கள்' },
      icon: 'BarChart3',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      route: '/crop-recommendations',
      badge: { en: 'New', hi: 'नया', ta: 'புதிய' }
    },
    {
      id: 'fertilizer-compare',
      title: { en: 'Compare Fertilizers', hi: 'उर्वरकों की तुलना करें', ta: 'உரங்களை ஒப்பிடுங்கள்' },
      description: { en: 'Find the best fertilizer for your soil', hi: 'अपनी मिट्टी के लिए सबसे अच्छा उर्वरक खोजें', ta: 'உங்கள் மண்ணுக்கு சிறந்த உரத்தைக் கண்டறியுங்கள்' },
      icon: 'GitCompare',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      route: '/comparative-analysis'
    },
    {
      id: 'pest-alert',
      title: { en: 'Pest Alerts', hi: 'कीट अलर्ट', ta: 'பூச்சி எச்சரிக்கைகள்' },
      description: { en: 'Monitor and control pest threats', hi: 'कीट खतरों की निगरानी और नियंत्रण करें', ta: 'பூச்சி அச்சுறுத்தல்களை கண்காணித்து கட்டுப்படுத்துங்கள்' },
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      route: '/pest-control-rankings',
      urgent: true
    },
    {
      id: 'success-tracker',
      title: { en: 'Success Tracker', hi: 'सफलता ट्रैकर', ta: 'வெற்றி கண்காணிப்பாளர்' },
      description: { en: 'Track your farming performance', hi: 'अपने खेती के प्रदर्शन को ट्रैक करें', ta: 'உங்கள் விவசாய செயல்திறனைக் கண்காணிக்கவும்' },
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      route: '/success-analytics'
    },
    {
      id: 'market-prices',
      title: { en: 'Market Prices', hi: 'बाजार मूल्य', ta: 'சந்தை விலைகள்' },
      description: { en: 'Check latest crop and input prices', hi: 'नवीनतम फसल और इनपुट कीमतें देखें', ta: 'சமீபத்திய பயிர் மற்றும் உள்ளீட்டு விலைகளைச் சரிபார்க்கவும்' },
      icon: 'IndianRupee',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      route: '/market-analysis'
    },
    {
      id: 'weather-forecast',
      title: { en: 'Weather Forecast', hi: 'मौसम पूर्वानुमान', ta: 'வானிலை முன்னறிவிப்பு' },
      description: { en: '7-day detailed weather predictions', hi: '7-दिन का विस्तृत मौसम पूर्वानुमान', ta: '7 நாள் விரிவான வானிலை கணிப்புகள்' },
      icon: 'CloudSun',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      route: '/weather-forecast'
    }
  ];

  const handleActionClick = (action) => {
    if (isVoiceEnabled) {
      const text = action?.title?.[currentLanguage] || action?.title?.en;
      const utterance = new SpeechSynthesisUtterance(`Opening ${text}`);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
    onNavigate(action?.route);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {currentLanguage === 'hi' ? 'त्वरित कार्य' : 
             currentLanguage === 'ta'? 'விரைவு செயல்கள்' : 'Quick Actions'}
          </h2>
          <p className="text-muted-foreground">
            {currentLanguage === 'hi' ? 'अपनी कृषि गतिविधियों को तुरंत प्रबंधित करें' : 
             currentLanguage === 'ta'? 'உங்கள் விவசாய நடவடிக்கைகளை உடனடியாக நிர்வகிக்கவும்' : 'Manage your farming activities instantly'}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          {currentLanguage === 'hi' ? 'और देखें' : 
           currentLanguage === 'ta'? 'மேலும் பார்க்க' : 'View More'}
        </Button>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {quickActions?.map((action) => (
          <motion.div
            key={action?.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-card border border-border rounded-lg p-4 cursor-pointer group hover:shadow-agricultural-lg transition-all duration-300"
            onClick={() => handleActionClick(action)}
          >
            {/* Badge */}
            {action?.badge && (
              <div className="absolute top-3 right-3">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {action?.badge?.[currentLanguage] || action?.badge?.en}
                </span>
              </div>
            )}

            {/* Urgent Indicator */}
            {action?.urgent && (
              <div className="absolute top-3 right-3">
                <div className="w-3 h-3 bg-error rounded-full animate-pulse" />
              </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 ${action?.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action?.icon} size={24} className={action?.color} />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {action?.title?.[currentLanguage] || action?.title?.en}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {action?.description?.[currentLanguage] || action?.description?.en}
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-end mt-4">
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default QuickActions;
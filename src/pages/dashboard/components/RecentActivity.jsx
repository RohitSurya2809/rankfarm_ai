import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ currentLanguage }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: { en: 'All', hi: 'सभी', ta: 'அனைத்தும்' } },
    { id: 'recommendations', name: { en: 'Recommendations', hi: 'सिफारिशें', ta: 'பரிந்துரைகள்' } },
    { id: 'alerts', name: { en: 'Alerts', hi: 'अलर्ट', ta: 'எச்சரிக்கைகள்' } },
    { id: 'updates', name: { en: 'Updates', hi: 'अपडेट', ta: 'புதுப்பிப்புகள்' } }
  ];

  const activities = [
    {
      id: 1,
      type: 'recommendation',
      title: { en: 'New crop recommendation available', hi: 'नई फसल सिफारिश उपलब्ध', ta: 'புதிய பயிர் பரிந்துரை கிடைக்கிறது' },
      description: { en: 'Wheat HD-2967 ranked #1 for your soil type', hi: 'आपकी मिट्टी के प्रकार के लिए गेहूं HD-2967 #1 रैंक', ta: 'உங்கள் மண் வகைக்கு கோதுமை HD-2967 #1 தரவரிசை' },
      time: '2 hours ago',
      icon: 'Wheat',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      category: 'recommendations'
    },
    {
      id: 2,
      type: 'alert',
      title: { en: 'Pest alert in your region', hi: 'आपके क्षेत्र में कीट अलर्ट', ta: 'உங்கள் பகுதியில் பூச்சி எச்சரிக்கை' },
      description: { en: 'Brown plant hopper detected nearby', hi: 'भूरा प्लांट हॉपर पास में पाया गया', ta: 'பழுப்பு நிற தாவர துள்ளல் அருகில் கண்டறியப்பட்டது' },
      time: '4 hours ago',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      category: 'alerts',
      urgent: true
    },
    {
      id: 3,
      type: 'update',
      title: { en: 'Fertilizer prices updated', hi: 'उर्वरक की कीमतें अपडेट की गईं', ta: 'உர விலைகள் புதுப்பிக்கப்பட்டன' },
      description: { en: 'NPK 20:20:20 price decreased by 5%', hi: 'NPK 20:20:20 की कीमत 5% कम हुई', ta: 'NPK 20:20:20 விலை 5% குறைந்தது' },
      time: '6 hours ago',
      icon: 'TrendingDown',
      color: 'text-success',
      bgColor: 'bg-success/10',
      category: 'updates'
    },
    {
      id: 4,
      type: 'recommendation',
      title: { en: 'Weather-based irrigation advice', hi: 'मौसम आधारित सिंचाई सलाह', ta: 'வானிலை அடிப்படையிலான நீர்ப்பாசன ஆலோசனை' },
      description: { en: 'Reduce watering by 30% this week', hi: 'इस सप्ताह पानी देना 30% कम करें', ta: 'இந்த வாரம் நீர்ப்பாசனத்தை 30% குறைக்கவும்' },
      time: '8 hours ago',
      icon: 'Droplets',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      category: 'recommendations'
    },
    {
      id: 5,
      type: 'alert',
      title: { en: 'Market price surge alert', hi: 'बाजार मूल्य वृद्धि अलर्ट', ta: 'சந்தை விலை உயர்வு எச்சரிக்கை' },
      description: { en: 'Wheat prices increased by 12% today', hi: 'आज गेहूं की कीमतें 12% बढ़ीं', ta: 'இன்று கோதுமை விலைகள் 12% அதிகரித்தன' },
      time: '12 hours ago',
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      category: 'alerts'
    },
    {
      id: 6,
      type: 'update',
      title: { en: 'New farming technique added', hi: 'नई खेती तकनीक जोड़ी गई', ta: 'புதிய விவசாய நுட்பம் சேர்க்கப்பட்டது' },
      description: { en: 'Zero-till farming method now available', hi: 'जीरो-टिल खेती विधि अब उपलब्ध', ta: 'பூஜ்ஜிய உழவு விவசாய முறை இப்போது கிடைக்கிறது' },
      time: '1 day ago',
      icon: 'Sprout',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      category: 'updates'
    }
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.category === selectedFilter);

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
            {currentLanguage === 'hi' ? 'हाल की गतिविधि' : 
             currentLanguage === 'ta'? 'சமீபத்திய செயல்பாடு' : 'Recent Activity'}
          </h2>
          <p className="text-muted-foreground">
            {currentLanguage === 'hi' ? 'आपकी कृषि गतिविधियों का अवलोकन' : 
             currentLanguage === 'ta'? 'உங்கள் விவசாய நடவடிக்கைகளின் கண்ணோட்டம்' : 'Overview of your farming activities'}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="History"
          iconPosition="left"
        >
          {currentLanguage === 'hi' ? 'सभी देखें' : 
           currentLanguage === 'ta'? 'அனைத்தையும் பார்க்க' : 'View All'}
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => setSelectedFilter(filter?.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              selectedFilter === filter?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filter?.name?.[currentLanguage] || filter?.name?.en}
          </button>
        ))}
      </div>
      {/* Activity List */}
      <motion.div
        key={selectedFilter}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-4"
      >
        {filteredActivities?.map((activity) => (
          <motion.div
            key={activity?.id}
            variants={itemVariants}
            whileHover={{ scale: 1.01, x: 4 }}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-agricultural transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-10 h-10 ${activity?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={activity?.icon} size={20} className={activity?.color} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {activity?.title?.[currentLanguage] || activity?.title?.en}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity?.description?.[currentLanguage] || activity?.description?.en}
                    </p>
                  </div>
                  
                  {/* Time & Indicators */}
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                    {activity?.urgent && (
                      <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
                    )}
                    <span className="text-xs text-muted-foreground">{activity?.time}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    {currentLanguage === 'hi' ? 'देखें' : 
                     currentLanguage === 'ta'? 'பார்க்க' : 'View'}
                  </Button>
                  
                  {activity?.type === 'recommendation' && (
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="CheckCircle"
                      iconPosition="left"
                    >
                      {currentLanguage === 'hi' ? 'लागू करें' : 
                       currentLanguage === 'ta'? 'பயன்படுத்து' : 'Apply'}
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    iconPosition="left"
                  >
                    {currentLanguage === 'hi' ? 'खारिज करें' : 
                     currentLanguage === 'ta'? 'நிராகரிக்க' : 'Dismiss'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Empty State */}
      {filteredActivities?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {currentLanguage === 'hi' ? 'कोई गतिविधि नहीं' : 
             currentLanguage === 'ta'? 'செயல்பாடு இல்லை' : 'No Activity'}
          </h3>
          <p className="text-muted-foreground">
            {currentLanguage === 'hi' ? 'इस श्रेणी में कोई हाल की गतिविधि नहीं मिली' : 
             currentLanguage === 'ta'? 'இந்த வகையில் சமீபத்திய செயல்பாடு எதுவும் இல்லை' : 'No recent activity found in this category'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
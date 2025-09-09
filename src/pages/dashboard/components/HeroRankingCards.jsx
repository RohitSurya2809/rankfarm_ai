import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroRankingCards = ({ onNavigate, currentLanguage, isVoiceEnabled }) => {
  const [animationKey, setAnimationKey] = useState(0);

  const heroRecommendations = [
    {
      id: 1,
      rank: 1,
      type: 'crop',
      title: { en: 'Wheat (HD-2967)', hi: 'गेहूं (एचडी-2967)', ta: 'கோதுமை (HD-2967)' },
      category: { en: 'Winter Crop', hi: 'शीतकालीन फसल', ta: 'குளிர்கால பயிர்' },
      confidence: 96,
      successProbability: 94,
      roi: 145,
      medal: '🥇',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: 'Wheat',
      route: '/crop-recommendations'
    },
    {
      id: 2,
      rank: 2,
      type: 'fertilizer',
      title: { en: 'NPK 20:20:20', hi: 'एनपीके 20:20:20', ta: 'NPK 20:20:20' },
      category: { en: 'Balanced Fertilizer', hi: 'संतुलित उर्वरक', ta: 'சமச்சீர் உரம்' },
      confidence: 92,
      successProbability: 89,
      roi: 132,
      medal: '🥈',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      icon: 'Beaker',
      route: '/fertilizer-rankings'
    },
    {
      id: 3,
      rank: 3,
      type: 'pest-control',
      title: { en: 'Integrated Pest Management', hi: 'एकीकृत कीट प्रबंधन', ta: 'ஒருங்கிணைந்த பூச்சி மேலாண்மை' },
      category: { en: 'Biological Control', hi: 'जैविक नियंत्रण', ta: 'உயிரியல் கட்டுப்பாடு' },
      confidence: 88,
      successProbability: 85,
      roi: 128,
      medal: '🥉',
      color: 'from-amber-600 to-amber-800',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: 'Bug',
      route: '/pest-control-rankings'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (recommendation) => {
    if (isVoiceEnabled) {
      const text = recommendation?.title?.[currentLanguage] || recommendation?.title?.en;
      const utterance = new SpeechSynthesisUtterance(`Opening ${text} recommendations`);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
    onNavigate(recommendation?.route);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="mb-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        key={animationKey}
        className="text-center mb-6"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {currentLanguage === 'hi' ? 'आज की शीर्ष सिफारिशें' : 
           currentLanguage === 'ta'? 'இன்றைய சிறந்த பரிந்துரைகள்' : 'Today\'s Top Recommendations'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage === 'hi' ? 'AI द्वारा संचालित रैंकिंग आपकी फसल की सफलता के लिए' : 
           currentLanguage === 'ta'? 'உங்கள் பயிர் வெற்றிக்கான AI இயக்கப்படும் தரவரிசை' : 'AI-powered rankings for your farming success'}
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {heroRecommendations?.map((recommendation, index) => (
          <motion.div
            key={recommendation?.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-xl ${recommendation?.bgColor} ${recommendation?.borderColor} border-2 cursor-pointer group transition-all duration-300 hover:shadow-agricultural-lg`}
            onClick={() => handleCardClick(recommendation)}
          >
            {/* Rank Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${recommendation?.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                #{recommendation?.rank}
              </div>
            </div>

            {/* Medal */}
            <div className="absolute top-4 right-4 z-10">
              <span className="text-3xl filter drop-shadow-lg">{recommendation?.medal}</span>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />
            </div>

            <div className="relative p-6 pt-20">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={recommendation?.icon} size={32} className="text-primary" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                {recommendation?.title?.[currentLanguage] || recommendation?.title?.en}
              </h3>

              {/* Category */}
              <p className="text-sm text-muted-foreground text-center mb-4">
                {recommendation?.category?.[currentLanguage] || recommendation?.category?.en}
              </p>

              {/* Metrics */}
              <div className="space-y-3">
                {/* Confidence Score */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {currentLanguage === 'hi' ? 'विश्वास स्कोर' : 
                       currentLanguage === 'ta'? 'நம்பிக்கை மதிப்பெண்' : 'Confidence Score'}
                    </span>
                    <span className="text-xs font-bold text-primary">{recommendation?.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${recommendation?.confidence}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Success Probability */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {currentLanguage === 'hi' ? 'सफलता संभावना' : 
                       currentLanguage === 'ta'? 'வெற்றி வாய்ப்பு' : 'Success Probability'}
                    </span>
                    <span className="text-xs font-bold text-success">{recommendation?.successProbability}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${recommendation?.successProbability}%` }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                      className="bg-success h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* ROI */}
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentLanguage === 'hi' ? 'अपेक्षित ROI' : 
                     currentLanguage === 'ta'? 'எதிர்பார்க்கப்படும் ROI' : 'Expected ROI'}
                  </span>
                  <span className="text-lg font-bold text-accent">+{recommendation?.roi}%</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {currentLanguage === 'hi' ? 'विस्तार देखें' : 
                   currentLanguage === 'ta'? 'விவரங்களைக் காண்க' : 'View Details'}
                </Button>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroRankingCards;
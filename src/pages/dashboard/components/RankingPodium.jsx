import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RankingPodium = ({ currentLanguage, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('crops');

  const categories = [
    {
      id: 'crops',
      name: { en: 'Crops', hi: 'फसलें', ta: 'பயிர்கள்' },
      icon: 'Wheat',
      route: '/crop-recommendations'
    },
    {
      id: 'fertilizers',
      name: { en: 'Fertilizers', hi: 'उर्वरक', ta: 'உரங்கள்' },
      icon: 'Beaker',
      route: '/fertilizer-rankings'
    },
    {
      id: 'pestControl',
      name: { en: 'Pest Control', hi: 'कीट नियंत्रण', ta: 'பூச்சி கட்டுப்பாடு' },
      icon: 'Bug',
      route: '/pest-control-rankings'
    }
  ];

  const rankingData = {
    crops: [
      {
        rank: 1,
        name: { en: 'Wheat HD-2967', hi: 'गेहूं HD-2967', ta: 'கோதுமை HD-2967' },
        score: 96.5,
        change: +2.3,
        medal: '🥇',
        color: 'from-yellow-400 to-yellow-600',
        height: 'h-32'
      },
      {
        rank: 2,
        name: { en: 'Rice Basmati', hi: 'चावल बासमती', ta: 'அரிசி பாஸ்மதி' },
        score: 94.2,
        change: -0.8,
        medal: '🥈',
        color: 'from-gray-400 to-gray-600',
        height: 'h-24'
      },
      {
        rank: 3,
        name: { en: 'Maize Hybrid', hi: 'मक्का हाइब्रिड', ta: 'சோளம் கலப்பின' },
        score: 91.8,
        change: +1.5,
        medal: '🥉',
        color: 'from-amber-600 to-amber-800',
        height: 'h-20'
      }
    ],
    fertilizers: [
      {
        rank: 1,
        name: { en: 'NPK 20:20:20', hi: 'एनपीके 20:20:20', ta: 'NPK 20:20:20' },
        score: 95.8,
        change: +1.2,
        medal: '🥇',
        color: 'from-yellow-400 to-yellow-600',
        height: 'h-32'
      },
      {
        rank: 2,
        name: { en: 'Urea Premium', hi: 'यूरिया प्रीमियम', ta: 'யூரியா பிரீமியம்' },
        score: 93.5,
        change: +0.7,
        medal: '🥈',
        color: 'from-gray-400 to-gray-600',
        height: 'h-24'
      },
      {
        rank: 3,
        name: { en: 'DAP Enhanced', hi: 'डीएपी एन्हांस्ड', ta: 'DAP மேம்படுத்தப்பட்ட' },
        score: 90.3,
        change: -1.1,
        medal: '🥉',
        color: 'from-amber-600 to-amber-800',
        height: 'h-20'
      }
    ],
    pestControl: [
      {
        rank: 1,
        name: { en: 'Bio Control Mix', hi: 'बायो कंट्रोल मिक्स', ta: 'பயோ கண்ட்ரோல் கலவை' },
        score: 94.7,
        change: +3.2,
        medal: '🥇',
        color: 'from-yellow-400 to-yellow-600',
        height: 'h-32'
      },
      {
        rank: 2,
        name: { en: 'Neem Extract', hi: 'नीम एक्सट्रैक्ट', ta: 'வேப்ப சாறு' },
        score: 92.1,
        change: +0.9,
        medal: '🥈',
        color: 'from-gray-400 to-gray-600',
        height: 'h-24'
      },
      {
        rank: 3,
        name: { en: 'IPM Solution', hi: 'आईपीएम समाधान', ta: 'IPM தீர்வு' },
        score: 89.6,
        change: -0.5,
        medal: '🥉',
        color: 'from-amber-600 to-amber-800',
        height: 'h-20'
      }
    ]
  };

  const currentRankings = rankingData?.[selectedCategory];

  const podiumVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {currentLanguage === 'hi' ? 'रैंकिंग पोडियम' : 
           currentLanguage === 'ta'? 'தரவரிசை மேடை' : 'Ranking Podium'}
        </h2>
        <p className="text-muted-foreground">
          {currentLanguage === 'hi' ? 'श्रेणी के अनुसार शीर्ष 3 सिफारिशें' : 
           currentLanguage === 'ta'? 'வகையின் அடிப்படையில் முதல் 3 பரிந்துரைகள்' : 'Top 3 recommendations by category'}
        </p>
      </div>
      {/* Category Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-muted rounded-lg p-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name?.[currentLanguage] || category?.name?.en}</span>
            </button>
          ))}
        </div>
      </div>
      {/* 3D Podium */}
      <motion.div
        key={selectedCategory}
        initial="hidden"
        animate="visible"
        variants={podiumVariants}
        className="relative"
      >
        {/* Podium Base */}
        <div className="flex items-end justify-center space-x-4 mb-6">
          {/* Second Place */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentRankings?.[1]?.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{currentRankings?.[1]?.medal}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">2</span>
              </div>
            </div>
            <div className={`w-24 ${currentRankings?.[1]?.height} bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg shadow-lg flex flex-col justify-end items-center pb-4`}>
              <div className="text-center">
                <p className="text-xs font-bold text-white mb-1">
                  {currentRankings?.[1]?.name?.[currentLanguage] || currentRankings?.[1]?.name?.en}
                </p>
                <p className="text-lg font-bold text-white">{currentRankings?.[1]?.score}%</p>
              </div>
            </div>
          </motion.div>

          {/* First Place */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentRankings?.[0]?.color} flex items-center justify-center shadow-xl`}>
                <span className="text-3xl">{currentRankings?.[0]?.medal}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">1</span>
              </div>
              {/* Crown */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <span className="text-2xl">👑</span>
              </div>
            </div>
            <div className={`w-28 ${currentRankings?.[0]?.height} bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg shadow-xl flex flex-col justify-end items-center pb-4`}>
              <div className="text-center">
                <p className="text-xs font-bold text-white mb-1">
                  {currentRankings?.[0]?.name?.[currentLanguage] || currentRankings?.[0]?.name?.en}
                </p>
                <p className="text-xl font-bold text-white">{currentRankings?.[0]?.score}%</p>
              </div>
            </div>
          </motion.div>

          {/* Third Place */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentRankings?.[2]?.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{currentRankings?.[2]?.medal}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">3</span>
              </div>
            </div>
            <div className={`w-24 ${currentRankings?.[2]?.height} bg-gradient-to-t from-amber-600 to-amber-700 rounded-t-lg shadow-lg flex flex-col justify-end items-center pb-4`}>
              <div className="text-center">
                <p className="text-xs font-bold text-white mb-1">
                  {currentRankings?.[2]?.name?.[currentLanguage] || currentRankings?.[2]?.name?.en}
                </p>
                <p className="text-lg font-bold text-white">{currentRankings?.[2]?.score}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Change Indicators */}
        <div className="flex justify-center space-x-8 mb-6">
          {currentRankings?.map((item, index) => (
            <div key={item?.rank} className="flex items-center space-x-2">
              <Icon 
                name={item?.change > 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={item?.change > 0 ? 'text-success' : 'text-error'} 
              />
              <span className={`text-sm font-medium ${item?.change > 0 ? 'text-success' : 'text-error'}`}>
                {item?.change > 0 ? '+' : ''}{item?.change}%
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => onNavigate(categories?.find(c => c?.id === selectedCategory)?.route)}
            iconName="ArrowRight"
            iconPosition="right"
          >
            {currentLanguage === 'hi' ? 'पूरी रैंकिंग देखें' : 
             currentLanguage === 'ta'? 'முழு தரவரிசையைக் காண்க' : 'View Full Rankings'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default RankingPodium;
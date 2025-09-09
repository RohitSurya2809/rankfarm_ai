import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeroRankingCards from './components/HeroRankingCards';
import MetricsCards from './components/MetricsCards';
import RankingPodium from './components/RankingPodium';
import WeatherPanel from './components/WeatherPanel';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedVoice = localStorage.getItem('voiceEnabled') === 'true';
    setCurrentLanguage(savedLanguage);
    setIsVoiceEnabled(savedVoice);

    // Set greeting based on time
    const hour = new Date()?.getHours();
    let greetingText = '';
    
    if (hour < 12) {
      greetingText = currentLanguage === 'hi' ? 'सुप्रभात' : 
                    currentLanguage === 'ta'? 'காலை வணக்கம்' : 'Good Morning';
    } else if (hour < 17) {
      greetingText = currentLanguage === 'hi' ? 'नमस्कार' : 
                    currentLanguage === 'ta'? 'மதிய வணக்கம்' : 'Good Afternoon';
    } else {
      greetingText = currentLanguage === 'hi' ? 'शुभ संध्या' : 
                    currentLanguage === 'ta'? 'மாலை வணக்கம்' : 'Good Evening';
    }
    
    setGreeting(greetingText);
  }, [currentLanguage]);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleVoiceGreeting = () => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const text = `${greeting}! Welcome to RankFarm AI Dashboard`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-background"
    >
      {/* Header Section */}
      <div className="pt-20 pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <Icon name="User" size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {greeting}, Farmer!
                </h1>
                <p className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 'आपके खेत की सफलता के लिए AI-संचालित सिफारिशें' : 
                   currentLanguage === 'ta'? 'உங்கள் பண்ணையின் வெற்றிக்கான AI-இயக்கப்படும் பரிந்துரைகள்' : 'AI-powered recommendations for your farm\'s success'}
                </p>
              </div>
            </div>
            
            {/* Voice Greeting Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceGreeting}
              iconName="Volume2"
              iconPosition="left"
              className="hidden sm:flex"
            >
              {currentLanguage === 'hi' ? 'स्वागत संदेश' : 
               currentLanguage === 'ta'? 'வரவேற்பு செய்தி' : 'Welcome Message'}
            </Button>
          </div>

          {/* Hero Ranking Cards */}
          <HeroRankingCards 
            onNavigate={handleNavigation}
            currentLanguage={currentLanguage}
            isVoiceEnabled={isVoiceEnabled}
          />

          {/* Metrics Cards */}
          <MetricsCards currentLanguage={currentLanguage} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Ranking Podium */}
            <div className="xl:col-span-2">
              <RankingPodium 
                currentLanguage={currentLanguage}
                onNavigate={handleNavigation}
              />
            </div>

            {/* Right Column - Weather Panel */}
            <div className="xl:col-span-1">
              <WeatherPanel currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions 
            currentLanguage={currentLanguage}
            onNavigate={handleNavigation}
            isVoiceEnabled={isVoiceEnabled}
          />

          {/* Recent Activity */}
          <RecentActivity currentLanguage={currentLanguage} />

          {/* Bottom CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {currentLanguage === 'hi' ? 'अपनी कृषि यात्रा को बेहतर बनाएं' : 
                 currentLanguage === 'ta'? 'உங்கள் விவசாய பயணத்தை மேம்படுத்துங்கள்' : 'Enhance Your Farming Journey'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {currentLanguage === 'hi' ? 'RankFarm AI के साथ डेटा-संचालित निर्णय लें और अपनी फसल की पैदावार को अधिकतम करें' : 
                 currentLanguage === 'ta'? 'RankFarm AI உடன் தரவு-உந்துதல் முடிவுகளை எடுத்து உங்கள் பயிர் விளைச்சலை அதிகரிக்கவும்' : 'Make data-driven decisions with RankFarm AI and maximize your crop yields'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  onClick={() => handleNavigation('/comparative-analysis')}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  {currentLanguage === 'hi' ? 'तुलनात्मक विश्लेषण' : 
                   currentLanguage === 'ta'? 'ஒப்பீட்டு பகுப்பாய்வு' : 'Comparative Analysis'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleNavigation('/success-analytics')}
                  iconName="TrendingUp"
                  iconPosition="left"
                >
                  {currentLanguage === 'hi' ? 'सफलता विश्लेषण' : 
                   currentLanguage === 'ta'? 'வெற்றி பகுப்பாய்வு' : 'Success Analytics'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
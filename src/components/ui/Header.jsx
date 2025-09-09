import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { getTranslation } from '../../utils/translations';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uk', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const navigationItems = [
    {
      label: getTranslation('dashboard', currentLanguage),
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: getTranslation('dashboard', currentLanguage),
      voiceLabel: { en: 'Dashboard', hi: 'डैशबोर्ड', ta: 'டாஷ்போர்டு' }
    },
    {
      label: getTranslation('crops', currentLanguage),
      path: '/crop-recommendations',
      icon: 'Wheat',
      tooltip: getTranslation('crops', currentLanguage),
      voiceLabel: { en: 'Crops', hi: 'फसल', ta: 'பயிர்கள்' }
    },
    {
      label: getTranslation('fertilizers', currentLanguage),
      path: '/fertilizer-rankings',
      icon: 'Beaker',
      tooltip: getTranslation('fertilizers', currentLanguage),
      voiceLabel: { en: 'Fertilizers', hi: 'उर्वरक', ta: 'உரங்கள்' }
    },
    {
      label: getTranslation('pestControl', currentLanguage),
      path: '/pest-control-rankings',
      icon: 'Bug',
      tooltip: getTranslation('pestControl', currentLanguage),
      voiceLabel: { en: 'Pest Control', hi: 'कीट नियंत्रण', ta: 'பூச்சி கட்டுப்பாடு' }
    },
    {
      label: getTranslation('compare', currentLanguage),
      path: '/comparative-analysis',
      icon: 'BarChart3',
      tooltip: getTranslation('compare', currentLanguage),
      voiceLabel: { en: 'Compare', hi: 'तुलना', ta: 'ஒப்பீடு' }
    },
    {
      label: getTranslation('analytics', currentLanguage),
      path: '/success-analytics',
      icon: 'TrendingUp',
      tooltip: getTranslation('analytics', currentLanguage),
      voiceLabel: { en: 'Analytics', hi: 'विश्लेषण', ta: 'பகுப்பாய்வு' }
    }
  ];

  const completedScreens = ['/dashboard', '/crop-recommendations'];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedVoice = localStorage.getItem('voiceEnabled') === 'true';
    setCurrentLanguage(savedLanguage);
    setIsVoiceEnabled(savedVoice);
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('language', langCode);
    if (isVoiceEnabled) {
      announceLanguageChange(langCode);
    }
  };

  const toggleVoice = () => {
    const newVoiceState = !isVoiceEnabled;
    setIsVoiceEnabled(newVoiceState);
    localStorage.setItem('voiceEnabled', newVoiceState?.toString());
    
    if (newVoiceState) {
      announceVoiceEnabled();
    }
  };

  const announceLanguageChange = (langCode) => {
    const lang = languages?.find(l => l?.code === langCode);
    if (lang && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Language changed to ${lang.name}`);
      utterance.lang = langCode === 'hi' ? 'hi-IN' : langCode === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const announceVoiceEnabled = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Voice assistance enabled');
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleNavigation = (path, item) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    
    if (isVoiceEnabled && item?.voiceLabel) {
      const text = item?.voiceLabel?.[currentLanguage] || item?.label;
      const utterance = new SpeechSynthesisUtterance(`Navigating to ${text}`);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'ta' ? 'ta-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path || (path === '/dashboard' && location?.pathname === '/');
  };

  const getProgressStatus = (path) => {
    if (completedScreens?.includes(path)) return 'completed';
    if (isActiveRoute(path)) return 'active';
    return 'default';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Sprout" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">RankFarm AI</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Agricultural Intelligence</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative">
              <button
                onClick={() => handleNavigation(item?.path, item)}
                className={`nav-item ${isActiveRoute(item?.path) ? 'active' : ''}`}
                title={item?.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </div>
              </button>
              {/* Progress Indicator */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className={`progress-dot ${getProgressStatus(item?.path)}`} />
              </div>
            </div>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications > 0 && (
                <span className="notification-badge">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </Button>
            
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-lg z-1010 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-sm">Recent Updates</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">New crop recommendations available</p>
                      <p className="text-xs text-muted-foreground">Based on updated weather data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Fertilizer prices updated</p>
                      <p className="text-xs text-muted-foreground">Rankings may have changed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Pest alert for your region</p>
                      <p className="text-xs text-muted-foreground">Check updated control measures</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Voice Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVoice}
            className={`voice-toggle ${isVoiceEnabled ? 'active' : ''}`}
            title="Toggle voice assistance"
          >
            <Icon name={isVoiceEnabled ? "Volume2" : "VolumeX"} size={20} />
          </Button>

          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationOpen(false)}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">{languages?.find(l => l?.code === currentLanguage)?.flag}</span>
              <span className="hidden sm:inline text-sm">
                {languages?.find(l => l?.code === currentLanguage)?.name}
              </span>
              <Icon name="ChevronDown" size={16} />
            </Button>
            
            <div className="absolute right-0 top-12 bg-popover border border-border rounded-lg shadow-lg z-1010 min-w-[150px] hidden group-hover:block">
              {languages?.map((lang) => (
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageChange(lang?.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    currentLanguage === lang?.code ? 'bg-muted' : ''
                  }`}
                >
                  <span className="text-lg">{lang?.flag}</span>
                  <span>{lang?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-slide-in">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path, item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
                <div className={`ml-auto progress-dot ${getProgressStatus(item?.path)}`} />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WeatherPanel = ({ currentLanguage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('current');

  const locations = [
    { id: 'current', name: { en: 'Current Location', hi: 'वर्तमान स्थान', ta: 'தற்போதைய இடம்' } },
    { id: 'punjab', name: { en: 'Punjab', hi: 'पंजाब', ta: 'பஞ்சாப்' } },
    { id: 'haryana', name: { en: 'Haryana', hi: 'हरियाणा', ta: 'ஹரியானா' } },
    { id: 'up', name: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', ta: 'உத்தர பிரதேசம்' } }
  ];

  const weatherData = {
    current: {
      location: { en: 'Delhi, India', hi: 'दिल्ली, भारत', ta: 'டெல்லி, இந்தியா' },
      temperature: 24,
      condition: { en: 'Partly Cloudy', hi: 'आंशिक बादल', ta: 'பகுதி மேகமூட்டம்' },
      humidity: 68,
      windSpeed: 12,
      pressure: 1013,
      uvIndex: 6,
      icon: 'CloudSun',
      recommendations: [
        { en: 'Good for wheat sowing', hi: 'गेहूं की बुआई के लिए अच्छा', ta: 'கோதுமை விதைப்புக்கு நல்லது' },
        { en: 'Monitor soil moisture', hi: 'मिट्टी की नमी की निगरानी करें', ta: 'மண் ஈரப்பதத்தை கண்காணிக்கவும்' }
      ]
    },
    punjab: {
      location: { en: 'Ludhiana, Punjab', hi: 'लुधियाना, पंजाब', ta: 'லுதியானா, பஞ்சாப்' },
      temperature: 22,
      condition: { en: 'Clear Sky', hi: 'साफ आसमान', ta: 'தெளிவான வானம்' },
      humidity: 72,
      windSpeed: 8,
      pressure: 1015,
      uvIndex: 7,
      icon: 'Sun',
      recommendations: [
        { en: 'Perfect for harvesting', hi: 'कटाई के लिए बिल्कुल सही', ta: 'அறுவடைக்கு சரியானது' },
        { en: 'Apply fertilizer today', hi: 'आज उर्वरक डालें', ta: 'இன்று உரம் போடுங்கள்' }
      ]
    },
    haryana: {
      location: { en: 'Karnal, Haryana', hi: 'करनाल, हरियाणा', ta: 'கர்னால், ஹரியானா' },
      temperature: 26,
      condition: { en: 'Sunny', hi: 'धूप', ta: 'வெயில்' },
      humidity: 65,
      windSpeed: 15,
      pressure: 1012,
      uvIndex: 8,
      icon: 'Sun',
      recommendations: [
        { en: 'Increase irrigation', hi: 'सिंचाई बढ़ाएं', ta: 'நீர்ப்பாசனத்தை அதிகரிக்கவும்' },
        { en: 'Pest control needed', hi: 'कीट नियंत्रण की आवश्यकता', ta: 'பூச்சி கட்டுப்பாடு தேவை' }
      ]
    },
    up: {
      location: { en: 'Meerut, UP', hi: 'मेरठ, यूपी', ta: 'மீரட், UP' },
      temperature: 25,
      condition: { en: 'Light Rain', hi: 'हल्की बारिश', ta: 'லேசான மழை' },
      humidity: 78,
      windSpeed: 10,
      pressure: 1010,
      uvIndex: 4,
      icon: 'CloudRain',
      recommendations: [
        { en: 'Delay spraying', hi: 'छिड़काव में देरी करें', ta: 'தெளிப்பதை தாமதப்படுத்துங்கள்' },
        { en: 'Check drainage', hi: 'जल निकासी की जांच करें', ta: 'வடிகால் சரிபார்க்கவும்' }
      ]
    }
  };

  const currentWeather = weatherData?.[selectedLocation];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    if (currentLanguage === 'hi') {
      return date?.toLocaleDateString('hi-IN', options);
    } else if (currentLanguage === 'ta') {
      return date?.toLocaleDateString('ta-IN', options);
    }
    return date?.toLocaleDateString('en-IN', options);
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 shadow-agricultural"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              {currentLanguage === 'hi' ? 'मौसम और सिफारिशें' : 
               currentLanguage === 'ta'? 'வானிலை மற்றும் பரிந்துரைகள்' : 'Weather & Recommendations'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
          </div>
          
          {/* Location Selector */}
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e?.target?.value)}
              className="bg-white border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {locations?.map((location) => (
                <option key={location?.id} value={location?.id}>
                  {location?.name?.[currentLanguage] || location?.name?.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Info */}
          <div className="space-y-4">
            {/* Main Weather */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={currentWeather?.icon} size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {currentWeather?.temperature}°C
                </h3>
                <p className="text-muted-foreground">
                  {currentWeather?.condition?.[currentLanguage] || currentWeather?.condition?.en}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentWeather?.location?.[currentLanguage] || currentWeather?.location?.en}
                </p>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Droplets" size={16} className="text-blue-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {currentLanguage === 'hi' ? 'नमी' : 
                     currentLanguage === 'ta'? 'ஈரப்பதம்' : 'Humidity'}
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">{currentWeather?.humidity}%</p>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Wind" size={16} className="text-gray-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {currentLanguage === 'hi' ? 'हवा' : 
                     currentLanguage === 'ta'? 'காற்று' : 'Wind'}
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">{currentWeather?.windSpeed} km/h</p>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Gauge" size={16} className="text-purple-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {currentLanguage === 'hi' ? 'दबाव' : 
                     currentLanguage === 'ta'? 'அழுத்தம்' : 'Pressure'}
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">{currentWeather?.pressure} hPa</p>
              </div>

              <div className="bg-white/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Sun" size={16} className="text-orange-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {currentLanguage === 'hi' ? 'यूवी इंडेक्स' : 
                     currentLanguage === 'ta'? 'UV குறியீடு' : 'UV Index'}
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground">{currentWeather?.uvIndex}</p>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {currentLanguage === 'hi' ? 'AI सिफारिशें' : 
               currentLanguage === 'ta'? 'AI பரிந்துரைகள்' : 'AI Recommendations'}
            </h3>
            
            <div className="space-y-3">
              {currentWeather?.recommendations?.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-3"
                >
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <p className="text-sm text-foreground">
                    {recommendation?.[currentLanguage] || recommendation?.en}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Weather Alert */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">
                  {currentLanguage === 'hi' ? 'मौसम चेतावनी' : 
                   currentLanguage === 'ta'? 'வானிலை எச்சரிக்கை' : 'Weather Alert'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? 'अगले 48 घंटों में तापमान में वृद्धि की संभावना' : 
                 currentLanguage === 'ta'? 'அடுத்த 48 மணி நேரத்தில் வெப்பநிலை அதிகரிக்க வாய்ப்பு' : 'Temperature likely to rise in next 48 hours'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherPanel;
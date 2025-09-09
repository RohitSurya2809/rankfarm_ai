import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceControls = ({ 
  crops, 
  currentLanguage = 'en',
  isVoiceEnabled = false,
  onVoiceToggle 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0);

  useEffect(() => {
    // Cleanup speech synthesis on unmount
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const getLanguageCode = () => {
    switch (currentLanguage) {
      case 'hi': return 'hi-IN';
      case 'ta': return 'ta-IN';
      default: return 'en-US';
    }
  };

  const getLocalizedText = (textObj) => {
    return textObj?.[currentLanguage] || textObj?.en;
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window && isVoiceEnabled) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode();
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const readTopRecommendations = () => {
    if (!crops?.length) return;
    
    const topCrops = crops?.slice(0, 3);
    let announcement = '';
    
    switch (currentLanguage) {
      case 'hi':
        announcement = `शीर्ष 3 फसल सिफारिशें: `;
        topCrops?.forEach((crop, index) => {
          announcement += `${index + 1}. ${getLocalizedText(crop?.name)}, सफलता दर ${crop?.successProbability}%, अपेक्षित आरओआई ${crop?.expectedROI?.toLocaleString('en-IN')} रुपये। `;
        });
        break;
      case 'ta':
        announcement = `முதல் 3 பயிர் பரிந்துரைகள்: `;
        topCrops?.forEach((crop, index) => {
          announcement += `${index + 1}. ${getLocalizedText(crop?.name)}, வெற்றி விகிதம் ${crop?.successProbability}%, எதிர்பார்க்கப்படும் ROI ${crop?.expectedROI?.toLocaleString('en-IN')} ரூபாய்கள்। `;
        });
        break;
      default:
        announcement = `Top 3 crop recommendations: `;
        topCrops?.forEach((crop, index) => {
          announcement += `${index + 1}. ${getLocalizedText(crop?.name)}, success rate ${crop?.successProbability}%, expected ROI ${crop?.expectedROI?.toLocaleString('en-IN')} rupees. `;
        });
    }
    
    speakText(announcement);
  };

  const readCropDetails = (crop) => {
    let details = '';
    
    switch (currentLanguage) {
      case 'hi':
        details = `${getLocalizedText(crop?.name)} की विस्तृत जानकारी: सफलता दर ${crop?.successProbability}%, अपेक्षित आरओआई ${crop?.expectedROI?.toLocaleString('en-IN')} रुपये, वृद्धि अवधि ${crop?.growthPeriod} दिन, जोखिम स्तर ${crop?.riskLevel}, पानी की आवश्यकता ${crop?.waterRequirement}, बाजार मूल्य ${crop?.marketPrice} रुपये प्रति किलो।`;
        break;
      case 'ta':
        details = `${getLocalizedText(crop?.name)} விரிவான தகவல்: வெற்றி விகிதம் ${crop?.successProbability}%, எதிர்பார்க்கப்படும் ROI ${crop?.expectedROI?.toLocaleString('en-IN')} ரூபாய்கள், வளர்ச்சி காலம் ${crop?.growthPeriod} நாட்கள், ஆபத்து நிலை ${crop?.riskLevel}, நீர் தேவை ${crop?.waterRequirement}, சந்தை விலை ${crop?.marketPrice} ரூபாய் ஒரு கிலோ.`;
        break;
      default:
        details = `${getLocalizedText(crop?.name)} details: Success rate ${crop?.successProbability}%, expected ROI ${crop?.expectedROI?.toLocaleString('en-IN')} rupees, growth period ${crop?.growthPeriod} days, risk level ${crop?.riskLevel}, water requirement ${crop?.waterRequirement}, market price ${crop?.marketPrice} rupees per kg.`;
    }
    
    speakText(details);
  };

  const readAllRecommendations = () => {
    if (!crops?.length) return;
    
    setCurrentReadingIndex(0);
    readNextCrop();
  };

  const readNextCrop = () => {
    if (currentReadingIndex < crops?.length) {
      const crop = crops?.[currentReadingIndex];
      readCropDetails(crop);
      setCurrentReadingIndex(prev => prev + 1);
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsReading(false);
      setCurrentReadingIndex(0);
    }
  };

  const startVoiceCommands = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = getLanguageCode();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      speakText(currentLanguage === 'hi' ? 'सुन रहा हूं...' : 
                currentLanguage === 'ta'? 'கேட்டுக்கொண்டிருக்கிறேன்...' : 'Listening...');
    };

    recognition.onresult = (event) => {
      const command = event?.results?.[0]?.[0]?.transcript?.toLowerCase();
      handleVoiceCommand(command);
    };

    recognition.onerror = () => {
      setIsListening(false);
      speakText(currentLanguage === 'hi' ? 'कमांड समझ नहीं आया' : 
                currentLanguage === 'ta'? 'கட்டளை புரியவில்லை' : 'Command not understood');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition?.start();
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command?.toLowerCase();
    
    // English commands
    if (lowerCommand?.includes('top') || lowerCommand?.includes('best') || lowerCommand?.includes('recommendations')) {
      readTopRecommendations();
    } else if (lowerCommand?.includes('read all') || lowerCommand?.includes('all crops')) {
      readAllRecommendations();
    } else if (lowerCommand?.includes('stop') || lowerCommand?.includes('pause')) {
      stopReading();
    } else if (lowerCommand?.includes('next')) {
      readNextCrop();
    }
    // Hindi commands
    else if (lowerCommand?.includes('शीर्ष') || lowerCommand?.includes('सर्वोत्तम') || lowerCommand?.includes('सिफारिश')) {
      readTopRecommendations();
    } else if (lowerCommand?.includes('सभी पढ़ें') || lowerCommand?.includes('सभी फसल')) {
      readAllRecommendations();
    } else if (lowerCommand?.includes('रोकें') || lowerCommand?.includes('बंद')) {
      stopReading();
    }
    // Tamil commands
    else if (lowerCommand?.includes('சிறந்த') || lowerCommand?.includes('பரிந்துரை')) {
      readTopRecommendations();
    } else if (lowerCommand?.includes('அனைத்தும் படிக்க') || lowerCommand?.includes('அனைத்து பயிர்')) {
      readAllRecommendations();
    } else if (lowerCommand?.includes('நிறுத்து') || lowerCommand?.includes('முடிக்க')) {
      stopReading();
    } else {
      speakText(currentLanguage === 'hi' ? 'कमांड समझ नहीं आया। कृपया फिर से कोशिश करें।' : 
                currentLanguage === 'ta'? 'கட்டளை புரியவில்லை. மீண்டும் முயற்சிக்கவும்.' : 'Command not recognized. Please try again.');
    }
  };

  if (!isVoiceEnabled) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Volume2" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Voice Controls</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onVoiceToggle}
          iconName="VolumeX"
          iconPosition="left"
        >
          Disable
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={readTopRecommendations}
          disabled={isReading}
          iconName="Play"
          iconPosition="left"
        >
          Read Top 3
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={readAllRecommendations}
          disabled={isReading}
          iconName="PlayCircle"
          iconPosition="left"
        >
          Read All
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={startVoiceCommands}
          disabled={isListening || isReading}
          iconName={isListening ? "Mic" : "MicIcon"}
          iconPosition="left"
        >
          {isListening ? 'Listening...' : 'Voice Command'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={stopReading}
          disabled={!isReading}
          iconName="Square"
          iconPosition="left"
        >
          Stop
        </Button>
      </div>
      {isReading && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Volume2" size={16} className="animate-pulse text-primary" />
          <span>Reading recommendations... ({currentReadingIndex}/{crops?.length})</span>
        </div>
      )}
      <div className="mt-3 text-xs text-muted-foreground">
        <p className="mb-1">Voice commands:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <span>• "Top recommendations" - Read top 3</span>
          <span>• "Read all" - Read all crops</span>
          <span>• "Next" - Read next crop</span>
          <span>• "Stop" - Stop reading</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;
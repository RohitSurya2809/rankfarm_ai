import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SuccessStories = ({ 
  stories = [], 
  currentLanguage = 'en' 
}) => {
  const [currentStory, setCurrentStory] = useState(0);

  const translations = {
    en: {
      successStories: 'Success Stories',
      farmerTestimonials: 'Real farmer testimonials and results',
      yieldIncrease: 'Yield Increase',
      costSavings: 'Cost Savings',
      farmSize: 'Farm Size',
      location: 'Location',
      fertilizer: 'Fertilizer Used',
      season: 'Season',
      previous: 'Previous',
      next: 'Next',
      readMore: 'Read Full Story',
      acres: 'acres',
      noStories: 'No success stories available',
      loadStories: 'Check back later for farmer testimonials'
    },
    hi: {
      successStories: 'सफलता की कहानियां',
      farmerTestimonials: 'वास्तविक किसान प्रशंसापत्र और परिणाम',
      yieldIncrease: 'उत्पादन वृद्धि',
      costSavings: 'लागत बचत',
      farmSize: 'खेत का आकार',
      location: 'स्थान',
      fertilizer: 'उपयोग किया गया उर्वरक',
      season: 'मौसम',
      previous: 'पिछला',
      next: 'अगला',
      readMore: 'पूरी कहानी पढ़ें',
      acres: 'एकड़',
      noStories: 'कोई सफलता की कहानी उपलब्ध नहीं',
      loadStories: 'किसान प्रशंसापत्र के लिए बाद में देखें'
    },
    ta: {
      successStories: 'வெற்றிக் கதைகள்',
      farmerTestimonials: 'உண்மையான விவசாயி சான்றுகள் மற்றும் முடிவுகள்',
      yieldIncrease: 'விளைச்சல் அதிகரிப்பு',
      costSavings: 'செலவு சேமிப்பு',
      farmSize: 'பண்ணை அளவு',
      location: 'இடம்',
      fertilizer: 'பயன்படுத்தப்பட்ட உரம்',
      season: 'பருவம்',
      previous: 'முந்தைய',
      next: 'அடுத்து',
      readMore: 'முழு கதையைப் படிக்கவும்',
      acres: 'ஏக்கர்',
      noStories: 'வெற்றிக் கதைகள் எதுவும் கிடைக்கவில்லை',
      loadStories: 'விவசாயி சான்றுகளுக்கு பின்னர் சரிபார்க்கவும்'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (stories?.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t?.noStories}</h3>
          <p className="text-gray-600">{t?.loadStories}</p>
        </div>
      </div>
    );
  }

  const story = stories?.[currentStory];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories?.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories?.length) % stories?.length);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{t?.successStories}</h3>
            <p className="text-sm text-gray-600">{t?.farmerTestimonials}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Story Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStory}
            disabled={stories?.length <= 1}
            iconName="ChevronLeft"
          >
            {t?.previous}
          </Button>
          
          <div className="flex space-x-2">
            {stories?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStory ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextStory}
            disabled={stories?.length <= 1}
            iconName="ChevronRight"
          >
            {t?.next}
          </Button>
        </div>

        {/* Story Content */}
        <div className="space-y-6">
          {/* Farmer Profile */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={story?.farmerPhoto}
                alt={story?.farmerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{story?.farmerName}</h4>
              <p className="text-sm text-gray-600">{story?.location}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="MapPin" size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500">{story?.farmSize} {t?.acres}</span>
              </div>
            </div>
          </div>

          {/* Results Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">+{story?.yieldIncrease}%</div>
              <div className="text-sm text-green-600">{t?.yieldIncrease}</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center text-2xl font-bold text-blue-700">
                <Icon name="IndianRupee" size={20} />
                {story?.costSavings?.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-blue-600">{t?.costSavings}</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Quote" size={20} className="text-gray-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 italic leading-relaxed">{story?.testimonial}</p>
              </div>
            </div>
          </div>

          {/* Story Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Beaker" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">{t?.fertilizer}:</span>
                <span className="text-sm font-medium text-gray-900">{story?.fertilizerUsed}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">{t?.season}:</span>
                <span className="text-sm font-medium text-gray-900">{story?.season}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Ruler" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">{t?.farmSize}:</span>
                <span className="text-sm font-medium text-gray-900">{story?.farmSize} {t?.acres}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">{t?.location}:</span>
                <span className="text-sm font-medium text-gray-900">{story?.location}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              className="w-full"
            >
              {t?.readMore}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
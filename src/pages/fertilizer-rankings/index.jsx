import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import RankingCard from './components/RankingCard';
import ComparisonTable from './components/ComparisonTable';
import FilterPanel from './components/FilterPanel';
import RegionalLeaderboard from './components/RegionalLeaderboard';
import SuccessStories from './components/SuccessStories';

const FertilizerRankings = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedFertilizers, setSelectedFertilizers] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    effectiveness: 'all',
    cropType: 'all',
    organicOnly: false,
    inStockOnly: true
  });

  // Mock fertilizer data
  const fertilizerData = [
    {
      id: 1,
      name: "NPK Gold Premium",
      brand: "AgroTech",
      composition: "20:20:20 + Micronutrients",
      effectiveness: 94,
      costPerAcre: 2800,
      yieldIncrease: 35,
      applicationTiming: `Apply during vegetative growth phase\nSecond application at flowering`,
      compatibleCrops: ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize"],
      category: "premium",
      inStock: true,
      sustainabilityScore: 85,
      expertRating: 4.8,
      governmentEndorsed: true
    },
    {
      id: 2,
      name: "Organic Boost Plus",
      brand: "NatureFarm",
      composition: "Organic NPK 8:4:8",
      effectiveness: 88,
      costPerAcre: 3200,
      yieldIncrease: 28,
      applicationTiming: `Apply 2 weeks before sowing\nFollow-up after 30 days`,
      compatibleCrops: ["Vegetables", "Fruits", "Pulses", "Organic Crops"],
      category: "organic",
      inStock: true,
      sustainabilityScore: 98,
      expertRating: 4.6,
      governmentEndorsed: true
    },
    {
      id: 3,
      name: "Krishi Shakti Standard",
      brand: "IndiaAgro",
      composition: "16:16:16",
      effectiveness: 82,
      costPerAcre: 1800,
      yieldIncrease: 22,
      applicationTiming: `Basal application during sowing\nTop dressing after 45 days`,
      compatibleCrops: ["Rice", "Wheat", "Barley", "Oats"],
      category: "standard",
      inStock: true,
      sustainabilityScore: 72,
      expertRating: 4.2,
      governmentEndorsed: false
    },
    {
      id: 4,
      name: "Budget Grow Economy",
      brand: "ValueFert",
      composition: "12:12:12",
      effectiveness: 75,
      costPerAcre: 1200,
      yieldIncrease: 18,
      applicationTiming: `Single application during sowing\nOptional top dressing if needed`,
      compatibleCrops: ["Millets", "Pulses", "Fodder Crops"],
      category: "economy",
      inStock: true,
      sustainabilityScore: 65,
      expertRating: 3.8,
      governmentEndorsed: false
    },
    {
      id: 5,
      name: "Micro Max Complete",
      brand: "TechFert",
      composition: "18:18:18 + Zinc + Boron",
      effectiveness: 91,
      costPerAcre: 2400,
      yieldIncrease: 32,
      applicationTiming: `Apply at tillering stage\nSecond dose at panicle initiation`,
      compatibleCrops: ["Rice", "Wheat", "Cotton", "Vegetables"],
      category: "premium",
      inStock: false,
      sustainabilityScore: 78,
      expertRating: 4.7,
      governmentEndorsed: true
    }
  ];

  // Mock regional leaderboard data
  const regionalLeaderboard = [
    {
      id: 1,
      name: "NPK Gold Premium",
      farmerCount: 15420,
      successRate: 94,
      avgYieldIncrease: 35,
      reviewCount: 2840,
      recentSuccess: {
        quote: "Increased my cotton yield by 40% this season. Best investment I made!",
        farmer: "Ramesh Patil",
        location: "Nashik"
      }
    },
    {
      id: 2,
      name: "Organic Boost Plus",
      farmerCount: 8960,
      successRate: 88,
      avgYieldIncrease: 28,
      reviewCount: 1650,
      recentSuccess: {
        quote: "Perfect for organic farming. Soil health improved significantly.",
        farmer: "Sunita Sharma",
        location: "Pune"
      }
    },
    {
      id: 3,
      name: "Krishi Shakti Standard",
      farmerCount: 22100,
      successRate: 82,
      avgYieldIncrease: 22,
      reviewCount: 4200,
      recentSuccess: {
        quote: "Good value for money. Consistent results across seasons.",
        farmer: "Vijay Kumar",
        location: "Aurangabad"
      }
    }
  ];

  // Mock success stories
  const successStories = [
    {
      id: 1,
      farmerName: "Rajesh Patel",
      location: "Nashik, Maharashtra",
      farmSize: 5,
      farmerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      yieldIncrease: 42,
      costSavings: 25000,
      fertilizerUsed: "NPK Gold Premium",
      season: "Kharif 2024",
      testimonial: `After switching to NPK Gold Premium, my cotton yield increased dramatically. The micronutrients made a huge difference in plant health. My neighbors are now asking for advice on fertilizers!`
    },
    {
      id: 2,
      farmerName: "Priya Deshmukh",
      location: "Pune, Maharashtra",
      farmSize: 3,
      farmerPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      yieldIncrease: 35,
      costSavings: 18000,
      fertilizerUsed: "Organic Boost Plus",
      season: "Rabi 2024",
      testimonial: `Organic Boost Plus helped me transition to organic farming successfully. The soil quality improved, and I'm getting premium prices for organic produce. Worth every rupee!`
    }
  ];

  const translations = {
    en: {
      title: 'Fertilizer Rankings',
      subtitle: 'AI-powered fertilizer recommendations ranked by effectiveness and value',
      topRecommendations: 'Top 5 Fertilizer Recommendations',
      comparison: 'Fertilizer Comparison',
      regional: 'Regional Insights',
      stories: 'Success Stories',
      viewCropRecommendations: 'View Crop Recommendations',
      viewPestControl: 'View Pest Control',
      compareAnalysis: 'Comparative Analysis',
      backToDashboard: 'Back to Dashboard',
      loading: 'Loading recommendations...',
      noResults: 'No fertilizers match your current filters',
      adjustFilters: 'Try adjusting your filters to see more options'
    },
    hi: {
      title: 'उर्वरक रैंकिंग',
      subtitle: 'प्रभावशीलता और मूल्य के आधार पर AI-संचालित उर्वरक सिफारिशें',
      topRecommendations: 'शीर्ष 5 उर्वरक सिफारिशें',
      comparison: 'उर्वरक तुलना',
      regional: 'क्षेत्रीय अंतर्दृष्टि',
      stories: 'सफलता की कहानियां',
      viewCropRecommendations: 'फसल सिफारिशें देखें',
      viewPestControl: 'कीट नियंत्रण देखें',
      compareAnalysis: 'तुलनात्मक विश्लेषण',
      backToDashboard: 'डैशबोर्ड पर वापस',
      loading: 'सिफारिशें लोड हो रही हैं...',
      noResults: 'आपके वर्तमान फिल्टर से कोई उर्वरक मेल नहीं खाता',
      adjustFilters: 'अधिक विकल्प देखने के लिए अपने फिल्टर समायोजित करने का प्रयास करें'
    },
    ta: {
      title: 'உர தரவரிசை',
      subtitle: 'செயல்திறன் மற்றும் மதிப்பின் அடிப்படையில் AI-இயங்கும் உர பரிந்துரைகள்',
      topRecommendations: 'முதல் 5 உர பரிந்துரைகள்',
      comparison: 'உர ஒப்பீடு',
      regional: 'பிராந்திய நுண்ணறிவு',
      stories: 'வெற்றிக் கதைகள்',
      viewCropRecommendations: 'பயிர் பரிந்துரைகளைக் காண்க',
      viewPestControl: 'பூச்சி கட்டுப்பாட்டைக் காண்க',
      compareAnalysis: 'ஒப்பீட்டு பகுப்பாய்வு',
      backToDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
      loading: 'பரிந்துரைகள் ஏற்றப்படுகின்றன...',
      noResults: 'உங்கள் தற்போதைய வடிப்பான்களுடன் எந்த உரங்களும் பொருந்தவில்லை',
      adjustFilters: 'மேலும் விकल்பங்களைக் காண உங்கள் வடிப்பான்களைச் சரிசெய்ய முயற்சிக்கவும்'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const t = translations?.[currentLanguage] || translations?.en;

  const handleViewDetails = (fertilizer) => {
    console.log('View details for:', fertilizer?.name);
    // Navigate to detailed view or open modal
  };

  const handleCompare = (fertilizer) => {
    if (!selectedFertilizers?.find(f => f?.id === fertilizer?.id)) {
      setSelectedFertilizers([...selectedFertilizers, fertilizer]);
    }
  };

  const handleRemoveFromComparison = (fertilizerId) => {
    setSelectedFertilizers(selectedFertilizers?.filter(f => f?.id !== fertilizerId));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      effectiveness: 'all',
      cropType: 'all',
      organicOnly: false,
      inStockOnly: true
    });
  };

  const filteredFertilizers = fertilizerData?.filter(fertilizer => {
    if (filters?.category !== 'all' && fertilizer?.category !== filters?.category) return false;
    if (filters?.effectiveness === '90+' && fertilizer?.effectiveness < 90) return false;
    if (filters?.effectiveness === '80+' && fertilizer?.effectiveness < 80) return false;
    if (filters?.effectiveness === '70+' && fertilizer?.effectiveness < 70) return false;
    if (filters?.organicOnly && fertilizer?.category !== 'organic') return false;
    if (filters?.inStockOnly && !fertilizer?.inStock) return false;
    return true;
  });

  const sortedFertilizers = [...filteredFertilizers]?.sort((a, b) => {
    if (filters?.priceRange === 'low-high') return a?.costPerAcre - b?.costPerAcre;
    if (filters?.priceRange === 'high-low') return b?.costPerAcre - a?.costPerAcre;
    return b?.effectiveness - a?.effectiveness; // Default: effectiveness desc
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Beaker" size={24} color="white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{t?.title}</h1>
              </div>
              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                {t?.subtitle}
              </p>
              
              {/* Quick Navigation */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/crop-recommendations')}
                  iconName="Wheat"
                  iconPosition="left"
                >
                  {t?.viewCropRecommendations}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/pest-control-rankings')}
                  iconName="Bug"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  {t?.viewPestControl}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/comparative-analysis')}
                  iconName="BarChart3"
                  iconPosition="left"
                  className="text-white hover:bg-white/20"
                >
                  {t?.compareAnalysis}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Panel */}
          <div className="mb-8">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              currentLanguage={currentLanguage}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Top Recommendations */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t?.topRecommendations}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Icon name="Sparkles" size={16} className="text-yellow-500" />
                    <span>AI Ranked</span>
                  </div>
                </div>

                {sortedFertilizers?.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <Icon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t?.noResults}</h3>
                    <p className="text-gray-600 mb-4">{t?.adjustFilters}</p>
                    <Button variant="outline" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedFertilizers?.slice(0, 5)?.map((fertilizer, index) => (
                      <RankingCard
                        key={fertilizer?.id}
                        fertilizer={fertilizer}
                        rank={index + 1}
                        onViewDetails={handleViewDetails}
                        onCompare={handleCompare}
                        isSelected={selectedFertilizers?.some(f => f?.id === fertilizer?.id)}
                        currentLanguage={currentLanguage}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Comparison Table */}
              {selectedFertilizers?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t?.comparison}</h2>
                  <ComparisonTable
                    fertilizers={selectedFertilizers}
                    onRemoveFertilizer={handleRemoveFromComparison}
                    currentLanguage={currentLanguage}
                  />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Regional Leaderboard */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t?.regional}</h2>
                <RegionalLeaderboard
                  region="Maharashtra"
                  leaderboardData={regionalLeaderboard}
                  currentLanguage={currentLanguage}
                />
              </section>

              {/* Success Stories */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t?.stories}</h2>
                <SuccessStories
                  stories={successStories}
                  currentLanguage={currentLanguage}
                />
              </section>
            </div>
          </div>

          {/* Back to Dashboard */}
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              {t?.backToDashboard}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FertilizerRankings;
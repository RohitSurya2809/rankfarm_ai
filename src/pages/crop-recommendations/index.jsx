import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CropRankingCard from './components/CropRankingCard';
import FilterControls from './components/FilterControls';
import ComparisonModal from './components/ComparisonModal';
import RankingTransparency from './components/RankingTransparency';
import VoiceControls from './components/VoiceControls';

const CropRecommendations = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [sortBy, setSortBy] = useState('rank');
  const [filters, setFilters] = useState({
    farmSize: 'all',
    budget: 'all',
    riskLevel: 'all',
    season: 'all',
    soilType: 'all',
    minSuccessProbability: 0,
    minROI: 0,
    maxGrowthPeriod: 365,
    searchTerm: ''
  });

  // Mock crop data
  const mockCrops = [
    {
      id: 1,
      name: { en: "Basmati Rice", hi: "बासमती चावल", ta: "பாஸ்மதி அரிசி" },
      category: { en: "Cereal Crop", hi: "अनाज की फसल", ta: "தானிய பயிர்" },
      image: "https://images.pexels.com/photos/33239/rice-field-vietnam-agriculture.jpg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 94,
      confidenceInterval: "90-98%",
      expectedROI: 125000,
      growthPeriod: 120,
      aiScore: 9.4,
      riskLevel: "Low",
      soilSuitability: 5,
      waterRequirement: "High",
      marketPrice: 45,
      pricetrend: "up",
      marketForecast: "Strong demand expected due to export opportunities and premium quality recognition."
    },
    {
      id: 2,
      name: { en: "Organic Wheat", hi: "जैविक गेहूं", ta: "இயற்கை கோதுமை" },
      category: { en: "Cereal Crop", hi: "अनाज की फसल", ta: "தானிய பயிர்" },
      image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 91,
      confidenceInterval: "88-95%",
      expectedROI: 98000,
      growthPeriod: 110,
      aiScore: 9.1,
      riskLevel: "Low",
      soilSuitability: 4,
      waterRequirement: "Medium",
      marketPrice: 32,
      pricetrend: "up",
      marketForecast: "Growing organic food market driving premium prices for certified organic wheat."
    },
    {
      id: 3,
      name: { en: "Hybrid Maize", hi: "हाइब्रिड मक्का", ta: "கலப்பின சோளம்" },
      category: { en: "Cereal Crop", hi: "अनाज की फसल", ta: "தானிய பயிர்" },
      image: "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 89,
      confidenceInterval: "85-93%",
      expectedROI: 87500,
      growthPeriod: 95,
      aiScore: 8.9,
      riskLevel: "Medium",
      soilSuitability: 4,
      waterRequirement: "Medium",
      marketPrice: 28,
      priceTrail: "stable",
      marketForecast: "Steady demand from poultry and livestock feed industry ensuring stable prices."
    },
    {
      id: 4,
      name: { en: "Cotton (BT)", hi: "कपास (बीटी)", ta: "பருத்தி (பிடி)" },
      category: { en: "Cash Crop", hi: "नकदी फसल", ta: "பணப் பயிர்" },
      image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 85,
      confidenceInterval: "80-90%",
      expectedROI: 145000,
      growthPeriod: 180,
      aiScore: 8.5,
      riskLevel: "Medium",
      soilSuitability: 4,
      waterRequirement: "High",
      marketPrice: 52,
      priceTrail: "up",
      marketForecast: "Textile industry recovery and export demand supporting higher cotton prices."
    },
    {
      id: 5,
      name: { en: "Sugarcane", hi: "गन्ना", ta: "கரும்பு" },
      category: { en: "Cash Crop", hi: "नकदी फसल", ta: "பணப் பயிர்" },
      image: "https://images.pexels.com/photos/8142971/pexels-photo-8142971.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 82,
      confidenceInterval: "78-87%",
      expectedROI: 165000,
      growthPeriod: 365,
      aiScore: 8.2,
      riskLevel: "Medium",
      soilSuitability: 3,
      waterRequirement: "Very High",
      marketPrice: 350,
      priceTrail: "stable",
      marketForecast: "Government support prices and sugar mill contracts providing price stability."
    },
    {
      id: 6,
      name: { en: "Soybean", hi: "सोयाबीन", ta: "சோயாபீன்" },
      category: { en: "Oilseed Crop", hi: "तिलहन फसल", ta: "எண்ணெய் விதை பயிர்" },
      image: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 79,
      confidenceInterval: "75-84%",
      expectedROI: 72000,
      growthPeriod: 100,
      aiScore: 7.9,
      riskLevel: "Medium",
      soilSuitability: 4,
      waterRequirement: "Medium",
      marketPrice: 42,
      priceTrail: "up",
      marketForecast: "Rising edible oil prices and protein demand supporting soybean market growth."
    },
    {
      id: 7,
      name: { en: "Tomato (Hybrid)", hi: "टमाटर (हाइब्रिड)", ta: "தக்காளி (கலப்பின)" },
      category: { en: "Vegetable Crop", hi: "सब्जी की फसल", ta: "காய்கறி பயிர்" },
      image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 76,
      confidenceInterval: "70-82%",
      expectedROI: 95000,
      growthPeriod: 75,
      aiScore: 7.6,
      riskLevel: "High",
      soilSuitability: 3,
      waterRequirement: "High",
      marketPrice: 25,
      priceTrail: "down",
      marketForecast: "Seasonal price volatility expected, but processing industry demand remains strong."
    },
    {
      id: 8,
      name: { en: "Onion", hi: "प्याज", ta: "வெங்காயம்" },
      category: { en: "Vegetable Crop", hi: "सब्जी की फसल", ta: "காய்கறி பயிர்" },
      image: "https://images.pexels.com/photos/144248/onions-food-vegetables-healthy-144248.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 73,
      confidenceInterval: "68-78%",
      expectedROI: 68000,
      growthPeriod: 120,
      aiScore: 7.3,
      riskLevel: "High",
      soilSuitability: 3,
      waterRequirement: "Medium",
      marketPrice: 22,
      priceTrail: "stable",
      marketForecast: "Export opportunities and domestic consumption growth supporting stable prices."
    },
    {
      id: 9,
      name: { en: "Potato", hi: "आलू", ta: "உருளைக்கிழங்கு" },
      category: { en: "Vegetable Crop", hi: "सब्जी की फसल", ta: "காய்கறி பயிர்" },
      image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 71,
      confidenceInterval: "66-76%",
      expectedROI: 58000,
      growthPeriod: 90,
      aiScore: 7.1,
      riskLevel: "Medium",
      soilSuitability: 4,
      waterRequirement: "Medium",
      marketPrice: 18,
      priceTrail: "stable",
      marketForecast: "Processing industry demand and storage facilities supporting price stability."
    },
    {
      id: 10,
      name: { en: "Groundnut", hi: "मूंगफली", ta: "நிலக்கடலை" },
      category: { en: "Oilseed Crop", hi: "तिलहन फसल", ta: "எண்ணெய் விதை பயிர்" },
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500",
      successProbability: 68,
      confidenceInterval: "63-73%",
      expectedROI: 52000,
      growthPeriod: 110,
      aiScore: 6.8,
      riskLevel: "Medium",
      soilSuitability: 3,
      waterRequirement: "Low",
      marketPrice: 48,
      priceTrail: "up",
      marketForecast: "Oil extraction industry and export demand driving groundnut price appreciation."
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedVoice = localStorage.getItem('voiceEnabled') === 'true';
    setCurrentLanguage(savedLanguage);
    setIsVoiceEnabled(savedVoice);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      farmSize: 'all',
      budget: 'all',
      riskLevel: 'all',
      season: 'all',
      soilType: 'all',
      minSuccessProbability: 0,
      minROI: 0,
      maxGrowthPeriod: 365,
      searchTerm: ''
    });
  };

  const handleCropCompare = (crop) => {
    setSelectedCrops(prev => {
      const isSelected = prev?.find(c => c?.id === crop?.id);
      if (isSelected) {
        return prev?.filter(c => c?.id !== crop?.id);
      } else if (prev?.length < 4) {
        return [...prev, crop];
      } else {
        alert('You can compare maximum 4 crops at a time.');
        return prev;
      }
    });
  };

  const handleRemoveCrop = (cropId) => {
    setSelectedCrops(prev => prev?.filter(c => c?.id !== cropId));
  };

  const handleViewDetails = (crop) => {
    // Navigate to detailed crop analysis (would be implemented)
    console.log('View details for:', crop);
  };

  const filteredAndSortedCrops = mockCrops?.filter(crop => {
      const matchesSearch = filters?.searchTerm === '' || 
        Object.values(crop?.name)?.some(name => 
          name?.toLowerCase()?.includes(filters?.searchTerm?.toLowerCase())
        );
      const matchesSuccessProbability = crop?.successProbability >= filters?.minSuccessProbability;
      const matchesROI = crop?.expectedROI >= filters?.minROI;
      const matchesGrowthPeriod = crop?.growthPeriod <= filters?.maxGrowthPeriod;
      const matchesRiskLevel = filters?.riskLevel === 'all' || crop?.riskLevel?.toLowerCase() === filters?.riskLevel;
      
      return matchesSearch && matchesSuccessProbability && matchesROI && matchesGrowthPeriod && matchesRiskLevel;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'successProbability':
          return b?.successProbability - a?.successProbability;
        case 'roi':
          return b?.expectedROI - a?.expectedROI;
        case 'growthPeriod':
          return a?.growthPeriod - b?.growthPeriod;
        case 'aiScore':
          return b?.aiScore - a?.aiScore;
        default:
          return a?.id - b?.id; // rank order
      }
    });

  const getLocalizedText = (textObj) => {
    return textObj?.[currentLanguage] || textObj?.en;
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                AI Crop Recommendations
              </h1>
              <p className="text-muted-foreground">
                Discover the best crops for your farm with AI-powered rankings based on 50+ parameters
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/fertilizer-rankings')}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Next: Fertilizers
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Recommendations</p>
                  <p className="text-2xl font-bold text-foreground">{filteredAndSortedCrops?.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(filteredAndSortedCrops?.reduce((sum, crop) => sum + crop?.successProbability, 0) / filteredAndSortedCrops?.length || 0)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="IndianRupee" size={20} className="text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Expected ROI</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{Math.round(filteredAndSortedCrops?.reduce((sum, crop) => sum + crop?.expectedROI, 0) / filteredAndSortedCrops?.length || 0)?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={20} className="text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Selected for Compare</p>
                  <p className="text-2xl font-bold text-foreground">{selectedCrops?.length}/4</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Controls */}
        {isVoiceEnabled && (
          <div className="mb-6">
            <VoiceControls
              crops={filteredAndSortedCrops}
              currentLanguage={currentLanguage}
              isVoiceEnabled={isVoiceEnabled}
              onVoiceToggle={() => setIsVoiceEnabled(false)}
            />
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                iconName="Grid3X3"
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                iconName="List"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="px-3 py-1 border border-border rounded-md text-sm bg-background"
              >
                <option value="rank">Rank</option>
                <option value="successProbability">Success Rate</option>
                <option value="roi">Expected ROI</option>
                <option value="growthPeriod">Growth Period</option>
                <option value="aiScore">AI Score</option>
              </select>
            </div>
          </div>

          {selectedCrops?.length > 0 && (
            <Button
              variant="default"
              onClick={() => setIsComparisonOpen(true)}
              iconName="BarChart3"
              iconPosition="left"
            >
              Compare Selected ({selectedCrops?.length})
            </Button>
          )}
        </div>

        {/* Crop Rankings */}
        <div className={`${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
        }`}>
          {filteredAndSortedCrops?.map((crop, index) => (
            <CropRankingCard
              key={crop?.id}
              crop={crop}
              rank={index + 1}
              onViewDetails={handleViewDetails}
              onCompare={handleCropCompare}
              isSelected={selectedCrops?.some(c => c?.id === crop?.id)}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>

        {filteredAndSortedCrops?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No crops found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more recommendations.
            </p>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Ranking Transparency */}
        {filteredAndSortedCrops?.length > 0 && (
          <div className="mt-8">
            <RankingTransparency
              crop={filteredAndSortedCrops?.[0]}
              currentLanguage={currentLanguage}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/fertilizer-rankings')}
              iconName="Beaker"
              iconPosition="left"
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Fertilizer Rankings</div>
                <div className="text-sm text-muted-foreground">Find best fertilizers for selected crops</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/pest-control-rankings')}
              iconName="Bug"
              iconPosition="left"
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Pest Control</div>
                <div className="text-sm text-muted-foreground">Protect your crops effectively</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/comparative-analysis')}
              iconName="BarChart3"
              iconPosition="left"
              className="justify-start"
            >
              <div className="text-left">
                <div className="font-medium">Comparative Analysis</div>
                <div className="text-sm text-muted-foreground">Deep dive into crop comparisons</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        selectedCrops={selectedCrops}
        onRemoveCrop={handleRemoveCrop}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default CropRecommendations;
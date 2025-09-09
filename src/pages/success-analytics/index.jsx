import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PerformanceMetrics from './components/PerformanceMetrics';
import AnalyticsChart from './components/AnalyticsChart';
import AchievementBadges from './components/AchievementBadges';
import RegionalLeaderboard from './components/RegionalLeaderboard';
import SuccessStories from './components/SuccessStories';
import ConfidenceTracker from './components/ConfidenceTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SuccessAnalytics = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedVoice = localStorage.getItem('voiceEnabled') === 'true';
    setCurrentLanguage(savedLanguage);
    setIsVoiceEnabled(savedVoice);
  }, []);

  const translations = {
    en: {
      title: "Success Analytics",
      subtitle: "Track your farming performance and achievements",
      overview: "Overview",
      performance: "Performance",
      achievements: "Achievements",
      leaderboard: "Leaderboard",
      stories: "Success Stories",
      confidence: "Confidence",
      backToDashboard: "Back to Dashboard",
      exportReport: "Export Report",
      shareResults: "Share Results"
    },
    hi: {
      title: "सफलता विश्लेषण",
      subtitle: "अपने खेती के प्रदर्शन और उपलब्धियों को ट्रैक करें",
      overview: "अवलोकन",
      performance: "प्रदर्शन",
      achievements: "उपलब्धियां",
      leaderboard: "लीडरबोर्ड",
      stories: "सफलता की कहानियां",
      confidence: "विश्वास",
      backToDashboard: "डैशबोर्ड पर वापस",
      exportReport: "रिपोर्ट निर्यात करें",
      shareResults: "परिणाम साझा करें"
    },
    ta: {
      title: "வெற்றி பகுப்பாய்வு",
      subtitle: "உங்கள் விவசாய செயல்திறன் மற்றும் சாதனைகளைக் கண்காணிக்கவும்",
      overview: "மேலோட்டம்",
      performance: "செயல்திறன்",
      achievements: "சாதனைகள்",
      leaderboard: "லீடர்போர்டு",
      stories: "வெற்றிக் கதைகள்",
      confidence: "நம்பிக்கை",
      backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
      exportReport: "அறிக்கையை ஏற்றுமதி செய்யவும்",
      shareResults: "முடிவுகளைப் பகிரவும்"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  // Mock data for performance metrics
  const performanceMetrics = {
    totalRecommendations: 156,
    monthlyRecommendations: 23,
    successRate: 87,
    avgROI: 142,
    costSavings: 85000,
    yieldImprovement: 34,
    confidenceScore: 92
  };

  // Mock data for analytics charts
  const chartData = {
    performance: [
      { month: 'Jan', yield: 45, cost: 32000 },
      { month: 'Feb', yield: 52, cost: 28000 },
      { month: 'Mar', yield: 48, cost: 35000 },
      { month: 'Apr', yield: 61, cost: 25000 },
      { month: 'May', yield: 58, cost: 30000 },
      { month: 'Jun', yield: 67, cost: 22000 }
    ],
    roi: [
      { month: 'Jan', savings: 15000 },
      { month: 'Feb', savings: 22000 },
      { month: 'Mar', savings: 18000 },
      { month: 'Apr', savings: 28000 },
      { month: 'May', savings: 25000 },
      { month: 'Jun', savings: 32000 }
    ],
    accuracy: [
      { month: 'Jan', accuracy: 78 },
      { month: 'Feb', accuracy: 82 },
      { month: 'Mar', accuracy: 85 },
      { month: 'Apr', accuracy: 88 },
      { month: 'May', accuracy: 91 },
      { month: 'Jun', accuracy: 94 }
    ],
    seasonal: [
      { name: 'Kharif', value: 45 },
      { name: 'Rabi', value: 35 },
      { name: 'Zaid', value: 20 }
    ]
  };

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "First Success",
      description: "Completed your first successful recommendation",
      type: "first_success",
      tier: "bronze",
      unlocked: true,
      unlockedDate: "2024-01-15",
      progress: 100
    },
    {
      id: 2,
      title: "Cost Saver",
      description: "Saved over ₹50,000 in farming costs",
      type: "cost_saver",
      tier: "silver",
      unlocked: true,
      unlockedDate: "2024-02-20",
      progress: 100
    },
    {
      id: 3,
      title: "Yield Master",
      description: "Achieved 30%+ yield improvement",
      type: "yield_master",
      tier: "gold",
      unlocked: true,
      unlockedDate: "2024-03-10",
      progress: 100
    },
    {
      id: 4,
      title: "Eco Warrior",
      description: "Used 10 sustainable farming practices",
      type: "eco_warrior",
      tier: "gold",
      unlocked: false,
      progress: 70
    },
    {
      id: 5,
      title: "Innovation Leader",
      description: "Adopted 5 new technologies",
      type: "innovation_leader",
      tier: "silver",
      unlocked: false,
      progress: 40
    },
    {
      id: 6,
      title: "Community Helper",
      description: "Helped 20 fellow farmers",
      type: "community_helper",
      tier: "bronze",
      unlocked: false,
      progress: 25
    }
  ];

  // Mock data for leaderboard
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Arjun Patel",
      location: "Gujarat",
      region: "west",
      score: 2450,
      improvement: 15,
      farmSize: 25,
      isCurrentUser: false
    },
    {
      id: 2,
      rank: 2,
      name: "Priya Sharma",
      location: "Punjab",
      region: "north",
      score: 2380,
      improvement: 12,
      farmSize: 30,
      isCurrentUser: false
    },
    {
      id: 3,
      rank: 3,
      name: "Ravi Kumar",
      location: "Tamil Nadu",
      region: "south",
      score: 2320,
      improvement: 18,
      farmSize: 15,
      isCurrentUser: false
    },
    {
      id: 4,
      rank: 4,
      name: "Sunita Devi",
      location: "Bihar",
      region: "east",
      score: 2280,
      improvement: 8,
      farmSize: 12,
      isCurrentUser: false
    },
    {
      id: 5,
      rank: 5,
      name: "Mahesh Reddy",
      location: "Andhra Pradesh",
      region: "south",
      score: 2250,
      improvement: 22,
      farmSize: 20,
      isCurrentUser: false
    },
    {
      id: 6,
      rank: 6,
      name: "Kavita Singh",
      location: "Uttar Pradesh",
      region: "north",
      score: 2200,
      improvement: 10,
      farmSize: 18,
      isCurrentUser: false
    },
    {
      id: 7,
      rank: 7,
      name: "Rajesh Kumar",
      location: "Maharashtra",
      region: "west",
      score: 2150,
      improvement: 14,
      farmSize: 22,
      isCurrentUser: true
    }
  ];

  // Mock data for success stories
  const successStories = [
    {
      id: 1,
      farmerName: "Ramesh Patel",
      location: "Ahmedabad, Gujarat",
      timeAgo: 2,
      category: "crop",
      categoryName: "Crop Selection",
      verified: true,
      image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg",
      farmSize: 15,
      improvement: 45,
      roi: 180,
      yieldIncrease: 45,
      costSavings: 75000,
      timeToResult: "3 months",
      challenge: `My cotton crops were consistently underperforming due to poor variety selection and inadequate soil preparation. Despite years of experience, I was struggling with low yields and high input costs.`,
      solution: `RankFarm AI recommended switching to BT cotton variety with specific soil amendments and a precision irrigation schedule. The AI also suggested optimal planting dates based on weather predictions.`,
      result: `The results exceeded my expectations. Not only did I achieve a 45% increase in yield, but I also reduced my input costs by 30%. The precision recommendations helped me save water and fertilizer while maximizing output. My farm's profitability increased significantly, and I was able to invest in better equipment for the next season.`,
      recommendationsUsed: ["BT Cotton Variety", "Soil Amendment", "Precision Irrigation", "Weather-based Planting"]
    },
    {
      id: 2,
      farmerName: "Lakshmi Devi",
      location: "Coimbatore, Tamil Nadu",
      timeAgo: 1,
      category: "pest_control",
      categoryName: "Pest Management",
      verified: true,
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg",
      farmSize: 8,
      improvement: 38,
      roi: 165,
      yieldIncrease: 38,
      costSavings: 45000,
      timeToResult: "2 months",
      challenge: `Severe pest infestation was destroying my vegetable crops, particularly tomatoes and brinjal. Traditional pesticides were becoming less effective and expensive.`,
      solution: `The AI system recommended an integrated pest management approach with bio-pesticides, companion planting, and targeted chemical interventions based on pest lifecycle predictions.`,
      result: `Within two months, pest damage reduced by 80%. My crops recovered completely, and I achieved better quality produce. The integrated approach also improved soil health and reduced chemical dependency. The cost savings from reduced pesticide use were substantial, and my vegetables now command premium prices in the market due to their quality.`,
      recommendationsUsed: ["Bio-pesticides", "Companion Planting", "IPM Strategy", "Lifecycle Monitoring"]
    }
  ];

  // Mock data for confidence tracker
  const confidenceData = {
    overallAccuracy: 87,
    lastUpdated: "2024-09-09",
    improvementTrend: 12,
    intervals: [
      {
        level: "high",
        percentage: 65,
        count: 102,
        accuracy: 94
      },
      {
        level: "medium",
        percentage: 25,
        count: 39,
        accuracy: 78
      },
      {
        level: "low",
        percentage: 10,
        count: 15,
        accuracy: 62
      }
    ],
    monthlyTrend: [
      { month: "Jan", accuracy: 78 },
      { month: "Feb", accuracy: 82 },
      { month: "Mar", accuracy: 85 },
      { month: "Apr", accuracy: 88 },
      { month: "May", accuracy: 91 },
      { month: "Jun", accuracy: 87 }
    ]
  };

  const tabs = [
    { id: 'overview', label: t?.overview, icon: 'LayoutDashboard' },
    { id: 'performance', label: t?.performance, icon: 'TrendingUp' },
    { id: 'achievements', label: t?.achievements, icon: 'Award' },
    { id: 'leaderboard', label: t?.leaderboard, icon: 'Users' },
    { id: 'stories', label: t?.stories, icon: 'BookOpen' },
    { id: 'confidence', label: t?.confidence, icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <PerformanceMetrics metrics={performanceMetrics} currentLanguage={currentLanguage} />
            <AnalyticsChart chartData={chartData} currentLanguage={currentLanguage} />
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-8">
            <AnalyticsChart chartData={chartData} currentLanguage={currentLanguage} />
            <PerformanceMetrics metrics={performanceMetrics} currentLanguage={currentLanguage} />
          </div>
        );
      case 'achievements':
        return <AchievementBadges achievements={achievements} currentLanguage={currentLanguage} />;
      case 'leaderboard':
        return <RegionalLeaderboard leaderboardData={leaderboardData} currentLanguage={currentLanguage} />;
      case 'stories':
        return <SuccessStories stories={successStories} currentLanguage={currentLanguage} />;
      case 'confidence':
        return <ConfidenceTracker confidenceData={confidenceData} currentLanguage={currentLanguage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{getTranslation('successAnalytics', currentLanguage)}</h1>
                <p className="text-muted-foreground">{getTranslation('trackFarmingPerformance', currentLanguage)}</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  {t?.backToDashboard}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  {t?.exportReport}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Share"
                  iconPosition="left"
                >
                  {t?.shareResults}
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuccessAnalytics;
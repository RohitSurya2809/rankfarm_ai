import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ExpertValidation = ({ selectedItems }) => {
  const [activeTab, setActiveTab] = useState('experts');

  const experts = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      title: 'Agricultural Scientist',
      institution: 'IARI, New Delhi',
      experience: '15 years',
      specialization: 'Crop Science',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    {
      id: 2,
      name: 'Prof. Meera Sharma',
      title: 'Soil Health Expert',
      institution: 'PAU, Ludhiana',
      experience: '12 years',
      specialization: 'Soil & Fertilizers',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Anil Patel',
      title: 'Pest Management Specialist',
      institution: 'ICRISAT, Hyderabad',
      experience: '18 years',
      specialization: 'Integrated Pest Management',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      verified: true
    }
  ];

  const expertReviews = {
    'wheat-hd2967': {
      expertId: 1,
      rating: 4.5,
      confidence: 92,
      review: `HD-2967 is an excellent choice for Punjab and Haryana regions. The variety shows consistent performance with proper irrigation management. Expected yield of 45-50 q/ha is realistic with recommended practices.`,
      pros: ['High yield potential', 'Disease resistance', 'Good market acceptance'],
      cons: ['Water intensive', 'Requires timely sowing'],
      recommendation: 'Highly Recommended',
      lastUpdated: '2025-01-05'
    },
    'urea-46': {
      expertId: 2,
      rating: 4.2,
      confidence: 88,
      review: `Urea remains the most cost-effective nitrogen source. However, split application is crucial to minimize losses. Consider combining with organic matter for better soil health.`,
      pros: ['Cost effective', 'High nitrogen content', 'Easy availability'],
      cons: ['Leaching risk', 'Soil acidification potential'],
      recommendation: 'Recommended with Precautions',
      lastUpdated: '2025-01-03'
    },
    'neem-oil': {
      expertId: 3,
      rating: 4.6,
      confidence: 90,
      review: `Neem oil is an excellent organic pest control option. Effective against aphids, whiteflies, and thrips. Best results when applied during early morning or evening hours.`,
      pros: ['Organic solution', 'Multiple pest control', 'Safe for beneficial insects'],
      cons: ['Slower action', 'Weather dependent'],
      recommendation: 'Highly Recommended',
      lastUpdated: '2025-01-04'
    }
  };

  const aiRecommendations = {
    'wheat-hd2967': {
      aiScore: 94,
      confidence: 96,
      factors: ['Weather suitability: 95%', 'Soil compatibility: 92%', 'Market demand: 96%', 'Risk assessment: 88%'],
      prediction: 'AI predicts 47 q/ha yield with 94% success probability',
      reasoning: 'Based on 10,000+ similar farm data points and current weather patterns'
    },
    'urea-46': {
      aiScore: 89,
      confidence: 91,
      factors: ['Cost efficiency: 95%', 'Nutrient availability: 88%', 'Application ease: 92%', 'Environmental impact: 75%'],
      prediction: 'AI predicts 15-20% yield increase with proper application',
      reasoning: 'Analysis of 5,000+ fertilizer application records in similar conditions'
    },
    'neem-oil': {
      aiScore: 87,
      confidence: 89,
      factors: ['Pest effectiveness: 85%', 'Crop safety: 95%', 'Cost benefit: 82%', 'Organic certification: 100%'],
      prediction: 'AI predicts 80-85% pest control effectiveness',
      reasoning: 'Based on organic farming success data from 2,500+ farms'
    }
  };

  const getRecommendationColor = (recommendation) => {
    if (recommendation === 'Highly Recommended') return 'text-green-600 bg-green-50';
    if (recommendation === 'Recommended with Precautions') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderExpertTab = () => {
    const selectedItemsList = Object.entries(selectedItems)?.flatMap(([category, items]) => items);
    
    return (
      <div className="space-y-6">
        {selectedItemsList?.map((itemId) => {
          const review = expertReviews?.[itemId];
          if (!review) return null;
          
          const expert = experts?.find(e => e?.id === review?.expertId);
          
          return (
            <div key={itemId} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={expert?.avatar}
                    alt={expert?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{expert?.name}</h3>
                      {expert?.verified && (
                        <Icon name="BadgeCheck" size={16} className="text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{expert?.title}</p>
                    <p className="text-xs text-muted-foreground">{expert?.institution}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(review?.rating) ? "text-yellow-500 fill-current" : "text-muted"}
                      />
                    ))}
                    <span className="text-sm font-medium text-foreground ml-1">{review?.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{review?.confidence}% confidence</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground capitalize">{itemId?.replace('-', ' ')}</h4>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRecommendationColor(review?.recommendation)}`}>
                    {review?.recommendation}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{review?.review}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="text-sm font-medium text-green-600 mb-2">Advantages</h5>
                  <ul className="space-y-1">
                    {review?.pros?.map((pro, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-foreground">
                        <Icon name="Check" size={12} className="text-green-600" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-red-600 mb-2">Considerations</h5>
                  <ul className="space-y-1">
                    {review?.cons?.map((con, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-foreground">
                        <Icon name="AlertTriangle" size={12} className="text-red-600" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <span>Last updated: {review?.lastUpdated}</span>
                <span>{expert?.experience} experience • {expert?.specialization}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAITab = () => {
    const selectedItemsList = Object.entries(selectedItems)?.flatMap(([category, items]) => items);
    
    return (
      <div className="space-y-6">
        {selectedItemsList?.map((itemId) => {
          const aiData = aiRecommendations?.[itemId];
          if (!aiData) return null;
          
          return (
            <div key={itemId} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Icon name="Brain" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground capitalize">{itemId?.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(aiData?.aiScore)}`}>{aiData?.aiScore}</div>
                  <div className="text-xs text-muted-foreground">{aiData?.confidence}% confidence</div>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">AI Prediction</h4>
                <p className="text-sm text-foreground bg-blue-50 p-3 rounded-lg">{aiData?.prediction}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-3">Analysis Factors</h4>
                <div className="space-y-2">
                  {aiData?.factors?.map((factor, idx) => {
                    const [name, percentage] = factor?.split(': ');
                    const value = parseInt(percentage);
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className={`rounded-full h-2 ${getScoreColor(value)?.replace('text-', 'bg-')}`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-8">{percentage}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-foreground mb-1">Data Source</h5>
                <p className="text-xs text-muted-foreground">{aiData?.reasoning}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderComparisonTab = () => {
    const selectedItemsList = Object.entries(selectedItems)?.flatMap(([category, items]) => items);
    
    return (
      <div className="space-y-6">
        {selectedItemsList?.map((itemId) => {
          const expertReview = expertReviews?.[itemId];
          const aiData = aiRecommendations?.[itemId];
          if (!expertReview || !aiData) return null;
          
          const expert = experts?.find(e => e?.id === expertReview?.expertId);
          const scoreDiff = Math.abs(expertReview?.rating * 20 - aiData?.aiScore);
          const agreement = scoreDiff <= 10 ? 'High' : scoreDiff <= 20 ? 'Moderate' : 'Low';
          
          return (
            <div key={itemId} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground capitalize">{itemId?.replace('-', ' ')}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  agreement === 'High' ? 'text-green-600 bg-green-50' :
                  agreement === 'Moderate'? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'
                }`}>
                  {agreement} Agreement
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Expert Opinion */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={expert?.avatar}
                      alt={expert?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{expert?.name}</div>
                      <div className="text-sm text-muted-foreground">Expert Opinion</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Expert Score</span>
                      <span className="text-lg font-bold text-green-600">{expertReview?.rating * 20}/100</span>
                    </div>
                    <div className="text-sm text-green-700">{expertReview?.recommendation}</div>
                  </div>
                  
                  <div className="text-sm text-foreground">{expertReview?.review}</div>
                </div>

                {/* AI Analysis */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Icon name="Brain" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">AI Analysis</div>
                      <div className="text-sm text-muted-foreground">Machine Learning</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">AI Score</span>
                      <span className="text-lg font-bold text-blue-600">{aiData?.aiScore}/100</span>
                    </div>
                    <div className="text-sm text-blue-700">{aiData?.confidence}% Confidence</div>
                  </div>
                  
                  <div className="text-sm text-foreground">{aiData?.prediction}</div>
                </div>
              </div>
              {/* Consensus */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="font-medium text-foreground">Consensus View</span>
                </div>
                <p className="text-sm text-foreground">
                  Both expert and AI analysis show {agreement?.toLowerCase()} agreement on this recommendation. 
                  {agreement === 'High' && ' This indicates a reliable choice with consistent validation.'}
                  {agreement === 'Moderate' && ' Consider additional factors before making final decision.'}
                  {agreement === 'Low' && ' Significant differences suggest need for more research.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Expert Validation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Professional insights and AI analysis for your selections
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="MessageSquare" size={16} className="mr-2" />
          Ask Expert
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('experts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'experts' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="UserCheck" size={16} />
          <span>Expert Reviews</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'ai' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="Brain" size={16} />
          <span>AI Analysis</span>
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'comparison' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name="GitCompare" size={16} />
          <span>Expert vs AI</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'experts' && renderExpertTab()}
      {activeTab === 'ai' && renderAITab()}
      {activeTab === 'comparison' && renderComparisonTab()}
    </div>
  );
};

export default ExpertValidation;
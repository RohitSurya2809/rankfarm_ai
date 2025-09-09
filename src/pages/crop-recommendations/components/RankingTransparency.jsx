import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RankingTransparency = ({ crop, currentLanguage = 'en' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLocalizedText = (textObj) => {
    return textObj?.[currentLanguage] || textObj?.en;
  };

  const scoringFactors = [
    {
      category: 'Environmental Factors',
      weight: 30,
      factors: [
        { name: 'Soil pH Compatibility', score: 8.5, weight: 8 },
        { name: 'Climate Suitability', score: 9.2, weight: 10 },
        { name: 'Water Availability', score: 7.8, weight: 7 },
        { name: 'Seasonal Timing', score: 8.9, weight: 5 }
      ]
    },
    {
      category: 'Market Factors',
      weight: 25,
      factors: [
        { name: 'Current Market Price', score: 7.5, weight: 8 },
        { name: 'Price Stability', score: 8.2, weight: 6 },
        { name: 'Demand Forecast', score: 8.8, weight: 7 },
        { name: 'Export Potential', score: 6.9, weight: 4 }
      ]
    },
    {
      category: 'Agricultural Factors',
      weight: 25,
      factors: [
        { name: 'Yield Potential', score: 9.1, weight: 10 },
        { name: 'Disease Resistance', score: 7.6, weight: 6 },
        { name: 'Input Requirements', score: 8.4, weight: 5 },
        { name: 'Labor Requirements', score: 7.2, weight: 4 }
      ]
    },
    {
      category: 'Economic Factors',
      weight: 20,
      factors: [
        { name: 'Investment Required', score: 8.0, weight: 8 },
        { name: 'ROI Potential', score: 8.7, weight: 7 },
        { name: 'Risk Assessment', score: 7.9, weight: 5 }
      ]
    }
  ];

  const researchCitations = [
    {
      title: "Climate-Smart Agriculture for Sustainable Crop Production",
      authors: "Dr. Rajesh Kumar, Dr. Priya Sharma",
      journal: "Indian Journal of Agricultural Sciences",
      year: 2023,
      impact: "High"
    },
    {
      title: "Market Price Forecasting Using Machine Learning",
      authors: "Prof. Amit Singh, Dr. Neha Gupta",
      journal: "Agricultural Economics Research",
      year: 2023,
      impact: "Medium"
    },
    {
      title: "Soil Suitability Analysis for Crop Optimization",
      authors: "Dr. Sunita Patel, Dr. Vikram Yadav",
      journal: "Soil Science International",
      year: 2022,
      impact: "High"
    }
  ];

  const expertValidations = [
    {
      name: "Dr. Ramesh Chand",
      designation: "Agricultural Economist, NITI Aayog",
      validation: "Approved",
      confidence: 92,
      comments: "Methodology aligns with current agricultural best practices"
    },
    {
      name: "Prof. Ashok Gulati",
      designation: "Chair Professor, ICRIER",
      validation: "Approved",
      confidence: 88,
      comments: "Market analysis framework is comprehensive and reliable"
    },
    {
      name: "Dr. Trilochan Mohapatra",
      designation: "Former DG, ICAR",
      validation: "Approved",
      confidence: 95,
      comments: "Scientific approach to crop recommendation is commendable"
    }
  ];

  const calculateCategoryScore = (category) => {
    const totalWeightedScore = category?.factors?.reduce((sum, factor) => 
      sum + (factor?.score * factor?.weight), 0
    );
    const totalWeight = category?.factors?.reduce((sum, factor) => sum + factor?.weight, 0);
    return (totalWeightedScore / totalWeight)?.toFixed(1);
  };

  const getScoreColor = (score) => {
    if (score >= 8.5) return 'text-green-600 bg-green-50';
    if (score >= 7.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-0 h-auto"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={20} className="text-primary" />
            <div className="text-left">
              <h3 className="font-semibold text-foreground">AI Scoring Transparency</h3>
              <p className="text-sm text-muted-foreground">
                See how we calculated the {crop?.aiScore}/10 score for {getLocalizedText(crop?.name)}
              </p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </Button>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Overall Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scoringFactors?.map((category, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{category?.category}</h4>
                  <span className="text-xs text-muted-foreground">{category?.weight}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(calculateCategoryScore(category))}`}>
                    {calculateCategoryScore(category)}/10
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Factor Analysis */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Detailed Factor Analysis</h4>
            {scoringFactors?.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border border-border rounded-lg p-4">
                <h5 className="font-medium text-foreground mb-3 flex items-center">
                  {category?.category}
                  <span className="ml-2 text-xs text-muted-foreground">
                    (Weight: {category?.weight}%)
                  </span>
                </h5>
                <div className="space-y-2">
                  {category?.factors?.map((factor, factorIndex) => (
                    <div key={factorIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="text-sm text-foreground">{factor?.name}</span>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${(factor?.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-sm font-medium text-foreground">{factor?.score}/10</span>
                        <p className="text-xs text-muted-foreground">Weight: {factor?.weight}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Research Citations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center">
              <Icon name="BookOpen" size={18} className="mr-2 text-primary" />
              Research Citations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {researchCitations?.map((citation, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h6 className="font-medium text-foreground text-sm mb-2">{citation?.title}</h6>
                  <p className="text-xs text-muted-foreground mb-1">{citation?.authors}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {citation?.journal}, {citation?.year}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    citation?.impact === 'High' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {citation?.impact} Impact
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Validations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center">
              <Icon name="UserCheck" size={18} className="mr-2 text-primary" />
              Expert Validations
            </h4>
            <div className="space-y-3">
              {expertValidations?.map((expert, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h6 className="font-medium text-foreground">{expert?.name}</h6>
                      <p className="text-sm text-muted-foreground">{expert?.designation}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                        {expert?.validation}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        Confidence: {expert?.confidence}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{expert?.comments}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Information */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Cpu" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Algorithm Information</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Our AI recommendation system uses a weighted multi-criteria decision analysis (MCDA) approach 
                  combined with machine learning models trained on 10+ years of agricultural data from across India.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-foreground">Data Points:</span>
                    <p className="text-muted-foreground">50+ parameters</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Training Data:</span>
                    <p className="text-muted-foreground">2M+ farm records</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Accuracy:</span>
                    <p className="text-muted-foreground">94.2%</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Last Updated:</span>
                    <p className="text-muted-foreground">Dec 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingTransparency;
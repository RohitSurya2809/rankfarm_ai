import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RankingSliders = ({ onWeightChange, weights }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [presetMode, setPresetMode] = useState('balanced');

  const factors = [
    {
      id: 'cost',
      label: 'Cost Effectiveness',
      description: 'Lower investment and operational costs',
      icon: 'DollarSign',
      color: 'text-green-600'
    },
    {
      id: 'yield',
      label: 'Yield Potential',
      description: 'Expected output and productivity',
      icon: 'TrendingUp',
      color: 'text-blue-600'
    },
    {
      id: 'sustainability',
      label: 'Environmental Impact',
      description: 'Eco-friendly and sustainable practices',
      icon: 'Leaf',
      color: 'text-green-500'
    },
    {
      id: 'risk',
      label: 'Risk Management',
      description: 'Weather and market risk mitigation',
      icon: 'Shield',
      color: 'text-orange-600'
    },
    {
      id: 'speed',
      label: 'Implementation Speed',
      description: 'Quick results and fast adoption',
      icon: 'Zap',
      color: 'text-purple-600'
    },
    {
      id: 'quality',
      label: 'Output Quality',
      description: 'Premium quality and market value',
      icon: 'Star',
      color: 'text-yellow-600'
    }
  ];

  const presets = {
    balanced: {
      name: 'Balanced Approach',
      description: 'Equal weightage to all factors',
      weights: { cost: 50, yield: 50, sustainability: 50, risk: 50, speed: 50, quality: 50 }
    },
    costFocused: {
      name: 'Cost Focused',
      description: 'Prioritize cost-effectiveness',
      weights: { cost: 80, yield: 40, sustainability: 30, risk: 60, speed: 40, quality: 30 }
    },
    yieldMaximizer: {
      name: 'Yield Maximizer',
      description: 'Focus on maximum productivity',
      weights: { cost: 30, yield: 90, sustainability: 40, risk: 50, speed: 60, quality: 70 }
    },
    sustainable: {
      name: 'Sustainable Farming',
      description: 'Environment-first approach',
      weights: { cost: 40, yield: 50, sustainability: 90, risk: 60, speed: 30, quality: 60 }
    },
    riskAverse: {
      name: 'Risk Averse',
      description: 'Minimize risks and uncertainties',
      weights: { cost: 60, yield: 40, sustainability: 50, risk: 90, speed: 30, quality: 50 }
    }
  };

  const handleSliderChange = (factorId, value) => {
    const newWeights = { ...weights, [factorId]: value };
    onWeightChange(newWeights);
  };

  const applyPreset = (presetKey) => {
    setPresetMode(presetKey);
    onWeightChange(presets?.[presetKey]?.weights);
  };

  const resetToDefault = () => {
    applyPreset('balanced');
  };

  const getWeightColor = (weight) => {
    if (weight >= 70) return 'bg-green-500';
    if (weight >= 50) return 'bg-yellow-500';
    if (weight >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTotalWeight = () => {
    return Object.values(weights)?.reduce((sum, weight) => sum + weight, 0);
  };

  const getAverageWeight = () => {
    return Math.round(getTotalWeight() / factors?.length);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Ranking Preferences</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust factor weights to customize your comparison rankings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Average Weight</div>
            <div className="text-lg font-semibold text-foreground">{getAverageWeight()}%</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Quick Presets */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Presets:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {Object.entries(presets)?.map(([key, preset]) => (
            <Button
              key={key}
              variant={presetMode === key ? "default" : "outline"}
              size="sm"
              onClick={() => applyPreset(key)}
              className="text-xs h-auto py-2 px-3"
            >
              <div className="text-center">
                <div className="font-medium">{preset?.name}</div>
                <div className="text-xs opacity-75 mt-1">{preset?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Factor Sliders */}
      <div className={`space-y-6 ${!isExpanded ? 'max-h-96 overflow-hidden' : ''}`}>
        {factors?.map((factor) => (
          <div key={factor?.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${factor?.color}`}>
                  <Icon name={factor?.icon} size={16} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{factor?.label}</div>
                  <div className="text-xs text-muted-foreground">{factor?.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right min-w-[60px]">
                  <div className="text-lg font-semibold text-foreground">{weights?.[factor?.id]}%</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getWeightColor(weights?.[factor?.id])}`} />
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={weights?.[factor?.id]}
                onChange={(e) => handleSliderChange(factor?.id, parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${getWeightColor(weights?.[factor?.id])?.replace('bg-', '#')} 0%, ${getWeightColor(weights?.[factor?.id])?.replace('bg-', '#')} ${weights?.[factor?.id]}%, #e5e7eb ${weights?.[factor?.id]}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low Priority</span>
                <span>High Priority</span>
              </div>
            </div>

            {/* Impact Indicator */}
            <div className="flex items-center space-x-2 text-xs">
              <Icon 
                name={weights?.[factor?.id] >= 70 ? "TrendingUp" : weights?.[factor?.id] >= 30 ? "Minus" : "TrendingDown"} 
                size={12} 
                className={weights?.[factor?.id] >= 70 ? "text-green-600" : weights?.[factor?.id] >= 30 ? "text-yellow-600" : "text-red-600"}
              />
              <span className="text-muted-foreground">
                {weights?.[factor?.id] >= 70 ? "High impact on rankings" : 
                 weights?.[factor?.id] >= 30 ? "Moderate impact on rankings": "Low impact on rankings"}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
        <div className="text-sm text-muted-foreground">
          Total weight: {getTotalWeight()} points across {factors?.length} factors
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={resetToDefault}>
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Reset
          </Button>
          <Button variant="default" size="sm">
            <Icon name="Save" size={16} className="mr-2" />
            Save Preferences
          </Button>
        </div>
      </div>
      {/* Weight Distribution Visualization */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-3">Weight Distribution</h4>
        <div className="flex h-4 rounded-full overflow-hidden bg-muted">
          {factors?.map((factor, index) => (
            <div
              key={factor?.id}
              className={`${factor?.color?.replace('text-', 'bg-')} transition-all duration-300`}
              style={{ width: `${(weights?.[factor?.id] / getTotalWeight()) * 100}%` }}
              title={`${factor?.label}: ${weights?.[factor?.id]}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {factors?.map((factor) => (
            <div key={factor?.id} className="flex items-center space-x-1 text-xs">
              <div className={`w-2 h-2 rounded-full ${factor?.color?.replace('text-', 'bg-')}`} />
              <span className="text-muted-foreground">{factor?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #16a34a;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default RankingSliders;
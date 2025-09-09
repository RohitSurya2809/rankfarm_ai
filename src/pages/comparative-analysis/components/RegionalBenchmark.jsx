import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalBenchmark = ({ selectedItems }) => {
  const [activeRegion, setActiveRegion] = useState('punjab');
  const [viewMode, setViewMode] = useState('performance');

  const regions = [
    { id: 'punjab', name: 'Punjab', farmers: 1250, avgYield: 42 },
    { id: 'haryana', name: 'Haryana', farmers: 980, avgYield: 38 },
    { id: 'up', name: 'Uttar Pradesh', farmers: 2100, avgYield: 35 },
    { id: 'mp', name: 'Madhya Pradesh', farmers: 1680, avgYield: 33 },
    { id: 'rajasthan', name: 'Rajasthan', farmers: 890, avgYield: 28 }
  ];

  const mockBenchmarkData = {
    punjab: {
      topPerformers: [
        {
          name: 'Wheat (HD-2967) + Urea',
          farmers: 450,
          avgYield: 48,
          avgROI: 152,
          successRate: 94,
          avgCost: 28000,
          trend: 'up'
        },
        {
          name: 'Rice (Basmati) + DAP',
          farmers: 320,
          avgYield: 42,
          avgROI: 138,
          successRate: 89,
          avgCost: 35000,
          trend: 'stable'
        },
        {
          name: 'Cotton (Bt) + NPK',
          farmers: 280,
          avgYield: 38,
          avgROI: 145,
          successRate: 87,
          avgCost: 32000,
          trend: 'up'
        }
      ],
      yourRanking: {
        position: 12,
        percentile: 85,
        avgYield: 45,
        avgROI: 148,
        improvement: '+8%'
      },
      seasonalTrends: [
        { month: 'Jan', yield: 35, roi: 120 },
        { month: 'Feb', yield: 38, roi: 125 },
        { month: 'Mar', yield: 42, roi: 135 },
        { month: 'Apr', yield: 45, roi: 145 },
        { month: 'May', yield: 48, roi: 152 },
        { month: 'Jun', yield: 46, roi: 148 }
      ]
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: 'TrendingUp', color: 'text-green-600' };
      case 'down': return { icon: 'TrendingDown', color: 'text-red-600' };
      default: return { icon: 'Minus', color: 'text-yellow-600' };
    }
  };

  const getPerformanceColor = (value, max) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const renderPerformanceView = () => {
    const data = mockBenchmarkData?.[activeRegion];
    
    return (
      <div className="space-y-6">
        {/* Your Position */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Regional Position</h3>
              <p className="text-sm text-muted-foreground">Based on selected combinations</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">#{data?.yourRanking?.position}</div>
              <div className="text-sm text-muted-foreground">out of {regions?.find(r => r?.id === activeRegion)?.farmers}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{data?.yourRanking?.percentile}th</div>
              <div className="text-xs text-muted-foreground">Percentile</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{data?.yourRanking?.avgYield} q/ha</div>
              <div className="text-xs text-muted-foreground">Avg Yield</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{data?.yourRanking?.avgROI}%</div>
              <div className="text-xs text-muted-foreground">Avg ROI</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{data?.yourRanking?.improvement}</div>
              <div className="text-xs text-muted-foreground">vs Last Season</div>
            </div>
          </div>
        </div>
        {/* Top Regional Performers */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Regional Combinations</h3>
          <div className="space-y-4">
            {data?.topPerformers?.map((performer, index) => {
              const trend = getTrendIcon(performer?.trend);
              const rank = index + 1;
              const rankColor = rank === 1 ? 'text-yellow-600 bg-yellow-50' : 
                               rank === 2 ? 'text-gray-600 bg-gray-50': 'text-orange-600 bg-orange-50';
              
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full ${rankColor} flex items-center justify-center text-sm font-bold`}>
                      {rank}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{performer?.name}</div>
                      <div className="text-sm text-muted-foreground">{performer?.farmers} farmers using this</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-foreground">{performer?.avgYield} q/ha</div>
                      <div className="text-xs text-muted-foreground">Yield</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-600">{performer?.avgROI}%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-foreground">{performer?.successRate}%</div>
                      <div className="text-xs text-muted-foreground">Success</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-foreground">₹{performer?.avgCost?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Avg Cost</div>
                    </div>
                    <Icon name={trend?.icon} size={16} className={trend?.color} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Performance Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Regional Performance Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="40" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="6" 
                    className="text-green-500"
                    strokeDasharray={`${(data?.yourRanking?.percentile / 100) * 251.33} 251.33`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{data?.yourRanking?.percentile}%</span>
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">Your Percentile</div>
              <div className="text-xs text-muted-foreground">Better than {data?.yourRanking?.percentile}% farmers</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Top 10%</span>
                <span className="text-sm font-semibold text-green-600">125 farmers</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '10%' }} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Top 25%</span>
                <span className="text-sm font-semibold text-yellow-600">312 farmers</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-500 rounded-full h-2" style={{ width: '25%' }} />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Average</span>
                <span className="text-sm font-semibold text-muted-foreground">625 farmers</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-muted-foreground rounded-full h-2" style={{ width: '50%' }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">₹48,500</div>
                <div className="text-xs text-green-600">Top 10% Avg Profit</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">₹42,200</div>
                <div className="text-xs text-yellow-600">Your Avg Profit</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-muted-foreground">₹35,800</div>
                <div className="text-xs text-muted-foreground">Regional Average</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Regional Benchmark</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Compare your selections with regional farming performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={activeRegion}
            onChange={(e) => setActiveRegion(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
          >
            {regions?.map((region) => (
              <option key={region?.id} value={region?.id}>
                {region?.name} ({region?.farmers} farmers)
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Icon name="MapPin" size={16} className="mr-2" />
            Change Region
          </Button>
        </div>
      </div>
      {renderPerformanceView()}
      {/* Improvement Suggestions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Improvement Suggestions</h4>
            <p className="text-sm text-blue-700 mt-1">
              Based on top performers in {regions?.find(r => r?.id === activeRegion)?.name}, consider:
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Switch to HD-2967 wheat variety for 15% higher yield</li>
              <li>• Optimize fertilizer timing for better ROI</li>
              <li>• Join local farmer groups for bulk purchasing discounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalBenchmark;
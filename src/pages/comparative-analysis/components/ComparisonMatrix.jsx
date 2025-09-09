import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonMatrix = ({ selectedItems, comparisonData }) => {
  const [activeView, setActiveView] = useState('overview');
  const [sortBy, setSortBy] = useState('overall');

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutGrid' },
    { id: 'financial', label: 'Financial', icon: 'DollarSign' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'sustainability', label: 'Sustainability', icon: 'Leaf' }
  ];

  const getRankingBadge = (rank) => {
    if (rank === 1) return { icon: '🥇', color: 'text-yellow-600 bg-yellow-50', label: 'Gold' };
    if (rank === 2) return { icon: '🥈', color: 'text-gray-600 bg-gray-50', label: 'Silver' };
    if (rank === 3) return { icon: '🥉', color: 'text-orange-600 bg-orange-50', label: 'Bronze' };
    return { icon: rank?.toString(), color: 'text-muted-foreground bg-muted', label: `Rank ${rank}` };
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const mockComparisonData = {
    crops: {
      'wheat-hd2967': {
        name: 'Wheat (HD-2967)',
        overall: { rank: 1, score: 92, confidence: 95 },
        financial: { cost: 25000, roi: 145, profit: 45000 },
        performance: { yield: 45, success: 92, duration: 120 },
        sustainability: { water: 85, soil: 90, organic: 70 },
        pros: ['High yield potential', 'Disease resistant', 'Market demand'],
        cons: ['Water intensive', 'Requires quality seeds']
      },
      'rice-basmati': {
        name: 'Rice (Basmati)',
        overall: { rank: 2, score: 88, confidence: 90 },
        financial: { cost: 30000, roi: 135, profit: 40500 },
        performance: { yield: 38, success: 88, duration: 140 },
        sustainability: { water: 60, soil: 85, organic: 80 },
        pros: ['Premium pricing', 'Export potential', 'Brand value'],
        cons: ['High water requirement', 'Longer duration']
      }
    },
    fertilizers: {
      'urea-46': {
        name: 'Urea (46% N)',
        overall: { rank: 1, score: 89, confidence: 92 },
        financial: { cost: 1200, roi: 180, profit: 2160 },
        performance: { effectiveness: 90, speed: 85, coverage: 95 },
        sustainability: { water: 70, soil: 65, organic: 40 },
        pros: ['High nitrogen content', 'Quick results', 'Cost effective'],
        cons: ['Soil acidification', 'Leaching risk']
      },
      'organic-compost': {
        name: 'Organic Compost',
        overall: { rank: 2, score: 85, confidence: 88 },
        financial: { cost: 800, roi: 120, profit: 960 },
        performance: { effectiveness: 75, speed: 60, coverage: 80 },
        sustainability: { water: 95, soil: 98, organic: 100 },
        pros: ['Soil health improvement', 'Long-term benefits', 'Eco-friendly'],
        cons: ['Slower results', 'Bulky application']
      }
    }
  };

  const getAllItems = () => {
    const items = [];
    Object.entries(selectedItems)?.forEach(([category, itemIds]) => {
      itemIds?.forEach(itemId => {
        if (mockComparisonData?.[category] && mockComparisonData?.[category]?.[itemId]) {
          items?.push({
            id: itemId,
            category,
            ...mockComparisonData?.[category]?.[itemId]
          });
        }
      });
    });
    return items?.sort((a, b) => a?.overall?.rank - b?.overall?.rank);
  };

  const renderOverviewView = () => {
    const items = getAllItems();
    
    return (
      <div className="space-y-6">
        {items?.map((item, index) => {
          const badge = getRankingBadge(item?.overall?.rank);
          return (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${badge?.color} flex items-center justify-center text-lg font-bold`}>
                    {badge?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item?.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{item?.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">{item?.overall?.score}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(item?.overall?.confidence)}`}>
                    {item?.overall?.confidence}% confidence
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Investment</div>
                  <div className="text-lg font-semibold text-foreground">₹{item?.financial?.cost?.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Expected ROI</div>
                  <div className="text-lg font-semibold text-green-600">{item?.financial?.roi}%</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Profit Potential</div>
                  <div className="text-lg font-semibold text-foreground">₹{item?.financial?.profit?.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">Advantages</h4>
                  <ul className="space-y-1">
                    {item?.pros?.map((pro, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-foreground">
                        <Icon name="Check" size={14} className="text-green-600" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Considerations</h4>
                  <ul className="space-y-1">
                    {item?.cons?.map((con, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-foreground">
                        <Icon name="AlertTriangle" size={14} className="text-red-600" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderFinancialView = () => {
    const items = getAllItems();
    
    return (
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Item</th>
                <th className="text-right p-4 font-medium text-foreground">Investment</th>
                <th className="text-right p-4 font-medium text-foreground">ROI %</th>
                <th className="text-right p-4 font-medium text-foreground">Profit</th>
                <th className="text-center p-4 font-medium text-foreground">Rank</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => {
                const badge = getRankingBadge(item?.overall?.rank);
                return (
                  <tr key={item?.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={item?.category === 'crops' ? 'Wheat' : item?.category === 'fertilizers' ? 'Beaker' : 'Bug'} size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{item?.name}</div>
                          <div className="text-sm text-muted-foreground capitalize">{item?.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium text-foreground">₹{item?.financial?.cost?.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <span className="text-green-600 font-semibold">{item?.financial?.roi}%</span>
                    </td>
                    <td className="p-4 text-right font-medium text-foreground">₹{item?.financial?.profit?.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${badge?.color} text-sm font-bold`}>
                        {badge?.icon}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPerformanceView = () => {
    const items = getAllItems();
    
    return (
      <div className="space-y-6">
        {items?.map((item) => {
          const badge = getRankingBadge(item?.overall?.rank);
          return (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${badge?.color} flex items-center justify-center text-lg font-bold`}>
                    {badge?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item?.name}</h3>
                    <p className="text-sm text-muted-foreground">Performance Metrics</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-foreground">{item?.overall?.score}/100</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(item?.performance)?.map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground capitalize">{key}</span>
                      <span className="text-sm font-semibold text-foreground">{value}{key === 'duration' ? ' days' : key === 'yield' ? ' q/ha' : '%'}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-300"
                        style={{ width: `${key === 'duration' ? (value / 180) * 100 : value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSustainabilityView = () => {
    const items = getAllItems();
    
    return (
      <div className="space-y-6">
        {items?.map((item) => {
          const badge = getRankingBadge(item?.overall?.rank);
          const avgSustainability = Math.round((item?.sustainability?.water + item?.sustainability?.soil + item?.sustainability?.organic) / 3);
          
          return (
            <div key={item?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${badge?.color} flex items-center justify-center text-lg font-bold`}>
                    {badge?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item?.name}</h3>
                    <p className="text-sm text-muted-foreground">Environmental Impact</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">{avgSustainability}/100</div>
                  <div className="text-xs text-muted-foreground">Eco Score</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        className="text-blue-500"
                        strokeDasharray={`${(item?.sustainability?.water / 100) * 175.93} 175.93`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{item?.sustainability?.water}%</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground">Water Efficiency</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        className="text-amber-500"
                        strokeDasharray={`${(item?.sustainability?.soil / 100) * 175.93} 175.93`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{item?.sustainability?.soil}%</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground">Soil Health</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        className="text-green-500"
                        strokeDasharray={`${(item?.sustainability?.organic / 100) * 175.93} 175.93`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{item?.sustainability?.organic}%</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground">Organic Rating</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'financial': return renderFinancialView();
      case 'performance': return renderPerformanceView();
      case 'sustainability': return renderSustainabilityView();
      default: return renderOverviewView();
    }
  };

  if (getAllItems()?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Items Selected</h3>
        <p className="text-muted-foreground">
          Select items from the categories above to start comparing their performance, costs, and benefits.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {viewOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => setActiveView(option?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === option?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>

        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export Report
        </Button>
      </div>
      {/* Comparison Content */}
      {renderContent()}
    </div>
  );
};

export default ComparisonMatrix;
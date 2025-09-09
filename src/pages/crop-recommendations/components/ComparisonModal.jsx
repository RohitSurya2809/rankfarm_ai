import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonModal = ({ 
  isOpen, 
  onClose, 
  selectedCrops, 
  onRemoveCrop,
  currentLanguage = 'en' 
}) => {
  if (!isOpen) return null;

  const getLocalizedText = (textObj) => {
    return textObj?.[currentLanguage] || textObj?.en;
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getWinner = (crops, metric) => {
    if (!crops?.length) return null;
    
    switch (metric) {
      case 'successProbability': case'expectedROI': case'aiScore': case'soilSuitability':
        return crops?.reduce((max, crop) => crop?.[metric] > max?.[metric] ? crop : max);
      case 'growthPeriod':
        return crops?.reduce((min, crop) => crop?.[metric] < min?.[metric] ? crop : min);
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <h2 className="text-xl font-bold text-foreground">Crop Comparison</h2>
            <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {selectedCrops?.length} crops selected
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {selectedCrops?.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No crops selected</h3>
              <p className="text-muted-foreground">Select crops from the recommendations to compare them here.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCrops?.map((crop, index) => (
                  <div key={crop?.id} className="relative bg-card border border-border rounded-lg p-4">
                    <button
                      onClick={() => onRemoveCrop(crop?.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src={crop?.image}
                        alt={getLocalizedText(crop?.name)}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{getLocalizedText(crop?.name)}</h4>
                        <p className="text-sm text-muted-foreground">{getLocalizedText(crop?.category)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <span className="text-sm font-medium text-primary">{crop?.successProbability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expected ROI</span>
                        <span className="text-sm font-medium">₹{crop?.expectedROI?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Comparison Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">Detailed Comparison</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium text-foreground">Metric</th>
                        {selectedCrops?.map((crop) => (
                          <th key={crop?.id} className="text-center p-4 font-medium text-foreground min-w-[150px]">
                            {getLocalizedText(crop?.name)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {/* Success Probability */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Success Probability</td>
                        {selectedCrops?.map((crop) => {
                          const winner = getWinner(selectedCrops, 'successProbability');
                          const isWinner = winner && winner?.id === crop?.id;
                          return (
                            <td key={crop?.id} className={`text-center p-4 ${isWinner ? 'bg-green-50 text-green-700 font-bold' : ''}`}>
                              {crop?.successProbability}%
                                                            {isWinner && <Icon name="Crown" size={16} className="inline ml-1 text-yellow-500" />}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Expected ROI */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Expected ROI</td>
                        {selectedCrops?.map((crop) => {
                          const winner = getWinner(selectedCrops, 'expectedROI');
                          const isWinner = winner && winner?.id === crop?.id;
                          return (
                            <td key={crop?.id} className={`text-center p-4 ${isWinner ? 'bg-green-50 text-green-700 font-bold' : ''}`}>₹{crop?.expectedROI?.toLocaleString('en-IN')}
                              {isWinner && <Icon name="Crown" size={16} className="inline ml-1 text-yellow-500" />}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Growth Period */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Growth Period</td>
                        {selectedCrops?.map((crop) => {
                          const winner = getWinner(selectedCrops, 'growthPeriod');
                          const isWinner = winner && winner?.id === crop?.id;
                          return (
                            <td key={crop?.id} className={`text-center p-4 ${isWinner ? 'bg-green-50 text-green-700 font-bold' : ''}`}>
                              {crop?.growthPeriod}days
                                                            {isWinner && <Icon name="Crown" size={16} className="inline ml-1 text-yellow-500" />}
                            </td>
                          );
                        })}
                      </tr>

                      {/* AI Score */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">AI Score</td>
                        {selectedCrops?.map((crop) => {
                          const winner = getWinner(selectedCrops, 'aiScore');
                          const isWinner = winner && winner?.id === crop?.id;
                          return (
                            <td key={crop?.id} className={`text-center p-4 ${isWinner ? 'bg-green-50 text-green-700 font-bold' : ''}`}>
                              {crop?.aiScore}/10
                                                            {isWinner && <Icon name="Crown" size={16} className="inline ml-1 text-yellow-500" />}
                            </td>
                          );
                        })}
                      </tr>

                      {/* Risk Level */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Risk Level</td>
                        {selectedCrops?.map((crop) => (
                          <td key={crop?.id} className="text-center p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(crop?.riskLevel)}`}>
                              {crop?.riskLevel}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Soil Suitability */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Soil Suitability</td>
                        {selectedCrops?.map((crop) => {
                          const winner = getWinner(selectedCrops, 'soilSuitability');
                          const isWinner = winner && winner?.id === crop?.id;
                          return (
                            <td key={crop?.id} className={`text-center p-4 ${isWinner ? 'bg-green-50 text-green-700 font-bold' : ''}`}>
                              <div className="flex items-center justify-center space-x-1">
                                {[...Array(5)]?.map((_, i) => (
                                  <Icon
                                    key={i}
                                    name="Star"
                                    size={14}
                                    className={i < crop?.soilSuitability ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                  />
                                ))}
                                {isWinner && <Icon name="Crown" size={16} className="ml-1 text-yellow-500" />}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* Water Requirement */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Water Requirement</td>
                        {selectedCrops?.map((crop) => (
                          <td key={crop?.id} className="text-center p-4">
                            {crop?.waterRequirement}
                          </td>
                        ))}
                      </tr>

                      {/* Market Price */}
                      <tr>
                        <td className="p-4 font-medium text-foreground">Market Price</td>
                        {selectedCrops?.map((crop) => (
                          <td key={crop?.id} className="text-center p-4">
                            <div className="flex items-center justify-center space-x-1">
                              <span>₹{crop?.marketPrice}/kg</span>
                              <Icon 
                                name={crop?.pricetrend === 'up' ? 'TrendingUp' : crop?.pricetrend === 'down' ? 'TrendingDown' : 'Minus'} 
                                size={14} 
                                className={crop?.pricetrend === 'up' ? 'text-green-500' : crop?.pricetrend === 'down' ? 'text-red-500' : 'text-gray-500'} 
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendation */}
              {selectedCrops?.length > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">AI Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on the comparison, <strong>{getLocalizedText(getWinner(selectedCrops, 'successProbability')?.name)}</strong> shows 
                        the highest success probability at {getWinner(selectedCrops, 'successProbability')?.successProbability}%, 
                        while <strong>{getLocalizedText(getWinner(selectedCrops, 'expectedROI')?.name)}</strong> offers 
                        the best ROI potential of ₹{getWinner(selectedCrops, 'expectedROI')?.expectedROI?.toLocaleString('en-IN')}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
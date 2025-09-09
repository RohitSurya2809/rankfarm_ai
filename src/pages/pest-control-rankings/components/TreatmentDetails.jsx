import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TreatmentDetails = ({ treatment, onClose }) => {
  if (!treatment) return null;

  const getRiskLevel = (score) => {
    if (score >= 80) return { label: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 60) return { label: 'Medium Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { label: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const riskLevel = getRiskLevel(treatment?.safetyScore);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{treatment?.name}</h2>
            <p className="text-muted-foreground">{treatment?.category}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{treatment?.controlRate}%</div>
              <div className="text-sm text-muted-foreground">Control Rate</div>
            </div>
            <div className="bg-success/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-success">₹{treatment?.costPerAcre}</div>
              <div className="text-sm text-muted-foreground">Cost/Acre</div>
            </div>
            <div className="bg-warning/5 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-warning">{treatment?.actionTime}</div>
              <div className="text-sm text-muted-foreground">Action Time</div>
            </div>
            <div className={`${riskLevel?.bgColor} p-4 rounded-lg text-center`}>
              <div className={`text-2xl font-bold ${riskLevel?.color}`}>{treatment?.safetyScore}</div>
              <div className="text-sm text-muted-foreground">Safety Score</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{treatment?.detailedDescription}</p>
          </div>

          {/* Application Method */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Application Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Droplets" size={20} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium mb-2">{treatment?.applicationMethod?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{treatment?.applicationMethod?.description}</p>
                  <div className="space-y-2">
                    {treatment?.applicationMethod?.steps?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Precautions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Safety Precautions</h3>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-red-600 mt-1" />
                <div className="space-y-2">
                  {treatment?.safetyPrecautions?.map((precaution, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Dot" size={16} className="text-red-600 mt-1" />
                      <span className="text-sm text-red-800">{precaution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Target Pests */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Target Pests</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {treatment?.targetPests?.map((pest, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Icon name="Bug" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">{pest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Compatibility</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-600 mb-2 flex items-center space-x-2">
                  <Icon name="Check" size={16} />
                  <span>Compatible With</span>
                </h4>
                <div className="space-y-1">
                  {treatment?.compatibility?.compatible?.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Icon name="Dot" size={12} className="text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-red-600 mb-2 flex items-center space-x-2">
                  <Icon name="X" size={16} />
                  <span>Not Compatible With</span>
                </h4>
                <div className="space-y-1">
                  {treatment?.compatibility?.incompatible?.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Icon name="Dot" size={12} className="text-red-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Success Stories</h3>
            <div className="space-y-4">
              {treatment?.successStories?.map((story, index) => (
                <div key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{story?.farmerName}</h4>
                        <span className="text-sm text-muted-foreground">• {story?.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{story?.testimonial}</p>
                      <div className="flex items-center space-x-4 text-xs text-green-600">
                        <span>Success Rate: {story?.successRate}%</span>
                        <span>Farm Size: {story?.farmSize} acres</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button variant="default" className="flex-1">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Add to Treatment Plan
            </Button>
            <Button variant="outline" className="flex-1">
              <Icon name="Share2" size={16} className="mr-2" />
              Share with Expert
            </Button>
            <Button variant="ghost" className="flex-1">
              <Icon name="BookOpen" size={16} className="mr-2" />
              View Research
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetails;
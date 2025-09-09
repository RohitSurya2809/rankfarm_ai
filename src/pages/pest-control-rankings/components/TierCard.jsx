import React from 'react';
import Icon from '../../../components/AppIcon';


const TierCard = ({ tier, treatments, onTreatmentSelect, selectedTreatment }) => {
  const getTierConfig = (tierNumber) => {
    switch (tierNumber) {
      case 1:
        return {
          title: 'Tier 1 - Immediate Solutions',
          description: 'Fast-acting treatments for active infestations',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: 'Zap'
        };
      case 2:
        return {
          title: 'Tier 2 - Preventive Measures',
          description: 'Balanced approach for ongoing protection',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          icon: 'Shield'
        };
      case 3:
        return {
          title: 'Tier 3 - Long-term Management',
          description: 'Sustainable solutions for ecosystem health',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: 'TreePine'
        };
      default:
        return {
          title: 'Treatment Tier',
          description: 'Pest control solutions',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: 'Bug'
        };
    }
  };

  const config = getTierConfig(tier);

  return (
    <div className={`${config?.bgColor} ${config?.borderColor} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${config?.bgColor} rounded-lg border ${config?.borderColor}`}>
            <Icon name={config?.icon} size={24} className={config?.color} />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${config?.color}`}>{config?.title}</h3>
            <p className="text-sm text-muted-foreground">{config?.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{treatments?.length}</div>
          <div className="text-xs text-muted-foreground">Options</div>
        </div>
      </div>
      <div className="space-y-3">
        {treatments?.map((treatment) => (
          <div
            key={treatment?.id}
            className={`p-4 bg-white rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
              selectedTreatment?.id === treatment?.id
                ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTreatmentSelect(treatment)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-foreground">{treatment?.name}</h4>
                  {treatment?.isOrganic && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Organic
                    </span>
                  )}
                  {treatment?.isRecommended && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{treatment?.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Control Rate</div>
                    <div className="font-semibold text-success">{treatment?.controlRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Safety Rating</div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < treatment?.safetyRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Cost: </span>
                    <span className="font-semibold text-foreground">₹{treatment?.costPerAcre}/acre</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Action Time: </span>
                    <span className="font-semibold text-foreground">{treatment?.actionTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="ml-4 flex flex-col items-center">
                <div className="text-2xl font-bold text-primary">{treatment?.rank}</div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierCard;
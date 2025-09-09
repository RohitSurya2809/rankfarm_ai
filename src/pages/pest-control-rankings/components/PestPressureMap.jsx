import React from 'react';
import Icon from '../../../components/AppIcon';

const PestPressureMap = ({ selectedRegion, onRegionSelect }) => {
  const regions = [
    {
      id: 'north',
      name: 'Northern Plains',
      pestPressure: 'High',
      majorPests: ['Aphids', 'Bollworm', 'Whitefly'],
      riskLevel: 85,
      coordinates: { top: '20%', left: '45%' }
    },
    {
      id: 'west',
      name: 'Western Regions',
      pestPressure: 'Medium',
      majorPests: ['Thrips', 'Mites', 'Cutworm'],
      riskLevel: 65,
      coordinates: { top: '40%', left: '25%' }
    },
    {
      id: 'central',
      name: 'Central India',
      pestPressure: 'High',
      majorPests: ['Stem Borer', 'Leaf Folder', 'Brown Plant Hopper'],
      riskLevel: 78,
      coordinates: { top: '45%', left: '50%' }
    },
    {
      id: 'east',
      name: 'Eastern States',
      pestPressure: 'Medium',
      majorPests: ['Yellow Stem Borer', 'Gall Midge', 'Leaf Blast'],
      riskLevel: 62,
      coordinates: { top: '50%', left: '70%' }
    },
    {
      id: 'south',
      name: 'Southern Peninsula',
      pestPressure: 'Low',
      majorPests: ['Fruit Fly', 'Scale Insects', 'Leaf Miner'],
      riskLevel: 45,
      coordinates: { top: '70%', left: '55%' }
    }
  ];

  const getRiskColor = (riskLevel) => {
    if (riskLevel >= 80) return 'bg-red-500';
    if (riskLevel >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskTextColor = (riskLevel) => {
    if (riskLevel >= 80) return 'text-red-600';
    if (riskLevel >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Regional Pest Pressure</h3>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Visualization */}
        <div className="relative">
          <div className="w-full h-80 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg border border-gray-200 relative overflow-hidden">
            {/* India Map Outline (Simplified) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <path
                d="M20,20 L80,20 L85,30 L80,40 L75,50 L80,60 L75,70 L70,80 L30,80 L25,70 L20,60 L15,50 L20,40 L15,30 Z"
                fill="rgba(34, 197, 94, 0.1)"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="0.5"
              />
            </svg>

            {/* Region Markers */}
            {regions?.map((region) => (
              <div
                key={region?.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ top: region?.coordinates?.top, left: region?.coordinates?.left }}
                onClick={() => onRegionSelect(region)}
              >
                <div className={`w-4 h-4 ${getRiskColor(region?.riskLevel)} rounded-full border-2 border-white shadow-lg animate-pulse`}></div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                  {region?.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Region Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Regional Analysis</h4>
          
          {selectedRegion ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-foreground">{selectedRegion?.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskTextColor(selectedRegion?.riskLevel)} bg-white`}>
                  {selectedRegion?.pestPressure} Risk
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getRiskColor(selectedRegion?.riskLevel)}`}
                        style={{ width: `${selectedRegion?.riskLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedRegion?.riskLevel}%</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Major Pests</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegion?.majorPests?.map((pest, index) => (
                      <span key={index} className="px-2 py-1 bg-white text-xs font-medium rounded border">
                        {pest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="MapPin" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Click on a region to view detailed pest pressure information</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-red-600">
                {regions?.filter(r => r?.riskLevel >= 80)?.length}
              </div>
              <div className="text-xs text-red-600">High Risk Regions</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-yellow-600">
                {regions?.filter(r => r?.riskLevel >= 60 && r?.riskLevel < 80)?.length}
              </div>
              <div className="text-xs text-yellow-600">Medium Risk Regions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestPressureMap;
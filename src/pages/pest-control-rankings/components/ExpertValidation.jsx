import React from 'react';
import Icon from '../../../components/AppIcon';


const ExpertValidation = ({ validations }) => {
  const getValidationIcon = (type) => {
    switch (type) {
      case 'university':
        return 'GraduationCap';
      case 'government':
        return 'Shield';
      case 'research':
        return 'Microscope';
      case 'industry':
        return 'Building';
      default:
        return 'Award';
    }
  };

  const getValidationColor = (type) => {
    switch (type) {
      case 'university':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'government':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'research':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'industry':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Award" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Expert Validations</h3>
        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          {validations?.length} Endorsements
        </span>
      </div>
      <div className="space-y-4">
        {validations?.map((validation, index) => (
          <div key={index} className={`border rounded-lg p-4 ${getValidationColor(validation?.type)}`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                  <Icon name={getValidationIcon(validation?.type)} size={20} />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{validation?.organization}</h4>
                    <p className="text-sm text-muted-foreground">{validation?.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < validation?.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {validation?.validatedDate}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{validation?.endorsement}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{validation?.studiesCount} Studies</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} />
                      <span>{validation?.successRate}% Success</span>
                    </span>
                  </div>
                  
                  {validation?.certificationUrl && (
                    <a
                      href={validation?.certificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center space-x-1"
                    >
                      <Icon name="ExternalLink" size={12} />
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Score */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">Overall Trust Score</h4>
          <div className="text-2xl font-bold text-primary">
            {Math.round(validations?.reduce((acc, v) => acc + v?.rating, 0) / validations?.length * 20)}%
          </div>
        </div>
        
        <div className="flex-1 bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-primary to-success"
            style={{ 
              width: `${Math.round(validations?.reduce((acc, v) => acc + v?.rating, 0) / validations?.length * 20)}%` 
            }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Based on {validations?.length} expert validations</span>
          <span>Last updated: {new Date()?.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpertValidation;
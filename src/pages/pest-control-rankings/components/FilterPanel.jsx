import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onResetFilters, isOpen, onToggle }) => {
  const treatmentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'organic', label: 'Organic Only' },
    { value: 'conventional', label: 'Conventional Only' },
    { value: 'biological', label: 'Biological Control' },
    { value: 'chemical', label: 'Chemical Treatment' }
  ];

  const budgetOptions = [
    { value: 'all', label: 'All Budgets' },
    { value: 'low', label: 'Under ₹500/acre' },
    { value: 'medium', label: '₹500-1500/acre' },
    { value: 'high', label: 'Above ₹1500/acre' }
  ];

  const speedOptions = [
    { value: 'all', label: 'Any Speed' },
    { value: 'immediate', label: 'Immediate (1-3 days)' },
    { value: 'fast', label: 'Fast (3-7 days)' },
    { value: 'moderate', label: 'Moderate (1-2 weeks)' },
    { value: 'slow', label: 'Long-term (2+ weeks)' }
  ];

  const safetyLevelOptions = [
    { value: 'all', label: 'All Safety Levels' },
    { value: 'high', label: 'High Safety (80+)' },
    { value: 'medium', label: 'Medium Safety (60-79)' },
    { value: 'low', label: 'Low Safety (Below 60)' }
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-lg transition-all duration-300 ${isOpen ? 'p-6' : 'p-4'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Filters</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={20} />
        </Button>
      </div>
      {isOpen && (
        <div className="space-y-6">
          {/* Treatment Type */}
          <div>
            <Select
              label="Treatment Type"
              options={treatmentTypeOptions}
              value={filters?.treatmentType}
              onChange={(value) => onFilterChange('treatmentType', value)}
              className="w-full"
            />
          </div>

          {/* Budget Range */}
          <div>
            <Select
              label="Budget Range"
              options={budgetOptions}
              value={filters?.budget}
              onChange={(value) => onFilterChange('budget', value)}
              className="w-full"
            />
          </div>

          {/* Action Speed */}
          <div>
            <Select
              label="Action Speed"
              options={speedOptions}
              value={filters?.speed}
              onChange={(value) => onFilterChange('speed', value)}
              className="w-full"
            />
          </div>

          {/* Safety Level */}
          <div>
            <Select
              label="Safety Level"
              options={safetyLevelOptions}
              value={filters?.safetyLevel}
              onChange={(value) => onFilterChange('safetyLevel', value)}
              className="w-full"
            />
          </div>

          {/* Additional Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Additional Options</h4>
            
            <Checkbox
              label="Show only recommended treatments"
              checked={filters?.onlyRecommended}
              onChange={(e) => onFilterChange('onlyRecommended', e?.target?.checked)}
            />
            
            <Checkbox
              label="Include preventive measures"
              checked={filters?.includePreventive}
              onChange={(e) => onFilterChange('includePreventive', e?.target?.checked)}
            />
            
            <Checkbox
              label="Compatible with organic farming"
              checked={filters?.organicCompatible}
              onChange={(e) => onFilterChange('organicCompatible', e?.target?.checked)}
            />
            
            <Checkbox
              label="Show expert validated only"
              checked={filters?.expertValidated}
              onChange={(e) => onFilterChange('expertValidated', e?.target?.checked)}
            />
          </div>

          {/* Control Rate Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Control Rate: {filters?.minControlRate}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={filters?.minControlRate}
              onChange={(e) => onFilterChange('minControlRate', parseInt(e?.target?.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onResetFilters} className="flex-1">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Reset
            </Button>
            <Button variant="default" onClick={onToggle} className="flex-1">
              <Icon name="Check" size={16} className="mr-2" />
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  currentLanguage = 'en' 
}) => {
  const farmSizeOptions = [
    { value: 'all', label: 'All Farm Sizes' },
    { value: 'small', label: 'Small (< 2 acres)' },
    { value: 'medium', label: 'Medium (2-10 acres)' },
    { value: 'large', label: 'Large (> 10 acres)' }
  ];

  const budgetOptions = [
    { value: 'all', label: 'All Budgets' },
    { value: 'low', label: 'Low (< ₹50,000)' },
    { value: 'medium', label: 'Medium (₹50,000 - ₹2,00,000)' },
    { value: 'high', label: 'High (> ₹2,00,000)' }
  ];

  const riskOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ];

  const seasonOptions = [
    { value: 'all', label: 'All Seasons' },
    { value: 'kharif', label: 'Kharif (Monsoon)' },
    { value: 'rabi', label: 'Rabi (Winter)' },
    { value: 'zaid', label: 'Zaid (Summer)' }
  ];

  const soilTypeOptions = [
    { value: 'all', label: 'All Soil Types' },
    { value: 'clay', label: 'Clay Soil' },
    { value: 'sandy', label: 'Sandy Soil' },
    { value: 'loamy', label: 'Loamy Soil' },
    { value: 'black', label: 'Black Soil' },
    { value: 'red', label: 'Red Soil' }
  ];

  const handleSliderChange = (key, value) => {
    onFilterChange(key, parseInt(value));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Smart Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Farm Size"
          options={farmSizeOptions}
          value={filters?.farmSize}
          onChange={(value) => onFilterChange('farmSize', value)}
        />
        
        <Select
          label="Budget Range"
          options={budgetOptions}
          value={filters?.budget}
          onChange={(value) => onFilterChange('budget', value)}
        />
        
        <Select
          label="Risk Tolerance"
          options={riskOptions}
          value={filters?.riskLevel}
          onChange={(value) => onFilterChange('riskLevel', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Growing Season"
          options={seasonOptions}
          value={filters?.season}
          onChange={(value) => onFilterChange('season', value)}
        />
        
        <Select
          label="Soil Type"
          options={soilTypeOptions}
          value={filters?.soilType}
          onChange={(value) => onFilterChange('soilType', value)}
        />
      </div>
      {/* Advanced Sliders */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Advanced Parameters</h4>
        
        {/* Success Probability Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Minimum Success Probability</label>
            <span className="text-sm font-medium text-primary">{filters?.minSuccessProbability}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={filters?.minSuccessProbability}
            onChange={(e) => handleSliderChange('minSuccessProbability', e?.target?.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* ROI Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Minimum Expected ROI</label>
            <span className="text-sm font-medium text-primary">₹{filters?.minROI?.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500000"
            step="10000"
            value={filters?.minROI}
            onChange={(e) => handleSliderChange('minROI', e?.target?.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Growth Period Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">Maximum Growth Period</label>
            <span className="text-sm font-medium text-primary">{filters?.maxGrowthPeriod} days</span>
          </div>
          <input
            type="range"
            min="30"
            max="365"
            value={filters?.maxGrowthPeriod}
            onChange={(e) => handleSliderChange('maxGrowthPeriod', e?.target?.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="Search crops by name..."
          value={filters?.searchTerm}
          onChange={(e) => onFilterChange('searchTerm', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Active Filters Count */}
      {Object.values(filters)?.some(value => 
        value !== 'all' && value !== '' && value !== 0 && value !== 100 && value !== 365
      ) && (
        <div className="flex items-center space-x-2 pt-2 border-t border-border">
          <Icon name="Filter" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            {Object.values(filters)?.filter(value => 
              value !== 'all' && value !== '' && value !== 0 && value !== 100 && value !== 365
            )?.length} filters active
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
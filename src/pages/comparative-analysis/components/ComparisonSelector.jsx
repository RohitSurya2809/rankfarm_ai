import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonSelector = ({ onSelectionChange, selectedItems }) => {
  const [activeCategory, setActiveCategory] = useState('crops');

  const categories = [
    { id: 'crops', label: 'Crops', icon: 'Wheat' },
    { id: 'fertilizers', label: 'Fertilizers', icon: 'Beaker' },
    { id: 'pestControl', label: 'Pest Control', icon: 'Bug' }
  ];

  const cropOptions = [
    { value: 'wheat-hd2967', label: 'Wheat (HD-2967)', description: 'High yield variety' },
    { value: 'rice-basmati', label: 'Rice (Basmati)', description: 'Premium quality' },
    { value: 'cotton-bt', label: 'Cotton (Bt)', description: 'Pest resistant' },
    { value: 'sugarcane-co238', label: 'Sugarcane (Co-238)', description: 'High sugar content' },
    { value: 'maize-hybrid', label: 'Maize (Hybrid)', description: 'Fast growing' }
  ];

  const fertilizerOptions = [
    { value: 'urea-46', label: 'Urea (46% N)', description: 'Nitrogen rich' },
    { value: 'dap-fertilizer', label: 'DAP Fertilizer', description: 'Phosphorus boost' },
    { value: 'npk-complex', label: 'NPK Complex', description: 'Balanced nutrition' },
    { value: 'organic-compost', label: 'Organic Compost', description: 'Natural fertilizer' },
    { value: 'vermicompost', label: 'Vermicompost', description: 'Earthworm processed' }
  ];

  const pestControlOptions = [
    { value: 'neem-oil', label: 'Neem Oil', description: 'Organic solution' },
    { value: 'bt-spray', label: 'Bt Spray', description: 'Biological control' },
    { value: 'imidacloprid', label: 'Imidacloprid', description: 'Systemic insecticide' },
    { value: 'triazophos', label: 'Triazophos', description: 'Contact insecticide' },
    { value: 'pheromone-traps', label: 'Pheromone Traps', description: 'Natural attraction' }
  ];

  const getOptionsForCategory = (category) => {
    switch (category) {
      case 'crops': return cropOptions;
      case 'fertilizers': return fertilizerOptions;
      case 'pestControl': return pestControlOptions;
      default: return [];
    }
  };

  const handleItemSelect = (category, value) => {
    const newSelection = { ...selectedItems };
    if (!newSelection?.[category]) {
      newSelection[category] = [];
    }
    
    if (!newSelection?.[category]?.includes(value)) {
      newSelection[category] = [...newSelection?.[category], value];
      onSelectionChange(newSelection);
    }
  };

  const handleItemRemove = (category, value) => {
    const newSelection = { ...selectedItems };
    newSelection[category] = newSelection?.[category]?.filter(item => item !== value);
    onSelectionChange(newSelection);
  };

  const getSelectedCount = () => {
    return Object.values(selectedItems)?.reduce((total, items) => total + items?.length, 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Select Items to Compare</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose up to 4 items from each category for detailed comparison
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {getSelectedCount()} items selected
          </div>
        </div>
      </div>
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === category?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Selection Interface */}
      <div className="space-y-4">
        <Select
          label={`Select ${categories?.find(c => c?.id === activeCategory)?.label}`}
          placeholder={`Choose ${categories?.find(c => c?.id === activeCategory)?.label?.toLowerCase()} to compare`}
          options={getOptionsForCategory(activeCategory)}
          value=""
          onChange={(value) => handleItemSelect(activeCategory, value)}
          searchable
          className="mb-4"
        />

        {/* Selected Items Display */}
        {selectedItems?.[activeCategory] && selectedItems?.[activeCategory]?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-foreground">
              Selected {categories?.find(c => c?.id === activeCategory)?.label}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedItems?.[activeCategory]?.map((itemValue) => {
                const item = getOptionsForCategory(activeCategory)?.find(opt => opt?.value === itemValue);
                return (
                  <div
                    key={itemValue}
                    className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="font-medium">{item?.label}</span>
                    <button
                      onClick={() => handleItemRemove(activeCategory, itemValue)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Quick Selection Presets */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Comparison Presets:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const preset = {
                crops: ['wheat-hd2967', 'rice-basmati'],
                fertilizers: ['urea-46', 'dap-fertilizer'],
                pestControl: ['neem-oil', 'bt-spray']
              };
              onSelectionChange(preset);
            }}
            className="text-left justify-start"
          >
            <Icon name="Zap" size={16} className="mr-2" />
            High Yield Combo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const preset = {
                crops: ['cotton-bt', 'sugarcane-co238'],
                fertilizers: ['organic-compost', 'vermicompost'],
                pestControl: ['neem-oil', 'pheromone-traps']
              };
              onSelectionChange(preset);
            }}
            className="text-left justify-start"
          >
            <Icon name="Leaf" size={16} className="mr-2" />
            Organic Farming
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const preset = {
                crops: ['maize-hybrid', 'wheat-hd2967'],
                fertilizers: ['npk-complex', 'urea-46'],
                pestControl: ['imidacloprid', 'triazophos']
              };
              onSelectionChange(preset);
            }}
            className="text-left justify-start"
          >
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Maximum ROI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSelector;
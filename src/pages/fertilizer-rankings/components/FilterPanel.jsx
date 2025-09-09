import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onResetFilters, 
  isOpen, 
  onToggle,
  currentLanguage = 'en' 
}) => {
  const translations = {
    en: {
      filters: 'Filters',
      category: 'Category',
      priceRange: 'Price Range',
      effectiveness: 'Effectiveness',
      cropType: 'Crop Type',
      organic: 'Organic Only',
      inStock: 'In Stock Only',
      resetFilters: 'Reset Filters',
      applyFilters: 'Apply Filters',
      all: 'All Categories',
      premium: 'Premium',
      standard: 'Standard',
      economy: 'Economy',
      organicCat: 'Organic',
      lowToHigh: 'Low to High',
      highToLow: 'High to Low',
      above90: 'Above 90%',
      above80: 'Above 80%',
      above70: 'Above 70%',
      cereals: 'Cereals',
      vegetables: 'Vegetables',
      fruits: 'Fruits',
      pulses: 'Pulses',
      oilseeds: 'Oilseeds'
    },
    hi: {
      filters: 'फिल्टर',
      category: 'श्रेणी',
      priceRange: 'मूल्य सीमा',
      effectiveness: 'प्रभावशीलता',
      cropType: 'फसल प्रकार',
      organic: 'केवल जैविक',
      inStock: 'केवल स्टॉक में',
      resetFilters: 'फिल्टर रीसेट करें',
      applyFilters: 'फिल्टर लागू करें',
      all: 'सभी श्रेणियां',
      premium: 'प्रीमियम',
      standard: 'मानक',
      economy: 'किफायती',
      organicCat: 'जैविक',
      lowToHigh: 'कम से अधिक',
      highToLow: 'अधिक से कम',
      above90: '90% से अधिक',
      above80: '80% से अधिक',
      above70: '70% से अधिक',
      cereals: 'अनाज',
      vegetables: 'सब्जियां',
      fruits: 'फल',
      pulses: 'दालें',
      oilseeds: 'तिलहन'
    },
    ta: {
      filters: 'வடிப்பான்கள்',
      category: 'வகை',
      priceRange: 'விலை வரம்பு',
      effectiveness: 'செயல்திறன்',
      cropType: 'பயிர் வகை',
      organic: 'இயற்கை மட்டும்',
      inStock: 'கையிருப்பில் மட்டும்',
      resetFilters: 'வடிப்பான்களை மீட்டமை',
      applyFilters: 'வடிப்பான்களைப் பயன்படுத்து',
      all: 'அனைத்து வகைகள்',
      premium: 'பிரீமியம்',
      standard: 'நிலையான',
      economy: 'மிதமான',
      organicCat: 'இயற்கை',
      lowToHigh: 'குறைவிலிருந்து அதிகம்',
      highToLow: 'அதிகத்திலிருந்து குறைவு',
      above90: '90% க்கு மேல்',
      above80: '80% க்கு மேல்',
      above70: '70% க்கு மேல்',
      cereals: 'தானியங்கள்',
      vegetables: 'காய்கறிகள்',
      fruits: 'பழங்கள்',
      pulses: 'பருப்பு வகைகள்',
      oilseeds: 'எண்ணெய் வித்துகள்'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const categoryOptions = [
    { value: 'all', label: t?.all },
    { value: 'premium', label: t?.premium },
    { value: 'standard', label: t?.standard },
    { value: 'economy', label: t?.economy },
    { value: 'organic', label: t?.organicCat }
  ];

  const priceRangeOptions = [
    { value: 'all', label: t?.all },
    { value: 'low-high', label: t?.lowToHigh },
    { value: 'high-low', label: t?.highToLow }
  ];

  const effectivenessOptions = [
    { value: 'all', label: t?.all },
    { value: '90+', label: t?.above90 },
    { value: '80+', label: t?.above80 },
    { value: '70+', label: t?.above70 }
  ];

  const cropTypeOptions = [
    { value: 'all', label: t?.all },
    { value: 'cereals', label: t?.cereals },
    { value: 'vegetables', label: t?.vegetables },
    { value: 'fruits', label: t?.fruits },
    { value: 'pulses', label: t?.pulses },
    { value: 'oilseeds', label: t?.oilseeds }
  ];

  return (
    <div className={`bg-white rounded-xl border border-gray-200 transition-all duration-300 ${
      isOpen ? 'shadow-lg' : 'shadow-sm'
    }`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">{t?.filters}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName={isOpen ? "ChevronUp" : "ChevronDown"}
          />
        </div>
      </div>
      {isOpen && (
        <div className="p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <Select
              label={t?.category}
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => onFilterChange('category', value)}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <Select
              label={t?.priceRange}
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => onFilterChange('priceRange', value)}
            />
          </div>

          {/* Effectiveness Filter */}
          <div>
            <Select
              label={t?.effectiveness}
              options={effectivenessOptions}
              value={filters?.effectiveness}
              onChange={(value) => onFilterChange('effectiveness', value)}
            />
          </div>

          {/* Crop Type Filter */}
          <div>
            <Select
              label={t?.cropType}
              options={cropTypeOptions}
              value={filters?.cropType}
              onChange={(value) => onFilterChange('cropType', value)}
            />
          </div>

          {/* Checkbox Filters */}
          <div className="space-y-3">
            <Checkbox
              label={t?.organic}
              checked={filters?.organicOnly}
              onChange={(e) => onFilterChange('organicOnly', e?.target?.checked)}
            />
            <Checkbox
              label={t?.inStock}
              checked={filters?.inStockOnly}
              onChange={(e) => onFilterChange('inStockOnly', e?.target?.checked)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              iconName="RotateCcw"
              className="flex-1"
            >
              {t?.resetFilters}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onToggle()}
              iconName="Check"
              className="flex-1"
            >
              {t?.applyFilters}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
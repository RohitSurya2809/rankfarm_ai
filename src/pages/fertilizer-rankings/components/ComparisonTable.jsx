import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonTable = ({ 
  fertilizers = [], 
  onRemoveFertilizer, 
  currentLanguage = 'en' 
}) => {
  const [sortBy, setSortBy] = useState('effectiveness');
  const [sortOrder, setSortOrder] = useState('desc');

  const translations = {
    en: {
      comparison: 'Fertilizer Comparison',
      name: 'Name',
      effectiveness: 'Effectiveness',
      cost: 'Cost/Acre',
      yieldIncrease: 'Yield Increase',
      applicationTime: 'Application Time',
      category: 'Category',
      composition: 'Composition',
      remove: 'Remove',
      sortBy: 'Sort by',
      noFertilizers: 'No fertilizers selected for comparison',
      selectFertilizers: 'Select fertilizers from the rankings to compare them here',
      organic: 'Organic',
      premium: 'Premium',
      standard: 'Standard',
      economy: 'Economy'
    },
    hi: {
      comparison: 'उर्वरक तुलना',
      name: 'नाम',
      effectiveness: 'प्रभावशीलता',
      cost: 'लागत/एकड़',
      yieldIncrease: 'उत्पादन वृद्धि',
      applicationTime: 'प्रयोग समय',
      category: 'श्रेणी',
      composition: 'संरचना',
      remove: 'हटाएं',
      sortBy: 'क्रमबद्ध करें',
      noFertilizers: 'तुलना के लिए कोई उर्वरक चयनित नहीं',
      selectFertilizers: 'तुलना के लिए रैंकिंग से उर्वरक चुनें',
      organic: 'जैविक',
      premium: 'प्रीमियम',
      standard: 'मानक',
      economy: 'किफायती'
    },
    ta: {
      comparison: 'உர ஒப்பீடு',
      name: 'பெயர்',
      effectiveness: 'செயல்திறன்',
      cost: 'செலவு/ஏக்கர்',
      yieldIncrease: 'விளைச்சல் அதிகரிப்பு',
      applicationTime: 'பயன்பாட்டு நேரம்',
      category: 'வகை',
      composition: 'கலவை',
      remove: 'அகற்று',
      sortBy: 'வரிசைப்படுத்து',
      noFertilizers: 'ஒப்பீட்டுக்கு உரங்கள் தேர்ந்தெடுக்கப்படவில்லை',
      selectFertilizers: 'ஒப்பீட்டுக்கு தரவரிசையிலிருந்து உரங்களைத் தேர்ந்தெடுக்கவும்',
      organic: 'இயற்கை',
      premium: 'பிரீமியம்',
      standard: 'நிலையான',
      economy: 'மிதமான'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const sortedFertilizers = [...fertilizers]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  if (fertilizers?.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GitCompare" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t?.noFertilizers}</h3>
          <p className="text-gray-600">{t?.selectFertilizers}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">{t?.comparison}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t?.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="effectiveness">{t?.effectiveness}</option>
              <option value="costPerAcre">{t?.cost}</option>
              <option value="yieldIncrease">{t?.yieldIncrease}</option>
              <option value="name">{t?.name}</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>{t?.name}</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('effectiveness')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>{t?.effectiveness}</span>
                  <Icon name={getSortIcon('effectiveness')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('costPerAcre')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>{t?.cost}</span>
                  <Icon name={getSortIcon('costPerAcre')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('yieldIncrease')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>{t?.yieldIncrease}</span>
                  <Icon name={getSortIcon('yieldIncrease')} size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.category}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t?.composition}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedFertilizers?.map((fertilizer, index) => (
              <tr key={fertilizer?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{fertilizer?.name}</div>
                    <div className="text-sm text-gray-500">{fertilizer?.brand}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${fertilizer?.effectiveness}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{fertilizer?.effectiveness}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Icon name="IndianRupee" size={14} className="text-green-600 mr-1" />
                    {fertilizer?.costPerAcre?.toLocaleString('en-IN')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Icon name="TrendingUp" size={14} className="text-blue-600 mr-1" />
                    +{fertilizer?.yieldIncrease}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    fertilizer?.category === 'organic' ? 'bg-green-100 text-green-800' :
                    fertilizer?.category === 'premium' ? 'bg-purple-100 text-purple-800' :
                    fertilizer?.category === 'standard'? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {t?.[fertilizer?.category] || fertilizer?.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {fertilizer?.composition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFertilizer(fertilizer?.id)}
                    iconName="X"
                    className="text-red-600 hover:text-red-700"
                  >
                    {t?.remove}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
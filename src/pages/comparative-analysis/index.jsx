import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ComparisonSelector from './components/ComparisonSelector';
import ComparisonMatrix from './components/ComparisonMatrix';
import RankingSliders from './components/RankingSliders';
import RegionalBenchmark from './components/RegionalBenchmark';
import ExpertValidation from './components/ExpertValidation';

const ComparativeAnalysis = () => {
  const [selectedItems, setSelectedItems] = useState({
    crops: [],
    fertilizers: [],
    pestControl: []
  });
  const [weights, setWeights] = useState({
    cost: 50,
    yield: 50,
    sustainability: 50,
    risk: 50,
    speed: 50,
    quality: 50
  });
  const [activeSection, setActiveSection] = useState('selector');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const sections = [
    { id: 'selector', label: 'Selection', icon: 'CheckSquare', description: 'Choose items to compare' },
    { id: 'comparison', label: 'Comparison', icon: 'BarChart3', description: 'Detailed analysis' },
    { id: 'preferences', label: 'Preferences', icon: 'Sliders', description: 'Adjust weights' },
    { id: 'benchmark', label: 'Benchmark', icon: 'MapPin', description: 'Regional comparison' },
    { id: 'validation', label: 'Validation', icon: 'UserCheck', description: 'Expert insights' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSelectionChange = (newSelection) => {
    setSelectedItems(newSelection);
    if (getSelectedCount(newSelection) > 0 && activeSection === 'selector') {
      setActiveSection('comparison');
    }
  };

  const handleWeightChange = (newWeights) => {
    setWeights(newWeights);
  };

  const getSelectedCount = (selection = selectedItems) => {
    return Object.values(selection)?.reduce((total, items) => total + items?.length, 0);
  };

  const handleSaveComparison = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Show success message
    alert('Comparison saved successfully!');
  };

  const handleExportReport = () => {
    // Simulate report generation
    const reportData = {
      selectedItems,
      weights,
      timestamp: new Date()?.toISOString(),
      language: currentLanguage
    };
    
    console.log('Exporting report:', reportData);
    alert('Report exported successfully!');
  };

  const renderProgressIndicator = () => {
    const completedSections = [];
    if (getSelectedCount() > 0) completedSections?.push('selector');
    if (getSelectedCount() >= 2) completedSections?.push('comparison');
    
    return (
      <div className="flex items-center justify-center space-x-2 mb-8">
        {sections?.map((section, index) => {
          const isCompleted = completedSections?.includes(section?.id);
          const isActive = activeSection === section?.id;
          const isAccessible = index === 0 || completedSections?.includes(sections?.[index - 1]?.id);
          
          return (
            <React.Fragment key={section?.id}>
              <button
                onClick={() => isAccessible && setActiveSection(section?.id)}
                disabled={!isAccessible}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg' 
                    : isCompleted
                    ? 'bg-green-50 text-green-600 hover:bg-green-100'
                    : isAccessible
                    ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                    : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-600 text-white' : ''
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={section?.icon} size={16} />
                  )}
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{section?.label}</div>
                  <div className="text-xs opacity-75 hidden sm:block">{section?.description}</div>
                </div>
              </button>
              {index < sections?.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  completedSections?.includes(sections?.[index + 1]?.id) ? 'bg-green-600' : 'bg-muted'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'selector':
        return (
          <ComparisonSelector
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
          />
        );
      case 'comparison':
        return (
          <ComparisonMatrix
            selectedItems={selectedItems}
            comparisonData={{}}
          />
        );
      case 'preferences':
        return (
          <RankingSliders
            weights={weights}
            onWeightChange={handleWeightChange}
          />
        );
      case 'benchmark':
        return (
          <RegionalBenchmark
            selectedItems={selectedItems}
          />
        );
      case 'validation':
        return (
          <ExpertValidation
            selectedItems={selectedItems}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Comparative Analysis - RankFarm AI</title>
        <meta name="description" content="Compare agricultural recommendations with AI-powered analysis and expert validation" />
      </Helmet>
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="BarChart3" size={16} />
              <span>Comparative Analysis</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {getTranslation('smartAgriculturalComparisons', currentLanguage)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {getTranslation('dataDrivenDecisionsDescription', currentLanguage)}
            </p>
          </div>

          {/* Progress Indicator */}
          {renderProgressIndicator()}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckSquare" size={24} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">{getSelectedCount()}</div>
              <div className="text-sm text-muted-foreground">Items Selected</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={24} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">{Math.round(Object.values(weights)?.reduce((a, b) => a + b, 0) / 6)}%</div>
              <div className="text-sm text-muted-foreground">Avg Weight</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Expert Reviews</div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="MapPin" size={24} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-sm text-muted-foreground">Regions</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {renderSectionContent()}
          </div>

          {/* Action Bar */}
          {getSelectedCount() > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-card border border-border rounded-full shadow-lg px-6 py-3 flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  {getSelectedCount()} items selected
                </div>
                <div className="w-px h-6 bg-border" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportReport}
                >
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveComparison}
                  loading={isLoading}
                >
                  <Icon name="Save" size={16} className="mr-2" />
                  Save Analysis
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Mobile Navigation Helper */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <Button
          variant="default"
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg"
          onClick={() => {
            const currentIndex = sections?.findIndex(s => s?.id === activeSection);
            const nextIndex = (currentIndex + 1) % sections?.length;
            setActiveSection(sections?.[nextIndex]?.id);
          }}
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
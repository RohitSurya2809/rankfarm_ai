import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import TierCard from './components/TierCard';
import TreatmentDetails from './components/TreatmentDetails';
import FilterPanel from './components/FilterPanel';
import PestPressureMap from './components/PestPressureMap';
import ExpertValidation from './components/ExpertValidation';

const PestControlRankings = () => {
  const navigate = useNavigate();
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock data for pest control treatments
  const mockTreatments = {
    tier1: [
      {
        id: 'neem-oil-spray',
        name: 'Neem Oil Spray',
        category: 'Organic Insecticide',
        description: 'Fast-acting organic solution for immediate pest control with broad-spectrum effectiveness.',
        detailedDescription: `Neem oil spray is a natural, biodegradable pesticide derived from the neem tree (Azadirachta indica). It works by disrupting the pest's hormonal system, preventing feeding, mating, and egg-laying. This organic solution is effective against a wide range of soft-bodied insects including aphids, whiteflies, spider mites, and thrips.\n\nThe active compound azadirachtin acts as both a feeding deterrent and growth regulator, making it highly effective for integrated pest management programs. Unlike synthetic pesticides, neem oil breaks down quickly in the environment and poses minimal risk to beneficial insects when applied correctly.`,
        controlRate: 85,
        safetyRating: 5,
        safetyScore: 92,
        costPerAcre: 450,
        actionTime: '2-3 days',
        rank: 1,
        isOrganic: true,
        isRecommended: true,
        applicationMethod: {
          title: 'Foliar Spray Application',description: 'Apply as a fine mist during early morning or evening hours to avoid leaf burn.',
          steps: [
            'Mix 2-3 ml neem oil per liter of water','Add 1ml liquid soap as emulsifier','Spray thoroughly on both sides of leaves','Repeat every 7-10 days as needed','Avoid application during flowering period'
          ]
        },
        safetyPrecautions: [
          'Wear protective clothing and gloves during application','Avoid spraying during hot sunny conditions','Do not mix with copper-based fungicides','Store in cool, dry place away from children','Test on small area first to check for phytotoxicity'
        ],
        targetPests: ['Aphids', 'Whiteflies', 'Spider Mites', 'Thrips', 'Caterpillars', 'Scale Insects'],
        compatibility: {
          compatible: ['Organic farming', 'IPM programs', 'Beneficial insects', 'Pollinator-friendly'],
          incompatible: ['Copper fungicides', 'Strong alkaline solutions', 'Oil-based pesticides']
        },
        successStories: [
          {
            farmerName: 'Rajesh Kumar',location: 'Punjab',farmSize: 5,successRate: 88,testimonial: 'Neem oil completely controlled aphids on my cotton crop without harming beneficial insects. Very satisfied with organic approach.'
          },
          {
            farmerName: 'Priya Sharma',location: 'Maharashtra',farmSize: 3,successRate: 92,testimonial: 'Excellent results on vegetable crops. Safe for my family and effective against multiple pests.'
          }
        ]
      },
      {
        id: 'bt-spray',name: 'Bacillus thuringiensis (Bt)',category: 'Biological Control',description: 'Targeted biological control for caterpillar pests with high specificity and safety.',
        detailedDescription: `Bacillus thuringiensis is a naturally occurring soil bacterium that produces crystal proteins toxic to specific insect larvae, particularly caterpillars. When ingested by target pests, the Bt toxin disrupts their digestive system, leading to death within 2-5 days.\n\nThis biological pesticide is highly selective, affecting only specific pest species while being completely safe for humans, animals, and beneficial insects. It's an essential component of sustainable pest management programs and is approved for organic farming worldwide.`,
        controlRate: 92,
        safetyRating: 5,
        safetyScore: 98,
        costPerAcre: 380,
        actionTime: '3-5 days',
        rank: 2,
        isOrganic: true,
        isRecommended: true,
        applicationMethod: {
          title: 'Targeted Spray Application',
          description: 'Apply when caterpillars are young (1st-2nd instar) for maximum effectiveness.',
          steps: [
            'Mix 1-2 grams Bt per liter of water',
            'Add wetting agent for better coverage',
            'Spray during evening hours to protect from UV',
            'Ensure thorough coverage of plant surfaces',
            'Reapply after heavy rain or irrigation'
          ]
        },
        safetyPrecautions: [
          'Store in refrigerated conditions to maintain viability',
          'Use within recommended shelf life',
          'Avoid mixing with bactericidal compounds',
          'Apply during cooler parts of the day',
          'Wear basic protective equipment'
        ],
        targetPests: ['Bollworm', 'Corn Borer', 'Cabbage Worm', 'Tobacco Budworm', 'Diamondback Moth'],
        compatibility: {
          compatible: ['Organic certification', 'IPM systems', 'Beneficial insects', 'Resistance management'],
          incompatible: ['Antibiotics', 'Strong UV exposure', 'High pH conditions']
        },
        successStories: [
          {
            farmerName: 'Suresh Patel',
            location: 'Gujarat',
            farmSize: 8,
            successRate: 94,
            testimonial: 'Bt spray saved my cotton crop from bollworm attack. 100% organic and very effective.'
          }
        ]
      }
    ],
    tier2: [
      {
        id: 'pheromone-traps',
        name: 'Pheromone Trap System',
        category: 'Monitoring & Control',
        description: 'Preventive pest monitoring and mass trapping system for sustainable management.',
        detailedDescription: `Pheromone traps use synthetic versions of insect sex pheromones to attract and capture adult pests, disrupting their mating cycle and reducing population levels. This preventive approach is highly effective for monitoring pest populations and implementing timely control measures.\n\nThe system works by releasing species-specific pheromones that attract male insects to sticky traps, preventing mating and reducing the next generation of pests. This method is environmentally friendly, selective, and provides valuable data for decision-making in pest management programs.`,
        controlRate: 75,
        safetyRating: 5,
        safetyScore: 100,
        costPerAcre: 320,
        actionTime: '1-2 weeks',
        rank: 1,
        isOrganic: true,
        isRecommended: true,
        applicationMethod: {
          title: 'Strategic Trap Placement',
          description: 'Install traps at field borders and monitor regularly for pest activity.',
          steps: [
            'Install 4-6 traps per acre at field edges',
            'Place traps at crop canopy height',
            'Replace pheromone lures every 4-6 weeks',
            'Monitor and record trap catches weekly',
            'Adjust trap density based on catch data'
          ]
        },
        safetyPrecautions: [
          'Handle pheromone lures with clean hands',
          'Store lures in sealed containers in freezer',
          'Replace sticky surfaces when full',
          'Keep traps away from beneficial insect habitats',
          'Dispose of used materials properly'
        ],
        targetPests: ['Bollworm', 'Fruit Flies', 'Stem Borer', 'Leaf Folder', 'Pink Bollworm'],
        compatibility: {
          compatible: ['Organic farming', 'IPM programs', 'Beneficial conservation', 'Resistance management'],
          incompatible: ['Broad-spectrum insecticides', 'Strong wind areas', 'Heavy rain exposure']
        },
        successStories: [
          {
            farmerName: 'Anita Devi',
            location: 'Haryana',
            farmSize: 4,
            successRate: 78,
            testimonial: 'Pheromone traps helped me detect pest problems early and reduce pesticide use by 60%.'
          }
        ]
      },
      {
        id: 'beneficial-insects',
        name: 'Beneficial Insect Release',
        category: 'Biological Control',
        description: 'Natural predator and parasitoid release for long-term pest suppression.',
        detailedDescription: `Beneficial insect release involves introducing natural enemies of pest species to establish biological control in agricultural systems. This includes predatory insects like ladybugs, lacewings, and parasitic wasps that naturally regulate pest populations.\n\nThis approach provides sustainable, long-term pest control by establishing a natural balance in the ecosystem. Once established, beneficial insects continue to reproduce and maintain pest populations below economic threshold levels, reducing the need for chemical interventions.`,
        controlRate: 80,
        safetyRating: 5,
        safetyScore: 100,
        costPerAcre: 280,
        actionTime: '2-3 weeks',
        rank: 2,
        isOrganic: true,
        isRecommended: false,
        applicationMethod: {
          title: 'Systematic Release Program',
          description: 'Release beneficial insects at optimal timing and environmental conditions.',
          steps: [
            'Assess pest population levels first',
            'Order appropriate beneficial species',
            'Release during cool morning hours',
            'Distribute evenly across the field',
            'Monitor establishment and effectiveness'
          ]
        },
        safetyPrecautions: [
          'Release immediately upon receipt',
          'Avoid pesticide applications before/after release',
          'Provide alternative food sources if needed',
          'Monitor for establishment success',
          'Maintain habitat for beneficial insects'
        ],
        targetPests: ['Aphids', 'Spider Mites', 'Whiteflies', 'Thrips', 'Scale Insects'],
        compatibility: {
          compatible: ['Organic systems', 'IPM programs', 'Sustainable agriculture', 'Pollinator conservation'],
          incompatible: ['Broad-spectrum pesticides', 'Frequent disturbance', 'Monoculture systems']
        },
        successStories: [
          {
            farmerName: 'Vikram Singh',
            location: 'Rajasthan',
            farmSize: 6,
            successRate: 82,
            testimonial: 'Ladybug release program established natural control of aphids. No pesticides needed for 3 months.'
          }
        ]
      }
    ],
    tier3: [
      {
        id: 'companion-planting',
        name: 'Companion Planting System',
        category: 'Cultural Control',
        description: 'Strategic crop diversification for natural pest deterrence and ecosystem balance.',
        detailedDescription: `Companion planting involves growing specific plants together to naturally repel pests, attract beneficial insects, and improve overall crop health. This long-term strategy creates a diverse ecosystem that naturally suppresses pest populations while enhancing soil health and biodiversity.\n\nCertain plants produce natural compounds that repel specific pests, while others attract beneficial insects that prey on harmful species. This approach requires planning and patience but provides sustainable, long-term pest management benefits with additional advantages for soil health and crop productivity.`,
        controlRate: 65,
        safetyRating: 5,
        safetyScore: 100,
        costPerAcre: 150,
        actionTime: '4-8 weeks',
        rank: 1,
        isOrganic: true,
        isRecommended: false,
        applicationMethod: {
          title: 'Strategic Crop Layout Design',
          description: 'Plan and implement companion planting patterns for maximum pest deterrent effect.',
          steps: [
            'Design field layout with companion plants',
            'Plant repellent species at field borders',
            'Intercrop with pest-deterrent varieties',
            'Maintain diverse plant populations',
            'Monitor and adjust planting patterns'
          ]
        },
        safetyPrecautions: [
          'Research plant compatibility thoroughly',
          'Avoid allelopathic plant combinations',
          'Consider harvest timing differences',
          'Plan for different water/nutrient needs',
          'Monitor for competition effects'
        ],
        targetPests: ['General Pest Suppression', 'Aphids', 'Nematodes', 'Soil-borne Pests', 'Flying Insects'],
        compatibility: {
          compatible: ['Organic farming', 'Permaculture', 'Biodiversity conservation', 'Soil health improvement'],
          incompatible: ['Monoculture systems', 'Mechanical harvesting', 'Uniform irrigation needs']
        },
        successStories: [
          {
            farmerName: 'Meera Joshi',
            location: 'Kerala',
            farmSize: 2,
            successRate: 68,
            testimonial: 'Marigold borders and basil intercropping reduced pest problems naturally. Great for organic certification.'
          }
        ]
      }
    ]
  };

  // Mock expert validations
  const mockValidations = [
    {
      organization: 'Indian Agricultural Research Institute',
      department: 'Division of Entomology',
      type: 'university',
      rating: 5,
      endorsement: 'Comprehensive field trials confirm the effectiveness of these pest control rankings for Indian agricultural conditions.',
      studiesCount: 15,
      successRate: 89,
      validatedDate: '2024-08-15',
      certificationUrl: '#'
    },
    {
      organization: 'Ministry of Agriculture & Farmers Welfare',
      department: 'Plant Protection Division',
      type: 'government',
      rating: 4,
      endorsement: 'Approved methodologies align with national IPM guidelines and sustainable agriculture practices.',
      studiesCount: 8,
      successRate: 92,
      validatedDate: '2024-07-20',
      certificationUrl: '#'
    },
    {
      organization: 'ICRISAT',
      department: 'Crop Protection Research',
      type: 'research',
      rating: 5,
      endorsement: 'Research-backed recommendations demonstrate significant improvement in pest management efficiency.',
      studiesCount: 22,
      successRate: 87,
      validatedDate: '2024-09-01',
      certificationUrl: '#'
    }
  ];

  const [filters, setFilters] = useState({
    treatmentType: 'all',
    budget: 'all',
    speed: 'all',
    safetyLevel: 'all',
    onlyRecommended: false,
    includePreventive: true,
    organicCompatible: false,
    expertValidated: false,
    minControlRate: 60
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleTreatmentSelect = (treatment) => {
    setSelectedTreatment(treatment);
    setShowDetails(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      treatmentType: 'all',
      budget: 'all',
      speed: 'all',
      safetyLevel: 'all',
      onlyRecommended: false,
      includePreventive: true,
      organicCompatible: false,
      expertValidated: false,
      minControlRate: 60
    });
  };

  const filterTreatments = (treatments) => {
    return treatments?.filter(treatment => {
      // Treatment type filter
      if (filters?.treatmentType !== 'all') {
        if (filters?.treatmentType === 'organic' && !treatment?.isOrganic) return false;
        if (filters?.treatmentType === 'conventional' && treatment?.isOrganic) return false;
      }

      // Budget filter
      if (filters?.budget !== 'all') {
        if (filters?.budget === 'low' && treatment?.costPerAcre > 500) return false;
        if (filters?.budget === 'medium' && (treatment?.costPerAcre <= 500 || treatment?.costPerAcre > 1500)) return false;
        if (filters?.budget === 'high' && treatment?.costPerAcre <= 1500) return false;
      }

      // Control rate filter
      if (treatment?.controlRate < filters?.minControlRate) return false;

      // Recommended filter
      if (filters?.onlyRecommended && !treatment?.isRecommended) return false;

      // Organic compatible filter
      if (filters?.organicCompatible && !treatment?.isOrganic) return false;

      return true;
    });
  };

  const filteredTreatments = {
    tier1: filterTreatments(mockTreatments?.tier1),
    tier2: filterTreatments(mockTreatments?.tier2),
    tier3: filterTreatments(mockTreatments?.tier3)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-success/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="Bug" size={32} className="text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Pest Control Rankings
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Tiered pest management recommendations with control rates, costs, and treatment effectiveness scores. 
                Choose from immediate solutions, preventive measures, and long-term management strategies.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-primary">
                  {Object.values(filteredTreatments)?.flat()?.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Solutions</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-success">
                  {Math.round(Object.values(filteredTreatments)?.flat()?.reduce((acc, t) => acc + t?.controlRate, 0) / Object.values(filteredTreatments)?.flat()?.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Control Rate</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-warning">
                  {Object.values(filteredTreatments)?.flat()?.filter(t => t?.isOrganic)?.length}
                </div>
                <div className="text-sm text-muted-foreground">Organic Options</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-error">
                  ₹{Math.round(Object.values(filteredTreatments)?.flat()?.reduce((acc, t) => acc + t?.costPerAcre, 0) / Object.values(filteredTreatments)?.flat()?.length)}
                </div>
                <div className="text-sm text-muted-foreground">Avg Cost/Acre</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />

              <ExpertValidation validations={mockValidations} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Pest Pressure Map */}
              <PestPressureMap
                selectedRegion={selectedRegion}
                onRegionSelect={setSelectedRegion}
              />

              {/* Treatment Tiers */}
              <div className="space-y-8">
                <TierCard
                  tier={1}
                  treatments={filteredTreatments?.tier1}
                  onTreatmentSelect={handleTreatmentSelect}
                  selectedTreatment={selectedTreatment}
                />

                <TierCard
                  tier={2}
                  treatments={filteredTreatments?.tier2}
                  onTreatmentSelect={handleTreatmentSelect}
                  selectedTreatment={selectedTreatment}
                />

                <TierCard
                  tier={3}
                  treatments={filteredTreatments?.tier3}
                  onTreatmentSelect={handleTreatmentSelect}
                  selectedTreatment={selectedTreatment}
                />
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-foreground mb-4">Next Steps</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="default"
                    onClick={() => navigate('/comparative-analysis')}
                    className="w-full"
                  >
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    Compare Solutions
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/fertilizer-rankings')}
                    className="w-full"
                  >
                    <Icon name="Beaker" size={16} className="mr-2" />
                    View Fertilizers
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/success-analytics')}
                    className="w-full"
                  >
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    Success Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Treatment Details Modal */}
      {showDetails && (
        <TreatmentDetails
          treatment={selectedTreatment}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default PestControlRankings;
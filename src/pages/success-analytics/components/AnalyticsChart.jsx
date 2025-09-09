import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsChart = ({ chartData, currentLanguage }) => {
  const [activeChart, setActiveChart] = useState('performance');

  const translations = {
    en: {
      title: "Analytics Dashboard",
      performance: "Performance Trends",
      roi: "ROI Analysis",
      accuracy: "Prediction Accuracy",
      seasonal: "Seasonal Performance",
      month: "Month",
      yield: "Yield (tons)",
      cost: "Cost (₹)",
      savings: "Savings (₹)",
      accuracy_rate: "Accuracy (%)",
      season: "Season",
      performance_score: "Performance Score"
    },
    hi: {
      title: "विश्लेषण डैशबोर्ड",
      performance: "प्रदर्शन रुझान",
      roi: "ROI विश्लेषण",
      accuracy: "भविष्यवाणी सटीकता",
      seasonal: "मौसमी प्रदर्शन",
      month: "महीना",
      yield: "उत्पादन (टन)",
      cost: "लागत (₹)",
      savings: "बचत (₹)",
      accuracy_rate: "सटीकता (%)",
      season: "सीजन",
      performance_score: "प्रदर्शन स्कोर"
    },
    ta: {
      title: "பகுப்பாய்வு டாஷ்போர்டு",
      performance: "செயல்திறன் போக்குகள்",
      roi: "ROI பகுப்பாய்வு",
      accuracy: "கணிப்பு துல்லியம்",
      seasonal: "பருவகால செயல்திறன்",
      month: "மாதம்",
      yield: "விளைச்சல் (டன்)",
      cost: "செலவு (₹)",
      savings: "சேமிப்பு (₹)",
      accuracy_rate: "துல்லியம் (%)",
      season: "பருவம்",
      performance_score: "செயல்திறன் மதிப்பெண்"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const chartTabs = [
    { id: 'performance', label: t?.performance, icon: 'TrendingUp' },
    { id: 'roi', label: t?.roi, icon: 'DollarSign' },
    { id: 'accuracy', label: t?.accuracy, icon: 'Target' },
    { id: 'seasonal', label: t?.seasonal, icon: 'Calendar' }
  ];

  const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'];

  const renderChart = () => {
    switch (activeChart) {
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="yield" 
                stroke="#16a34a" 
                strokeWidth={3}
                dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'roi':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.roi}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="savings" 
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'accuracy':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.accuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#16a34a" 
                strokeWidth={3}
                dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'seasonal':
        return (
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
            <ResponsiveContainer width="100%" height={300} className="lg:w-1/2">
              <PieChart>
                <Pie
                  data={chartData?.seasonal}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData?.seasonal?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="lg:w-1/2 space-y-3">
              {chartData?.seasonal?.map((item, index) => (
                <div key={item?.name} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  />
                  <span className="text-sm font-medium text-foreground">{item?.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{item?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-agricultural">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
        <Icon name="BarChart3" size={24} className="text-primary" />
      </div>
      {/* Chart Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartTabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeChart === tab?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveChart(tab?.id)}
            iconName={tab?.icon}
            iconPosition="left"
            className="text-xs"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Chart Container */}
      <div className="w-full">
        {renderChart()}
      </div>
      {/* Chart Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        {activeChart === 'performance' && (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span>{t?.yield}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span>{t?.cost}</span>
            </div>
          </>
        )}
        {activeChart === 'roi' && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span>{t?.savings}</span>
          </div>
        )}
        {activeChart === 'accuracy' && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span>{t?.accuracy_rate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PestControlRankings from './pages/pest-control-rankings';
import SuccessAnalytics from './pages/success-analytics';
import FertilizerRankings from './pages/fertilizer-rankings';
import Dashboard from './pages/dashboard';
import CropRecommendations from './pages/crop-recommendations';
import ComparativeAnalysis from './pages/comparative-analysis';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ComparativeAnalysis />} />
        <Route path="/pest-control-rankings" element={<PestControlRankings />} />
        <Route path="/success-analytics" element={<SuccessAnalytics />} />
        <Route path="/fertilizer-rankings" element={<FertilizerRankings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crop-recommendations" element={<CropRecommendations />} />
        <Route path="/comparative-analysis" element={<ComparativeAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

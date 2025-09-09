import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"
import ScrollToTop from "components/ScrollToTop"
import ErrorBoundary from "components/ErrorBoundary"
import NotFound from "pages/NotFound"
import FarmerSuccessLeague from "./pages/farmer-success-league-community-leaderboards"
import Homepage from "./pages/homepage-ai-agricultural-intelligence-platform"
import CropChampionshipCenter from "./pages/crop-championship-center-interactive-rankings"
import AIRankingEngineMethodologyShowcase from "./pages/ai-ranking-engine-methodology-showcase"
import TreatmentRankingsPage from "./pages/treatment-rankings-fertilizer-pesticide-intelligence"
import RegionalIntelligenceCenter from "./pages/regional-intelligence-center-location-specific-insights"
import Settings from "./pages/settings"

const Routes = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<AIRankingEngineMethodologyShowcase />} />
            <Route path="/farmer-success-league-community-leaderboards" element={<FarmerSuccessLeague />} />
            <Route path="/homepage-ai-agricultural-intelligence-platform" element={<Homepage />} />
            <Route path="/crop-championship-center-interactive-rankings" element={<CropChampionshipCenter />} />
            <Route path="/ai-ranking-engine-methodology-showcase" element={<AIRankingEngineMethodologyShowcase />} />
            <Route path="/treatment-rankings-fertilizer-pesticide-intelligence" element={<TreatmentRankingsPage />} />
            <Route
              path="/regional-intelligence-center-location-specific-insights"
              element={<RegionalIntelligenceCenter />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </BrowserRouter>
    </I18nextProvider>
  )
}

export default Routes

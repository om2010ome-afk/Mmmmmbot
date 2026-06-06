import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store/useStore';
import { SplashPage } from './pages/SplashPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { LabPage } from './pages/LabPage';
import { FreezePage } from './pages/FreezePage';
import { JobPage } from './pages/JobPage';
import { AccountPage } from './pages/AccountPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { BottomNavigation } from './components/BottomNavigation';

const pageComponents: Record<string, React.FC> = {
  splash: SplashPage,
  landing: LandingPage,
  login: LoginPage,
  dashboard: DashboardPage,
  upload: UploadPage,
  analysis: AnalysisPage,
  lab: LabPage,
  freeze: FreezePage,
  job: JobPage,
  account: AccountPage,
  terms: TermsPage,
  privacy: PrivacyPage,
};

function App() {
  const { currentPage, showSplash } = useStore();

  const PageComponent = pageComponents[currentPage] || LandingPage;

  return (
    <div className="min-h-screen bg-[#050505]" dir="rtl">
      {/* Splash overlay */}
      {showSplash && <SplashPage />}

      {/* Main content */}
      {!showSplash && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Bottom Navigation */}
      {!showSplash && <BottomNavigation />}
    </div>
  );
}

export default App;

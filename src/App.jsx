import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Public Components
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { SkillsSection } from './components/public/SkillsSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { EducationSection } from './components/public/EducationSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { CustomCursor } from './components/public/CustomCursor';

// Lazy-loaded Admin Components (keeps public bundle ultra fast)
const AdminAuthModal = lazy(() => import('./components/admin/AdminAuthModal').then(m => ({ default: m.AdminAuthModal })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const MainApp = () => {
  const { publishedData, isLoading } = usePortfolio();
  const { isAdmin } = useAuth();
  
  // Hash routing for static GitHub Pages compatibility
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdminRoute = currentHash.startsWith('#/admin');

  // Toggle admin-mode on body to restore standard cursors inside Admin Studio
  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [isAdminRoute]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#FAF7F2] bg-graph-paper flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 bg-white rounded-2xl border-2 border-[#1E1E24] shadow-scrapbook flex items-center justify-center font-editorial font-black text-2xl animate-bounce">
          BK
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate-600">
          Opening Bhavana's Digital Scrapbook...
        </p>
      </div>
    );
  }

  // Admin Route Experience
  if (isAdminRoute) {
    return (
      <div data-admin-root="true" className="admin-view">
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-[#FAF7F2] bg-graph-paper flex flex-col items-center justify-center p-4">
              <div className="w-12 h-12 bg-white rounded-xl border-2 border-[#1E1E24] shadow-scrapbook flex items-center justify-center font-editorial font-bold text-xl animate-spin">
                BK
              </div>
              <p className="mt-3 font-mono text-xs uppercase text-slate-600">
                Loading Admin Studio...
              </p>
            </div>
          }
        >
          {!isAdmin ? <AdminAuthModal /> : <AdminDashboard />}
        </Suspense>
      </div>
    );
  }

  const visibility = publishedData?.sectionsVisibility || {};

  // Visitor Experience
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1E24] font-sans selection:bg-[#FBCFE8] selection:text-[#18181B] relative">
      
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Main Public Navigation */}
      <Navbar />

      {/* Public Portfolio Sections */}
      <main>
        {visibility.hero !== false && <HeroSection />}
        {visibility.about !== false && <AboutSection />}
        {visibility.skills !== false && <SkillsSection />}
        {visibility.projects !== false && <ProjectsSection />}
        {visibility.education !== false && <EducationSection />}
        {visibility.contact !== false && <ContactSection />}
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Expanding Interactive Project Detail Experience */}
      <ProjectDetailModal />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <MainApp />
      </PortfolioProvider>
    </AuthProvider>
  );
}

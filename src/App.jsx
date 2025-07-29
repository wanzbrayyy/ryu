import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import HomePage from '@/pages/HomePage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ProductDetail from '@/pages/ProductDetail';
import PanelPage from '@/pages/PanelPage';
import BannedServicePage from '@/pages/BannedServicePage';
import OpenMuridPage from '@/pages/OpenMuridPage';
import LoadingScreen from '@/components/LoadingScreen';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ryu-store-theme">
      <Helmet>
        <title>Ryu Store - Digital Services & Solutions</title>
        <meta name="description" content="Ryu Store menyediakan layanan digital terbaik termasuk panel, jasa banned WhatsApp, dan open murid dengan teknologi terdepan." />
      </Helmet>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/banned-service" element={<BannedServicePage />} />
            <Route path="/open-murid" element={<OpenMuridPage />} />
          </Routes>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
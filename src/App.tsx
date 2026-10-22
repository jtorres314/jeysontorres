import { useState, useEffect } from 'react';
import { PageView } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PerfilPage } from './pages/PerfilPage';
import { TrayectoriaPage } from './pages/TrayectoriaPage';
import { CiberseguridadPage } from './pages/CiberseguridadPage';
import { RinconNormativoPage } from './pages/RinconNormativoPage';
import { AnalisisJuridicoPage } from './pages/AnalisisJuridicoPage';
import { AulaAbiertaPage } from './pages/AulaAbiertaPage';
import { SimuladoresPage } from './pages/SimuladoresPage';
import { AdminConsolePage } from './pages/AdminConsolePage';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('perfil');

  const handleNavigate = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Enable keyboard shortcut ⌘+K or Ctrl+K to jump to search or Ciberseguridad
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleNavigate('ciberseguridad');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#061426] text-[#d6e3fe] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#4edea3] selection:text-[#003824]">
      {/* Navigation Header */}
      <Header activePage={activePage} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main className="w-full flex-1 pt-20">
        {activePage === 'perfil' && <PerfilPage onNavigate={handleNavigate} />}
        {activePage === 'trayectoria' && <TrayectoriaPage onNavigate={handleNavigate} />}
        {activePage === 'ciberseguridad' && <CiberseguridadPage />}
        {activePage === 'rincon-normativo' && <RinconNormativoPage />}
        {activePage === 'analisis-juridico' && <AnalisisJuridicoPage />}
        {activePage === 'experiencias-academicas' && <AulaAbiertaPage onNavigate={handleNavigate} />}
        {activePage === 'simuladores' && <SimuladoresPage onNavigate={handleNavigate} />}
        {activePage === 'admin-portal' && <AdminConsolePage onNavigate={handleNavigate} />}
      </main>

      {/* Footer (Rendered on all public views) */}
      {activePage !== 'admin-portal' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

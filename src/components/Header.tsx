import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, menuItems } = useApp();

  // If active page is admin-portal, render the Admin Header instead
  if (activePage === 'admin-portal') {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#040b17]/95 backdrop-blur-xl shadow-lg z-50 border-b border-[#1b3456]">
        <div className="h-16 w-full px-4 md:px-6 flex items-center justify-between gap-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('perfil')}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#4edea3] text-[22px]">shield_with_house</span>
              <span className="font-bold text-xs tracking-wider text-[#e2ebff] uppercase">
                Panel de Administración • Jeyson Torres T.
              </span>
            </button>
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#081a2e] text-[#4edea3] border border-[#1b3456]">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#4edea3]">
                {isAuthenticated ? 'Sesión Autenticada • Control Total' : 'Acceso Restringido'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('perfil')}
              className="inline-flex items-center gap-1.5 text-xs text-[#a2b7d0] hover:text-[#e2ebff] transition-colors py-1.5 px-3 rounded-xl hover:bg-[#0e223b] font-medium cursor-pointer"
            >
              <span>Volver al Sitio Público</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  onNavigate('perfil');
                }}
                className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors py-1.5 px-3 rounded-xl hover:bg-red-950/40 border border-red-900/50 font-medium cursor-pointer"
                title="Cerrar sesión administrativa"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            )}

            <div className="flex items-center gap-2 pl-2 border-l border-[#1b3456]">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-[#e2ebff] leading-tight">Jeyson Torres T.</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-md bg-[#081a2e] text-[#4edea3] font-bold border border-[#1b3456] mt-0.5">
                  {isAuthenticated ? 'Superadmin' : 'Invitado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Filter visible menu items for public navigation
  const visibleNavItems = menuItems.filter((item) => item.visible);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#040b17]/90 backdrop-blur-xl border-b border-[#183152] shadow-xl">
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Logo & Branding */}
        <button
          onClick={() => onNavigate('perfil')}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity text-left focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#081a2e] flex items-center justify-center text-[#4edea3] border border-[#1d375c] shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[#f0f5ff]">JEYSON TORRES T.</span>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#4edea3]">
              Ingeniería Forense & Derecho
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 p-1.5 bg-[#061424] rounded-2xl border border-[#1a3354]">
          {visibleNavItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#102742] text-[#4edea3] border border-[#4edea3]/80 shadow-[0_2px_12px_rgba(16,185,129,0.2)]'
                    : 'text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#0d223a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Admin & Profile) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('admin-portal')}
            className={`flex items-center gap-1.5 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              isAuthenticated
                ? 'bg-[#10b981] text-[#003824] shadow-[0_4px_20px_-2px_rgba(16,185,129,0.35)] hover:bg-[#4edea3]'
                : 'bg-[#081a2e] hover:bg-[#102742] text-[#4edea3] border border-[#1e3b63]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAuthenticated ? 'shield' : 'lock'}
            </span>
            <span>{isAuthenticated ? 'Admin' : 'Acceso Admin'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-[#081a2e] text-[#e2ebff] hover:text-[#4edea3] border border-[#1e3b63] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#061424] border-b border-[#183152] px-4 py-4 flex flex-col gap-2 shadow-2xl">
          {visibleNavItems.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#102742] text-[#4edea3] border border-[#4edea3]/80'
                    : 'text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#081a2e]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};


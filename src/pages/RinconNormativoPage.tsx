import React, { useState, useEffect } from 'react';
import { Modal } from '../components/Modal';
import { useApp } from '../context/AppContext';
import { NormaItem, JurisprudenciaItem } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTransition } from '../components/SectionTransition';

interface NormaCardItemProps {
  norma: NormaItem;
  onCopy: (text: string, id: string) => void;
  copiedItem: string | null;
  onSelect: (norma: NormaItem) => void;
}

const getSubcategoryIcon = (subName: string): string => {
  const lower = subName.toLowerCase();
  if (lower.includes('constituc')) return 'account_balance';
  if (lower.includes('acciones') || lower.includes('tutela')) return 'gavel';
  if (lower.includes('estructural') || lower.includes('sistema')) return 'history_edu';
  if (lower.includes('acto') || lower.includes('legislat')) return 'policy';
  if (lower.includes('organizac') || lower.includes('estado')) return 'apartment';
  if (lower.includes('participac') || lower.includes('democracia')) return 'how_to_vote';
  if (lower.includes('derecho') || lower.includes('garant') || lower.includes('informac')) return 'shield_person';
  if (lower.includes('reciente')) return 'bolt';
  if (lower.includes('penal')) return 'balance';
  if (lower.includes('proces')) return 'find_in_page';
  return 'folder_special';
};

const NormaCardItem: React.FC<NormaCardItemProps> = ({ norma, onSelect }) => {
  const getNormaIcon = () => {
    if (norma.subcategory) {
      return getSubcategoryIcon(norma.subcategory);
    }
    if (norma.categoryId === 'constitucion') return 'account_balance';
    if (norma.categoryId === 'codigos') return 'menu_book';
    if (norma.categoryId === 'leyes') return 'description';
    if (norma.categoryId === 'jurisprudencia' || norma.categoryId === 'sentencias') return 'balance';
    return 'gavel';
  };

  return (
    <ScrollReveal direction="up">
      <div className="group relative bg-[#0e223b] hover:bg-[#112744] rounded-2xl border border-[#20395c] hover:border-[#4edea3]/80 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.22)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] overflow-hidden h-full">
        {/* Background Accent Gradient Effect */}
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-[#10b981]/10 rounded-full blur-2xl group-hover:bg-[#10b981]/25 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

        <div className="flex flex-col gap-3.5 relative z-10">
          {/* Top Header with Icon Box & Article Code */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#081a2e] text-[#4edea3] flex items-center justify-center border border-[#1b375b] shrink-0 shadow-sm group-hover:bg-[#10b981] group-hover:text-[#003824] group-hover:border-[#4edea3] group-hover:rotate-6 transition-all duration-300">
                <span className="material-symbols-outlined text-[19px]">{getNormaIcon()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-mono font-extrabold text-[#4edea3] bg-[#061424] px-2.5 py-0.5 rounded-lg border border-[#183254] shadow-xs group-hover:border-[#4edea3]/40 transition-colors">
                  {norma.code}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold tracking-wider text-[#98aed0] bg-[#07172b] px-2.5 py-0.5 rounded-lg border border-[#193254] shrink-0">
              {norma.branchTag || 'Nacional'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-extrabold text-[#e2ebff] group-hover:text-[#4edea3] transition-colors leading-snug line-clamp-2">
            {norma.title}
          </h3>

          {/* Excerpt Container - Deep Trough Contrast */}
          <p className="text-[11px] text-[#b8cbdc] leading-relaxed line-clamp-3 bg-[#061322] p-3 rounded-xl border border-[#152a45] group-hover:border-[#203a5e] transition-colors">
            {norma.excerpt}
          </p>

          {/* Requisito de Validez Probatoria Block */}
          {norma.requisito && (
            <div className="p-3 rounded-xl bg-[#061628] border-l-3 border-[#4edea3] flex flex-col gap-1 text-[11px] shadow-inner group-hover:bg-[#071b30] transition-colors">
              <span className="font-bold text-[#4edea3] uppercase text-[10px] tracking-wide flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">verified_user</span>
                <span>Requisito de Validez Probatoria:</span>
              </span>
              <p className="text-[#b8cbdc] leading-snug text-[10.5px] line-clamp-2">
                {norma.requisito}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions Button */}
        <div className="pt-3.5 mt-4 border-t border-[#183152] flex items-center justify-between gap-2 relative z-10">
          <span className="text-[10.5px] font-medium text-[#7d9ebf] truncate">
            {norma.subcategory || 'Normativa General'}
          </span>

          {norma.url ? (
            <a
              href={norma.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md hover:shadow-[0_0_16px_rgba(16,185,129,0.45)] cursor-pointer active:scale-95 shrink-0"
              title="Consultar texto oficial en el portal gubernamental"
            >
              <span>Página Oficial</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">open_in_new</span>
            </a>
          ) : (
            <button
              onClick={() => onSelect(norma)}
              className="inline-flex items-center gap-1.5 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md hover:shadow-[0_0_16px_rgba(16,185,129,0.45)] cursor-pointer active:scale-95 shrink-0"
            >
              <span>Página Oficial</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">open_in_new</span>
            </button>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export const RinconNormativoPage: React.FC = () => {
  const { normaCategories, normaItems, jurisprudencias } = useApp();

  // Active Category State (defaults to 'constitucion')
  const [activeCatId, setActiveCatId] = useState<string>('constitucion');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [publicSearchQuery, setPublicSearchQuery] = useState<string>('');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const [selectedNorma, setSelectedNorma] = useState<NormaItem | null>(null);
  const [selectedJurisprudencia, setSelectedJurisprudencia] = useState<JurisprudenciaItem | null>(null);

  // Ensure activeCatId is valid if categories change
  useEffect(() => {
    if (normaCategories.length > 0 && !normaCategories.some((c) => c.id === activeCatId)) {
      setActiveCatId(normaCategories[0].id);
    }
  }, [normaCategories, activeCatId]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const currentCategory = normaCategories.find((c) => c.id === activeCatId) || normaCategories[0];
  const isJurisprudenciaTab = activeCatId === 'jurisprudencia' || activeCatId === 'sentencias';

  // Get raw items for active category
  const rawItemsForActiveCat = normaItems.filter((i) => i.categoryId === activeCatId);

  // Filter items by search query and subcategory
  const filteredNormaItems = rawItemsForActiveCat.filter((item) => {
    const matchesSub = selectedSubcategory === 'all' || item.subcategory === selectedSubcategory;
    const q = publicSearchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      (item.subcategory || '').toLowerCase().includes(q);
    return matchesSub && matchesSearch;
  });

  // Subcategories defined for current category
  const subcategoryList =
    currentCategory?.subcategories && currentCategory.subcategories.length > 0
      ? currentCategory.subcategories
      : Array.from(new Set(rawItemsForActiveCat.map((i) => i.subcategory).filter(Boolean))) as string[];

  // Filter jurisprudencia if jurisprudencia tab is active
  const filteredJurisprudencia = jurisprudencias.filter((item) => {
    const matchesSub =
      selectedSubcategory === 'all' ||
      item.court.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
      item.categoryTag.toLowerCase().includes(selectedSubcategory.toLowerCase());
    const q = publicSearchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.radicado.toLowerCase().includes(q) ||
      item.sintesisHechos.toLowerCase().includes(q) ||
      item.ratioDecidendi.toLowerCase().includes(q);
    return matchesSub && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full bg-[#040b17] min-h-screen text-[#d6e3fe]">
      {/* Header Section */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-8 pb-6">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2.5 max-w-3xl">
              {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4edea3]">
                <span>Kiosco Normativo</span>
                <span aria-hidden="true" className="text-[#203a5e]">·</span>
                <span>Repositorio Jurídico Digital</span>
                <span aria-hidden="true" className="text-[#203a5e]">·</span>
                <span>Actualización Colombia 2026</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f0f5ff]">
                Rincón Normativo <span className="text-[#4edea3] font-normal">&</span> Repositorio Oficial
              </h1>
              <p className="text-sm md:text-base text-[#a2b7d0] leading-relaxed">
                Compendio administrable de legislación nacional, Constitución Política de Colombia, códigos actualizados, leyes especializadas y precedentes jurisprudenciales en evidencia digital y ciberseguridad.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#091a2e] border border-[#1b3456] flex flex-col gap-1 min-w-[260px] shadow-lg">
              <div className="flex items-center justify-between text-xs font-bold text-[#d0e0f8]">
                <span>Gaceta Oficial Verificada</span>
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#829ebf] pt-1">
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">travel_explore</span>
                <span>Indexación en tiempo real ({normaCategories.length} Categorías)</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Category Navigation Bar (Pestañas) */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-[#091a2e] border border-[#1d375c] p-2 rounded-2xl flex items-center gap-2.5 overflow-x-auto shadow-xl mb-6 scrollbar-none">
            {normaCategories.map((cat) => {
              const count =
                cat.id === 'jurisprudencia' || cat.id === 'sentencias'
                  ? jurisprudencias.length
                  : normaItems.filter((i) => i.categoryId === cat.id).length;

              const isSelected = activeCatId === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCatId(cat.id);
                    setSelectedSubcategory('all');
                    setPublicSearchQuery('');
                  }}
                  className={`flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-[#102742] text-[#4edea3] border border-[#4edea3]/80 shadow-[0_4px_16px_rgba(16,185,129,0.2)]'
                      : 'text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#0d223a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[19px]">{cat.icon}</span>
                  <span>{cat.title}</span>
                  <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-md bg-[#061424] text-[#4edea3] border border-[#1b3456]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Subcategory Select Dropdown & Live Search Toolbar */}
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-[#091a2e] border border-[#1d375c] p-5 rounded-2xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
            {/* 1. Subcategoría Select Dropdown */}
            {subcategoryList.length > 0 && (
              <div className="flex flex-col gap-1.5 flex-1 max-w-md">
                <label className="text-xs font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">filter_list</span>
                  <span>Subcategoría:</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full bg-[#061424] text-[#e2ebff] font-bold text-xs sm:text-sm rounded-xl px-4 py-3 border border-[#1e385e] focus:outline-none focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] appearance-none cursor-pointer shadow-inner pr-10 transition-colors"
                  >
                    <option value="all" className="bg-[#091a2e] text-[#e2ebff]">
                      Todas las Subcategorías ({rawItemsForActiveCat.length})
                    </option>
                    {subcategoryList.map((sub, idx) => {
                      const subCount = rawItemsForActiveCat.filter((i) => i.subcategory === sub).length;
                      return (
                        <option key={idx} value={sub} className="bg-[#091a2e] text-[#e2ebff]">
                          {sub} ({subCount})
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#4edea3] flex items-center">
                    <span className="material-symbols-outlined text-[20px]">unfold_more</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Live Search Input */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px]">search</span>
                <span>Buscar en {currentCategory?.title}:</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ej: Habeas Data, Código, Tutela..."
                  value={publicSearchQuery}
                  onChange={(e) => setPublicSearchQuery(e.target.value)}
                  className="w-full bg-[#061424] text-[#e2ebff] placeholder-[#607998] font-bold text-xs sm:text-sm rounded-xl pl-10 pr-9 py-3 border border-[#1e385e] focus:outline-none focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] transition-colors"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#607998] text-[18px]">
                  search
                </span>
                {publicSearchQuery && (
                  <button
                    onClick={() => setPublicSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#607998] hover:text-[#e2ebff] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3. Clear Button */}
            {(selectedSubcategory !== 'all' || publicSearchQuery) && (
              <div className="flex flex-col justify-end">
                <button
                  onClick={() => {
                    setSelectedSubcategory('all');
                    setPublicSearchQuery('');
                  }}
                  className="px-4 py-3 bg-[#112845] hover:bg-[#18355b] text-[#4edea3] text-xs font-bold rounded-xl border border-[#1f3a61] transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md active:scale-95"
                  title="Restablecer subcategoría y búsqueda"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Limpiar</span>
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Section Transition Blend */}
        <SectionTransition fromColor="#040b17" toColor="#08182b" />

        {/* MAIN TAB CONTENT: Legal Norms for Standard Categories Grouped by Subcategory */}
        {!isJurisprudenciaTab && (
          <div className="flex flex-col gap-8 mb-12">
            {/* Category Banner Title */}
            <ScrollReveal direction="up">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#1b3456] flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#081a2e] text-[#4edea3] flex items-center justify-center border border-[#1e3b63] shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">{currentCategory?.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#f0f5ff]">{currentCategory?.title}</h2>
                    <p className="text-xs text-[#8da8c7]">{currentCategory?.description}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#4edea3] bg-[#07192d] px-3.5 py-1.5 rounded-xl border border-[#1b385e]">
                  {filteredNormaItems.length} Elemento(s) en total
                </span>
              </div>
            </ScrollReveal>

            {filteredNormaItems.length === 0 ? (
              <ScrollReveal direction="up">
                <div className="p-12 text-center bg-[#091a2e] rounded-2xl border border-[#1d375c] text-[#a2b7d0] flex flex-col items-center gap-3">
                  <span className="material-symbols-outlined text-[40px] text-[#557295]">folder_off</span>
                  <p className="text-sm font-semibold">
                    No se encontraron elementos normativos con los filtros aplicados.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSubcategory('all');
                      setPublicSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold text-xs rounded-xl shadow-md cursor-pointer mt-2 transition-all active:scale-95"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              </ScrollReveal>
            ) : selectedSubcategory !== 'all' ? (
              /* Single Subcategory View */
              <div className="flex flex-col gap-4">
                <ScrollReveal direction="up">
                  <div className="flex items-center gap-2.5 bg-[#091a2e] border border-[#1d375c] px-4 py-3 rounded-2xl">
                    <span className="material-symbols-outlined text-[#4edea3] text-[20px]">folder_open</span>
                    <h3 className="text-base font-bold text-[#f0f5ff]">{selectedSubcategory}</h3>
                    <span className="text-xs font-mono font-bold text-[#4edea3] bg-[#061424] px-2.5 py-0.5 rounded-lg border border-[#183254] ml-auto">
                      {filteredNormaItems.length} ítem(s)
                    </span>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredNormaItems.map((norma) => (
                    <NormaCardItem
                      key={norma.id}
                      norma={norma}
                      onCopy={handleCopy}
                      copiedItem={copiedItem}
                      onSelect={setSelectedNorma}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* All Subcategories Grouped View */
              <div className="flex flex-col gap-10">
                {/* Loop through each defined subcategory */}
                {subcategoryList.map((subName) => {
                  const itemsInSub = filteredNormaItems.filter((i) => i.subcategory === subName);
                  if (itemsInSub.length === 0) return null;

                  return (
                    <div key={subName} className="flex flex-col gap-4">
                      {/* Subcategory Group Header */}
                      <ScrollReveal direction="up">
                        <div className="flex items-center justify-between bg-[#08182b] border border-[#1c365a] px-4 py-3 rounded-2xl shadow-sm hover:border-[#4edea3]/40 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#051322] text-[#4edea3] flex items-center justify-center border border-[#173256]">
                              <span className="material-symbols-outlined text-[19px]">{getSubcategoryIcon(subName)}</span>
                            </div>
                            <h3 className="text-base font-bold text-[#f0f5ff]">{subName}</h3>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#051322] text-[#4edea3] border border-[#183254]">
                            {itemsInSub.length} artículo(s)
                          </span>
                        </div>
                      </ScrollReveal>

                      {/* Items Grid for this Subcategory (3 columns) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {itemsInSub.map((norma) => (
                          <NormaCardItem
                            key={norma.id}
                            norma={norma}
                            onCopy={handleCopy}
                            copiedItem={copiedItem}
                            onSelect={setSelectedNorma}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Items without subcategory */}
                {(() => {
                  const itemsWithoutSub = filteredNormaItems.filter(
                    (i) => !i.subcategory || !subcategoryList.includes(i.subcategory)
                  );
                  if (itemsWithoutSub.length === 0) return null;

                  return (
                    <div className="flex flex-col gap-4">
                      <ScrollReveal direction="up">
                        <div className="flex items-center justify-between bg-[#08182b] border border-[#1c365a] px-4 py-3 rounded-2xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#051322] text-[#4edea3] flex items-center justify-center border border-[#173256]">
                              <span className="material-symbols-outlined text-[18px]">gavel</span>
                            </div>
                            <h3 className="text-base font-bold text-[#f0f5ff]">Otras Disposiciones</h3>
                          </div>
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#051322] text-[#4edea3] border border-[#183254]">
                            {itemsWithoutSub.length} artículo(s)
                          </span>
                        </div>
                      </ScrollReveal>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {itemsWithoutSub.map((norma) => (
                          <NormaCardItem
                            key={norma.id}
                            norma={norma}
                            onCopy={handleCopy}
                            copiedItem={copiedItem}
                            onSelect={setSelectedNorma}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* MAIN TAB CONTENT: Jurisprudencia Tab */}
        {isJurisprudenciaTab && (
          <div className="flex flex-col gap-6 mb-12">
            <ScrollReveal direction="up">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b3456]">
                <h2 className="text-xl font-bold text-[#f0f5ff] flex items-center gap-2">
                  <span>Jurisprudencia & Precedentes Hito en Prueba Digital</span>
                </h2>
                <span className="text-xs font-mono text-[#4edea3] bg-[#07192d] px-3 py-1 rounded-xl border border-[#1b385e]">
                  {filteredJurisprudencia.length} Sentencia(s) Indexada(s)
                </span>
              </div>
            </ScrollReveal>

            {filteredJurisprudencia.length === 0 ? (
              <ScrollReveal direction="up">
                <div className="p-8 text-center bg-[#091a2e] rounded-2xl border border-[#1d375c] text-[#a2b7d0]">
                  No hay providencias en esta categoría.
                </div>
              </ScrollReveal>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJurisprudencia.map((jur, idx) => (
                  <ScrollReveal key={jur.id} direction="up" delay={(idx % 6) * 60}>
                    <div className="group relative bg-[#0e223b] hover:bg-[#112744] rounded-2xl border border-[#20395c] hover:border-[#4edea3]/80 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-6px_rgba(16,185,129,0.22)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] overflow-hidden h-full">
                      {/* Background Ambient Glow */}
                      <div className="absolute -right-10 -top-10 w-28 h-28 bg-[#10b981]/10 rounded-full blur-2xl group-hover:bg-[#10b981]/25 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                      <div className="flex flex-col gap-4 relative z-10">
                        {/* Radicado & Court Header */}
                        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#183152]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#081a2e] text-[#4edea3] flex items-center justify-center border border-[#1b375b] group-hover:rotate-6 transition-transform">
                              <span className="material-symbols-outlined text-[18px]">gavel</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#4edea3] bg-[#061424] px-2 py-0.5 rounded-lg border border-[#183254]">
                              {jur.radicado}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#d0e0f8] bg-[#061424] px-2.5 py-1 rounded-md border border-[#193254]">
                            {jur.court} • {jur.year}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#f0f5ff] group-hover:text-[#4edea3] transition-colors leading-snug">
                          {jur.title}
                        </h3>

                        {/* Tag metadata line */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#8ba7ca]">
                          {jur.tags.map((t, tIdx) => (
                            <span key={tIdx} className="text-[10.5px] font-semibold text-[#84c39b] bg-[#07182b] px-2 py-0.5 rounded-md border border-[#152a45]">
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Síntesis de hechos */}
                        <div className="p-3.5 rounded-xl bg-[#061322] border border-[#152a45] group-hover:border-[#203a5e] transition-colors text-xs text-[#a2b7d0] leading-relaxed">
                          <span className="font-bold text-[#f0f5ff] block mb-1">Síntesis de los Hechos:</span>
                          {jur.sintesisHechos}
                        </div>

                        {/* Ratio Decidendi */}
                        <div className="p-3.5 rounded-xl bg-[#061628] border-l-3 border-[#4edea3] text-xs text-[#e2ebff] leading-relaxed shadow-inner">
                          <span className="font-bold text-[#4edea3] block mb-1">Ratio Decidendi:</span>
                          {jur.ratioDecidendi}
                        </div>

                        {/* Comentario Torres */}
                        <div className="p-3.5 rounded-xl bg-[#05111d] border border-[#152842] text-xs text-[#a2b7d0] leading-relaxed">
                          <span className="font-bold text-[#4edea3] block mb-1">Análisis Pericial de Jeyson Torres:</span>
                          {jur.comentarioTorres}
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="pt-4 mt-6 border-t border-[#183152] flex items-center justify-between gap-3 relative z-10">
                        <button
                          onClick={() => handleCopy(jur.ratioDecidendi, jur.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#061424] hover:bg-[#102742] text-[#4edea3] text-xs font-bold transition-all border border-[#193254] hover:border-[#4edea3]/50 cursor-pointer active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[15px]">content_copy</span>
                          <span>{copiedItem === jur.id ? '¡Ratio Copiada!' : 'Copiar Ratio'}</span>
                        </button>

                        <button
                          onClick={() => setSelectedJurisprudencia(jur)}
                          className="inline-flex items-center gap-1.5 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-[0_0_16px_rgba(16,185,129,0.45)] cursor-pointer active:scale-95 shrink-0"
                        >
                          <span>Ficha Sentencia</span>
                          <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">open_in_new</span>
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legal Norma Detail Modal */}
      {selectedNorma && (
        <Modal
          isOpen={!!selectedNorma}
          onClose={() => setSelectedNorma(null)}
          title={selectedNorma.title}
          subtitle={`Código / Norma: ${selectedNorma.code}`}
          badge="REPOSITORIO OFICIAL"
        >
          <div className="flex flex-col gap-6 text-xs sm:text-sm text-[#e2ebff]">
            <div className="p-4 rounded-xl bg-[#061322] border-l-4 border-[#4edea3] leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4edea3] mb-2">
                Texto Legal Completo:
              </h4>
              <p>{selectedNorma.fullText}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#05111d] border border-[#152842]">
                <h5 className="font-bold text-[#4edea3] mb-1">Requisito de Validez Probatoria:</h5>
                <p className="text-xs text-[#a2b7d0]">{selectedNorma.requisito}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#05111d] border border-[#152842]">
                <h5 className="font-bold text-[#4edea3] mb-1">Precedente Jurisprudencial:</h5>
                <p className="text-xs text-[#a2b7d0]">{selectedNorma.jurisprudencia}</p>
              </div>
            </div>

            {selectedNorma.concordancia && (
              <div className="p-3 rounded-xl bg-[#061424] border border-[#183254] text-xs text-[#a2b7d0]">
                <span className="font-bold text-[#4edea3]">Concordancias Normativas: </span>
                {selectedNorma.concordancia}
              </div>
            )}

            {selectedNorma.url && (
              <div className="p-3.5 rounded-xl bg-[#05111d] border border-[#152842] flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#4edea3] font-bold">
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                  <span>Consulta Directa en Portal Oficial:</span>
                </div>
                <a
                  href={selectedNorma.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold px-4 py-2 rounded-xl transition-all shadow cursor-pointer text-xs"
                >
                  <span>Abrir Texto Oficial</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-[#183152] flex justify-end">
              <button
                onClick={() => setSelectedNorma(null)}
                className="bg-[#102742] hover:bg-[#18355b] text-[#e2ebff] font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Jurisprudencia Detail Modal */}
      {selectedJurisprudencia && (
        <Modal
          isOpen={!!selectedJurisprudencia}
          onClose={() => setSelectedJurisprudencia(null)}
          title={selectedJurisprudencia.title}
          subtitle={`Radicado: ${selectedJurisprudencia.radicado} • ${selectedJurisprudencia.court}`}
          badge="SENTENCIA HITO"
        >
          <div className="flex flex-col gap-5 text-xs sm:text-sm text-[#e2ebff]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[#05111d] border border-[#152842] text-xs">
              <div>
                <span className="text-[#8da8c7] block">Corporación:</span>
                <span className="font-bold text-[#4edea3]">{selectedJurisprudencia.court}</span>
              </div>
              <div>
                <span className="text-[#8da8c7] block">Sala / Magistrado:</span>
                <span className="font-bold text-[#e2ebff]">{selectedJurisprudencia.sala} • {selectedJurisprudencia.magistrado}</span>
              </div>
              <div>
                <span className="text-[#8da8c7] block">Año de Providencia:</span>
                <span className="font-bold text-[#e2ebff]">{selectedJurisprudencia.year}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#061322] border border-[#152a45] leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4edea3] mb-1">
                Síntesis de los Hechos:
              </h4>
              <p className="text-xs text-[#a2b7d0]">{selectedJurisprudencia.sintesisHechos}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#061628] border-l-4 border-[#4edea3] leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4edea3] mb-1">
                Ratio Decidendi:
              </h4>
              <p className="text-xs text-[#e2ebff]">{selectedJurisprudencia.ratioDecidendi}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#05111d] border border-[#152842] leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4edea3] mb-1">
                Análisis Pericial de Jeyson Torres:
              </h4>
              <p className="text-xs text-[#a2b7d0]">{selectedJurisprudencia.comentarioTorres}</p>
            </div>

            {selectedJurisprudencia.reglaProbatoria && (
              <div className="p-3.5 rounded-xl bg-[#061e14] border border-[#0f5132] text-xs text-[#4edea3]">
                <span className="font-bold block mb-1">Regla Probatoria Vinculante:</span>
                <p className="text-[#e2ebff]">{selectedJurisprudencia.reglaProbatoria}</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#183152] flex justify-end">
              <button
                onClick={() => setSelectedJurisprudencia(null)}
                className="bg-[#102742] hover:bg-[#18355b] text-[#e2ebff] font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { JurisprudenciaItem } from '../types';
import { Modal } from '../components/Modal';
import { useApp } from '../context/AppContext';

export const AnalisisJuridicoPage: React.FC = () => {
  const { jurisprudencias } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourtType, setActiveCourtType] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<JurisprudenciaItem | null>(null);

  const filteredItems = jurisprudencias.filter((item) => {
    const matchesCourt = activeCourtType === 'all' || item.courtType === activeCourtType;
    const matchesSearch =
      item.radicado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sintesisHechos.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ratioDecidendi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.comentarioTorres.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCourt && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full bg-[#040b17] min-h-screen text-[#d6e3fe]">
      {/* Page Header */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2.5 max-w-3xl">
            {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#4edea3]">
              <span>Jurisprudencia Especializada</span>
              <span aria-hidden="true" className="text-[#203a5e]">·</span>
              <span>Dogmática Digital</span>
              <span aria-hidden="true" className="text-[#203a5e]">·</span>
              <span>Altas Cortes Colombia</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f0f5ff]">
              Análisis Jurídico <span className="text-[#4edea3] font-normal">&</span> Precedente Probatorio
            </h1>
            <p className="text-sm md:text-base text-[#a2b7d0] leading-relaxed">
              Líneas jurisprudenciales de las Altas Cortes sobre prueba electrónica, validez de mensajes de datos y estándares de valoración en juicio oral.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#091a2e] border border-[#1d375c] flex flex-col gap-1 min-w-[280px] shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold text-[#d0e0f8]">
              <span>Corte de Referencia</span>
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">balance</span>
            </div>
            <span className="text-xs font-bold text-[#f0f5ff]">Sistemas Probatorios Nacionales</span>
            <span className="text-[11px] text-[#4edea3] font-mono">Estandarización de Providencias</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#091a2e] rounded-2xl p-4 border border-[#1d375c] shadow-xl mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#607998] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por radicado, corte, magistrado o tema (Ej: SP-1284, WhatsApp, Cadena de Custodia)..."
              className="w-full bg-[#061424] text-[#e2ebff] placeholder-[#607998] text-xs sm:text-sm font-bold rounded-xl pl-11 pr-4 py-3 border border-[#1e385e] focus:outline-none focus:border-[#4edea3]"
            />
          </div>

          <div className="md:col-span-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCourtType('all')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCourtType === 'all'
                  ? 'bg-[#10b981] text-[#003824] shadow-md'
                  : 'bg-[#061424] text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#081a2e] border border-[#183254]'
              }`}
            >
              Todas las Cortes ({jurisprudencias.length})
            </button>
            <button
              onClick={() => setActiveCourtType('suprema')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCourtType === 'suprema'
                  ? 'bg-[#10b981] text-[#003824] shadow-md'
                  : 'bg-[#061424] text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#081a2e] border border-[#183254]'
              }`}
            >
              Corte Suprema
            </button>
            <button
              onClick={() => setActiveCourtType('constitucional')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCourtType === 'constitucional'
                  ? 'bg-[#10b981] text-[#003824] shadow-md'
                  : 'bg-[#061424] text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#081a2e] border border-[#183254]'
              }`}
            >
              Corte Constitucional
            </button>
            <button
              onClick={() => setActiveCourtType('estado')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCourtType === 'estado'
                  ? 'bg-[#10b981] text-[#003824] shadow-md'
                  : 'bg-[#061424] text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#081a2e] border border-[#183254]'
              }`}
            >
              Consejo de Estado
            </button>
          </div>
        </div>

        {/* Standardized Providencias List */}
        <div className="flex flex-col gap-8 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e223b] rounded-2xl border border-[#20395c] p-6 md:p-8 flex flex-col gap-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] hover:border-[#4edea3]/80 transition-all"
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#183152]">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-lg bg-[#061424] text-[#4edea3] text-xs font-bold border border-[#183254]">
                    {item.court}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#081a2e] text-[#e2ebff] text-xs font-mono border border-[#1b3456]">
                    Rad: {item.radicado}
                  </span>
                  <span className="text-xs text-[#8ba7ca] font-mono">
                    M.P. {item.magistrado} • {item.year}
                  </span>
                </div>

                <span className="text-xs font-mono text-[#4edea3] bg-[#061424] px-3 py-1 rounded-lg border border-[#183254]">
                  Hash: {item.hash}
                </span>
              </div>

              {/* Title & Category Tag */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4edea3] mb-1 block">
                  {item.categoryTag}
                </span>
                <h2
                  onClick={() => setSelectedItem(item)}
                  className="text-2xl font-extrabold text-[#f0f5ff] hover:text-[#4edea3] transition-colors cursor-pointer"
                >
                  {item.title}
                </h2>
              </div>

              {/* Standardized 3-Column Layout with Deep Troughs */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Column 1: Síntesis de Hechos */}
                <div className="p-5 rounded-xl bg-[#061322] border border-[#152a45] flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-[#4edea3] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">article</span>
                    <span>Síntesis de Hechos & Contexto:</span>
                  </span>
                  <p className="text-xs text-[#a2b7d0] leading-relaxed">
                    {item.sintesisHechos}
                  </p>
                </div>

                {/* Column 2: Ratio Decidendi */}
                <div className="p-5 rounded-xl bg-[#061628] border-l-3 border-[#4edea3] flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-[#4edea3] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">gavel</span>
                    <span>Ratio Decidendi (Tesis de la Corte):</span>
                  </span>
                  <p className="text-xs text-[#e2ebff] leading-relaxed">
                    {item.ratioDecidendi}
                  </p>
                </div>

                {/* Column 3: Comentario Pericial */}
                <div className="p-5 rounded-xl bg-[#05111d] border border-[#152842] flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase text-[#4edea3] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">rate_review</span>
                    <span>Análisis Pericial Jeyson Torres T.:</span>
                  </span>
                  <p className="text-xs text-[#a2b7d0] leading-relaxed">
                    {item.comentarioTorres}
                  </p>
                </div>
              </div>

              {/* Tags & Action Button */}
              <div className="pt-4 border-t border-[#183152] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#061424] text-[#8ba7ca] text-[11px] font-mono border border-[#183254]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <span>Ver Providencia Completa</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standardized Providencia Detail Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
          subtitle={`${selectedItem.court} • Radicado: ${selectedItem.radicado} • M.P. ${selectedItem.magistrado}`}
          badge="ESTÁNDAR JURISPRUDENCIAL"
        >
          <div className="flex flex-col gap-6 text-xs sm:text-sm text-[#e2ebff]">
            <div className="p-4 rounded-xl bg-[#061322] border border-[#152a45] font-mono text-xs flex justify-between items-center text-[#4edea3]">
              <span>Hash de Firma Criptográfica:</span>
              <span className="truncate max-w-[300px]">{selectedItem.hash}</span>
            </div>

            <div className="p-5 rounded-xl bg-[#05111d] border border-[#152842] leading-relaxed space-y-2">
              <h4 className="font-bold text-[#4edea3] uppercase text-xs">Síntesis de Hechos y Planteamiento:</h4>
              <p className="text-[#a2b7d0]">{selectedItem.sintesisHechos}</p>
            </div>

            <div className="p-5 rounded-xl bg-[#061628] border-l-4 border-[#4edea3] leading-relaxed space-y-2">
              <h4 className="font-bold text-[#4edea3] uppercase text-xs">Ratio Decidendi y Tesis Jurídica de la Corte:</h4>
              <p className="text-[#e2ebff]">{selectedItem.ratioDecidendi}</p>
            </div>

            {selectedItem.reglaProbatoria && (
              <div className="p-5 rounded-xl bg-[#061e14] border border-[#0f5132] leading-relaxed space-y-2">
                <h4 className="font-bold text-[#4edea3] uppercase text-xs">Regla Probatoria Estándar Requerida:</h4>
                <p className="text-[#e2ebff]">{selectedItem.reglaProbatoria}</p>
              </div>
            )}

            <div className="p-5 rounded-xl bg-[#05111d] border border-[#152842] leading-relaxed space-y-2">
              <h4 className="font-bold text-[#4edea3] uppercase text-xs">Análisis Técnico y Dictamen Pericial (Jeyson Torres T.):</h4>
              <p className="text-[#a2b7d0]">{selectedItem.comentarioTorres}</p>
            </div>

            <div className="pt-4 border-t border-[#183152] flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-[#102742] hover:bg-[#18355b] text-[#e2ebff] font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar Providencia
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


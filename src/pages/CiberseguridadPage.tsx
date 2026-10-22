import React, { useState } from 'react';
import { Article } from '../types';
import { Modal } from '../components/Modal';
import { useApp } from '../context/AppContext';
import { ArticleGraphic } from '../components/ArticleGraphic';
import { ScrollReveal } from '../components/ScrollReveal';

export const CiberseguridadPage: React.FC = () => {
  const { articles } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', label: 'Todos los Artículos' },
    { id: 'forense', label: 'Informática Forense' },
    { id: 'ia-derecho', label: 'IA & Derecho' },
    { id: 'evidencia-digital', label: 'Evidencia Digital' },
    { id: 'ciberdelincuencia', label: 'Ciberdelincuencia' },
    { id: 'proteccion-datos', label: 'Protección de Datos' },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.ref.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const heroArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail.trim()) {
      setSubscribedSuccess(true);
      setSubscriberEmail('');
      setTimeout(() => setSubscribedSuccess(false), 5000);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#040b17] min-h-screen text-[#d6e3fe]">
      {/* Page Header */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-8 pb-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2.5 max-w-3xl">
              {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#4edea3]">
                <span>Repositorio Técnico & Dogmático</span>
                <span aria-hidden="true" className="text-[#203a5e]">·</span>
                <span>Ciberseguridad</span>
                <span aria-hidden="true" className="text-[#203a5e]">·</span>
                <span>Informática Forense</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f0f5ff]">
                Ciberseguridad, Forense <span className="text-[#4edea3] font-normal">&</span> Nuevas Tecnologías
              </h1>
              <p className="text-sm md:text-base text-[#a2b7d0] leading-relaxed">
                Artículos técnicos, guías forenses y reflexiones dogmáticas sobre ciberamenazas e informática applied al derecho probatorio.
              </p>
            </div>

            {/* Quick Search Widget */}
            <div className="p-4 rounded-2xl bg-[#091a2e] border border-[#1d375c] flex flex-col gap-2 min-w-[300px] shadow-lg">
              <div className="flex items-center justify-between text-xs font-bold text-[#d0e0f8]">
                <span>Buscador Rápido</span>
                <kbd className="px-2 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] text-[10px] font-mono border border-[#183254]">
                  ⌘K
                </kbd>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#607998] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar por término, norma o hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#061424] text-[#e2ebff] placeholder-[#607998] text-xs font-bold rounded-xl pl-9 pr-3 py-2.5 border border-[#1e385e] focus:outline-none focus:border-[#4edea3]"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#183152] mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#10b981] text-[#003824] shadow-[0_4px_16px_rgba(16,185,129,0.35)]'
                  : 'bg-[#091a2e] text-[#9ab1cd] hover:text-[#f0f5ff] hover:bg-[#0d223a] border border-[#1d375c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Hero Featured Article */}
        {heroArticle && (
          <div className="bg-[#0e223b] rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 flex-wrap text-xs text-[#8ba7ca]">
                  <span className="px-3 py-1 rounded-lg bg-[#061424] text-[#4edea3] text-xs font-bold border border-[#183254]">
                    {heroArticle.categoryLabel}
                  </span>
                  <span>{heroArticle.date}</span>
                  <span aria-hidden="true" className="text-[#203a5e]">·</span>
                  <span>{heroArticle.readTime}</span>
                  <span aria-hidden="true" className="text-[#203a5e]">·</span>
                  <span className="font-mono text-[#4edea3]">
                    REF: {heroArticle.ref}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-[#f0f5ff] leading-tight hover:text-[#4edea3] transition-colors cursor-pointer" onClick={() => setSelectedArticle(heroArticle)}>
                  {heroArticle.title}
                </h2>

                <p className="text-sm md:text-base text-[#a2b7d0] leading-relaxed bg-[#061322] p-4 rounded-xl border border-[#152a45]">
                  {heroArticle.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#183152] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8ba7ca]">
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">fingerprint</span>
                  <span className="truncate max-w-[200px] sm:max-w-[300px]">
                    Hash: {heroArticle.hash}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedArticle(heroArticle)}
                  className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <span>Leer Artículo Completo</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#061424] relative min-h-[260px] lg:min-h-full flex items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-[#1d375c]">
              {heroArticle.imageUrl &&
              !heroArticle.imageUrl.includes('Image_5_a1301cf4') &&
              !heroArticle.imageUrl.includes('screenshot_1_84f0b5b4') &&
              !heroArticle.imageUrl.includes('image_1586eacf') ? (
                <img
                  src={heroArticle.imageUrl}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover rounded-xl border border-[#183254]"
                />
              ) : (
                <ArticleGraphic
                  category={heroArticle.category}
                  title={heroArticle.title}
                  refCode={heroArticle.ref}
                  hash={heroArticle.hash}
                />
              )}
            </div>
          </div>
        )}

        {/* Articles Grid Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#183152]">
          <h3 className="text-xl font-bold text-[#f0f5ff] flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">article</span>
            <span>Publicaciones y Guías Periciales ({filteredArticles.length})</span>
          </h3>
          <span className="text-xs text-[#8ba7ca] font-mono">
            Ordenado por fecha de publicación
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {gridArticles.map((art) => (
            <div
              key={art.id}
              className="bg-[#0e223b] hover:bg-[#112744] rounded-2xl border border-[#20395c] hover:border-[#4edea3]/80 p-6 flex flex-col justify-between transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] text-[10.5px] font-bold border border-[#183254]">
                    {art.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-[#8ba7ca]">{art.date}</span>
                </div>

                <h4
                  onClick={() => setSelectedArticle(art)}
                  className="text-base font-bold text-[#f0f5ff] group-hover:text-[#4edea3] transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {art.title}
                </h4>

                <p className="text-xs text-[#a2b7d0] line-clamp-3 leading-relaxed bg-[#061322] p-3 rounded-xl border border-[#152a45]">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#183152] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-[#8ba7ca]">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>{art.readTime}</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(art)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#4edea3] hover:text-[#78f1c1] transition-colors cursor-pointer"
                >
                  <span>Ver Detalle</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / Bulletin Subscription */}
        <div className="bg-[#091a2e] rounded-2xl border border-[#1d375c] p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Boletín de Actualización Legal & Ciberseguridad</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#f0f5ff]">
              Reciba las novedades en dictámenes, sentencias y guías forenses
            </h3>
            <p className="text-sm text-[#a2b7d0]">
              Suscríbase para recibir análisis técnico-jurídicos sobre los fallos más recientes y evoluciones en prueba digital.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]">
            <input
              type="email"
              required
              placeholder="Su correo electrónico profesional..."
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              className="px-4 py-3 bg-[#061424] text-[#e2ebff] placeholder-[#607998] text-xs sm:text-sm font-bold rounded-xl border border-[#1e385e] focus:outline-none focus:border-[#4edea3] flex-1 min-w-[240px]"
            />
            <button
              type="submit"
              className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap shadow-md cursor-pointer"
            >
              Suscribirse
            </button>
          </form>

          {subscribedSuccess && (
            <div className="w-full bg-[#081a2e] text-[#4edea3] p-3.5 rounded-xl text-xs font-bold text-center border border-[#1b3456]">
              ✓ Suscripción confirmada correctamente. Recibirá los boletines periódicos.
            </div>
          )}
        </div>
      </div>

      {/* Article Full Detail Modal */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          subtitle={`${selectedArticle.categoryLabel} • ${selectedArticle.date} • ${selectedArticle.readTime}`}
          badge={`REF: ${selectedArticle.ref}`}
        >
          <div className="flex flex-col gap-6 text-xs sm:text-sm text-[#e2ebff]">
            <div className="p-4 rounded-xl bg-[#061322] border border-[#152a45] flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#a2b7d0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified</span>
                <span>Firma SHA-256: {selectedArticle.hash}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg bg-[#081a2e] text-[#4edea3] font-bold border border-[#183254]">
                {selectedArticle.tag}
              </span>
            </div>

            {selectedArticle.imageUrl &&
            !selectedArticle.imageUrl.includes('Image_5_a1301cf4') &&
            !selectedArticle.imageUrl.includes('screenshot_1_84f0b5b4') &&
            !selectedArticle.imageUrl.includes('image_1586eacf') ? (
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full max-h-[320px] object-cover rounded-xl border border-[#183254]"
              />
            ) : (
              <ArticleGraphic
                category={selectedArticle.category}
                title={selectedArticle.title}
                refCode={selectedArticle.ref}
                hash={selectedArticle.hash}
              />
            )}

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#e2ebff] leading-relaxed space-y-4">
              <p className="text-sm font-semibold text-[#4edea3]">
                {selectedArticle.summary}
              </p>

              <div className="bg-[#061322] p-5 rounded-xl border-l-4 border-[#4edea3] whitespace-pre-line text-xs sm:text-sm">
                {selectedArticle.fullContent || selectedArticle.summary}
              </div>
            </div>

            <div className="pt-4 border-t border-[#183152] flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#102742] hover:bg-[#18355b] text-[#e2ebff] font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar Artículo
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


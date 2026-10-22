import React, { useState } from 'react';
import { AcademicResource, PageView } from '../types';
import { Modal } from '../components/Modal';
import { useApp } from '../context/AppContext';

interface AulaAbiertaPageProps {
  onNavigate: (page: PageView) => void;
}

export const AulaAbiertaPage: React.FC<AulaAbiertaPageProps> = ({ onNavigate }) => {
  const { academicResources } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<AcademicResource | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSubject, setRequestSubject] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  const filteredResources = academicResources.filter((res) => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || res.year === selectedYear;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestSubject.trim()) {
      setRequestSuccess(true);
      setTimeout(() => {
        setRequestSuccess(false);
        setRequestModalOpen(false);
        setRequestSubject('');
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#040b17] min-h-screen text-[#d6e3fe]">
      {/* Header Banner */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2.5 max-w-3xl">
            {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#4edea3]">
              <span>Aula Abierta</span>
              <span aria-hidden="true" className="text-[#203a5e]">·</span>
              <span>Repositorio Universitario</span>
              <span aria-hidden="true" className="text-[#203a5e]">·</span>
              <span>Producción Académica</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f0f5ff]">
              Producción y Trayectoria Académica
            </h1>
            <p className="text-sm md:text-base text-[#a2b7d0] leading-relaxed">
              Diapositivas de clase, proyectos de investigación, sílabos de asignaturas universitarias y guías prácticas de laboratorio creados por Jeyson Torres T.
            </p>
          </div>

          <button
            onClick={() => setRequestModalOpen(true)}
            className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 w-fit cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>Solicitar Material Específico</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#091a2e] rounded-2xl p-4 border border-[#1d375c] shadow-xl mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#607998] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por asignatura, proyecto o tema (Ej: Forense I, Malware, WhatsApp)..."
              className="w-full bg-[#061424] text-[#e2ebff] placeholder-[#607998] text-xs sm:text-sm font-bold rounded-xl pl-11 pr-4 py-3 border border-[#1e385e] focus:outline-none focus:border-[#4edea3]"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#061424] text-[#e2ebff] text-xs font-bold rounded-xl px-3 py-3 border border-[#1e385e] focus:outline-none focus:border-[#4edea3] cursor-pointer"
            >
              <option value="all" className="bg-[#091a2e]">Todas las Categorías</option>
              <option value="diapositivas" className="bg-[#091a2e]">Diapositivas y Presentaciones</option>
              <option value="proyectos" className="bg-[#091a2e]">Proyectos de Investigación</option>
              <option value="evaluaciones" className="bg-[#091a2e]">Sílabos y Guías de Clase</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-[#061424] text-[#e2ebff] text-xs font-bold rounded-xl px-3 py-3 border border-[#1e385e] focus:outline-none focus:border-[#4edea3] cursor-pointer"
            >
              <option value="all" className="bg-[#091a2e]">Todos los Años Lectivos</option>
              <option value="2025" className="bg-[#091a2e]">Año Lectivo 2025</option>
              <option value="2024" className="bg-[#091a2e]">Año Lectivo 2024</option>
              <option value="2023" className="bg-[#091a2e]">Año Lectivo 2023</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#0e223b] hover:bg-[#112744] rounded-2xl border border-[#20395c] hover:border-[#4edea3]/80 p-6 flex flex-col justify-between transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] text-[10.5px] font-bold border border-[#183254]">
                    {res.badge}
                  </span>
                  <span className="text-[11px] font-mono text-[#8ba7ca]">
                    {res.subject} • {res.year}
                  </span>
                </div>

                {res.imageUrl && (
                  <img
                    src={res.imageUrl}
                    alt={res.title}
                    className="w-full h-36 object-cover rounded-xl border border-[#183254]"
                  />
                )}

                <h3
                  onClick={() => setSelectedResource(res)}
                  className="text-base font-bold text-[#f0f5ff] group-hover:text-[#4edea3] transition-colors cursor-pointer line-clamp-2"
                >
                  {res.title}
                </h3>

                <p className="text-xs text-[#a2b7d0] line-clamp-3 leading-relaxed bg-[#061322] p-3 rounded-xl border border-[#152a45]">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#183152] flex items-center justify-between">
                <span className="text-[11px] text-[#8ba7ca] font-mono">
                  {res.slidesCountOrTech || res.pdfSize || 'Recurso Académico'}
                </span>

                <button
                  onClick={() => setSelectedResource(res)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#4edea3] hover:text-[#78f1c1] cursor-pointer"
                >
                  <span>Vista Previa</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner to Simulators */}
        <div className="bg-[#091a2e] rounded-2xl border border-[#1d375c] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">
              PRÁCTICA PROCESAL EN VIVO
            </span>
            <h3 className="text-2xl font-extrabold text-[#f0f5ff]">
              Pon a prueba tus conocimientos en los Simuladores Procesales
            </h3>
            <p className="text-sm text-[#a2b7d0]">
              Entrena tus habilidades en cadena de custodia, hashing y contrainterrogatorios periciales en tiempo real.
            </p>
          </div>

          <button
            onClick={() => onNavigate('simuladores')}
            className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Ir a Simuladores</span>
            <span className="material-symbols-outlined text-[18px]">sports_esports</span>
          </button>
        </div>
      </div>

      {/* Resource View Modal */}
      {selectedResource && (
        <Modal
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
          title={selectedResource.title}
          subtitle={`Materia: ${selectedResource.subject} • Ciclo: ${selectedResource.cycle} • Año ${selectedResource.year}`}
          badge={selectedResource.badge}
        >
          <div className="flex flex-col gap-6 text-xs sm:text-sm text-[#e2ebff]">
            {selectedResource.imageUrl && (
              <img
                src={selectedResource.imageUrl}
                alt={selectedResource.title}
                className="w-full max-h-[260px] object-cover rounded-xl border border-[#183254]"
              />
            )}

            <div className="p-4 rounded-xl bg-[#061322] border border-[#152a45]">
              <h4 className="font-bold text-[#4edea3] uppercase text-xs mb-2">Descripción del Recurso:</h4>
              <p className="text-[#e2ebff] leading-relaxed">{selectedResource.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#05111d] border border-[#152842] font-mono text-xs flex justify-between items-center text-[#4edea3]">
              <span>Hash o Código de Referencia:</span>
              <span className="truncate max-w-[280px]">{selectedResource.hashOrRepo || 'VERIFIED-RES'}</span>
            </div>

            <div className="pt-4 border-t border-[#183152] flex justify-end gap-3">
              <button
                onClick={() => setSelectedResource(null)}
                className="bg-[#102742] hover:bg-[#18355b] text-[#e2ebff] font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Request Resource Modal */}
      {requestModalOpen && (
        <Modal
          isOpen={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          title="Solicitud de Material Académico"
          subtitle="Para docentes, estudiantes e investigadores universitarios"
          badge="PETICIÓN ACADÉMICA"
        >
          <form onSubmit={handleSendRequest} className="flex flex-col gap-4 text-xs sm:text-sm text-[#e2ebff]">
            <p className="text-xs text-[#a2b7d0]">
              Especifique la materia, el tema o la guía técnica que requiere. Le responderemos directamente a su correo institucional.
            </p>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#4edea3] uppercase">Asignatura o Tema Requerido:</label>
              <input
                type="text"
                required
                placeholder="Ej: Guía de laboratorio sobre volcados de RAM con Volatility..."
                value={requestSubject}
                onChange={(e) => setRequestSubject(e.target.value)}
                className="p-3 bg-[#061424] rounded-xl text-xs text-[#e2ebff] border border-[#1e385e] focus:outline-none focus:border-[#4edea3] font-bold"
              />
            </div>

            {requestSuccess ? (
              <div className="bg-[#081a2e] text-[#4edea3] p-3.5 rounded-xl text-xs font-bold text-center border border-[#1b3456]">
                ✓ Solicitud registrada. Recibirá respuesta en su correo institucional.
              </div>
            ) : (
              <div className="pt-4 border-t border-[#183152] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="bg-[#102742] hover:bg-[#18355b] text-[#e2ebff] text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Enviar Petición
                </button>
              </div>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};


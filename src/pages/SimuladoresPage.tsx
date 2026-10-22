import React, { useState, useEffect } from 'react';
import { PageView, SimulatorCase } from '../types';
import { useApp } from '../context/AppContext';

interface SimuladoresPageProps {
  onNavigate: (page: PageView) => void;
}

export const SimuladoresPage: React.FC<SimuladoresPageProps> = ({ onNavigate }) => {
  const { simulators } = useApp();

  // Filters state
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'concurso' | 'idoneidad' | 'rama'>('all');
  const [selectedRamaFilter, setSelectedRamaFilter] = useState<string>('all');
  const [selectedConcursoFilter, setSelectedConcursoFilter] = useState<string>('all');

  // Active Simulation State
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(100);
  const [attempts, setAttempts] = useState<number>(1);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);

  // Filtered simulators list
  const filteredSimulators = simulators.filter((s) => {
    const matchesType =
      activeTypeFilter === 'all' ||
      (activeTypeFilter === 'concurso' && s.simulatorType === 'concurso') ||
      (activeTypeFilter === 'idoneidad' && (s.isExamenIdoneidad || s.simulatorType === 'idoneidad')) ||
      (activeTypeFilter === 'rama' && s.simulatorType === 'rama');

    const matchesRama = selectedRamaFilter === 'all' || s.ramaDerecho.toLowerCase() === selectedRamaFilter.toLowerCase();
    const matchesConcurso =
      selectedConcursoFilter === 'all' || (s.concursoName && s.concursoName.toLowerCase().includes(selectedConcursoFilter.toLowerCase()));

    return matchesType && matchesRama && matchesConcurso;
  });

  const currentCase: SimulatorCase | undefined = filteredSimulators[activeCaseIndex] || filteredSimulators[0] || simulators[0];

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, [activeCaseIndex, activeTypeFilter, selectedRamaFilter]);

  const handleOptionSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (showFeedback) return;
    setSelectedOption(key);
  };

  const handleValidate = () => {
    if (!selectedOption || !currentCase) return;
    setShowFeedback(true);

    const chosenOption = currentCase.options.find((o) => o.key === selectedOption);
    if (!chosenOption?.isCorrect) {
      setScore((prev) => Math.max(0, prev - 20));
    }

    if (activeTypeFilter === 'idoneidad' && activeCaseIndex >= filteredSimulators.length - 1) {
      setExamCompleted(true);
    }
  };

  const handleRestartCase = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setAttempts((prev) => prev + 1);
  };

  const selectedOptionObj = currentCase?.options.find((o) => o.key === selectedOption);
  const isCorrectAnswer = selectedOptionObj?.isCorrect === true;

  // Unique list of concursos for dropdown
  const concursosList = Array.from(new Set(simulators.map((s) => s.concursoName).filter(Boolean))) as string[];

  return (
    <div className="flex flex-col w-full">
      {/* Simulation Top Status Bar */}
      <div className="w-full bg-[#091829] border-b border-[#182e4a] py-3 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            <span className="text-xs font-mono font-bold text-[#4edea3] uppercase tracking-wider">
              SISTEMA DE EVALUACIÓN & SIMULACIÓN PROCESAL • MÓDULO INTERACTIVO
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#bbcabf]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[16px]">timer</span>
              <span>Tiempo Límite: {currentCase?.timeLimit || '05:00 MIN'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[16px]">workspace_premium</span>
              <span>Score Acreditación: <strong className="text-[#4edea3]">{score} / 100 PTS</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-8 pb-16">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4edea3]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>CONCURSOS, RAMAS DEL DERECHO & EXAMEN DE IDONEIDAD</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#e2ebff]">
              Simuladores Procesales <span className="text-[#4edea3] font-normal">&</span> Acreditación Pericial
            </h1>
            <p className="text-base text-[#91a7c4] leading-relaxed">
              Escenarios tácticos interactivos diseñados para la preparación de concursos de méritos (Rama Judicial, CTI), evaluación por rama del derecho y examen de idoneidad pericial.
            </p>
          </div>
        </div>

        {/* Master Filters Bar: Categories, Concursos, Ramas, Examen Idoneidad */}
        <div className="bg-[#0e223b] rounded-2xl p-4 border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] mb-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Filter Type Buttons */}
          <div className="lg:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => {
                setActiveTypeFilter('all');
                setActiveCaseIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeTypeFilter === 'all'
                  ? 'bg-[#10b981] text-[#003824] border-[#4edea3] shadow-md'
                  : 'bg-[#08182b] text-[#bbcabf] border-[#1b3456] hover:text-[#e2ebff] hover:bg-[#0e223b]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">apps</span>
              <span>Todos ({simulators.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTypeFilter('concurso');
                setActiveCaseIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeTypeFilter === 'concurso'
                  ? 'bg-[#10b981] text-[#003824] border-[#4edea3] shadow-md'
                  : 'bg-[#08182b] text-[#bbcabf] border-[#1b3456] hover:text-[#e2ebff] hover:bg-[#0e223b]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              <span>Concursos de Méritos</span>
            </button>

            <button
              onClick={() => {
                setActiveTypeFilter('idoneidad');
                setActiveCaseIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeTypeFilter === 'idoneidad'
                  ? 'bg-[#10b981] text-[#003824] border-[#4edea3] shadow-md'
                  : 'bg-[#08182b] text-[#bbcabf] border-[#1b3456] hover:text-[#e2ebff] hover:bg-[#0e223b]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Examen de Idoneidad</span>
            </button>
          </div>

          {/* Rama Filter Dropdown */}
          <div className="lg:col-span-3 relative">
            <select
              value={selectedRamaFilter}
              onChange={(e) => {
                setSelectedRamaFilter(e.target.value);
                setActiveCaseIndex(0);
              }}
              className="w-full appearance-none bg-[#061322] text-[#e2ebff] text-xs rounded-xl pl-3 pr-9 py-2.5 border border-[#1b3456] focus:outline-none focus:border-[#4edea3] cursor-pointer font-medium"
            >
              <option value="all" className="bg-[#08182b] text-[#e2ebff]">Todas las Ramas del Derecho</option>
              <option value="penal" className="bg-[#08182b] text-[#e2ebff]">Derecho Penal & Ciberdelitos</option>
              <option value="civil" className="bg-[#08182b] text-[#e2ebff]">Derecho Procesal Civil (CGP)</option>
              <option value="comercial" className="bg-[#08182b] text-[#e2ebff]">Comercio Electrónico & Mensajes de Datos</option>
              <option value="constitucional" className="bg-[#08182b] text-[#e2ebff]">Derecho Constitucional & Habeas Data</option>
              <option value="administrativo" className="bg-[#08182b] text-[#e2ebff]">Derecho Administrativo & Firma Digital</option>
            </select>
            <span className="material-symbols-outlined text-[#4edea3] pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px]">
              expand_more
            </span>
          </div>

          {/* Concurso Filter Dropdown */}
          <div className="lg:col-span-3 relative">
            <select
              value={selectedConcursoFilter}
              onChange={(e) => {
                setSelectedConcursoFilter(e.target.value);
                setActiveCaseIndex(0);
              }}
              className="w-full appearance-none bg-[#061322] text-[#e2ebff] text-xs rounded-xl pl-3 pr-9 py-2.5 border border-[#1b3456] focus:outline-none focus:border-[#4edea3] cursor-pointer font-medium"
            >
              <option value="all" className="bg-[#08182b] text-[#e2ebff]">Todos los Concursos / Convocatorias</option>
              {concursosList.map((c, i) => (
                <option key={i} value={c} className="bg-[#08182b] text-[#e2ebff]">
                  {c}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[#4edea3] pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Carousel / Case Selector Tabs */}
        {filteredSimulators.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
            {filteredSimulators.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap flex items-center gap-2 ${
                  activeCaseIndex === idx
                    ? 'bg-[#10b981] text-[#003824] border-[#4edea3] shadow-md'
                    : 'bg-[#08182b] text-[#bbcabf] border-[#1b3456] hover:text-[#e2ebff] hover:bg-[#0e223b]'
                }`}
              >
                <span className="font-mono">{s.code}</span>
                <span>• {s.title.substring(0, 25)}...</span>
                <span className="px-1.5 py-0.5 rounded bg-[#061322] text-[#4edea3] text-[9px] uppercase font-bold border border-[#152a45]">
                  {s.ramaDerecho}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#0e223b] border border-[#20395c] text-center text-xs text-[#91a7c4] mb-8">
            No se encontraron simuladores con los filtros seleccionados. Intente seleccionar "Todos".
          </div>
        )}

        {/* Active Case Main Panel */}
        {currentCase && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Interactive Case Section */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-[#0e223b] rounded-2xl border border-[#20395c] p-6 md:p-8 flex flex-col gap-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
                {/* Case Badges */}
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#1b3456]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded bg-[#061322] text-[#4edea3] text-xs font-bold font-mono border border-[#152a45]">
                      {currentCase.questionNumber} • {currentCase.categoryTag}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#08182b] text-[#e2ebff] text-xs font-bold uppercase border border-[#1b3456]">
                      RAMA: {currentCase.ramaDerecho}
                    </span>
                    {currentCase.concursoName && (
                      <span className="px-2.5 py-1 rounded bg-[#061322] text-[#4edea3] text-xs font-mono border border-[#152a45]">
                        🏛️ {currentCase.concursoName}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-[#91a7c4] bg-[#061322] px-3 py-1 rounded-md border border-[#152a45]">
                    {currentCase.code}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#e2ebff]">
                    {currentCase.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#bbcabf] leading-relaxed">
                    {currentCase.question}
                  </p>
                </div>

                {/* Scenario Details Box */}
                <div className="p-4 rounded-xl bg-[#061322] border border-[#152a45] flex flex-col gap-2 font-mono text-xs text-[#91a7c4]">
                  <div className="flex items-center justify-between text-[#4edea3] font-bold">
                    <span>{currentCase.scenarioDetails.label}</span>
                    <span className="material-symbols-outlined text-[16px]">memory</span>
                  </div>
                  <div className="truncate text-[#e2ebff]">{currentCase.scenarioDetails.hash}</div>
                  <div className="text-[11px] text-[#8f9fa0]">{currentCase.scenarioDetails.compliance}</div>
                </div>

                {/* Radio Options List */}
                <div className="flex flex-col gap-3 mt-2">
                  <h3 className="text-xs font-bold text-[#91a7c4] uppercase tracking-wider">
                    Seleccione la Actuación Pericial Correcta:
                  </h3>

                  {currentCase.options.map((opt) => {
                    const isSelected = selectedOption === opt.key;
                    let optionBg = 'bg-[#08182b] border-[#1b3456] text-[#e2ebff] hover:bg-[#0e223b] hover:border-[#284873]';

                    if (showFeedback) {
                      if (opt.isCorrect) {
                        optionBg = 'bg-[#0d3b28] border-[#4edea3] text-[#e2ebff]';
                      } else if (isSelected && !opt.isCorrect) {
                        optionBg = 'bg-[#3b0f19] border-red-500 text-[#e2ebff]';
                      }
                    } else if (isSelected) {
                      optionBg = 'bg-[#102742] border-[#4edea3] text-[#e2ebff] shadow-md';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleOptionSelect(opt.key)}
                        className={`p-4 rounded-xl text-left transition-all border flex items-start gap-4 ${optionBg}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                            isSelected ? 'bg-[#4edea3] text-[#003824]' : 'bg-[#061322] text-[#bbcabf] border border-[#152a45]'
                          }`}
                        >
                          {opt.key}
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold leading-tight">{opt.title}</span>
                          <span className="text-xs text-[#bbcabf] leading-relaxed">{opt.subtitle}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Control Action Buttons */}
                <div className="pt-6 border-t border-[#1b3456] flex items-center justify-between flex-wrap gap-4">
                  <button
                    onClick={handleRestartCase}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#08182b] hover:bg-[#0e223b] border border-[#1b3456] text-[#e2ebff] text-xs font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                    <span>Reiniciar Caso</span>
                  </button>

                  <button
                    onClick={handleValidate}
                    disabled={!selectedOption || showFeedback}
                    className={`inline-flex items-center gap-2 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md ${
                      !selectedOption || showFeedback
                        ? 'bg-[#08182b] text-[#8f9fa0] border border-[#1b3456] cursor-not-allowed'
                        : 'bg-[#10b981] hover:bg-[#4edea3] text-[#003824]'
                    }`}
                  >
                    <span>Validar Respuesta y Evaluar</span>
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </button>
                </div>
              </div>

              {/* Feedback & Justification Panel */}
              {showFeedback && (
                <div
                  className={`rounded-2xl border p-6 flex flex-col gap-4 shadow-xl ${
                    isCorrectAnswer
                      ? 'bg-[#0b2b1d] border-[#4edea3]'
                      : 'bg-[#2b0b12] border-red-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isCorrectAnswer ? 'bg-[#4edea3] text-[#003824]' : 'bg-red-500 text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        {isCorrectAnswer ? 'check_circle' : 'cancel'}
                      </span>
                    </span>

                    <div>
                      <h3
                        className={`text-lg font-extrabold ${
                          isCorrectAnswer ? 'text-[#4edea3]' : 'text-red-400'
                        }`}
                      >
                        {isCorrectAnswer
                          ? 'ACTUACIÓN DENTRO DEL ESTÁNDAR PROCESAL'
                          : 'INCORRECTO - VULNERACIÓN DE PROTOCOLO PERICIAL'}
                      </h3>
                      <p className="text-xs text-[#bbcabf]">
                        {isCorrectAnswer
                          ? 'Su respuesta cumple con los requerimientos de la ISO/IEC 27037 y la jurisprudencia de las Altas Cortes.'
                          : 'La opción elegida invalida la prueba digital o rompe la cadena de custodia.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#061322] border border-[#152a45] flex flex-col gap-3 text-xs text-[#e2ebff] leading-relaxed">
                    <div>
                      <h4 className="font-bold text-[#4edea3] uppercase text-[11px] mb-1">
                        Sustento Técnico ISO/IEC 27037:
                      </h4>
                      <p>{currentCase.explanation.isoFoundation}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#4edea3] uppercase text-[11px] mb-1">
                        Sustento Legal & Jurisprudencia CSJ:
                      </h4>
                      <p>{currentCase.explanation.legalFoundation}</p>
                    </div>

                    <div className="pt-2 border-t border-[#152a45] font-mono text-[10px] text-[#8f9fa0]">
                      {currentCase.explanation.generatedHash}
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Idoneidad Certificate when Exam Completed */}
              {examCompleted && (
                <div className="bg-[#0b2b1d] rounded-2xl border-2 border-[#4edea3] p-8 shadow-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#4edea3] text-[36px]">verified</span>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#e2ebff]">CERTIFICADO DE ACREDITACIÓN DE IDONEIDAD PERICIAL</h3>
                        <p className="text-xs text-[#4edea3] font-mono">Aprobado con {score}% de efectividad técnica y probatoria</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded bg-[#061322] text-[#4edea3] font-mono font-bold text-xs border border-[#152a45]">
                      EXP-IDONEIDAD-2025
                    </span>
                  </div>

                  <p className="text-xs text-[#c2ebd8] leading-relaxed">
                    Certificamos que el evaluado ha demostrado suficiencia técnica en el manejo de evidencia digital, observancia de la norma ISO/IEC 27037 y aplicación de precedentes jurisprudenciales en Colombia.
                  </p>

                  <div className="pt-4 border-t border-[#152a45] flex items-center justify-between text-xs font-mono text-[#8f9fa0]">
                    <span>Firma SHA-256: 8f3c7a9e102d4b...e418a09bc2</span>
                    <button
                      onClick={() => setExamCompleted(false)}
                      className="bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                    >
                      Cerrar Certificado
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#0e223b] rounded-2xl border border-[#20395c] p-6 flex flex-col gap-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
                <span className="text-xs font-bold text-[#4edea3] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  <span>Concursos & Examen de Idoneidad</span>
                </span>

                <h3 className="text-lg font-extrabold text-[#e2ebff]">
                  Preparación de Pruebas Oficiales
                </h3>

                <p className="text-xs text-[#91a7c4] leading-relaxed">
                  Entrene para convocatorias de la Rama Judicial, Fiscalía CTI y acreditación como Perito Judicial mediante casos estandarizados.
                </p>

                <div className="p-3 bg-[#061322] rounded-xl border border-[#152a45] flex flex-col gap-1 text-xs">
                  <span className="font-bold text-[#4edea3]">Concurso Rama Judicial:</span>
                  <span className="text-[#8f9fa0]">Módulos de Prueba Digital y Cadena de Custodia.</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-[#0e223b] rounded-2xl border border-[#20395c] p-6 flex flex-col gap-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
                <span className="text-xs font-bold text-[#91a7c4] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                  <span>Estadísticas de Evaluación</span>
                </span>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#061322] border border-[#152a45]">
                    <span className="text-xl font-extrabold text-[#4edea3]">{attempts}</span>
                    <span className="text-[10px] text-[#91a7c4] uppercase block mt-0.5 font-bold">Intentos</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#061322] border border-[#152a45]">
                    <span className="text-xl font-extrabold text-[#4edea3]">{score}%</span>
                    <span className="text-[10px] text-[#91a7c4] uppercase block mt-0.5 font-bold">Efectividad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

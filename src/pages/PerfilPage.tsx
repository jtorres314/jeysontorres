import React, { useState } from 'react';
import { PageView } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTransition } from '../components/SectionTransition';

interface PerfilPageProps {
  onNavigate: (page: PageView) => void;
}

export const PerfilPage: React.FC<PerfilPageProps> = ({ onNavigate }) => {
  const [pgpEnabled, setPgpEnabled] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedTicketHash, setGeneratedTicketHash] = useState('');

  const [formData, setFormData] = useState({
    solicitante: '',
    email: '',
    area: 'Peritaje Informático Forense',
    urgencia: 'Normal (Proceso Ordinario)',
    descripcion: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = 'REQ-PGP-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-2026';
    setGeneratedTicketHash(hash);
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#040b17] min-h-screen text-[#d6e3fe]">
      {/* Top Visual Accent & Hero Section */}
      <div className="relative w-full overflow-hidden">
        {/* Ambient glow overlays */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0f5132]/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
          {/* HERO ASYMMETRIC GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4 z-10">
              <ScrollReveal direction="up" delay={0}>
                {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#4edea3]">
                  <span>Investigador Judicial</span>
                  <span aria-hidden="true" className="text-[#203a5e]">·</span>
                  <span>Ingeniero de Sistemas</span>
                  <span aria-hidden="true" className="text-[#203a5e]">·</span>
                  <span>Perito Forense Colombia</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                {/* Main Bold Headline */}
                <h1 className="text-3xl md:text-5xl lg:text-[52px] lg:leading-[60px] font-extrabold text-[#f0f5ff] tracking-tight">
                  Ingeniería de Sistemas, Ciberseguridad y Derecho al servicio de la{' '}
                  <span className="text-[#4edea3] underline decoration-[#4edea3]/40 underline-offset-8">
                    verdad procesal
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                {/* Badges Profile Cluster */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-2 bg-[#091a2e] text-[#a2c8ec] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm border border-[#1c365a]">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                    Ingeniero de Sistemas
                  </span>
                  <span className="inline-flex items-center gap-2 bg-[#091a2e] text-[#f0f5ff] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm border border-[#1c365a]">
                    <span className="material-symbols-outlined text-[18px]">policy</span>
                    Investigador Judicial
                  </span>
                  <span className="inline-flex items-center gap-2 bg-[#091a2e] text-[#4edea3] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm border border-[#1c365a]">
                    <span className="material-symbols-outlined text-[18px]">balance</span>
                    Estudiante de Derecho
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                {/* Synthetic Statement */}
                <p className="text-base md:text-lg text-[#a2b7d0] max-w-2xl pt-2 leading-relaxed font-medium">
                  Más de 15 años en las líneas de vanguardia de la investigación criminal como Policía Judicial y 10 años como Analista de Comunicaciones, respaldados por mi formación como Ingeniero de Sistemas y mi avance en la carrera de Derecho. Integro el dominio avanzado de las ciencias informáticas con la solidez de la dogmática probatoria para desentrañar la verdad procesal, blindar la cadena de custodia y sustentar evidencia técnica inexpugnable ante los estrados judiciales.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={250}>
                {/* Forensic Impact Metrics Mosaic */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-4">
                  <div className="bg-[#0e223b] p-5 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
                    <span className="text-2xl md:text-3xl font-black text-[#4edea3] tracking-tight">15+</span>
                    <span className="block text-xs font-bold text-[#f0f5ff] uppercase mt-1">Años como Policía Judicial</span>
                  </div>
                  <div className="bg-[#0e223b] p-5 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
                    <span className="text-2xl md:text-3xl font-black text-[#f0f5ff] tracking-tight">10+</span>
                    <span className="block text-xs font-bold text-[#a2b7d0] uppercase mt-1">Años Analista de Comunicaciones</span>
                  </div>
                  <div className="bg-[#0e223b] p-5 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]">
                    <span className="text-2xl md:text-3xl font-black text-[#4edea3] tracking-tight">8+</span>
                    <span className="block text-xs font-bold text-[#f0f5ff] uppercase mt-1">Años Ingeniero de Sistemas</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Portrait */}
            <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
              <ScrollReveal direction="left" delay={200}>
                {/* Abstract Legal/Forensic Vector Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <svg className="w-full h-full max-w-[460px] text-[#4edea3]" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="180" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1"></circle>
                    <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1"></circle>
                    <path d="M200 60 V340 M110 130 H290 M110 130 L80 200 H140 L110 130 Z M290 130 L260 200 H320 L290 130 Z" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M70 200 Q110 230 150 200 M250 200 Q290 230 330 200" stroke="currentColor" strokeWidth="1.5"></path>
                    <circle cx="200" cy="200" fill="currentColor" r="6"></circle>
                  </svg>
                </div>

                {/* Main Portrait Card */}
                <div className="relative w-full max-w-[420px] rounded-2xl bg-[#091a2e] p-2.5 shadow-2xl border border-[#1d375c]">
                  <div className="relative h-[480px] w-full rounded-xl overflow-hidden bg-[#061424]">
                    <img
                      className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-all duration-700"
                      alt="Jeyson Torres Torres - Perito Forense"
                      src="/assets/aistudio/1792537218266_70233508.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061424] via-[#061424]/20 to-transparent"></div>
                    
                    {/* Floating Verification Banner */}
                    <div className="absolute bottom-4 left-4 right-4 bg-[#040b17]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#1d375c] shadow-lg flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#f0f5ff] uppercase">Evidencia Inmutable</p>
                        <p className="text-[11px] text-[#a2b7d0]">Protocolo RFC 3227</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10.5px] bg-[#081a2e] text-[#4edea3] font-bold border border-[#1b3456]">
                        VALIDADO
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Transition: Hero -> Interdisciplinary Trajectory */}
      <SectionTransition fromColor="#040b17" toColor="#061424" />

      {/* Interdisciplinary Trajectory Section */}
      <section className="w-full bg-[#061424] py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col gap-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-[#4edea3] tracking-widest uppercase">
                  Fundamentación & Praxis Concurrente
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#f0f5ff] tracking-tight mt-1">
                  Intersección Técnica y Dogmática Procesal
                </h2>
              </div>
              <p className="text-sm text-[#a2b7d0] max-w-md">
                La evidencia digital carece de fuerza suasoria si se transgrede su licitud o trazabilidad. Integro la profundidad informática con el rigor jurídico probatorio.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento Cards with Elevated Contrast and Staggered Scroll Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex flex-col justify-between hover:-translate-y-1 transition-transform h-full">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254]">
                    <span className="material-symbols-outlined text-[28px]">analytics</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff]">Análisis de Información</h3>
                  <p className="text-xs sm:text-sm text-[#a2b7d0] leading-relaxed">
                    Procesamiento técnico y cruzamiento de registros de llamadas (CDR), celdas de cobertura de telefonía celular, análisis de datos masivos y reconstrucción de patrones de comunicación en investigaciones criminales.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#183152] mt-4">
                  <span className="text-[11px] font-bold text-[#4edea3] tracking-wider uppercase">
                    CDR • Celdas de Cobertura • Datos
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex flex-col justify-between hover:-translate-y-1 transition-transform h-full">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254]">
                    <span className="material-symbols-outlined text-[28px]">link</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff]">Cadena de Custodia</h3>
                  <p className="text-xs sm:text-sm text-[#a2b7d0] leading-relaxed">
                    Preservación milimétrica de la mismidad del elemento material probatorio (EMP y EF). Sellado de tiempo criptográfico, actas FGN y aseguramiento inmutable de la evidencia en procesos judiciales.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#183152] mt-4">
                  <span className="text-[11px] font-bold text-[#4edea3] tracking-wider uppercase">
                    Hashes Criptográficos • Actas FGN
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex flex-col justify-between hover:-translate-y-1 transition-transform h-full">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254]">
                    <span className="material-symbols-outlined text-[28px]">search_hands_free</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff]">Procesamiento del Lugar de Hechos</h3>
                  <p className="text-xs sm:text-sm text-[#a2b7d0] leading-relaxed">
                    Inspección técnica a la escena del crimen, fijación topográfica y fotográfica de elementos materiales probatorios, embalaje, rotulado y recolección técnica con rigor criminalístico.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#183152] mt-4">
                  <span className="text-[11px] font-bold text-[#4edea3] tracking-wider uppercase">
                    Inspección Técnica • Fijación EMP/EF
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350}>
              <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex flex-col justify-between hover:-translate-y-1 transition-transform h-full">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254]">
                    <span className="material-symbols-outlined text-[28px]">gavel</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff]">Derecho Probatorio</h3>
                  <p className="text-xs sm:text-sm text-[#a2b7d0] leading-relaxed">
                    Elaboración y análisis de informes técnico-probatorios con vocación de prueba plena. Asesoría técnica en contra-peritajes, detección de inconsistencias probatorias y preparación técnica de interrogatorios.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#183152] mt-4">
                  <span className="text-[11px] font-bold text-[#4edea3] tracking-wider uppercase">
                    Ley 527/1999 • CGP • CPP • Litigio
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Transition: Trajectory -> Milestones */}
      <SectionTransition fromColor="#061424" toColor="#040b17" />

      {/* Trajectory & Milestones Section */}
      <section className="w-full bg-[#040b17] py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col gap-12">
          {/* Section Header */}
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-[#4edea3] tracking-widest uppercase">
                  Trazabilidad Profesional & Acreditaciones
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#f0f5ff] tracking-tight mt-1">
                  Hitos Formativos <span className="text-[#4edea3]">&</span> Trayectoria Certificada
                </h2>
                <p className="text-base text-[#a2b7d0] leading-relaxed mt-2">
                  Respaldo documental y metodológico en investigación criminal, análisis de comunicaciones, informática forense y fundamentación probatoria en Colombia.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Chronological Milestones Timeline */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-[#091a2e] rounded-2xl border border-[#1d375c] p-6 md:p-10 shadow-2xl">
              <div className="flex flex-col gap-2 mb-8">
                <span className="text-xs font-bold text-[#4edea3] tracking-widest uppercase">
                  Trayectoria Certificada
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#f0f5ff]">
                  Acreditaciones Judiciales & Formación Continua
                </h3>
              </div>

              <div className="relative pl-6 md:pl-8 border-l-2 border-[#1c385c] flex flex-col gap-8">
                {/* Milestone 1 */}
                <div className="relative pl-6 flex flex-col gap-2">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#4edea3] border-2 border-[#091a2e]"></div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg md:text-xl font-extrabold text-[#f0f5ff]">Acreditación como Policía Judicial</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] border border-[#183254]">
                      15+ AÑOS DE EXPERIENCIA
                    </span>
                  </div>
                  <p className="text-sm text-[#a2b7d0] leading-relaxed max-w-3xl">
                    Trayectoria operativa y funcional en investigación criminal, atención de actos urgentes, recolección de Elementos Materiales Probatorios (EMP) y Evidencia Física (EF), así como desarrollo de investigaciones judiciales complejas.
                  </p>
                </div>

                {/* Milestone 2 */}
                <div className="relative pl-6 flex flex-col gap-2">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#4edea3] border-2 border-[#091a2e]"></div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg md:text-xl font-extrabold text-[#f0f5ff]">Analista de Comunicaciones</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] border border-[#183254]">
                      10+ AÑOS ESPECIALIZADOS
                    </span>
                  </div>
                  <p className="text-sm text-[#a2b7d0] leading-relaxed max-w-3xl">
                    Especialista en procesamiento de sábanas de llamadas (CDR's), análisis de celdas de cobertura de telefonía celular, triangulación técnica de tráfico celular e interceptación de comunicaciones bajo el estricto cumplimiento de reserva judicial.
                  </p>
                </div>

                {/* Milestone 3 */}
                <div className="relative pl-6 flex flex-col gap-2">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#4edea3] border-2 border-[#091a2e]"></div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg md:text-xl font-extrabold text-[#f0f5ff]">Análisis y Procesamiento del Lugar de los Hechos</span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] border border-[#183254]">
                      ACREDITACIÓN DE CAMPO
                    </span>
                  </div>
                  <p className="text-sm text-[#a2b7d0] leading-relaxed max-w-3xl">
                    Inspección técnica al lugar de los hechos, fijación fotográfica y topográfica de la escena, recolección, rotulado y aseguramiento estricto de la cadena de custodia bajo manuales unificados de criminalística.
                  </p>
                </div>

                {/* Milestone 4 */}
                <div className="relative pl-6 flex flex-col gap-2">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#718eb3] border-2 border-[#091a2e]"></div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg md:text-xl font-extrabold text-[#f0f5ff]">Ingeniero de Sistemas</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#a2c8ec] border border-[#183254]">
                      TITULADO UNIVERSITARIO
                    </span>
                  </div>
                  <p className="text-sm text-[#a2b7d0] leading-relaxed max-w-3xl">
                    Formación profesional universitaria con dominio de infraestructura tecnológica, redes de datos, ciberseguridad, arquitectura de software, bases de datos relacionales y análisis de vulnerabilidades.
                  </p>
                </div>

                {/* Milestone 5 */}
                <div className="relative pl-6 flex flex-col gap-2">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#718eb3] border-2 border-[#091a2e]"></div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg md:text-xl font-extrabold text-[#f0f5ff]">Pregrado en Derecho (En Curso)</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] border border-[#183254]">
                      FORMACIÓN CONTINUA
                    </span>
                  </div>
                  <p className="text-sm text-[#a2b7d0] leading-relaxed max-w-3xl">
                    Profundización jurídica en Derecho Probatorio, Procesal Penal, Garantías Constitucionales, Código General del Proceso y Régimen Legal de la Prueba Digital (Ley 527 de 1999).
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Transition: Milestones -> Contact */}
      <SectionTransition fromColor="#040b17" toColor="#061424" />

      {/* Contact Section */}
      <section className="w-full bg-[#061424] py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <ScrollReveal direction="up">
            <div className="bg-[#091a2e] rounded-2xl p-6 md:p-10 border border-[#1d375c] shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[#4edea3]">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Asesoría Técnica & Legal Especializada</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#f0f5ff] tracking-tight">Contacto & Solicitud de Asesorías</h2>
                    <p className="text-sm text-[#a2b7d0] leading-relaxed">
                      Brindamos asesorías integrales y consultoría experta bajo estándares legales e informáticos para despachos, litigantes, entidades y organizaciones.
                    </p>

                    {/* Core Advisory Services Grid */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">search</span>
                        <span>Investigación Judicial</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">security</span>
                        <span>Ciberseguridad</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">link</span>
                        <span>Cadena de Custodia</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">pin_drop</span>
                        <span>Lugar de Hechos</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">terminal</span>
                        <span>Informática Forense</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">cell_tower</span>
                        <span>Análisis de CDR's</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">gavel</span>
                        <span>Asesorías Legales</span>
                      </div>
                      <div className="p-2.5 bg-[#061424] rounded-xl border border-[#183254] flex items-center gap-2 text-xs font-bold text-[#e2ebff]">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">code</span>
                        <span>Sistemas a Medida</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-[#061424] p-4 rounded-xl border border-[#183254] mt-2">
                    <div className="flex items-center gap-2 text-[#f0f5ff] font-bold text-xs">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified_user</span>
                      <span>Reserva Legal & Confidencialidad</span>
                    </div>
                    <p className="text-xs text-[#a2b7d0]">
                      Atención directa con garantía de secreto profesional y estricta reserva técnica y legal.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-7 flex flex-col gap-4 bg-[#061424] p-6 rounded-2xl border border-[#183254]">
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#f0f5ff] uppercase">Solicitante / Entidad / Despacho</label>
                        <input
                          type="text"
                          required
                          value={formData.solicitante}
                          onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
                          placeholder="Nombre completo o razón social"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#040b17] text-[#f0f5ff] placeholder-[#607998] border border-[#1e385e] focus:outline-none focus:border-[#4edea3] text-xs sm:text-sm font-bold"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#f0f5ff] uppercase">Correo Electrónico de Contacto</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="correo@ejemplo.com"
                          className="w-full h-11 px-3.5 rounded-xl bg-[#040b17] text-[#f0f5ff] placeholder-[#607998] border border-[#1e385e] focus:outline-none focus:border-[#4edea3] text-xs sm:text-sm font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#f0f5ff] uppercase tracking-wider">
                          Área de Asesoría Requerida
                        </label>
                        <div className="relative w-full">
                          <select
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            className="w-full h-12 appearance-none pl-4 pr-11 py-3 rounded-xl bg-[#040b17] text-[#f0f5ff] font-bold border border-[#1e385e] focus:outline-none focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] text-xs sm:text-sm cursor-pointer shadow-sm"
                          >
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Investigación Judicial & Actos Urgentes</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Ciberseguridad & Protección de Datos</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Cadena de Custodia & Aseguramiento EMP/EF</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Análisis y Procesamiento del Lugar de los Hechos</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Informática Forense & Preservación Digital</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Análisis de CDR's & Registros de Llamadas</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Asesoría Legal & Estrategia Probatoria</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Sistemas Informáticos a la Medida</option>
                          </select>
                          <span className="material-symbols-outlined text-[#4edea3] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px]">
                            expand_more
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#f0f5ff] uppercase tracking-wider">
                          Prioridad de Atención
                        </label>
                        <div className="relative w-full">
                          <select
                            value={formData.urgencia}
                            onChange={(e) => setFormData({ ...formData, urgencia: e.target.value })}
                            className="w-full h-12 appearance-none pl-4 pr-11 py-3 rounded-xl bg-[#040b17] text-[#f0f5ff] font-bold border border-[#1e385e] focus:outline-none focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] text-xs sm:text-sm cursor-pointer shadow-sm"
                          >
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Normal — Consulta General</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Prioritaria — Término Judicial Próximo</option>
                            <option className="bg-[#091a2e] text-[#f0f5ff] py-2">Urgente — Incidente Activo / Inmediato</option>
                          </select>
                          <span className="material-symbols-outlined text-[#4edea3] pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px]">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#f0f5ff] uppercase">Detalle o Requerimiento Técnico/Legal</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Describa el alcance de la asesoría, sistemas o antecedentes del caso..."
                        className="w-full p-3.5 rounded-xl bg-[#040b17] text-[#f0f5ff] placeholder-[#607998] border border-[#1e385e] focus:outline-none focus:border-[#4edea3] text-xs sm:text-sm font-medium"
                      />
                    </div>

                    {/* Confidentiality Option */}
                    <div className="flex items-center justify-between p-3.5 bg-[#091a2e] rounded-xl border border-[#1d375c]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#4edea3] text-[20px]">shield</span>
                        <span className="text-xs font-bold text-[#f0f5ff]">Activar protocolo de estricta reserva legal y secreto profesional</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPgpEnabled(!pgpEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          pgpEnabled ? 'bg-[#10b981]' : 'bg-[#183254]'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-[#003824] transition-transform ${
                            pgpEnabled ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-sm rounded-xl shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">send</span>
                      <span>Transmitir Requerimiento Seguro</span>
                    </button>

                    {formSubmitted && (
                      <div className="p-3.5 rounded-xl bg-[#081a2e] text-[#4edea3] text-center text-xs font-bold border border-[#1b3456]">
                        <p>Requerimiento transmitido con éxito.</p>
                        <p className="text-[11px] font-mono mt-1 text-[#a2b7d0]">Clave de rastreo: {generatedTicketHash}</p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};


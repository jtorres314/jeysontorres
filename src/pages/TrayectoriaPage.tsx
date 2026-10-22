import React, { useState } from 'react';
import { PageView } from '../types';
import { Modal } from '../components/Modal';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionTransition } from '../components/SectionTransition';

interface TrayectoriaPageProps {
  onNavigate: (page: PageView) => void;
}

export const TrayectoriaPage: React.FC<TrayectoriaPageProps> = ({ onNavigate }) => {
  const [activePreviewCard, setActivePreviewCard] = useState<{
    title: string;
    type: string;
    description: string;
    details: string;
    pdfInfo: string;
  } | null>(null);

  return (
    <div className="flex flex-col w-full pb-16 bg-[#040b17] min-h-screen text-[#d6e3fe]">
      {/* Page Header / Hero Banner */}
      <div className="relative w-full bg-[#061424] py-12 md:py-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <ScrollReveal direction="up">
            <div className="flex flex-col gap-2.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4edea3]">
                <span>Trazabilidad Profesional</span>
                <span aria-hidden="true" className="text-[#203a5e]">·</span>
                <span>Acreditaciones Judiciales</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#f0f5ff] tracking-tight">
                Hitos Formativos, Experiencia & <span className="text-[#4edea3]">Producción Técnica</span>
              </h1>
              <p className="text-sm md:text-base text-[#a2b7d0] leading-relaxed">
                Respaldo documental y metodológico de Jeyson Torres T. en investigación criminal, análisis de comunicaciones, informática forense y fundamentación probatoria en Colombia.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={100}>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('perfil')}
                className="px-4 py-2.5 rounded-xl bg-[#081a2e] hover:bg-[#102742] text-[#f0f5ff] font-bold text-xs border border-[#1e3b63] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Ver Perfil Principal</span>
              </button>
              <button
                onClick={() => onNavigate('experiencias-academicas')}
                className="px-4 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">school</span>
                <span>Explorar Aula Abierta</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Transition: Banner -> Main Content */}
      <SectionTransition fromColor="#061424" toColor="#040b17" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-12 flex flex-col gap-12">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={0}>
            <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex items-center gap-4 h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254] shrink-0">
                <span className="material-symbols-outlined text-[32px]">policy</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#4edea3] tracking-tight">15+ Años</span>
                <span className="block text-xs font-bold text-[#f0f5ff] uppercase mt-0.5">Policía Judicial</span>
                <p className="text-xs text-[#a2b7d0] mt-1">Investigación criminal y actos urgentes.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex items-center gap-4 h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254] shrink-0">
                <span className="material-symbols-outlined text-[32px]">cell_tower</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#f0f5ff] tracking-tight">10+ Años</span>
                <span className="block text-xs font-bold text-[#f0f5ff] uppercase mt-0.5">Analista de Comunicaciones</span>
                <p className="text-xs text-[#a2b7d0] mt-1">Registros CDR, celdas de cobertura y datos.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="bg-[#0e223b] p-6 rounded-2xl border border-[#20395c] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] flex items-center gap-4 h-full">
              <div className="w-14 h-14 rounded-2xl bg-[#061424] text-[#4edea3] flex items-center justify-center border border-[#183254] shrink-0">
                <span className="material-symbols-outlined text-[32px]">terminal</span>
              </div>
              <div>
                <span className="text-3xl font-black text-[#4edea3] tracking-tight">8+ Años</span>
                <span className="block text-xs font-bold text-[#f0f5ff] uppercase mt-0.5">Ingeniero de Sistemas</span>
                <p className="text-xs text-[#a2b7d0] mt-1">Infraestructura, redes y software.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Chronological Milestones Timeline */}
        <ScrollReveal direction="up">
          <div className="bg-[#091a2e] rounded-2xl border border-[#1d375c] p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-xs font-bold text-[#4edea3] tracking-widest uppercase">
                Trazabilidad Profesional
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f0f5ff]">
                Hitos Formativos y Acreditaciones Judiciales
              </h2>
              <p className="text-sm text-[#a2b7d0] max-w-2xl">
                Recorrido cronológico certificado en cuerpos de investigación judicial, seguridad informática y formación continua en derecho probatorio.
              </p>
            </div>

            <div className="relative pl-6 md:pl-8 border-l-2 border-[#1c385c] flex flex-col gap-8">
              {/* Milestone 1 */}
              <div className="relative pl-6 flex flex-col gap-2">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#4edea3] border-2 border-[#091a2e]"></div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xl font-extrabold text-[#f0f5ff]">Acreditación como Policía Judicial</span>
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
                  <span className="text-xl font-extrabold text-[#f0f5ff]">Analista de Comunicaciones</span>
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
                  <span className="text-xl font-extrabold text-[#f0f5ff]">Análisis y Procesamiento del Lugar de los Hechos</span>
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
                  <span className="text-xl font-extrabold text-[#f0f5ff]">Ingeniero de Sistemas</span>
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
                  <span className="text-xl font-extrabold text-[#f0f5ff]">Pregrado en Derecho (En Curso)</span>
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

        {/* Producción Académica e Investigación Destacada */}
        <div className="flex flex-col gap-6">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#4edea3] tracking-widest uppercase">
                  Publicaciones & Ponencias
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#f0f5ff] mt-1">
                  Investigaciones y Proyectos de Producción Técnica
                </h2>
              </div>
              <button
                onClick={() => onNavigate('experiencias-academicas')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#4edea3] hover:underline cursor-pointer"
              >
                <span>Ver catálogo completo en Aula Abierta</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <ScrollReveal direction="up" delay={50}>
              <div
                onClick={() => setActivePreviewCard({
                  title: 'Cadena de Custodia Digital en Blockchain',
                  type: 'INVESTIGACIÓN • DIAPOSITIVAS',
                  description: 'Análisis de inmutabilidad mediante Smart Contracts en redes permisionadas para la certificación probatoria en Colombia.',
                  details: 'Desarrollo conceptual e implementación de contratos Solidity para el sellado de tiempo de evidencias digitales en redes Hyperledger / Ethereum. Cumple con principios del CGP Art. 247.',
                  pdfInfo: '18 Diapositivas • PDF (3.8 MB)'
                })}
                className="bg-[#0e223b] hover:bg-[#112744] rounded-2xl overflow-hidden border border-[#20395c] hover:border-[#4edea3]/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] transition-all cursor-pointer group flex flex-col justify-between h-full"
              >
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] text-[10px] font-bold border border-[#183254]">
                      INVESTIGACIÓN
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff] group-hover:text-[#4edea3] transition-colors">
                    Cadena de Custodia Digital en Blockchain
                  </h3>
                  <p className="text-xs text-[#a2b7d0] leading-relaxed">
                    Análisis de inmutabilidad mediante Smart Contracts en redes permisionadas para la certificación probatoria inalterable en Colombia.
                  </p>
                </div>
                <div className="p-4 bg-[#061322] border-t border-[#152a45] flex items-center justify-between text-xs text-[#4edea3]">
                  <span>18 Diapositivas • PDF</span>
                  <span className="font-mono">Verificado</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal direction="up" delay={150}>
              <div
                onClick={() => setActivePreviewCard({
                  title: 'Análisis de Malware en Procesos Penales',
                  type: 'PONENCIA NACIONAL • PONENCIA',
                  description: 'Atribución de responsabilidad subjetiva frente a troyanos bancarios remotos e infección no consentida.',
                  details: 'Desglose forense de desensamblado de código malicioso en fraudes financieros bancarios. Análisis del dolo y la intervención de malware en dispositivos de víctimas.',
                  pdfInfo: 'Seminario Forense 2024 • PDF (4.5 MB)'
                })}
                className="bg-[#0e223b] hover:bg-[#112744] rounded-2xl overflow-hidden border border-[#20395c] hover:border-[#4edea3]/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] transition-all cursor-pointer group flex flex-col justify-between h-full"
              >
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] text-[10px] font-bold border border-[#183254]">
                      PONENCIA
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff] group-hover:text-[#4edea3] transition-colors">
                    Análisis de Malware en Procesos Penales
                  </h3>
                  <p className="text-xs text-[#a2b7d0] leading-relaxed">
                    Atribución de responsabilidad subjetiva frente a troyanos bancarios remotos e infección no consentida.
                  </p>
                </div>
                <div className="p-4 bg-[#061322] border-t border-[#152a45] flex items-center justify-between text-xs text-[#4edea3]">
                  <span>Seminario Forense 2024</span>
                  <span className="font-mono">Ghidra / Volatility</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal direction="up" delay={250}>
              <div
                onClick={() => setActivePreviewCard({
                  title: 'Simulación Procesal Civil & Peritaje',
                  type: 'GUÍA PRÁCTICA • CASO PROCESAL',
                  description: 'Auditoría de correos electrónicos corporativos (DKIM, SPF) en pleito contractual por incumplimiento mercantil.',
                  details: 'Verificación técnica de cabeceras RFC 5322, registros DNS TXT/SPF/DKIM y trazabilidad SMTP para desestimar impugnaciones por falsedad documental.',
                  pdfInfo: 'CGP Art. 226 • PDF (2.1 MB)'
                })}
                className="bg-[#0e223b] hover:bg-[#112744] rounded-2xl overflow-hidden border border-[#20395c] hover:border-[#4edea3]/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)] transition-all cursor-pointer group flex flex-col justify-between h-full"
              >
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#061424] text-[#4edea3] text-[10px] font-bold border border-[#183254]">
                      CASO PROCESAL
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#f0f5ff] group-hover:text-[#4edea3] transition-colors">
                    Simulación Procesal Civil & Peritaje
                  </h3>
                  <p className="text-xs text-[#a2b7d0] leading-relaxed">
                    Auditoría de correos electrónicos corporativos (DKIM, SPF) en pleito contractual por incumplimiento mercantil.
                  </p>
                </div>
                <div className="p-4 bg-[#061322] border-t border-[#152a45] flex items-center justify-between text-xs text-[#4edea3]">
                  <span>Guía Práctica • CGP Art. 226</span>
                  <span className="font-mono">DKIM / SPF Audit</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Modal detail for research items */}
      {activePreviewCard && (
        <Modal
          isOpen={true}
          onClose={() => setActivePreviewCard(null)}
          title={activePreviewCard.title}
          subtitle={activePreviewCard.type}
          badge="TRAYECTORIA & INVESTIGACIÓN"
        >
          <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#e2ebff]">
            <div className="p-4 bg-[#061322] rounded-xl border border-[#152a45]">
              <p className="text-xs font-bold uppercase text-[#4edea3] mb-1">Resumen Ejecutivo:</p>
              <p className="text-xs sm:text-sm text-[#e2ebff]">{activePreviewCard.description}</p>
            </div>
            <div className="p-4 bg-[#061322] rounded-xl border border-[#152a45]">
              <p className="text-xs font-bold uppercase text-[#4edea3] mb-1">Sustentación Técnica & Legal:</p>
              <p className="text-xs sm:text-sm text-[#a2b7d0]">{activePreviewCard.details}</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#040b17] rounded-xl border border-[#183152] text-xs">
              <span className="text-[#a2b7d0] font-mono">{activePreviewCard.pdfInfo}</span>
              <button
                onClick={() => {
                  alert('Iniciando descarga del documento técnico...');
                  setActivePreviewCard(null);
                }}
                className="px-4 py-2 bg-[#10b981] hover:bg-[#4edea3] text-[#003824] font-extrabold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Descargar Documento</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

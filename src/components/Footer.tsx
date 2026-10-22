import React from 'react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#020e21] border-t border-[#132033] mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Info */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">security</span>
              <span className="font-bold text-lg text-[#d6e3fe] tracking-tight">JEYSON TORRES TORRES</span>
            </div>
            <p className="text-sm text-[#bbcabf] max-w-xl leading-relaxed">
              Ingeniero de Sistemas • Investigador Judicial • Estudiante de Derecho. Asesoría técnica y jurídica en análisis de evidencia digital, cadena de custodia, investigación judicial, ciberseguridad, procesamiento del lugar de los hechos y argumentación probatoria.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f5132] text-[#4edea3] text-xs font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span>INTEGRIDAD PROBATORIA SHA-256 VERIFICADA</span>
              </div>
            </div>
          </div>

          {/* Contact Information Details */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">
              INFORMACIÓN DE CONTACTO
            </span>
            <div className="flex flex-col gap-2.5 text-xs text-[#bbcabf]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">location_on</span>
                <span>Colombia • Cobertura Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">mail</span>
                <a href="mailto:contacto@jeysontorres.com" className="hover:text-[#4edea3] transition-colors">
                  contacto@jeysontorres.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">gavel</span>
                <span>Asesoría Legal & Peritaje Judicial</span>
              </div>
              <button
                onClick={() => onNavigate('perfil')}
                className="text-left text-[#4edea3] hover:underline font-bold mt-1 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Solicitar Asesoría Directa</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Legal & Consultative Notice */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">
              Aviso Legal & Consultivo
            </span>
            <p className="text-xs text-[#bbcabf] leading-relaxed">
              Los análisis técnicos, asesorías y simulaciones expuestos se estructuran conforme al principio de legalidad probatoria. Tienen carácter exclusivamente consultivo, académico y de orientación técnica/jurídica conforme a la normatividad vigente.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-center pt-6 border-t border-[#132033]">
          <p className="text-xs text-[#bbcabf] text-center">
            © 2026 Jeyson Torres Torres. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

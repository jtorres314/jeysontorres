import React from 'react';

interface ArticleGraphicProps {
  category: string;
  title: string;
  refCode?: string;
  hash?: string;
  className?: string;
}

export const ArticleGraphic: React.FC<ArticleGraphicProps> = ({
  category,
  title,
  refCode = 'ISO/IEC 27037',
  hash = 'e3b0c44298fc1c149afbf4c8996fb924',
  className = '',
}) => {
  // 1. Informática Forense / Dispositivos Móviles
  if (category === 'forense') {
    return (
      <div className={`w-full h-full min-h-[260px] bg-[#091524] rounded-xl border border-[#1e2f47] p-6 flex flex-col justify-between relative overflow-hidden group ${className}`}>
        {/* Background Glowing Grid */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#4edea3]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#132238_1px,transparent_1px),linear-gradient(to_bottom,#132238_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none"></div>

        {/* Top Header Indicators */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="text-[11px] font-mono font-bold text-[#4edea3] tracking-wider uppercase">
              FORENSIC MOBILE EXTRACTION • LIVE
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#0f5132] text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/30">
            {refCode}
          </span>
        </div>

        {/* Middle Interactive Graphic Representation */}
        <div className="relative z-10 my-4 flex flex-col gap-3 bg-[#020e21]/80 backdrop-blur-md p-4 rounded-xl border border-[#1d2a3e]">
          <div className="flex items-center justify-between text-xs font-mono text-[#d6e3fe]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">smartphone</span>
              <span className="font-bold">iOS / Android Memory Dump</span>
            </div>
            <span className="text-[#95d4ac] font-bold">Secure Enclave [BYPASSED]</span>
          </div>

          {/* Progress Bar & RAM Metrics */}
          <div className="w-full bg-[#132033] h-2 rounded-full overflow-hidden p-0.5 border border-[#233754]">
            <div className="bg-gradient-to-r from-[#10b981] to-[#4edea3] h-full rounded-full w-[88%]"></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-[#bbcabf] pt-1">
            <div className="bg-[#091322] p-2 rounded border border-[#18283f]">
              <span className="block text-[#8f9fa0]">Acquisition:</span>
              <span className="font-bold text-[#d6e3fe]">Bit-stream (E01)</span>
            </div>
            <div className="bg-[#091322] p-2 rounded border border-[#18283f]">
              <span className="block text-[#8f9fa0]">TEE Enclave:</span>
              <span className="font-bold text-[#4edea3]">Preserved</span>
            </div>
            <div className="bg-[#091322] p-2 rounded border border-[#18283f]">
              <span className="block text-[#8f9fa0]">Hardware:</span>
              <span className="font-bold text-[#d6e3fe]">Faraday Shield</span>
            </div>
          </div>
        </div>

        {/* Bottom Hash Line */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8f9fa0] pt-2 border-t border-[#18283f]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#4edea3]">enhanced_encryption</span>
            <span>SHA-256: {hash.substring(0, 16)}...</span>
          </span>
          <span className="text-[#4edea3] font-bold">INTEGRIDAD ISO VERIFICADA</span>
        </div>
      </div>
    );
  }

  // 2. IA & Derecho / Deepfakes
  if (category === 'ia-derecho') {
    return (
      <div className={`w-full h-full min-h-[260px] bg-[#0d1424] rounded-xl border border-[#1e2f47] p-6 flex flex-col justify-between relative overflow-hidden ${className}`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0f5132]/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">graphic_eq</span>
            <span className="text-[11px] font-mono font-bold text-[#4edea3] tracking-wider uppercase">
              AUDIO-VISUAL SPECTROGRAPH ANALYSIS
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#1d2a3e] text-[#d6e3fe] font-mono text-[10px] border border-[#2b3e58]">
            {refCode}
          </span>
        </div>

        <div className="relative z-10 my-4 bg-[#020e21]/90 backdrop-blur-md p-4 rounded-xl border border-[#1d2a3e] flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#d6e3fe]">
            <span className="font-bold text-[#4edea3]">Análisis Frecuencial & EXIF</span>
            <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 text-[10px]">
              SINTÉTICO DETECTADO (99.4%)
            </span>
          </div>

          {/* Fake Spectrogram Visualization */}
          <div className="flex items-end gap-1.5 h-12 py-1 px-2 bg-[#081220] rounded border border-[#18283f] justify-between">
            {[40, 75, 20, 90, 60, 100, 30, 85, 45, 95, 25, 70, 80, 50, 90, 65, 30, 85].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-full rounded-t-sm ${
                  i % 3 === 0 ? 'bg-[#4edea3]' : i % 2 === 0 ? 'bg-[#0f5132]' : 'bg-[#1e3e5c]'
                }`}
              ></div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#bbcabf]">
            <span>DCT Coefficients: Altered</span>
            <span>GAN Network Pattern Found</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8f9fa0] pt-2 border-t border-[#18283f]">
          <span>Detección de Artefactos de Voz & Video</span>
          <span className="text-red-400 font-bold">DESVIRTUADO PROCESALMENTE</span>
        </div>
      </div>
    );
  }

  // 3. Evidencia Digital / Impugnación
  if (category === 'evidencia-digital') {
    return (
      <div className={`w-full h-full min-h-[260px] bg-[#0a1829] rounded-xl border border-[#1e2f47] p-6 flex flex-col justify-between relative overflow-hidden ${className}`}>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified_user</span>
            <span className="text-[11px] font-mono font-bold text-[#4edea3] tracking-wider uppercase">
              DATA MESSAGE AUDIT • CGP ART. 247
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#0f5132] text-[#4edea3] font-mono text-[10px] font-bold border border-[#4edea3]/30">
            {refCode}
          </span>
        </div>

        <div className="relative z-10 my-4 bg-[#020e21]/90 backdrop-blur-md p-4 rounded-xl border border-[#1d2a3e] flex flex-col gap-2 font-mono text-[11px]">
          <div className="text-[#8f9fa0]">
            <span className="text-[#4edea3]">SMTP Header:</span> Received from mail.server.co [192.168.1.100]
          </div>
          <div className="text-[#8f9fa0]">
            <span className="text-[#4edea3]">DKIM-Signature:</span> v=1; a=rsa-sha256; c=relaxed/relaxed
          </div>
          <div className="p-2 bg-[#081220] rounded border border-[#18283f] text-[#d6e3fe] text-[10px] flex items-center justify-between mt-1">
            <span>Cotejo de Mismisidad:</span>
            <span className="text-[#4edea3] font-bold">Copia Forense E01 Auditada</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8f9fa0] pt-2 border-t border-[#18283f]">
          <span>Tacha de Falsedad Documental</span>
          <span className="text-[#4edea3] font-bold">PRUEBA PLENA CONSERVADA</span>
        </div>
      </div>
    );
  }

  // 4. Default / Ciberdelincuencia & Ransomware
  return (
    <div className={`w-full h-full min-h-[260px] bg-[#071322] rounded-xl border border-[#1e2f47] p-6 flex flex-col justify-between relative overflow-hidden ${className}`}>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-red-400 text-[18px]">gavel</span>
          <span className="text-[11px] font-mono font-bold text-red-400 tracking-wider uppercase">
            RANSOMWARE & CYBER CRIME INVESTIGATION
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-300 font-mono text-[10px] border border-red-800">
          ART. 269D C.P.
        </span>
      </div>

      <div className="relative z-10 my-4 bg-[#020e21]/90 backdrop-blur-md p-4 rounded-xl border border-[#1d2a3e] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#d6e3fe]">
          <span className="font-bold text-[#d6e3fe]">LUN/SAN Volume Encrypted</span>
          <span className="text-[#4edea3] font-bold">SIEM Log Tracked</span>
        </div>
        <div className="p-2.5 bg-[#091322] rounded border border-[#18283f] flex items-center justify-between text-[11px] font-mono text-[#bbcabf]">
          <span>Initial Vector:</span>
          <span className="text-amber-400 font-bold">RDP Brute Force / Air-Gapped Backup OK</span>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8f9fa0] pt-2 border-t border-[#18283f]">
        <span>Responsabilidad del CISO & Posición de Garante</span>
        <span className="text-[#4edea3] font-bold">NIST SP 800-61 COMPLIANT</span>
      </div>
    </div>
  );
};

import React from 'react';

interface SectionTransitionProps {
  fromColor?: string;
  toColor?: string;
  height?: string;
  showGlow?: boolean;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  fromColor = '#040b17',
  toColor = '#061424',
  height = 'h-16 md:h-20',
  showGlow = true,
  className = '',
}) => {
  return (
    <div className={`relative w-full ${height} overflow-hidden pointer-events-none select-none z-10 ${className}`}>
      {/* Gradient Blend background between background colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
        }}
      />
      
      {/* Soft Ambient Radial/Horizontal Glow in the middle of transition */}
      {showGlow && (
        <>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#4edea3]/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-8 bg-[#4edea3]/5 rounded-full blur-xl" />
        </>
      )}
    </div>
  );
};

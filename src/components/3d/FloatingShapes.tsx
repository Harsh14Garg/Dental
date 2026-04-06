import React from 'react';

function GradientOrb() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[var(--color-brand-primary)]/10 to-[var(--color-brand-accent)]/10 rounded-full blur-3xl pointer-events-none z-0" />
  );
}

export function HeroFloatingShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <GradientOrb />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--color-brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}

export default function FloatingShape() {
  return <HeroFloatingShapes />;
}

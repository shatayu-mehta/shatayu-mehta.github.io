import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  direction: number;
}

const SubtleParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1, // 1-3px
        speed: Math.random() * 0.3 + 0.1, // Very slow: 0.1-0.4px per frame
        opacity: Math.random() * 0.15 + 0.05, // Very faint: 0.05-0.2
        direction: Math.random() * Math.PI * 2, // Random direction
      });
    }
    setParticles(initialParticles);

    let animationId: number;

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          // Move particle
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;

          // Wrap around screen edges
          if (newX > window.innerWidth + 10) newX = -10;
          if (newX < -10) newX = window.innerWidth + 10;
          if (newY > window.innerHeight + 10) newY = -10;
          if (newY < -10) newY = window.innerHeight + 10;

          // Slightly vary opacity for subtle twinkling
          const newOpacity = particle.opacity + (Math.random() - 0.5) * 0.02;
          const clampedOpacity = Math.max(0.02, Math.min(0.2, newOpacity));

          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: clampedOpacity,
          };
        })
      );

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: 0 // Behind everything else
      }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: '#00f5ff', // Cyberpunk cyan
            borderRadius: '50%',
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 245, 255, ${particle.opacity * 0.5})`,
            transition: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default SubtleParticles;

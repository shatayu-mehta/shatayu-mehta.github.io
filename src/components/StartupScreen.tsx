import React, { useEffect, useRef, useState } from 'react';

interface StartupScreenProps {
  imageUrl: string;
  duration?: number;
  onComplete: () => void;
}

function getHexPoints(cx: number, cy: number, r: number) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 3 * i - Math.PI / 6;
    points.push([
      cx + r * Math.cos(angle),
      cy + r * Math.sin(angle),
    ]);
  }
  return points;
}

const loadingSteps = [
  'INITIALIZING...',
  'LOADING NEURAL NETWORKS...',
  'CALIBRATING ROBOTICS SYSTEMS...',
  'RENDERING CAD MODELS...',
  'ESTABLISHING CONNECTION...',
  'WELCOME TO THE MATRIX'
];

const StartupScreen: React.FC<StartupScreenProps> = ({ imageUrl, duration = 3500, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingSteps[0]);

  useEffect(() => {
    // Animate loading bar and text
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);
      const stepIndex = Math.floor((percent / 100) * loadingSteps.length);
      setLoadingText(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]);
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  useEffect(() => {
    // Animate hex grid
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrame: number;
    let startTime: number;
    let img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      const { width, height } = canvas;
      const hexRadius = 55; // Slightly smaller base radius
      const hexHeight = Math.sqrt(3) * hexRadius;
      // Start grid well outside the visible area with more overlap
      const xStart = -3 * hexRadius;
      const yStart = -3 * hexHeight;
      const xEnd = width + 3 * hexRadius;
      const yEnd = height + 3 * hexHeight;
      const hexes: { x: number; y: number; dist: number }[] = [];
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Create a tighter hex grid for better coverage
      for (let y = yStart, row = 0; y < yEnd; y += hexHeight * 0.85, row++) { // Reduce spacing
        for (let x = xStart + (row % 2 ? 0.65 * hexRadius : 0); x < xEnd; x += 1.3 * hexRadius) { // Reduce spacing
          const dist = Math.hypot(x - centerX, y - centerY);
          hexes.push({ x, y, dist });
        }
      }
      hexes.sort((a, b) => a.dist - b.dist);
      
      function drawHex(cx: number, cy: number) {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        const pts = getHexPoints(cx, cy, hexRadius + 5); // Even larger overlap to eliminate gaps
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();
      }
      function animateHexReveal(ts: number) {
        if (!ctx) return;
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        ctx.clearRect(0, 0, width, height);
        const revealCount = Math.floor((elapsed / duration) * hexes.length);
        for (let i = 0; i < revealCount; i++) {
          drawHex(hexes[i].x, hexes[i].y);
        }
        if (revealCount < hexes.length) {
          animationFrame = requestAnimationFrame(animateHexReveal);
        } else {
          for (let i = 0; i < hexes.length; i++) drawHex(hexes[i].x, hexes[i].y);
        }
      }
      animationFrame = requestAnimationFrame(animateHexReveal);
    };
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [imageUrl, duration]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)'
    }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          background: 'transparent',
        }}
      />
      <div style={{
        position: 'relative',
        zIndex: 2,
        color: '#fff',
        textAlign: 'center',
        width: '100vw',
        maxWidth: 600,
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: 'monospace',
          fontSize: '2.5rem',
          marginBottom: 24,
          textShadow: '0 0 10px #00ffff, 0 0 30px #ff0080',
        }}>
          <span className="glitch" data-text="SHATAYU.EXE">SHATAYU.EXE</span>
        </h1>
        <div style={{ marginBottom: 16 }}>
          <div style={{
            background: '#222',
            borderRadius: 8,
            overflow: 'hidden',
            height: 16,
            width: '100%',
            marginBottom: 8,
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #00ffff, #ff0080)',
              width: `${progress}%`,
              height: '100%',
              transition: 'width 0.3s',
            }} />
          </div>
          <span style={{ fontFamily: 'monospace' }}>{Math.floor(progress)}%</span>
        </div>
        <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: 24 }}>{loadingText}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <span
              key={i}
              style={{
                color: '#00ff99',
                opacity: Math.random(),
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                animation: `fadeInOut 2s infinite ${Math.random()}s`,
              }}
            >
              {String.fromCharCode(65 + Math.random() * 26)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupScreen;

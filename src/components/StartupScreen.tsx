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
  'INITIALIZING VISUAL CORTEX...',
  'CALIBRATING OPTICAL SENSORS...',
  'ACTIVATING PATTERN RECOGNITION...',
  'ANALYZING ENVIRONMENTAL DATA...',
  'PROCESSING SPATIAL MAPPING...',
  'VISUAL RECOGNITION COMPLETE'
];

const analysisStates = [
  'SCANNING...',
  'ANALYZING...',
  'PROCESSING...',
  'IDENTIFYING...',
  'MAPPING...',
  'RECOGNIZED'
];

const StartupScreen: React.FC<StartupScreenProps> = ({ imageUrl, duration = 3500, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingSteps[0]);
  const [analyzedHexes, setAnalyzedHexes] = useState(new Set<number>());
  const [currentScanLine, setCurrentScanLine] = useState(0);

  useEffect(() => {
    // Animate loading bar and text
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);
      const stepIndex = Math.floor((percent / 100) * loadingSteps.length);
      setLoadingText(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]);
      
      // Update scan line for robot eye effect
      setCurrentScanLine((percent / 100) * window.innerHeight);
      
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Slightly longer delay for dramatic effect
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
      
      function drawHex(cx: number, cy: number, index: number, isProcessing: boolean) {
        if (!ctx) return;
        ctx.save();
        
        // Draw the image clipped to hexagon
        ctx.beginPath();
        const pts = getHexPoints(cx, cy, hexRadius + 5);
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();
        
        // Add processing effects for active hexagons
        if (isProcessing) {
          ctx.save();
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 10;
          
          ctx.beginPath();
          const pts2 = getHexPoints(cx, cy, hexRadius + 3);
          ctx.moveTo(pts2[0][0], pts2[0][1]);
          for (let i = 1; i < pts2.length; i++) ctx.lineTo(pts2[i][0], pts2[i][1]);
          ctx.closePath();
          ctx.stroke();
          
          // Add scanning lines
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            const y = cy - hexRadius + (i * hexRadius * 0.6);
            ctx.beginPath();
            ctx.moveTo(cx - hexRadius, y);
            ctx.lineTo(cx + hexRadius, y);
            ctx.stroke();
          }
          
          // Add analysis text
          ctx.fillStyle = '#00ffff';
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          const state = analysisStates[Math.floor(Math.random() * analysisStates.length)];
          ctx.fillText(state, cx, cy + 2);
          
          ctx.restore();
        }
      }
      function animateHexReveal(ts: number) {
        if (!ctx) return;
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        ctx.clearRect(0, 0, width, height);
        
        // How many hexes to reveal
        const revealCount = Math.floor((elapsed / duration) * hexes.length);
        const processingBuffer = Math.min(5, hexes.length - revealCount); // Show processing on next few hexagons
        
        for (let i = 0; i < revealCount; i++) {
          drawHex(hexes[i].x, hexes[i].y, i, false);
        }
        
        // Show processing hexagons
        for (let i = revealCount; i < Math.min(revealCount + processingBuffer, hexes.length); i++) {
          drawHex(hexes[i].x, hexes[i].y, i, true);
        }
        
        if (revealCount < hexes.length) {
          animationFrame = requestAnimationFrame(animateHexReveal);
        } else {
          // Draw all at end
          for (let i = 0; i < hexes.length; i++) drawHex(hexes[i].x, hexes[i].y, i, false);
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
      background: 'rgba(0,0,0,0.95)'
    }}>
      {/* Robot Vision Canvas */}
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
      
      {/* Robot Eye Scanning Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        {/* Scanning line */}
        <div style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          top: `${currentScanLine}px`,
          boxShadow: '0 0 20px #00ffff',
          animation: 'pulse 1s infinite',
        }} />
        
        {/* Crosshair in center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          border: '2px solid #ff0080',
          borderRadius: '50%',
          boxShadow: '0 0 15px #ff0080',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '2px',
            background: '#ff0080',
            boxShadow: '0 0 5px #ff0080',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
            width: '20px',
            height: '2px',
            background: '#ff0080',
            boxShadow: '0 0 5px #ff0080',
          }} />
        </div>
      </div>
      
      {/* Status Display */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        color: '#fff',
        textAlign: 'center',
        width: '100vw',
        maxWidth: 600,
        margin: '0 auto',
      }}>
        {/* Robot ID Header */}
        <div style={{
          position: 'absolute',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'monospace',
          fontSize: '1rem',
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
        }}>
          VISUAL CORTEX v2.1.4 | UNIT: SHATAYU-7
        </div>
        
        <h1 style={{
          fontFamily: 'monospace',
          fontSize: '2.5rem',
          marginBottom: 24,
          textShadow: '0 0 10px #00ffff, 0 0 30px #ff0080',
        }}>
          <span className="glitch" data-text="ANALYZING...">ANALYZING...</span>
        </h1>
        
        <div style={{ marginBottom: 16 }}>
          <div style={{
            background: '#222',
            borderRadius: 8,
            overflow: 'hidden',
            height: 16,
            width: '100%',
            marginBottom: 8,
            border: '1px solid #00ffff',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #00ffff, #ff0080)',
              width: `${progress}%`,
              height: '100%',
              transition: 'width 0.3s',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
            }} />
          </div>
          <span style={{ fontFamily: 'monospace' }}>PATTERN RECOGNITION: {Math.floor(progress)}%</span>
        </div>
        
        <p style={{ 
          fontFamily: 'monospace', 
          fontSize: '1.1rem', 
          marginBottom: 24,
          color: '#00ff99',
          textShadow: '0 0 5px #00ff99',
        }}>
          {loadingText}
        </p>
        
        {/* Processing matrix */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <span
              key={i}
              style={{
                color: i < (progress / 5) ? '#00ff99' : '#333',
                opacity: Math.random(),
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                animation: `fadeInOut 2s infinite ${Math.random()}s`,
                textShadow: i < (progress / 5) ? '0 0 5px #00ff99' : 'none',
              }}
            >
              {String.fromCharCode(65 + Math.random() * 26)}
            </span>
          ))}
        </div>
        
        {/* Analysis data */}
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '0',
          right: '0',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          color: '#00ffff',
          textAlign: 'left',
          padding: '0 20px',
        }}>
          <div>SECTORS ANALYZED: {Math.floor((progress / 100) * 127)}/127</div>
          <div>PATTERN MATCHES: {Math.floor((progress / 100) * 2847)}</div>
          <div>CONFIDENCE LEVEL: {Math.floor(progress)}%</div>
          <div>RECOGNITION MODE: ACTIVE</div>
        </div>
      </div>
    </div>
  );
};

export default StartupScreen;

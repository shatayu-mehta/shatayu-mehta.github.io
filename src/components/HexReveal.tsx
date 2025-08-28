import React, { useEffect, useRef } from 'react';

interface HexRevealProps {
  imageUrl: string;
  hexRadius?: number;
  duration?: number;
  onComplete?: () => void;
}

// Helper to get hexagon points
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

const HexReveal: React.FC<HexRevealProps> = ({ imageUrl, hexRadius = 60, duration = 2000, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrame: number;
    let startTime: number;
    let img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log('HexReveal: image loaded, starting animation');
      const { width, height } = canvas;
      // Calculate hex grid, add extra rows/cols to cover edges
      const hexHeight = Math.sqrt(3) * hexRadius;
      const cols = Math.ceil(width / (1.5 * hexRadius)) + 2;
      const rows = Math.ceil(height / hexHeight) + 2;
      // Center of screen
      const centerX = width / 2;
      const centerY = height / 2;
      // Precompute hex centers
      const hexes: { x: number; y: number; dist: number }[] = [];
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * 1.5 * hexRadius + hexRadius;
          const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0) + hexRadius;
          const dist = Math.hypot(x - centerX, y - centerY);
          hexes.push({ x, y, dist });
        }
      }
      // Sort by distance from center
      hexes.sort((a, b) => a.dist - b.dist);
      // Animation
      function drawHex(cx: number, cy: number) {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        const pts = getHexPoints(cx, cy, hexRadius + 2); // Slightly larger radius to prevent gaps
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.clip();
        try {
          ctx.drawImage(img, 0, 0, width, height);
        } catch (e) {
          ctx.fillStyle = 'rgba(0,255,0,0.3)';
          ctx.fill();
        }
        ctx.restore();
      }
      function animateHexReveal(ts: number) {
        if (!ctx) return;
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        ctx.clearRect(0, 0, width, height);
        // How many hexes to reveal
        const revealCount = Math.floor((elapsed / duration) * hexes.length);
        for (let i = 0; i < revealCount; i++) {
          drawHex(hexes[i].x, hexes[i].y);
        }
        if (revealCount < hexes.length) {
          animationFrame = requestAnimationFrame(animateHexReveal);
        } else {
          // Draw all at end
          for (let i = 0; i < hexes.length; i++) drawHex(hexes[i].x, hexes[i].y);
          if (onComplete) onComplete();
        }
      }
      animationFrame = requestAnimationFrame(animateHexReveal);
    };
    img.onerror = () => {
      console.log('HexReveal: image failed to load, drawing fallback hexes');
      const { width, height } = canvas;
      const hexHeight = Math.sqrt(3) * hexRadius;
      const cols = Math.ceil(width / (1.5 * hexRadius)) + 2;
      const rows = Math.ceil(height / hexHeight) + 2;
      const centerX = width / 2;
      const centerY = height / 2;
      const hexes: { x: number; y: number; dist: number }[] = [];
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * 1.5 * hexRadius + hexRadius;
          const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0) + hexRadius;
          const dist = Math.hypot(x - centerX, y - centerY);
          hexes.push({ x, y, dist });
        }
      }
      hexes.sort((a, b) => a.dist - b.dist);
      function drawHex(cx: number, cy: number) {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        const pts = getHexPoints(cx, cy, hexRadius + 2); // Slightly larger radius to prevent gaps
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.fill();
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
          if (onComplete) onComplete();
        }
      }
      animationFrame = requestAnimationFrame(animateHexReveal);
    };
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [imageUrl, hexRadius, duration, onComplete]);

  // Make canvas full screen
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'transparent',
        pointerEvents: 'auto',
      }}
    />
  );
};

export default HexReveal;

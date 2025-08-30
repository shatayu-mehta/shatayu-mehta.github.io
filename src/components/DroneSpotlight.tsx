import React, { useRef, useEffect, useState } from 'react';

interface DroneSpotlightProps {
  onIconHighlight?: (iconId: string | null) => void;
}

const DroneSpotlight: React.FC<DroneSpotlightProps> = ({ onIconHighlight }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [highlightedIcon, setHighlightedIcon] = useState<string | null>(null);

  const socialIcons = [
    { id: 'linkedin', x: 150, label: '💼', link: 'https://linkedin.com/in/shatayu-mehta' },
    { id: 'github', x: 300, label: '💻', link: 'https://github.com/shatayu-mehta' },
    { id: 'email', x: 450, label: '📧', link: 'mailto:shatayu@example.com' },
    { id: 'resume', x: 600, label: '📄', link: '/RESUME_S_A_M.pdf' },
    { id: 'phone', x: 750, label: '📞', link: 'tel:+1234567890' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 900;
    canvas.height = 400;

    let startTime = Date.now();
    const droneSpeed = 0.5; // pixels per millisecond
    const droneStartX = -100;
    const droneEndX = canvas.width + 100;
    const totalDistance = droneEndX - droneStartX;
    const totalDuration = totalDistance / droneSpeed;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) % (totalDuration + 2000); // Add pause before restart
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground line
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 250);
      ctx.lineTo(canvas.width, 250);
      ctx.stroke();

      // Calculate drone position
      let currentDroneX;
      if (elapsed < totalDuration) {
        currentDroneX = droneStartX + (elapsed * droneSpeed);
      } else {
        currentDroneX = droneEndX; // Hold at end during pause
      }

      // Draw drone
      drawDrone(ctx, currentDroneX, 120);

      // Draw spotlight
      drawSpotlight(ctx, currentDroneX, 120, 250);

      // Check which icon is being spotlighted
      const spotlightRadius = 60;
      let currentHighlighted = null;
      
      for (const icon of socialIcons) {
        const distance = Math.abs(currentDroneX - icon.x);
        const isHighlighted = distance < spotlightRadius;
        
        if (isHighlighted) {
          currentHighlighted = icon.id;
        }
        
        drawSocialIcon(ctx, icon, isHighlighted);
      }

      if (currentHighlighted !== highlightedIcon) {
        setHighlightedIcon(currentHighlighted);
        onIconHighlight?.(currentHighlighted);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onIconHighlight, highlightedIcon]);

  const drawDrone = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    
    // Drone body
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(x - 30, y - 10, 60, 20);
    
    // Drone rotors
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    
    // Left rotor
    ctx.beginPath();
    ctx.ellipse(x - 25, y - 20, 15, 3, 0, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Right rotor
    ctx.beginPath();
    ctx.ellipse(x + 25, y - 20, 15, 3, 0, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Rotor arms
    ctx.beginPath();
    ctx.moveTo(x - 15, y - 5);
    ctx.lineTo(x - 25, y - 15);
    ctx.moveTo(x + 15, y - 5);
    ctx.lineTo(x + 25, y - 15);
    ctx.stroke();
    
    // Camera/spotlight
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.ellipse(x, y + 15, 8, 5, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.restore();
  };

  const drawSpotlight = (ctx: CanvasRenderingContext2D, x: number, droneY: number, groundY: number) => {
    ctx.save();
    
    // Create spotlight gradient
    const gradient = ctx.createRadialGradient(x, groundY, 0, x, groundY, 60);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
    gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    
    // Draw spotlight beam
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, groundY, 60, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw spotlight cone
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - 8, droneY + 20);
    ctx.lineTo(x - 60, groundY - 20);
    ctx.lineTo(x + 60, groundY - 20);
    ctx.lineTo(x + 8, droneY + 20);
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
  };

  const drawSocialIcon = (ctx: CanvasRenderingContext2D, icon: any, isHighlighted: boolean) => {
    ctx.save();
    
    const y = 280;
    const size = isHighlighted ? 40 : 30;
    
    // Icon background
    ctx.fillStyle = isHighlighted ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.roundRect(icon.x - size/2, y - size/2, size, size, 8);
    ctx.fill();
    
    // Icon border
    ctx.strokeStyle = isHighlighted ? '#00ffff' : '#666666';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Icon emoji/symbol
    ctx.fillStyle = isHighlighted ? '#000000' : '#ffffff';
    ctx.font = `${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon.label, icon.x, y);
    
    // Glow effect when highlighted
    if (isHighlighted) {
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    ctx.restore();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if click is on any social icon
    for (const icon of socialIcons) {
      const iconY = 280;
      const size = highlightedIcon === icon.id ? 40 : 30;
      
      if (x >= icon.x - size/2 && x <= icon.x + size/2 &&
          y >= iconY - size/2 && y <= iconY + size/2) {
        if (icon.link.startsWith('mailto:') || icon.link.startsWith('tel:')) {
          window.location.href = icon.link;
        } else {
          window.open(icon.link, '_blank');
        }
        break;
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      padding: '20px 0'
    }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.3)',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default DroneSpotlight;

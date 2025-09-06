import React, { useEffect, useState } from 'react';

interface Ship {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  direction: 'left' | 'right';
  image: string;
  delay: number;
  started: boolean;
}

const MovingShips: React.FC = () => {
  const [ships, setShips] = useState<Ship[]>([
    {
      id: 1,
      x: -80,
      y: window.innerHeight * 0.1,
      width: 80,
      height: 40,
      speed: 1,
      direction: 'right',
      image: '/SHIPBIG.png',
      delay: 0,
      started: false
    },
    {
      id: 2,
      x: window.innerWidth + 150,
      y: window.innerHeight * 0.25,
      width: 150,
      height: 75,
      speed: 0.8,
      direction: 'left',
      image: '/shipflippedbig.png',
      delay: 2000,
      started: false
    },
    {
      id: 3,
      x: -60,
      y: window.innerHeight * 0.45,
      width: 60,
      height: 30,
      speed: 0.6,
      direction: 'right',
      image: '/SHIPBIG.png',
      delay: 4000,
      started: false
    },
    {
      id: 4,
      x: window.innerWidth + 200,
      y: window.innerHeight * 0.65,
      width: 200,
      height: 100,
      speed: 1.2,
      direction: 'left',
      image: '/shipflippedbig.png',
      delay: 6000,
      started: false
    },
    {
      id: 5,
      x: -110,
      y: window.innerHeight * 0.8,
      width: 110,
      height: 55,
      speed: 0.9,
      direction: 'right',
      image: '/SHIPBIG.png',
      delay: 8000,
      started: false
    }
  ]);

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      
      setShips(prevShips => 
        prevShips.map(ship => {
          // Check if ship should start moving
          if (!ship.started && currentTime - startTime >= ship.delay) {
            return { ...ship, started: true };
          }
          
          if (!ship.started) return ship;

          let newX = ship.x;
          
          if (ship.direction === 'right') {
            newX += ship.speed;
            // Reset position when ship goes off screen
            if (newX > window.innerWidth + ship.width) {
              newX = -ship.width;
            }
          } else {
            newX -= ship.speed;
            // Reset position when ship goes off screen
            if (newX < -ship.width) {
              newX = window.innerWidth + ship.width;
            }
          }
          
          return { ...ship, x: newX };
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
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }}>
      {ships.map(ship => (
        <div
          key={ship.id}
          style={{
            position: 'absolute',
            left: ship.x,
            top: ship.y,
            width: ship.width,
            height: ship.height,
            backgroundImage: `url(${ship.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6,
            transition: 'none'
          }}
        />
      ))}
    </div>
  );
};

export default MovingShips;

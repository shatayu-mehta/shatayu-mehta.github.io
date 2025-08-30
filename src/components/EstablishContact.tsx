import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Social media platforms with their respective icons/symbols
const socialPlatforms = [
  {
    id: 'github',
    name: 'GitHub',
    symbol: '</>', // Coding symbol for GitHub
    url: 'https://github.com/shatayu-mehta',
    color: '#00ff88'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    symbol: 'in', // Actual LinkedIn symbol
    url: 'https://linkedin.com/in/shatayu-mehta',
    color: '#0077b5'
  },
  {
    id: 'email',
    name: 'Email',
    symbol: '@',
    url: 'mailto:shatayu.mehta@example.com',
    color: '#ff4444'
  }
];

// DJI Inspire 3 Drone with Projector
interface DroneProps {
  targetX: number;
  hoveredSocial: string | null;
  socialPlatforms: typeof socialPlatforms;
}

function DroneWithProjector({ targetX, hoveredSocial, socialPlatforms }: DroneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const propellerRefs = [
    useRef<THREE.Mesh>(null), 
    useRef<THREE.Mesh>(null), 
    useRef<THREE.Mesh>(null), 
    useRef<THREE.Mesh>(null)
  ];
  const projectorRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      let droneTargetX = 0; // Default center position
      
      // If hovering over a social icon, move drone to that position
      if (hoveredSocial) {
        const socialIndex = socialPlatforms.findIndex(s => s.id === hoveredSocial);
        if (socialIndex !== -1) {
          // Map social index to specific X positions matching the icon layout
          // Adjusted for 3 icons instead of 5
          const socialPositions = [-4, 0, 4]; // X positions for 3 social icons
          droneTargetX = socialPositions[socialIndex] || 0;
        }
      } else {
        // When not hovering over icons, follow cursor smoothly
        // Use the passed targetX parameter for free movement
        droneTargetX = targetX * 0.8; // Scale down cursor movement for smoother feel
      }
      
      // Smooth horizontal movement with different speeds for different contexts
      const currentX = groupRef.current.position.x;
      const lerpSpeed = hoveredSocial ? 0.08 : 0.05; // Slower when following cursor, faster when snapping to icons
      const newX = THREE.MathUtils.lerp(currentX, droneTargetX, lerpSpeed);
      groupRef.current.position.x = newX;
      
      // Gentle floating animation
      groupRef.current.position.y = 2 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1;
      
      // Slight tilt based on movement direction - more subtle
      const movement = droneTargetX - currentX;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z, 
        movement * 0.03, // Reduced tilt for more natural movement
        0.05
      );
      
      // Spinning rotors
      propellerRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.rotation.y += 1.0;
        }
      });
    }

    // Projector light effect
    if (projectorRef.current) {
      if (hoveredSocial) {
        // Point straight down when over the target
        projectorRef.current.rotation.y = THREE.MathUtils.lerp(
          projectorRef.current.rotation.y,
          0, // Straight down
          0.08
        );
        projectorRef.current.rotation.x = THREE.MathUtils.lerp(
          projectorRef.current.rotation.x,
          0.3, // Point downward
          0.08
        );
      } else {
        // When not hovering, gently follow drone movement
        const droneX = groupRef.current?.position.x || 0;
        const followAngle = droneX * 0.02; // Very subtle following of drone movement
        
        projectorRef.current.rotation.y = THREE.MathUtils.lerp(
          projectorRef.current.rotation.y, 
          followAngle, 
          0.02
        );
        projectorRef.current.rotation.x = THREE.MathUtils.lerp(
          projectorRef.current.rotation.x, 
          0.1, // Slight downward angle when following cursor
          0.03
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]} scale={0.8}>
      {/* Main drone body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 0.8, 8]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.9} />
      </mesh>
      
      {/* Drone arms */}
      {[
        { angle: 0, name: 'front-right' },
        { angle: Math.PI / 2, name: 'back-right' },
        { angle: Math.PI, name: 'back-left' },
        { angle: 3 * Math.PI / 2, name: 'front-left' }
      ].map((arm, index) => (
        <group key={arm.name} rotation={[0, arm.angle, 0]}>
          {/* Arm connecting body to motor */}
          <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
            <meshBasicMaterial color="#00ffff" wireframe />
          </mesh>
          
          {/* Motor at end of arm */}
          <mesh position={[1.2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          
          {/* Propeller */}
          <mesh ref={propellerRefs[index]} position={[1.2, 0.08, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.01, 3]} />
            <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
      
      {/* Camera gimbal */}
      <mesh position={[0, -0.5, 0.3]}>
        <boxGeometry args={[0.3, 0.2, 0.2]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Projector payload */}
      <group ref={projectorRef} position={[0, -0.7, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.15, 0.3, 8]} />
          <meshBasicMaterial color="#ff00ff" wireframe />
        </mesh>
        
        {/* Theater spotlight beam when hovering */}
        {hoveredSocial && (
          <>
            {/* Main spotlight cone - extends far down like a theater light */}
            <mesh position={[0, -8, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[3, 16, 16, 1, false]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.1} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Inner focused beam - brighter center */}
            <mesh position={[0, -8, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[2, 16, 16, 1, false]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.15} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Core spotlight beam - most intense */}
            <mesh position={[0, -8, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[1, 16, 16, 1, false]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.25} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Volumetric light rays */}
            {[...Array(8)].map((_, i) => (
              <mesh 
                key={i} 
                position={[
                  Math.sin(i * Math.PI / 4) * 0.1, 
                  -8, 
                  Math.cos(i * Math.PI / 4) * 0.1
                ]} 
                rotation={[0, 0, 0]}
              >
                <cylinderGeometry args={[0.005, 0.005, 16, 4]} />
                <meshBasicMaterial 
                  color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                  transparent 
                  opacity={0.4}
                />
              </mesh>
            ))}
            
            {/* Ground illumination circle - where the spotlight hits */}
            <mesh position={[0, -15.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[3, 32]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.15} 
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}

// Main EstablishContact Component
interface EstablishContactProps {
  currentSection: string;
}

const EstablishContact: React.FC<EstablishContactProps> = ({ currentSection }) => {
  const [mouseX, setMouseX] = useState(0);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1; // Normalize to -1 to 1
        setMouseX(x * 3); // Scale for 3D scene - reduced scale for more precise movement
      }
    };

    if (currentSection === 'contact') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentSection]);

  if (currentSection !== 'contact') {
    return null;
  }

  console.log('EstablishContact rendering, mouseX:', mouseX, 'hoveredSocial:', hoveredSocial);

  return (
    <motion.div
      className="establish-contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Start from top instead of space-between
        padding: '100px 2vw 1vh 2vw', // Increased top padding for more space from navigation
        boxSizing: 'border-box',
        overflow: 'hidden', // Prevent any scrolling
      }}
    >
      {/* Top Section - Title and Description */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: '0 0 auto', // Don't grow/shrink
        width: '100%',
        maxWidth: '1200px',
        marginTop: '1rem', // Add top margin for better spacing
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Reduced font size
          fontFamily: 'Orbitron, monospace',
          fontWeight: 'bold',
          color: '#00ffff',
          textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff',
          margin: '0 0 0.5rem 0', // Reduced margin
          lineHeight: '1.1',
          wordBreak: 'break-word', // Prevent overflow
        }}>
          ESTABLISH CONTACT
        </h1>

        {/* Description */}
        <p style={{
          color: '#ffffff',
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', // Reduced font size
          lineHeight: '1.4',
          maxWidth: '800px',
          margin: '0',
          padding: '0 1rem',
        }}>
          Ready to collaborate on the next breakthrough in robotics? Let's connect and build the future together.
        </p>

        {/* Horizontal Line */}
        <div style={{
          width: '80%',
          maxWidth: '800px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          boxShadow: '0 0 20px #00ffff',
          margin: '0.8rem 0 0.5rem 0', // Reduced margins
        }} />
      </div>

      {/* Middle Section - 3D Scene (Full Background) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Behind everything
      }}>
        <Canvas
          camera={{ 
            position: [0, 0, 15], // Further back to see more
            fov: 75, // Wider field of view
            near: 0.1, 
            far: 100 
          }}
          gl={{ antialias: true, alpha: true }}
        >
          <DroneWithProjector targetX={mouseX} hoveredSocial={hoveredSocial} socialPlatforms={socialPlatforms} />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 5, 5]} intensity={1.2} color="#00ffff" />
          <pointLight position={[5, 0, 5]} intensity={0.8} color="#ff00ff" />
          <pointLight position={[-5, 0, 5]} intensity={0.8} color="#ff00ff" />
        </Canvas>
      </div>

      {/* Bottom Section - Social Media Icons */}
      <div style={{
        display: 'flex',
        gap: 'clamp(0.8rem, 2.5vw, 2.5rem)', // Reduced gap
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 'auto', // Push to bottom
        marginBottom: '1rem', // Small margin from bottom
        width: '100%',
        maxWidth: '1000px', // Reduced max width
        paddingBottom: '1rem',
        zIndex: 10, // Above 3D scene
      }}>
        {socialPlatforms.map((social) => (
          <div
            key={social.id}
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', // Reduced icon size
              color: hoveredSocial === social.id ? social.color : '#00ffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: hoveredSocial === social.id 
                ? `0 0 40px ${social.color}, 0 0 80px ${social.color}, 0 0 120px ${social.color}` 
                : `0 0 20px #00ffff`,
              transform: hoveredSocial === social.id ? 'scale(1.2)' : 'scale(1)', // Reduced scale to prevent overflow
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 'clamp(0.8rem, 2vw, 1.5rem)', // Responsive padding
              borderRadius: '15px',
              background: hoveredSocial === social.id 
                ? `radial-gradient(circle, ${social.color}40, ${social.color}20, ${social.color}10, transparent)` 
                : 'rgba(0, 0, 0, 0.2)', // More transparent background
              border: 'none', // Remove borders
              boxShadow: hoveredSocial === social.id 
                ? `
                  0 0 40px ${social.color}60, 
                  inset 0 0 20px ${social.color}20,
                  0 5px 20px rgba(0, 0, 0, 0.5)
                ` 
                : '0 3px 15px rgba(0, 0, 0, 0.2)', // Reduced shadow when not hovered
              position: 'relative',
              zIndex: hoveredSocial === social.id ? 10 : 1,
              minWidth: 'clamp(80px, 12vw, 120px)', // Prevent icons from getting too small
            }}
            onMouseEnter={() => setHoveredSocial(social.id)}
            onMouseLeave={() => setHoveredSocial(null)}
            onClick={() => {
              if (social.url.startsWith('mailto:')) {
                window.location.href = social.url;
              } else {
                window.open(social.url, '_blank');
              }
            }}
          >
            {/* Theater spotlight stage effect - simplified */}
            {hoveredSocial === social.id && (
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(100px, 15vw, 150px)',
                height: 'clamp(100px, 15vw, 150px)',
                background: `
                  radial-gradient(
                    circle, 
                    ${social.color}25 0%, 
                    ${social.color}15 40%, 
                    ${social.color}05 70%, 
                    transparent 100%
                  )
                `,
                borderRadius: '50%',
                animation: 'spotlightPulse 2s ease-in-out infinite',
                zIndex: -1,
              }} />
            )}
            
            <span style={{
              filter: hoveredSocial === social.id ? `drop-shadow(0 0 8px ${social.color})` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {social.symbol}
            </span>
            <span style={{
              fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', // Responsive label size
              fontFamily: 'Orbitron, monospace',
              fontWeight: 'bold',
              opacity: hoveredSocial === social.id ? 1 : 0.8,
              textShadow: hoveredSocial === social.id ? `0 0 15px ${social.color}` : 'none',
              textAlign: 'center',
              whiteSpace: 'nowrap', // Prevent text wrapping
            }}>
              {social.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EstablishContact;

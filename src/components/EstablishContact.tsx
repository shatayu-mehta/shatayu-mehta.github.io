import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Social media platforms with their respective icons/symbols
const socialPlatforms = [
  {
    id: 'github',
    name: 'GitHub',
    symbol: '⧰', // Git symbol
    url: 'https://github.com/shatayu-mehta',
    color: '#00ff88'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    symbol: 'IN',
    url: 'https://linkedin.com/in/shatayu-mehta',
    color: '#0077b5'
  },
  {
    id: 'email',
    name: 'Email',
    symbol: '@',
    url: 'mailto:shatayu.mehta@example.com',
    color: '#ff4444'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    symbol: '𝕏',
    url: 'https://twitter.com/shatayumehta',
    color: '#1da1f2'
  },
  {
    id: 'resume',
    name: 'Resume',
    symbol: '📄',
    url: '/RESUME_S_A_M.pdf',
    color: '#ffa500'
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
      // Smooth horizontal movement following cursor
      const currentX = groupRef.current.position.x;
      const newX = THREE.MathUtils.lerp(currentX, targetX, 0.05);
      groupRef.current.position.x = newX;
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1;
      
      // Slight tilt based on movement direction
      const movement = targetX - currentX;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z, 
        movement * 0.1, 
        0.05
      );
      
      // Spinning rotors
      propellerRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.rotation.y += 1.0;
        }
      });
    }

    // Projector light effect - rotate towards hovered social but stay attached to drone
    if (projectorRef.current && hoveredSocial) {
      const socialIndex = socialPlatforms.findIndex(s => s.id === hoveredSocial);
      if (socialIndex !== -1) {
        // Calculate precise position for each social icon
        // Map social index to specific X positions where icons are placed
        const socialPositions = [-6, -3, 0, 3, 6]; // X positions for 5 social icons
        const targetSocialX = socialPositions[socialIndex] || 0;
        
        // Don't move the projector position - keep it attached to drone
        // Instead, rotate the projector to aim at the target
        const droneX = groupRef.current?.position.x || 0;
        const angleTo = Math.atan2(targetSocialX - droneX, -8); // Angle to aim at social icon
        
        // Rotate projector to aim at the social icon
        projectorRef.current.rotation.z = THREE.MathUtils.lerp(
          projectorRef.current.rotation.z,
          angleTo,
          0.15
        );
        
        // Point slightly downward towards the social icons
        projectorRef.current.rotation.x = THREE.MathUtils.lerp(
          projectorRef.current.rotation.x,
          0.3, // Point downward
          0.1
        );
      }
    } else if (projectorRef.current) {
      // Return to neutral position when not hovering
      projectorRef.current.rotation.x = THREE.MathUtils.lerp(projectorRef.current.rotation.x, 0, 0.05);
      projectorRef.current.rotation.z = THREE.MathUtils.lerp(projectorRef.current.rotation.z, 0, 0.05);
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
              <coneGeometry args={[2.5, 16, 16, 1, false]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.12} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Inner focused beam - brighter center */}
            <mesh position={[0, -8, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[1.5, 16, 16, 1, false]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.18} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Core spotlight beam - most intense */}
            <mesh position={[0, -8, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[1, 16, 16, 1, false]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.3} 
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
                  opacity={0.5}
                />
              </mesh>
            ))}
            
            {/* Ground illumination circle - where the spotlight hits */}
            <mesh position={[0, -15.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[2.5, 32]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.2} 
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f23 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      {/* Top Section - Title and Description */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: 'clamp(80px, 10vh, 120px)', // Ensure it's below navigation
        paddingBottom: 'clamp(0.5rem, 1vh, 1rem)',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}>
        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', // Reduced size to prevent clipping
          fontFamily: 'Orbitron, monospace',
          fontWeight: 'bold',
          color: '#00ffff',
          textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff',
          margin: '0 0 clamp(0.5rem, 1vh, 1rem) 0',
          lineHeight: '1.1',
          wordBreak: 'break-word', // Prevent overflow
        }}>
          ESTABLISH CONTACT
        </h1>

        {/* Description */}
        <p style={{
          color: '#ffffff',
          fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)', // Responsive font size
          lineHeight: '1.4',
          maxWidth: '800px',
          margin: '0 0 clamp(0.8rem, 1.5vh, 1.5rem) 0',
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
          margin: '0',
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
        position: 'absolute',
        bottom: 'clamp(0.5rem, 2vh, 2rem)', // Reduced bottom positioning
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(0.8rem, 2.5vw, 2.5rem)', // Reduced gap
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '90%',
        maxWidth: '1000px', // Reduced max width
        zIndex: 10, // Above 3D scene
      }}>
        {socialPlatforms.map((social) => (
          <div
            key={social.id}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', // Responsive icon size
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
                : 'rgba(0, 0, 0, 0.4)',
              border: hoveredSocial === social.id 
                ? `2px solid ${social.color}` 
                : '1px solid rgba(0, 255, 255, 0.3)',
              boxShadow: hoveredSocial === social.id 
                ? `
                  0 0 40px ${social.color}60, 
                  inset 0 0 20px ${social.color}20,
                  0 5px 20px rgba(0, 0, 0, 0.5)
                ` 
                : '0 3px 15px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: hoveredSocial === social.id ? 10 : 1,
              minWidth: 'clamp(60px, 10vw, 100px)', // Reduced icon size to prevent clipping
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

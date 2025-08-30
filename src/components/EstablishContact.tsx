import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Social media platforms with their respective icons/symbols
const socialPlatforms = [
  {
    id: 'github',
    name: 'GitHub',
    symbol: '', // Will use 3D GitHub logo
    url: 'https://github.com/shatayu-mehta',
    color: '#00ff88'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    symbol: '', // Will use 3D LinkedIn logo
    url: 'https://linkedin.com/in/shatayu-mehta',
    color: '#0077b5'
  },
  {
    id: 'email',
    name: 'Email',
    symbol: '', // Will use 3D email symbol
    url: 'mailto:shatayu.mehta@example.com',
    color: '#ff4444'
  }
];

// 3D Hologram Components
function GitHubHologram({ isHovered, color }: { isHovered: boolean; color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* GitHub Octocat body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
      
      {/* GitHub ears/tentacles */}
      <mesh position={[-0.3, 0.3, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.8 : 0.5}
        />
      </mesh>
      <mesh position={[0.3, 0.3, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.8 : 0.5}
        />
      </mesh>
      
      {/* Center hub - representing the code/repository concept */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.2]} />
        <meshBasicMaterial 
          color={isHovered ? '#ffffff' : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 1 : 0.7}
        />
      </mesh>
    </group>
  );
}

function LinkedInHologram({ isHovered, color }: { isHovered: boolean; color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2 + 1) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* LinkedIn "in" letterforms as 3D blocks */}
      {/* Letter "i" */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
      <mesh position={[-0.2, 0.4, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
      
      {/* Letter "n" */}
      <mesh position={[0.1, 0, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
      <mesh position={[0.25, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
    </group>
  );
}

function EmailHologram({ isHovered, color }: { isHovered: boolean; color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2 + 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Email envelope */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.9 : 0.6}
        />
      </mesh>
      
      {/* Email flap - triangle */}
      <mesh position={[0, 0.1, 0.03]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.3, 0.05, 3]} />
        <meshBasicMaterial 
          color={isHovered ? color : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 0.8 : 0.5}
        />
      </mesh>
      
      {/* @ symbol ring */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshBasicMaterial 
          color={isHovered ? '#ffffff' : '#00ffff'} 
          wireframe 
          transparent 
          opacity={isHovered ? 1 : 0.7}
        />
      </mesh>
    </group>
  );
}

// Social Media 3D Holograms Component
function SocialHolograms({ hoveredSocial }: { hoveredSocial: string | null }) {
  return (
    <group position={[0, -2.5, 0]}>
      {socialPlatforms.map((social, index) => {
        const xPosition = (index - 1) * 3; // Reduced spacing from 4 to 3
        const isHovered = hoveredSocial === social.id;
        
        return (
          <group key={social.id} position={[xPosition, 0, 0]} scale={isHovered ? 1.5 : 1}>
            {social.id === 'github' && <GitHubHologram isHovered={isHovered} color={social.color} />}
            {social.id === 'linkedin' && <LinkedInHologram isHovered={isHovered} color={social.color} />}
            {social.id === 'email' && <EmailHologram isHovered={isHovered} color={social.color} />}
            
            {/* Hologram base platform */}
            <mesh position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.05, 16]} />
              <meshBasicMaterial 
                color={isHovered ? social.color : '#00ffff'} 
                wireframe 
                transparent 
                opacity={isHovered ? 0.6 : 0.3}
              />
            </mesh>
            
            {/* Hologram energy rings */}
            {isHovered && (
              <>
                <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.7, 0.02, 8, 32]} />
                  <meshBasicMaterial 
                    color={social.color} 
                    transparent 
                    opacity={0.4}
                  />
                </mesh>
                <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.9, 0.02, 8, 32]} />
                  <meshBasicMaterial 
                    color={social.color} 
                    transparent 
                    opacity={0.2}
                  />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}

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
          // Adjusted for 3 icons with reduced spacing
          const socialPositions = [-3, 0, 3]; // X positions for 3 social icons
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
      groupRef.current.position.y = 1.5 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1;
      
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
    <group ref={groupRef} position={[0, 1.5, 0]} scale={0.8}>
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
            <mesh position={[0, -5, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[2.5, 10, 16, 1, false]} />
              <meshBasicMaterial 
                color={socialPlatforms.find(s => s.id === hoveredSocial)?.color || '#00ffff'} 
                transparent 
                opacity={0.1} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Inner focused beam - brighter center */}
            <mesh position={[0, -5, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[1.8, 10, 16, 1, false]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.15} 
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Core spotlight beam - most intense */}
            <mesh position={[0, -5, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[1, 10, 16, 1, false]} />
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
          fontSize: 'clamp(2rem, 5vw, 3.2rem)', // Increased title size
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
          <SocialHolograms hoveredSocial={hoveredSocial} />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 5, 5]} intensity={1.2} color="#00ffff" />
          <pointLight position={[5, 0, 5]} intensity={0.8} color="#ff00ff" />
          <pointLight position={[-5, 0, 5]} intensity={0.8} color="#ff00ff" />
        </Canvas>
      </div>

      {/* Bottom Section - Invisible Interaction Areas for 3D Holograms */}
      <div style={{
        display: 'flex',
        gap: 'clamp(0.5rem, 2vw, 2rem)', // Further reduced gap to match hologram spacing
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
              width: 'clamp(80px, 12vw, 120px)',
              height: 'clamp(80px, 12vw, 120px)',
              cursor: 'pointer',
              background: 'transparent', // Make invisible
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
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
            {/* Optional: Show label on hover */}
            {hoveredSocial === social.id && (
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 'bold',
                color: social.color,
                textShadow: `0 0 15px ${social.color}`,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>
                {social.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EstablishContact;

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
}

function DroneWithProjector({ targetX, hoveredSocial }: DroneProps) {
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

    // Projector light effect
    if (projectorRef.current && hoveredSocial) {
      projectorRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
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
          {/* Arm */}
          <mesh position={[0.8, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.6, 6]} />
            <meshBasicMaterial color="#00ffff" wireframe />
          </mesh>
          
          {/* Motor */}
          <mesh position={[1.2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          
          {/* Propeller */}
          <mesh ref={propellerRefs[index]} position={[1.2, 0.1, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 3]} />
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
          <cylinderGeometry args={[0.15, 0.2, 0.4, 8]} />
          <meshBasicMaterial color="#ff00ff" wireframe />
        </mesh>
        
        {/* Projector beam when hovering */}
        {hoveredSocial && (
          <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[2, 3, 8, 1, true]} />
            <meshBasicMaterial 
              color="#00ffff" 
              transparent 
              opacity={0.2} 
              side={THREE.DoubleSide}
            />
          </mesh>
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
        setMouseX(x * 4); // Scale for 3D scene
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
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Title */}
      <h1 style={{
        fontSize: '4rem',
        fontFamily: 'Orbitron, monospace',
        fontWeight: 'bold',
        color: '#00ffff',
        textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff',
        margin: '0 0 2rem 0',
        textAlign: 'center',
      }}>
        ESTABLISH CONTACT
      </h1>

      {/* Description */}
      <p style={{
        color: '#ffffff',
        fontSize: '1.4rem',
        lineHeight: '1.6',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 0 3rem 0',
        padding: '0 2rem',
      }}>
        Ready to collaborate on the next breakthrough in robotics? Let's connect and build the future together.
      </p>

      {/* Horizontal Line */}
      <div style={{
        width: '80%',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
        boxShadow: '0 0 20px #00ffff',
        margin: '2rem 0',
      }} />

      {/* 3D Drone Scene */}
      <div style={{
        width: '100%',
        height: '200px',
        position: 'relative',
      }}>
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <DroneWithProjector targetX={mouseX} hoveredSocial={hoveredSocial} />
          <ambientLight intensity={0.8} />
          <pointLight position={[0, 5, 5]} intensity={1.5} color="#00ffff" />
        </Canvas>
      </div>

      {/* Social Media Icons */}
      <div style={{
        display: 'flex',
        gap: '3rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {socialPlatforms.map((social) => (
          <div
            key={social.id}
            style={{
              fontSize: '3rem',
              color: hoveredSocial === social.id ? social.color : '#00ffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: `0 0 20px ${hoveredSocial === social.id ? social.color : '#00ffff'}`,
              transform: hoveredSocial === social.id ? 'scale(1.2)' : 'scale(1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
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
            <span>{social.symbol}</span>
            <span style={{
              fontSize: '1rem',
              fontFamily: 'Orbitron, monospace',
              fontWeight: 'bold',
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

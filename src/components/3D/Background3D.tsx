import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Subtle particle field for robotics/tech aesthetic
const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(600 * 3);
    
    for (let i = 0; i < 600; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f5ff"
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.08}
      />
    </Points>
  );
};

// Subtle circuit-like lines for tech aesthetic
const CircuitLines: React.FC = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const lines = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    // Create fewer, more subtle lines
    for (let i = 0; i < 15; i++) {
      const x1 = (Math.random() - 0.5) * 25;
      const y1 = (Math.random() - 0.5) * 20;
      const z1 = (Math.random() - 0.5) * 15;
      
      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 3;

      positions.push(x1, y1, z1, x2, y2, z2);
      
      // Use subtle cyan color
      const color = new THREE.Color(0x00f5ff);
      colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return lineGeometry;
  }, []);

  return (
    <group ref={ref}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial vertexColors transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
};

// Minimal floating geometry for robotics feel
const FloatingGeometry: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[8, 0, -8]}>
      <octahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color="#00f5ff"
        transparent
        opacity={0.05}
        wireframe
      />
    </mesh>
  );
};

// Secondary geometry element
const TechCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.z += delta * 0.12;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[-6, 2, -6]}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color="#ff0080"
        transparent
        opacity={0.03}
        wireframe
      />
    </mesh>
  );
};

const Background3D: React.FC = () => {
  return (
    <>
      {/* Very subtle ambient lighting */}
      <ambientLight intensity={0.1} />
      
      {/* Minimal point lights */}
      <pointLight position={[15, 15, 10]} color="#00f5ff" intensity={0.2} />
      <pointLight position={[-15, -10, -5]} color="#ff0080" intensity={0.15} />
      
      {/* Subtle particle field */}
      <ParticleField />
      
      {/* Minimal circuit-like lines */}
      <CircuitLines />
      
      {/* Subtle floating geometry */}
      <FloatingGeometry />
      <TechCube />
    </>
  );
};

export default Background3D;

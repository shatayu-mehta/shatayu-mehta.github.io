import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const HeroModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 2) * 0.3;
      sphereRef.current.rotation.x = t * 0.5;
      sphereRef.current.rotation.z = t * 0.3;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.8;
      torusRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Point lights */}
      <pointLight position={[10, 10, 10]} color="#00f5ff" intensity={0.5} />
      <pointLight position={[-10, -10, 5]} color="#ff0080" intensity={0.3} />

      {/* Main sphere */}
      <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00f5ff"
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={0.5}
        />
      </Sphere>

      {/* Orbiting torus */}
      <Torus ref={torusRef} args={[1.5, 0.1, 8, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff0080"
          transparent
          opacity={0.6}
          roughness={0.3}
          metalness={0.7}
        />
      </Torus>

      {/* Additional geometric elements */}
      <Box args={[0.5, 0.5, 0.5]} position={[-2, 1, -1]}>
        <meshStandardMaterial
          color="#ff8000"
          transparent
          opacity={0.8}
          roughness={0.4}
          metalness={0.6}
        />
      </Box>

      {/* Wireframe elements */}
      <Sphere args={[2, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.2}
          wireframe
        />
      </Sphere>
    </group>
  );
};

export default HeroModel;

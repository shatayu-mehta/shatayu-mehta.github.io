import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

interface ModelProps {
  path: string;
  scale: number;
  color?: string;
}

/* ── GLB — use embedded materials as-is ── */
const GLBModel: React.FC<ModelProps> = ({ path, scale }) => {
  const { scene } = useGLTF(path);
  const ref = useRef<THREE.Group>(null);
  useEffect(() => {
    if (!ref.current) return;
    const box = new THREE.Box3().setFromObject(ref.current);
    const center = box.getCenter(new THREE.Vector3());
    ref.current.position.sub(center);
  }, []);
  return <primitive ref={ref} object={scene} scale={scale} />;
};

/* ── STL — geometry only, apply color material ── */
const STLModel: React.FC<ModelProps> = ({ path, scale, color = '#e87040' }) => {
  const geometry = useLoader(STLLoader, path);
  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? (scale * 2) / maxDim : scale;
    ref.current.scale.setScalar(s);
    ref.current.position.set(-center.x * s, -center.y * s, -center.z * s);
  }, [geometry, scale]);

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.55,
    roughness: 0.3,
    emissive: new THREE.Color(color).multiplyScalar(0.12),
  });

  return <mesh ref={ref} geometry={geometry} material={mat} />;
};

/* ── OBJ — geometry + groups, apply color material ── */
const OBJModel: React.FC<ModelProps> = ({ path, scale, color = '#00c8d4' }) => {
  const obj = useLoader(OBJLoader, path);
  const ref = useRef<THREE.Group>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.65,
          roughness: 0.25,
          emissive: new THREE.Color(color).multiplyScalar(0.15),
        });
      }
    });
    const box = new THREE.Box3().setFromObject(ref.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = maxDim > 0 ? (scale * 2) / maxDim : scale;
    ref.current.scale.setScalar(s);
    ref.current.position.set(-center.x * s, -center.y * s, -center.z * s);
  }, [scale, color]);
  return <primitive ref={ref} object={obj} />;
};

const Spinner: React.FC = () => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="loading-spinner" />
  </div>
);

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  color?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, scale = 1, color }) => {
  const lower = modelPath.toLowerCase();
  const isSTL = lower.endsWith('.stl');
  const isOBJ = lower.endsWith('.obj');

  return (
    <div className="viewer-slot" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Suspense fallback={<Spinner />}>
        <Canvas
          camera={{ position: [2, 1.5, 3], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 8, 5]} intensity={1.4} />
          <pointLight position={[4, 4, 4]} color="#00f5ff" intensity={1.0} />
          <pointLight position={[-4, -2, -2]} color="#ff0080" intensity={0.5} />

          <Suspense fallback={null}>
            {isSTL && <STLModel path={modelPath} scale={scale} color={color} />}
            {isOBJ && <OBJModel path={modelPath} scale={scale} color={color} />}
            {!isSTL && !isOBJ && <GLBModel path={modelPath} scale={scale} />}
          </Suspense>

          <OrbitControls
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.2}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Canvas>
      </Suspense>
      <div className="viewer-hint text-mono">drag to rotate</div>
    </div>
  );
};

export default ModelViewer;

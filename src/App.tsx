import React, { lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/sections/Hero/Hero';
import ScrollProgress from './components/UI/ScrollProgress';
import LoadingScreen from './components/UI/LoadingScreen';
import LazySection from './components/LazySection';
import './styles/app.css';

const About = lazy(() => import('./components/sections/About/About'));
const Skills = lazy(() => import('./components/sections/Skills/Skills'));
const Projects = lazy(() => import('./components/sections/Projects/Projects'));
const Showcase = lazy(() => import('./components/sections/Showcase/Showcase'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));
const Background3D = lazy(() => import('./components/3D/Background3D'));
const MovingShips = lazy(() => import('./components/MovingShips'));

const App: React.FC = () => (
  <div className="app">
    <Suspense fallback={<LoadingScreen />}>
      <Suspense fallback={null}>
        <MovingShips />
      </Suspense>

      <div className="background-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
        </Canvas>
      </div>

      <Navigation />
      <ScrollProgress />

      <main className="main-content">
        <Hero />

        <LazySection>
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </LazySection>

        <LazySection>
          <Suspense fallback={null}>
            <Skills />
          </Suspense>
        </LazySection>

        <LazySection>
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
        </LazySection>

        <LazySection>
          <Suspense fallback={null}>
            <Showcase />
          </Suspense>
        </LazySection>

        <LazySection>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </LazySection>
      </main>
    </Suspense>
  </div>
);

export default App;

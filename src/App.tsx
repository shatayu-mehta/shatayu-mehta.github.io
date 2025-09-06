import React, { useEffect, useRef, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/sections/Hero/Hero';
import ScrollProgress from './components/UI/ScrollProgress';
import LoadingScreen from './components/UI/LoadingScreen';
import LazySection from './components/LazySection';
import './styles/app.css';

// Lazy load non-critical components
const About = lazy(() => import('./components/sections/About/About'));
const Experience = lazy(() => import('./components/sections/Experience/Experience'));
const Skills = lazy(() => import('./components/sections/Skills/Skills'));
const Projects = lazy(() => import('./components/sections/Projects/Projects'));
const Education = lazy(() => import('./components/sections/Education/Education'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));
const Background3D = lazy(() => import('./components/3D/Background3D'));
const MovingShips = lazy(() => import('./components/MovingShips'));

const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll behavior
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionCenter = sectionTop + sectionHeight / 2;

        if (scrollTop + windowHeight / 2 > sectionCenter - windowHeight / 4 && 
            scrollTop + windowHeight / 2 < sectionCenter + windowHeight / 4) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app" ref={appRef}>
      <Suspense fallback={<LoadingScreen />}>
        {/* JavaScript-powered moving ships */}
        <Suspense fallback={<div style={{ minHeight: '10px' }} />}>
          <MovingShips />
        </Suspense>

        {/* 3D Background Canvas */}
        <div className="background-canvas">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Background3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Main Content */}
        <main className="main-content">
          <Hero />
          
          <LazySection>
            <Suspense fallback={<div className="section-loading">Loading About...</div>}>
              <About />
            </Suspense>
          </LazySection>
          
          <LazySection>
            <Suspense fallback={<div className="section-loading">Loading Experience...</div>}>
              <Experience />
            </Suspense>
          </LazySection>
          
          <LazySection>
            <Suspense fallback={<div className="section-loading">Loading Skills...</div>}>
              <Skills />
            </Suspense>
          </LazySection>
          
          <LazySection>
            <Suspense fallback={<div className="section-loading">Loading Projects...</div>}>
              <Projects />
            </Suspense>
          </LazySection>
          
          <LazySection>
            <Suspense fallback={<div className="section-loading">Loading Education...</div>}>
              <Education />
            </Suspense>
          </LazySection>
          
          <LazySection>
            <Suspense fallback={<div className="section-loading">Loading Contact...</div>}>
              <Contact />
            </Suspense>
          </LazySection>
        </main>
      </Suspense>
    </div>
  );
};

export default App;

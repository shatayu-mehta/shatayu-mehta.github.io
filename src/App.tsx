import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Experience from './components/sections/Experience/Experience';
import Skills from './components/sections/Skills/Skills';
import Projects from './components/sections/Projects/Projects';
import Education from './components/sections/Education/Education';
import Contact from './components/sections/Contact/Contact';
import Background3D from './components/3D/Background3D';
import ScrollProgress from './components/UI/ScrollProgress';
import LoadingScreen from './components/UI/LoadingScreen';
import MovingShips from './components/MovingShips';
import './styles/app.css';

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
        <MovingShips />

        {/* 3D Background Canvas */}
        <div className="background-canvas">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Background3D />
          </Canvas>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Main Content */}
        <main className="main-content">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
      </Suspense>
    </div>
  );
};

export default App;

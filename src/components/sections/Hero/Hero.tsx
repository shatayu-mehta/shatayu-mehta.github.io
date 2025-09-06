import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import HeroModel from './HeroModel';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        heroRef.current.style.setProperty('--mouse-x', `${xPercent * 10}px`);
        heroRef.current.style.setProperty('--mouse-y', `${yPercent * 10}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-canvas">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <HeroModel />
            </Suspense>
          </Canvas>
        </div>
        <div className="hero-particles"></div>
        <div className="screen-glitch-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="greeting-text text-mono animate-fade-in-left">
                <span className="text-accent">{'>'}</span> Hello, I'm
              </span>
            </div>

            <h1 className="hero-name animate-fade-in-up">
              <span className="name-first gradient-text">Shatayu</span>
              <span className="name-last">Mehta</span>
            </h1>

            <div className="hero-title animate-fade-in-up">
              <h2 className="title-main">
                <span className="title-prefix text-mono">const </span>
                <span className="title-role text-accent">profession</span>
                <span className="title-equals text-mono"> = </span>
                <span className="title-value">"Robotics Engineer"</span>
              </h2>
            </div>

            <div className="hero-description animate-fade-in-up">
              <p>
                Passionate about designing autonomous systems, VTOL aircraft, and cutting-edge 
                robotics solutions. Currently pursuing Masters in Robotics at the 
                <span className="text-accent"> University of Minnesota</span>, with hands-on 
                experience in aerospace engineering and UAV development.
              </p>
            </div>

            <div className="hero-specialties animate-fade-in-up">
              <div className="specialty-list">
                <span className="specialty-item">
                  <span className="specialty-icon">🚁</span>
                  VTOL Aircraft Design
                </span>
                <span className="specialty-item">
                  <span className="specialty-icon">🤖</span>
                  Autonomous Systems
                </span>
                <span className="specialty-item">
                  <span className="specialty-icon">🔧</span>
                  CAD & Prototyping
                </span>
              </div>
            </div>

            <div className="hero-actions animate-fade-in-up">
              <button 
                className="btn btn-primary"
                onClick={scrollToAbout}
              >
                <span>Explore My Work</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 13l3 3 7-7" />
                </svg>
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={scrollToContact}
              >
                <span>Get In Touch</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </button>
            </div>

            <div className="hero-social animate-fade-in-up">
              <a 
                href="https://www.linkedin.com/in/shatayumehta" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="mailto:mehta405@umn.edu"
                className="social-link"
                aria-label="Email Contact"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email</span>
              </a>
              
              <a 
                href="tel:+17632453257"
                className="social-link"
                aria-label="Phone Contact"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Phone</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-stats animate-fade-in-right">
              <div className="stat-item">
                <span className="stat-number gradient-text">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number gradient-text">15+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number gradient-text">3</span>
                <span className="stat-label">Aircraft Prototyped</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text text-mono">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;

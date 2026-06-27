import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { EASE_EXPO } from '../../motion/variants';
import './Hero.css';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const curtain = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: (delay: number) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_EXPO, delay },
  }),
};

const rise = {
  hidden: { y: 32, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_EXPO, delay },
  }),
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" className="section hero" ref={heroRef}>
      <motion.div
        className="hero-inner"
        style={reduced ? {} : { y: contentY, opacity: contentOpacity }}
      >
        <div className="container hero-container">

          <motion.span
            className="hero-kicker text-mono"
            custom={0.05}
            variants={rise}
            initial="hidden"
            animate="visible"
          >
            <span className="kicker-accent">{'>'}</span> Robotics Engineer
          </motion.span>

          <h1 className="hero-name" aria-label="Shatayu Mehta">
            <span className="name-line">
              <motion.span
                className="name-first glitch-text"
                data-text="Shatayu"
                custom={0.2}
                variants={curtain}
                initial="hidden"
                animate="visible"
              >
                Shatayu
              </motion.span>
            </span>
            <span className="name-line">
              <motion.span
                className="name-last"
                custom={0.35}
                variants={curtain}
                initial="hidden"
                animate="visible"
              >
                Mehta
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero-tagline"
            custom={0.55}
            variants={rise}
            initial="hidden"
            animate="visible"
          >
            Building autonomous systems at the intersection of
            mechanical design, computer vision, and intelligent control.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={0.65}
            variants={rise}
            initial="hidden"
            animate="visible"
          >
            <a href="#about" className="btn btn-primary">View Work</a>
            <a
              href="/ROBOTICS_ENGINEER_SHATAYU_MEHTA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Resume ↗
            </a>
          </motion.div>

          <motion.div
            className="hero-social"
            custom={0.75}
            variants={rise}
            initial="hidden"
            animate="visible"
          >
            <a
              href="https://www.linkedin.com/in/shatayumehta"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/shatayu-mehta"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="mailto:shatayumehta.2000@gmail.com"
              className="hero-social-link"
              aria-label="Email"
            >
              <MailIcon />
            </a>
          </motion.div>

        </div>
      </motion.div>

      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="scroll-label text-mono">scroll</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;

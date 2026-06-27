import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../../motion/Reveal';
import { stagger, childFadeUp, lineGrow, EASE_EXPO } from '../../motion/variants';
import './About.css';

const timelineItems = [
  {
    id: 'ms',
    type: 'education',
    period: '2024 – 2026',
    title: 'M.S. Robotics',
    org: 'University of Minnesota',
    current: true,
  },
  {
    id: 'indrones',
    type: 'work',
    period: '2022 – 2023',
    title: 'R&D Engineer',
    org: 'Indrones Solutions',
    current: false,
  },
  {
    id: 'btech',
    type: 'education',
    period: '2018 – 2022',
    title: 'B.Tech Mechanical',
    org: 'KJ Somaiya',
    current: false,
  },
  {
    id: 'onyx',
    type: 'work',
    period: '2019 – 2021',
    title: 'Design Team Lead',
    org: 'Team Onyx India',
    current: false,
  },
];

const stats = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 8, suffix: '+', label: 'Projects Built' },
  { value: 3.5, suffix: '', label: 'GPA' },
];

function useCountUp(target: number, duration = 1.4, enabled = false) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [enabled, target, duration]);

  return count;
}

const StatCounter: React.FC<{ value: number; suffix: string; label: string; delay: number }> = ({
  value, suffix, label, delay,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1.2, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const display = value % 1 === 0 ? Math.round(count) : count.toFixed(1);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE_EXPO, delay }}
    >
      <span className="stat-value">
        {display}<span className="stat-suffix">{suffix}</span>
      </span>
      <span className="stat-label text-mono">{label}</span>
    </motion.div>
  );
};

const About: React.FC = () => (
  <section id="about" className="section about" data-section="about">
    <div className="container">

      <Reveal>
        <div className="section-tag">
          <span className="tag-number text-mono">02</span>
          <span className="tag-label">About</span>
        </div>
      </Reveal>

      {/* Pull-quote */}
      <Reveal delay={0.05}>
        <h2 className="about-headline">
          I build machines<br />
          <span className="gradient-text">that think.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="about-bio">
          MS Robotics student at the University of Minnesota — previously R&D engineer
          designing VTOL aircraft at Indrones and team lead for SAE Aero Design.
          My work lives at the intersection of mechanical design, computer vision,
          and intelligent control.
        </p>
      </Reveal>

      {/* Stats band */}
      <div className="stats-band">
        {stats.map((s, i) => (
          <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
        ))}
      </div>

      {/* Timeline */}
      <Reveal delay={0.08}>
        <h3 className="tl-heading text-mono">// journey</h3>
      </Reveal>

      {/* Horizontal rail */}
      <div className="tl-rail-wrap">
        <motion.div
          className="tl-rule"
          variants={lineGrow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        />

        <motion.div
          className="tl-items"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {timelineItems.map((item) => (
            <motion.div
              key={item.id}
              className={`tl-item tl-${item.type}${item.current ? ' tl-current' : ''}`}
              variants={childFadeUp}
            >
              <span className="tl-period text-mono">{item.period}</span>
              <span className="tl-dot" />
              <h4 className="tl-title">{item.title}</h4>
              <span className="tl-org">{item.org}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  </section>
);

export default About;

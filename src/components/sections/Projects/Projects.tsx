import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../../motion/Reveal';
import { stagger, childFadeUp, EASE_EXPO } from '../../motion/variants';
import { fadeUp } from '../../motion/variants';
import projectsData from '../../../data/projects.json';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  achievements: string[];
  timeline: string;
  github: string | string[] | null;
  demo: string | null;
  video: string | null;
  featured: boolean;
}

const ytEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1`;

const openDemo = (url: string, title: string) => {
  const w = window.open(
    url, '_blank',
    'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no'
  );
  if (w) w.document.title = `${title} — Demo`;
};

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* Lazy-mount iframe when scrolled into view */
const VideoPanel: React.FC<{ videoId: string; title: string }> = ({ videoId, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -120px 0px' });

  return (
    <div ref={ref} className="proj-video-wrap">
      {inView && (
        <iframe
          src={ytEmbed(videoId)}
          title={`${title} demo`}
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
          className="proj-iframe"
        />
      )}
    </div>
  );
};

/* Featured alternating panel */
const FeaturedPanel: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const flip = index % 2 !== 0;
  const githubLinks = Array.isArray(project.github)
    ? project.github
    : project.github ? [project.github] : [];

  return (
    <div className={`featured-panel${flip ? ' featured-panel--flip' : ''}`}>
      {/* Text block */}
      <motion.div
        className="panel-text"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger(0.07)}
      >
        <motion.span className="panel-index text-mono" variants={childFadeUp}>
          0{index + 1}
        </motion.span>
        <motion.span className="panel-timeline text-mono" variants={childFadeUp}>
          {project.timeline}
        </motion.span>
        <motion.h3 className="panel-title" variants={childFadeUp}>
          {project.title}
        </motion.h3>
        <motion.p className="panel-desc" variants={childFadeUp}>
          {project.description}
        </motion.p>

        <motion.ul className="panel-achievements" variants={stagger(0.04)}>
          {project.achievements.slice(0, 3).map((a, i) => (
            <motion.li key={i} variants={childFadeUp}>{a}</motion.li>
          ))}
        </motion.ul>

        <motion.div className="panel-techs" variants={childFadeUp}>
          {project.technologies.slice(0, 5).map((t) => (
            <span key={t} className="panel-tech text-mono">{t}</span>
          ))}
        </motion.div>

        <motion.div className="panel-links" variants={childFadeUp}>
          {githubLinks.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="panel-link">
              <GitHubIcon />
              GitHub{githubLinks.length > 1 ? ` ${i + 1}` : ''}
            </a>
          ))}
          {!project.video && project.demo && (
            <button
              className="panel-link panel-link--demo"
              onClick={() => openDemo(project.demo!, project.title)}
            >
              Watch Demo ▶
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* Video / placeholder block */}
      <div className="panel-media">
        {project.video ? (
          <VideoPanel videoId={project.video} title={project.title} />
        ) : (
          <div className="panel-no-video">
            <span className="text-mono" style={{ color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
              // video coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* Compact card for non-featured projects */
const CompactCard: React.FC<{ project: Project }> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const githubLinks = Array.isArray(project.github)
    ? project.github
    : project.github ? [project.github] : [];

  return (
    <div className={`compact-card${open ? ' compact-card--open' : ''}`}>
      <button className="compact-header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="compact-title">{project.title}</span>
        <span className="compact-meta">
          <span className="compact-period text-mono">{project.timeline}</span>
          <svg
            className="compact-chevron"
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="compact-body">
          <p className="compact-desc">{project.description}</p>
          <div className="compact-techs">
            {project.technologies.map((t) => (
              <span key={t} className="panel-tech text-mono">{t}</span>
            ))}
          </div>
          <div className="panel-links">
            {githubLinks.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="panel-link">
                <GitHubIcon />
                GitHub{githubLinks.length > 1 ? ` ${i + 1}` : ''}
              </a>
            ))}
            {project.demo && (
              <button
                className="panel-link panel-link--demo"
                onClick={() => openDemo(project.demo!, project.title)}
              >
                Watch Demo ▶
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const projects = projectsData.projects as Project[];
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section projects" data-section="projects">
      <div className="container">

        <Reveal>
          <div className="section-tag">
            <span className="tag-number text-mono">04</span>
            <span className="tag-label">Projects</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section-title">
            Built <span className="gradient-text">Work</span>
          </h2>
        </Reveal>

      </div>

      {/* Full-bleed featured panels (no container padding) */}
      <div className="featured-panels">
        {featured.map((p, i) => (
          <FeaturedPanel key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* More work compact grid */}
      {more.length > 0 && (
        <div className="container">
          <Reveal>
            <h3 className="more-heading text-mono">// more work</h3>
          </Reveal>
          <motion.div
            className="compact-list"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {more.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <CompactCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;

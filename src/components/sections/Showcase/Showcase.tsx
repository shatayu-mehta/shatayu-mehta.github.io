import React, { useRef, lazy, Suspense } from 'react';
import { useInView } from 'framer-motion';
import Reveal from '../../motion/Reveal';
import designsData from '../../../data/designs.json';
import './Showcase.css';

const ModelViewer = lazy(() => import('./ModelViewer'));

interface Design {
  id: number;
  title: string;
  description: string;
  modelPath: string | null;
  modelScale: number;
  modelColor?: string;
  tags: string[];
  status: 'ready' | 'coming-soon';
  link: string | null;
}

const SHOWCASE_IDS = [1, 4]; // FUJIN VTOL, Wearable Ring Mouse

const ShowcaseWindow: React.FC<{ design: Design }> = ({ design }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <div ref={ref} className="showcase-window">
      <div className="showcase-window-viewer">
        {design.modelPath ? (
          inView ? (
            <Suspense fallback={<div className="showcase-spinner"><div className="loading-spinner" /></div>}>
              <ModelViewer modelPath={design.modelPath} scale={design.modelScale} color={design.modelColor} />
            </Suspense>
          ) : (
            <div className="showcase-spinner" />
          )
        ) : (
          <div className="showcase-placeholder">
            <span className="showcase-placeholder-text text-mono">3d model in progress</span>
          </div>
        )}
      </div>
      <div className="showcase-window-label">
        <span className="showcase-window-title">{design.title}</span>
        <span className="showcase-window-desc">{design.description}</span>
      </div>
    </div>
  );
};

const Showcase: React.FC = () => {
  const designs = (designsData.designs as Design[]).filter((d) =>
    SHOWCASE_IDS.includes(d.id)
  );

  return (
    <section id="showcase" className="section showcase" data-section="showcase">
      <div className="container">
        <Reveal>
          <div className="section-tag">
            <span className="tag-number text-mono">05</span>
            <span className="tag-label">Design Showcase</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="section-title">
            3D <span className="gradient-text">Designs</span>
          </h2>
        </Reveal>

        <div className="showcase-grid">
          {designs.map((d) => (
            <ShowcaseWindow key={d.id} design={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;

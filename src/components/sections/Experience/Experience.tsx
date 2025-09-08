import React from 'react';
import './Experience.css';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: 'Indrones Solutions PVT LTD.',
      position: 'Research and Development Engineer',
      period: 'Nov 2022 – Nov 2023',
      location: 'Mumbai, India',
      type: 'Full-time',
      achievements: [
        'Spearheaded the FUJIN VTOL project from inception to completion of design and testing',
        'Reduced manufacturing time by 1.5 weeks through streamlined processes',
        'Achieved 10% cost reduction in EPP foam machining solutions',
        'Improved coefficient of lift from MVP to 0.428 for enhanced performance',
        'Increased Time-of-flight by 25% for FUJIN VTOL through power optimization'
      ],
      technologies: ['SOLIDWORKS', 'FUSION 360', 'XFLR5', 'ANSYS Fluent', 'ECALC', 'CURA']
    },
    {
      id: 2,
      company: 'Team Onyx India',
      position: 'Design Team Lead',
      period: 'May 2019 – Aug 2021',
      location: 'Mumbai, India',
      type: 'Leadership Role',
      achievements: [
        'Led design team for SAE Aero Design 2021 and fostered team for 2022',
        'Reduced material costs by 45% through alternative material research',
        'Designed self-gliding aircraft with 30cm wingspan and autonomous landing',
        'Developed innovative torsion box solution for aircraft stability',
        'Analyzed 4 aircraft prototypes through comprehensive test flights'
      ],
      technologies: ['CAD Design', 'Carbon Fiber', '3D Printing', 'Flight Testing', 'Aerodynamics']
    }
  ];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="experience-content">
          <div className="experience-header">
            <div className="section-tag">
              <span className="tag-number text-mono">02</span>
              <span className="tag-label">Experience</span>
            </div>
            <h2 className="section-title">
              Professional <span className="gradient-text">Journey</span>
            </h2>
            <p className="section-subtitle">
              Building innovative solutions in aerospace and robotics
            </p>
          </div>

          <div className="experience-timeline">
            {experiences.map((exp) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line"></div>
                </div>
                
                <div className="timeline-content glass-card hover-lift">
                  <div className="exp-header">
                    <div className="exp-meta">
                      <span className="exp-period text-accent text-mono">{exp.period}</span>
                      <span className="exp-type">{exp.type}</span>
                    </div>
                    <h3 className="exp-position">{exp.position}</h3>
                    <h4 className="exp-company gradient-text">{exp.company}</h4>
                    <p className="exp-location">{exp.location}</p>
                  </div>

                  <div className="exp-achievements">
                    <h5>Key Achievements</h5>
                    <ul>
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="exp-technologies">
                    <h5>Technologies Used</h5>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

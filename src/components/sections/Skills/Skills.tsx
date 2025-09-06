import React from 'react';
import './Skills.css';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Domain Expertise',
      icon: '🔧',
      skills: [
        { name: 'CNC Milling', level: 92 },
        { name: 'Laser Cutting', level: 89 },
        { name: '3D Printing', level: 95 },
        { name: 'Computer-Aided Engineering', level: 90 },
        { name: 'FEA Analysis', level: 85 },
        { name: 'Design Fundamentals', level: 93 }
      ]
    },
    {
      title: 'Programming',
      icon: '💻',
      skills: [
        { name: 'Python', level: 88 },
        { name: 'C++', level: 82 },
        { name: 'MATLAB', level: 85 },
        { name: 'Android Studio', level: 75 }
      ]
    },
    {
      title: 'Hardware Platforms',
      icon: '⚡',
      skills: [
        { name: 'Arduino', level: 90 },
        { name: 'Raspberry Pi', level: 85 },
        { name: 'Ardupilot', level: 80 }
      ]
    },
    {
      title: 'Design Software',
      icon: '🎨',
      skills: [
        { name: 'SOLIDWORKS', level: 95 },
        { name: 'Fusion 360', level: 92 },
        { name: 'CREO', level: 85 },
        { name: 'AutoCAD', level: 88 },
        { name: 'ANSYS Fluent', level: 82 },
        { name: 'ANSYS Workbench', level: 80 }
      ]
    },
    {
      title: 'Specialized Tools',
      icon: '⚙️',
      skills: [
        { name: 'CURA', level: 92 },
        { name: 'PrusaSlicer', level: 90 },
        { name: 'Chitubox', level: 88 },
        { name: 'XFLR5', level: 85 },
        { name: 'E-Calc', level: 83 }
      ]
    }
  ];

  const certifications = [
    {
      title: 'Machine Learning Fundamentals',
      provider: 'University of Minnesota',
      status: 'In Progress',
      icon: '🤖'
    },
    {
      title: 'Robot Vision Systems',
      provider: 'University of Minnesota',
      status: 'In Progress',
      icon: '👁️'
    },
    {
      title: 'Feedback Control Systems',
      provider: 'University of Minnesota',
      status: 'In Progress',
      icon: '🎛️'
    },
    {
      title: 'SOLIDWORKS Professional',
      provider: 'Dassault Systèmes',
      status: 'Certified',
      icon: '📐'
    }
  ];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="skills-content">
          <div className="skills-header">
            <div className="section-tag">
              <span className="tag-number text-mono">03</span>
              <span className="tag-label">Skills</span>
            </div>
            <h2 className="section-title">
              Technical <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive expertise across the full robotics development stack
            </p>
          </div>

          <div className="skills-main">
            <div className="skills-categories">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category glass-card hover-lift">
                  <div className="category-header">
                    <span className="category-icon">{category.icon}</span>
                    <h3 className="category-title">{category.title}</h3>
                  </div>
                  
                  <div className="category-skills">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level text-accent">{skill.level}%</span>
                        </div>
                        <div className="skill-progress-bar">
                          <div 
                            className="skill-fill"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="skills-showcase">
              <div className="showcase-section">
                <h3 className="showcase-title">Current Learning Path</h3>
                <div className="certifications-grid">
                  {certifications.map((cert, index) => (
                    <div key={index} className="certification-card glass-card">
                      <div className="cert-icon">{cert.icon}</div>
                      <div className="cert-content">
                        <h4 className="cert-title">{cert.title}</h4>
                        <p className="cert-provider">{cert.provider}</p>
                        <span className={`cert-status ${cert.status.toLowerCase().replace(' ', '-')}`}>
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="showcase-section">
                <h3 className="showcase-title">Key Competencies</h3>
                <div className="competencies-grid">
                  <div className="competency-item">
                    <div className="competency-icon">🚁</div>
                    <div className="competency-text">
                      <h4>VTOL Aircraft Design</h4>
                      <p>Complete lifecycle from concept to flight testing</p>
                    </div>
                  </div>
                  <div className="competency-item">
                    <div className="competency-icon">🤖</div>
                    <div className="competency-text">
                      <h4>Autonomous Systems</h4>
                      <p>Computer vision and intelligent control systems</p>
                    </div>
                  </div>
                  <div className="competency-item">
                    <div className="competency-icon">⚙️</div>
                    <div className="competency-text">
                      <h4>Rapid Prototyping</h4>
                      <p>3D printing, machining, and iterative design</p>
                    </div>
                  </div>
                  <div className="competency-item">
                    <div className="competency-icon">📊</div>
                    <div className="competency-text">
                      <h4>Performance Analysis</h4>
                      <p>CFD, FEA, and aerodynamic optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

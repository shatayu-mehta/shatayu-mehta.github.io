import React from 'react';
import './Skills.css';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'CAD Design & Analysis',
      icon: '🎨',
      skills: [
        { name: 'SOLIDWORKS', level: 95 },
        { name: 'Fusion 360', level: 92 },
        { name: 'CREO', level: 85 },
        { name: 'AutoCAD', level: 88 },
        { name: 'ANSYS Fluent & Workbench', level: 85 },
        { name: 'FEA Analysis', level: 85 },
        { name: 'GD&T', level: 88 }
      ]
    },
    {
      title: 'Machine Learning & Vision',
      icon: '🤖',
      skills: [
        { name: 'Computer Vision (OpenCV)', level: 90 },
        { name: 'TensorFlow', level: 90 },
        { name: 'PyTorch', level: 88 },
        { name: 'Stereo Vision & 3D Pose Estimation', level: 88 },
        { name: 'Visual Servoing', level: 85 },
        { name: 'CNN/DNN', level: 90 }
      ]
    },
    {
      title: 'Manufacturing & Prototyping',
      icon: '⚙️',
      skills: [
        { name: 'CNC Milling', level: 92 },
        { name: 'Laser Cutting', level: 89 },
        { name: '3D Printing', level: 95 },
        { name: 'Rapid Prototyping', level: 93 },
        { name: 'Material Selection', level: 88 },
        { name: 'Quality Control & Testing', level: 87 }
      ]
    },
    {
      title: 'Control Systems & Robotics',
      icon: '🎛️',
      skills: [
        { name: 'PID & Digital Control', level: 87 },
        { name: 'Forward & Inverse Kinematics', level: 87 },
        { name: 'ROS & RoboDK', level: 87 },
        { name: 'Path Planning & Manipulation', level: 85 },
        { name: 'UR5e Cobot Programming', level: 90 },
        { name: 'MuJoCo & Isaac Sim/Lab', level: 85 },
        { name: 'Gazebo Simulation', level: 83 }
      ]
    },
    {
      title: 'Drone & UAV Systems',
      icon: '🚁',
      skills: [
        { name: 'PX4 Flight Stack', level: 85 },
        { name: 'MAVSDK Python', level: 82 },
        { name: 'MAVLink Protocol', level: 80 },
        { name: 'Ardupilot', level: 85 },
        { name: 'Flight Control Systems', level: 87 },
        { name: 'UAV Design & Testing', level: 90 }
      ]
    },
    {
      title: 'Programming & Development',
      icon: '💻',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'C++', level: 85 },
        { name: 'MATLAB', level: 88 },
        { name: 'Arduino IDE', level: 92 }
      ]
    }
  ];

  const certifications = [
    {
      title: 'SOLIDWORKS Professional',
      provider: 'Dassault Systèmes',
      status: 'Certified',
      icon: '📐',
      certificate: '/Solidworks Professional shatayu mehta.pdf'
    },
    {
      title: 'Machine Learning',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '🤖'
    },
    {
      title: 'Robot Vision',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '👁️'
    },
    {
      title: 'Feedback Control Systems',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '🎛️'
    },
    {
      title: 'Robotics and Principles',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '🤖'
    },
    {
      title: 'Design of Wearable Technology',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '⌚'
    },
    {
      title: 'Physics Simulation for Robotics',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '⚛️'
    },
    {
      title: 'Computer Vision',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '📷'
    },
    {
      title: 'Kalman Filtering',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '📊'
    },
    {
      title: 'Advanced Control Systems',
      provider: 'University of Minnesota',
      status: 'Current',
      icon: '⚙️'
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
                        {cert.certificate && (
                          <a 
                            href={cert.certificate} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cert-download"
                            aria-label={`Download ${cert.title} certificate`}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7,10 12,15 17,10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            View Certificate
                          </a>
                        )}
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

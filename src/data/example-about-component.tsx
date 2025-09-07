// Example: How to update About.tsx to use JSON data
import React from 'react';
import aboutData from '../../data/about.json';
import './About.css';

const About: React.FC = () => {
  // Instead of hardcoded data, import from JSON
  const { personal, skills, achievements, bio } = aboutData;

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <div className="section-tag">
              <span className="tag-number text-mono">01</span>
              <span className="tag-label">About Me</span>
            </div>
            <h2 className="section-title">
              Passionate about <span className="gradient-text">Innovation</span>
            </h2>
          </div>

          <div className="about-main">
            <div className="about-text">
              <div className="intro-text">
                <p>{bio.intro}</p>
                <p>{bio.experience}</p>
                <p>{bio.passion}</p>
              </div>

              <div className="skills-preview">
                <h3>Core Competencies</h3>
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <h4>{skill.name}</h4>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-progress">
                        <div 
                          className="skill-fill" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="skill-tools">
                        {skill.tools.map((tool, toolIndex) => (
                          <span key={toolIndex} className="tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="visual-elements">
                <div className="achievements-section">
                  <h3>Key Achievements</h3>
                  <div className="achievements-grid">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="achievement-card">
                        <div className="achievement-icon">{achievement.icon}</div>
                        <div className="achievement-content">
                          <h4>{achievement.title}</h4>
                          <p>{achievement.description}</p>
                          <span className="achievement-metric">{achievement.metric}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="personal-info">
                  <div className="info-cards">
                    <div className="info-card">
                      <div className="info-icon">👨‍💼</div>
                      <div className="info-text">
                        <h4>Experience</h4>
                        <p>{personal.experience}</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-icon">🏆</div>
                      <div className="info-text">
                        <h4>Focus</h4>
                        <p>{personal.focus}</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-icon">🌍</div>
                      <div className="info-text">
                        <h4>Impact</h4>
                        <p>{personal.impact}</p>
                      </div>
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

export default About;

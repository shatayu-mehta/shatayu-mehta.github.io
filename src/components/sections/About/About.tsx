import React from 'react';
import './About.css';

const About: React.FC = () => {
  const skills = [
    { name: 'CAD Design', tools: ['SOLIDWORKS', 'Fusion 360', 'CREO'], level: 95 },
    { name: 'Programming', tools: ['Python', 'C++', 'MATLAB'], level: 88 },
    { name: 'Manufacturing', tools: ['3D Printing', 'CNC Milling', 'Laser Cutting'], level: 92 },
    { name: 'Analysis', tools: ['ANSYS', 'XFLR5', 'FEA'], level: 85 },
  ];

  const achievements = [
    {
      icon: '🚁',
      title: 'FUJIN VTOL Project',
      description: 'Led complete design cycle from inception to prototype testing',
      metric: '25% flight time improvement'
    },
    {
      icon: '⚡',
      title: 'Manufacturing Optimization',
      description: 'Streamlined prototyping process reducing development time',
      metric: '1.5 weeks faster'
    },
    {
      icon: '💰',
      title: 'Cost Reduction',
      description: 'Engineered EPP foam machining solution',
      metric: '10% cost savings'
    },
    {
      icon: '🎯',
      title: 'Team Leadership',
      description: 'Led design teams through multiple successful projects',
      metric: '15+ team members'
    }
  ];

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
            <p className="section-subtitle">
              Bridging the gap between theoretical robotics and practical engineering solutions
            </p>
          </div>

          <div className="about-main">
            <div className="about-story">
              <div className="story-content">
                <h3 className="story-title">My Journey</h3>
                <div className="story-text">
                  <p>
                    My journey in robotics began during my undergraduate studies in Mechanical Engineering 
                    at KJ Somaiya College of Engineering, where I discovered my passion for autonomous systems 
                    and aircraft design. The intersection of mechanical engineering, computer science, and 
                    cutting-edge technology fascinated me.
                  </p>
                  <p>
                    As a Research and Development Engineer at Indrones Solutions, I spearheaded the 
                    <span className="text-accent"> FUJIN VTOL project</span>, taking it from concept to 
                    successful prototype. This experience taught me the importance of iterative design, 
                    rigorous testing, and cross-functional collaboration.
                  </p>
                  <p>
                    Currently pursuing my Masters in Robotics at the University of Minnesota, I'm diving 
                    deeper into machine learning, robot vision, and control systems - preparing for the 
                    next generation of autonomous technologies.
                  </p>
                </div>

                <div className="story-quote">
                  <blockquote>
                    "The future belongs to those who can seamlessly integrate mechanical precision 
                    with intelligent automation."
                  </blockquote>
                </div>
              </div>

              <div className="story-visual">
                <div className="visual-grid">
                  <div className="visual-item">
                    <div className="visual-icon">🎓</div>
                    <div className="visual-text">
                      <h4>Education</h4>
                      <p>Masters in Robotics</p>
                    </div>
                  </div>
                  <div className="visual-item">
                    <div className="visual-icon">💼</div>
                    <div className="visual-text">
                      <h4>Experience</h4>
                      <p>R&D Engineer</p>
                    </div>
                  </div>
                  <div className="visual-item">
                    <div className="visual-icon">🏆</div>
                    <div className="visual-text">
                      <h4>Focus</h4>
                      <p>VTOL & Autonomy</p>
                    </div>
                  </div>
                  <div className="visual-item">
                    <div className="visual-icon">🌍</div>
                    <div className="visual-text">
                      <h4>Impact</h4>
                      <p>Global Innovation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-skills">
              <h3 className="skills-title">Technical Expertise</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-card glass-card hover-lift">
                    <div className="skill-header">
                      <h4 className="skill-name">{skill.name}</h4>
                      <span className="skill-percentage text-accent">{skill.level}%</span>
                    </div>
                    <div className="skill-progress">
                      <div 
                        className="skill-bar"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="skill-tools">
                      {skill.tools.map((tool, toolIndex) => (
                        <span key={toolIndex} className="skill-tool">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-achievements">
              <h3 className="achievements-title">Key Achievements</h3>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card glass-card hover-lift">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h4 className="achievement-title">{achievement.title}</h4>
                      <p className="achievement-description">{achievement.description}</p>
                      <div className="achievement-metric gradient-text">
                        {achievement.metric}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-cta">
              <div className="cta-content">
                <h3>Let's Build the Future Together</h3>
                <p>
                  I'm always excited to collaborate on innovative projects that push the boundaries 
                  of robotics and autonomous systems.
                </p>
                <a href="#contact" className="btn btn-primary">
                  Start a Conversation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

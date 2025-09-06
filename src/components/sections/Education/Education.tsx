import React from 'react';
import './Education.css';

const Education: React.FC = () => {
  const education = [
    {
      id: 1,
      degree: 'Masters of Science, Robotics',
      institution: 'University of Minnesota Twin Cities',
      period: 'Sept. 2024 – Present',
      location: 'Minneapolis, MN, USA',
      status: 'current',
      description: 'Advanced study in robotics with focus on machine learning, computer vision, and autonomous systems.',
      coursework: [
        'Machine Learning',
        'Robot Vision and Feedback Control Systems',
        'Advanced Robotics',
        'Autonomous Systems'
      ],
      highlights: [
        'Research in autonomous systems and AI integration',
        'Focus on next-generation robotics technologies',
        'Collaboration with industry partners',
        'Advanced laboratory research projects'
      ]
    },
    {
      id: 2,
      degree: 'Bachelors of Technology, Mechanical Engineering',
      institution: 'KJ Somaiya College of Engineering, Mumbai',
      period: 'July 2018 – June 2022',
      location: 'Mumbai, India',
      status: 'completed',
      gpa: '8.64/10',
      description: 'Comprehensive mechanical engineering foundation with specialization in design, manufacturing, and aerospace applications.',
      coursework: [
        'Engineering Design',
        'Manufacturing Processes',
        'Thermodynamics',
        'Fluid Mechanics',
        'Machine Design',
        'Control Systems'
      ],
      highlights: [
        'Achieved 8.64/10 GPA with distinction',
        'Led multiple engineering design projects',
        'Active in SAE Aero Design competitions',
        'Strong foundation in mechanical systems'
      ]
    }
  ];

  const achievements = [
    {
      icon: '🏆',
      title: 'Academic Excellence',
      description: 'Maintained high academic standards throughout undergraduate studies',
      metric: '8.64/10 GPA'
    },
    {
      icon: '🔬',
      title: 'Research Focus',
      description: 'Current graduate research in advanced robotics and AI systems',
      metric: 'MS Robotics'
    },
    {
      icon: '🎯',
      title: 'Leadership Experience',
      description: 'Led design teams in competitive engineering challenges',
      metric: 'Team Lead'
    },
    {
      icon: '🌟',
      title: 'Innovation',
      description: 'Applied theoretical knowledge to real-world engineering solutions',
      metric: '15+ Projects'
    }
  ];

  const skills = [
    'Advanced Mathematics',
    'Engineering Mechanics',
    'Control Theory',
    'Machine Learning',
    'Computer Vision',
    'Systems Integration',
    'Project Management',
    'Research Methodology'
  ];

  return (
    <section id="education" className="section education">
      <div className="container">
        <div className="education-content">
          <div className="education-header">
            <div className="section-tag">
              <span className="tag-number text-mono">05</span>
              <span className="tag-label">Education</span>
            </div>
            <h2 className="section-title">
              Academic <span className="gradient-text">Foundation</span>
            </h2>
            <p className="section-subtitle">
              Building expertise through rigorous academic study and hands-on research
            </p>
          </div>

          <div className="education-main">
            <div className="education-timeline">
              {education.map((edu) => (
                <div key={edu.id} className="education-item">
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  
                  <div className="education-card glass-card hover-lift">
                    <div className="edu-header">
                      <div className="edu-meta">
                        <span className={`edu-status ${edu.status}`}>
                          {edu.status === 'current' ? '📚 Currently Enrolled' : '✓ Completed'}
                        </span>
                        <span className="edu-period text-mono">{edu.period}</span>
                      </div>
                      
                      <h3 className="edu-degree">{edu.degree}</h3>
                      <h4 className="edu-institution gradient-text">{edu.institution}</h4>
                      <p className="edu-location">{edu.location}</p>
                      
                      {edu.gpa && (
                        <div className="edu-gpa">
                          <span className="gpa-label">GPA:</span>
                          <span className="gpa-value text-accent">{edu.gpa}</span>
                        </div>
                      )}
                    </div>

                    <div className="edu-content">
                      <p className="edu-description">{edu.description}</p>
                      
                      <div className="edu-section">
                        <h5 className="section-title">Key Coursework</h5>
                        <div className="coursework-tags">
                          {edu.coursework.map((course, index) => (
                            <span key={index} className="coursework-tag">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="edu-section">
                        <h5 className="section-title">Highlights</h5>
                        <ul className="highlights-list">
                          {edu.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="education-sidebar">
              <div className="achievements-section glass-card">
                <h3 className="sidebar-title">Academic Achievements</h3>
                <div className="achievements-grid">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <div className="achievement-icon">{achievement.icon}</div>
                      <div className="achievement-content">
                        <h4 className="achievement-title">{achievement.title}</h4>
                        <p className="achievement-description">{achievement.description}</p>
                        <span className="achievement-metric gradient-text">{achievement.metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="skills-section glass-card">
                <h3 className="sidebar-title">Academic Skills</h3>
                <div className="academic-skills">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="future-section glass-card">
                <h3 className="sidebar-title">Future Goals</h3>
                <div className="future-content">
                  <div className="goal-item">
                    <div className="goal-icon">🎓</div>
                    <div className="goal-text">
                      <h4>PhD in Robotics</h4>
                      <p>Advanced research in autonomous systems</p>
                    </div>
                  </div>
                  <div className="goal-item">
                    <div className="goal-icon">🚀</div>
                    <div className="goal-text">
                      <h4>Industry Innovation</h4>
                      <p>Leading breakthrough robotics solutions</p>
                    </div>
                  </div>
                  <div className="goal-item">
                    <div className="goal-icon">🌍</div>
                    <div className="goal-text">
                      <h4>Global Impact</h4>
                      <p>Solving real-world challenges through technology</p>
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

export default Education;

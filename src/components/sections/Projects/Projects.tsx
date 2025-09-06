import React, { useState } from 'react';
import './Projects.css';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Function to handle opening project in new window
  const openProjectDemo = (projectUrl: string, projectTitle: string) => {
    const newWindow = window.open(
      projectUrl,
      '_blank',
      'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );
    
    if (newWindow) {
      newWindow.document.title = `${projectTitle} - 3D Demo`;
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Smart Wearable Ring',
      category: 'wearables',
      description: 'IoT-enabled smart ring with biometric sensors for health monitoring, gesture control, and seamless device integration.',
      image: '/api/placeholder/400/300',
      technologies: ['IoT', 'Embedded Systems', 'Bluetooth LE', 'Sensor Fusion', 'Mobile App', 'PCB Design'],
      achievements: [
        'Integrated multiple biometric sensors in 8mm form factor',
        'Achieved 7-day battery life with optimized power management',
        'Implemented gesture recognition with 95% accuracy',
        'Seamless connectivity with smartphones and smart home devices'
      ],
      status: 'completed',
      timeline: 'Jan 2024 - Aug 2024',
      github: null,
      demo: '/projects/wearable-ring.html',
      featured: true
    },
    {
      id: 2,
      title: 'FUJIN VTOL Aircraft',
      category: 'aerospace',
      description: 'Complete vertical take-off and landing aircraft design from concept to prototype testing with 25% flight time improvement.',
      image: '/api/placeholder/400/300',
      technologies: ['SOLIDWORKS', 'XFLR5', 'ANSYS Fluent', 'ECALC', 'Flight Testing'],
      achievements: [
        'Led complete design cycle from inception to prototype',
        'Achieved 25% improvement in flight time',
        'Optimized aerodynamic performance to CL=0.428',
        'Reduced development time by 1.5 weeks'
      ],
      status: 'completed',
      timeline: 'Nov 2022 - Nov 2023',
      github: null,
      demo: '/projects/fujin-vtol.html',
      featured: true
    },
    {
      id: 3,
      title: 'Autonomous Fruit Plucking Robot',
      category: 'robotics',
      description: 'Computer vision-enabled robot for automated strawberry harvesting using RGB color segmentation and precision gripper mechanism.',
      image: '/api/placeholder/400/300',
      technologies: ['MATLAB', 'Arduino', 'Computer Vision', 'Servo Motors', 'Bluetooth'],
      achievements: [
        'Implemented RGB color segmentation algorithms',
        'Designed 3D printer-inspired movement mechanism',
        'Created scissor-inspired gripper for stem cutting',
        'Achieved real-time coordinate calculation'
      ],
      status: 'completed',
      timeline: 'April 2022',
      github: null,
      demo: '/projects/fruit-plucking-robot.html',
      featured: true
    },
    {
      id: 4,
      title: 'SAE Aero Design Aircraft',
      category: 'aerospace',
      description: 'Competition aircraft design with autonomous landing capabilities and innovative structural solutions for enhanced performance.',
      image: '/api/placeholder/400/300',
      technologies: ['CAD Design', 'Carbon Fiber', '3D Printing', 'Flight Controller', 'Aerodynamics'],
      achievements: [
        'Designed self-gliding aircraft with 30cm wingspan',
        'Implemented autonomous landing system',
        'Reduced material costs by 45%',
        'Developed innovative torsion box solution'
      ],
      status: 'completed',
      timeline: 'May 2019 - Aug 2019',
      github: null,
      demo: '/projects/sae-aero-aircraft.html',
      featured: true
    },
    {
      id: 5,
      title: 'EPP Foam Machining Solution',
      category: 'manufacturing',
      description: 'Innovative prototyping solution for EPP foam processing that reduced manufacturing costs and improved durability.',
      image: '/api/placeholder/400/300',
      technologies: ['Manufacturing', 'Material Science', 'Process Optimization', 'Cost Analysis'],
      achievements: [
        '10% reduction in manufacturing costs',
        'Increased prototype durability',
        'Enabled 5 additional test flights',
        'Streamlined manufacturing process'
      ],
      status: 'completed',
      timeline: '2022 - 2023',
      github: null,
      demo: null,
      featured: false
    },
    {
      id: 5,
      title: 'S25 & S75 UAV Components',
      category: 'aerospace',
      description: 'Development and testing of critical components for commercial UAV systems including hot-swappable payload mechanisms.',
      image: '/api/placeholder/400/300',
      technologies: ['Mechanical Design', 'Testing', 'UAV Systems', 'Payload Integration'],
      achievements: [
        'Created hot-swappable payload mechanism for S75',
        'Improved mechanical performance metrics',
        'Contributed to technical certification',
        'Enhanced operational flexibility'
      ],
      status: 'completed',
      timeline: '2022 - 2023',
      github: null,
      demo: null,
      featured: false
    },
    {
      id: 6,
      title: 'S25 & S75 UAV Components',
      category: 'aerospace',
      description: 'Development and testing of critical components for commercial UAV systems including hot-swappable payload mechanisms.',
      image: '/api/placeholder/400/300',
      technologies: ['Mechanical Design', 'Testing', 'UAV Systems', 'Payload Integration'],
      achievements: [
        'Created hot-swappable payload mechanism for S75',
        'Improved mechanical performance metrics',
        'Contributed to technical certification',
        'Enhanced operational flexibility'
      ],
      status: 'completed',
      timeline: '2022 - 2023',
      github: null,
      demo: null,
      featured: false
    },
    {
      id: 7,
      title: 'Advanced Control Systems',
      category: 'robotics',
      description: 'Current research project exploring machine learning applications in robotic control systems and vision processing.',
      image: '/api/placeholder/400/300',
      technologies: ['Machine Learning', 'Python', 'Control Theory', 'Computer Vision', 'Research'],
      achievements: [
        'Exploring ML applications in robotics',
        'Developing vision-based control systems',
        'Research in feedback control optimization',
        'Integration of modern AI techniques'
      ],
      status: 'in-progress',
      timeline: 'Sept 2024 - Present',
      github: null,
      demo: null,
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'aerospace', label: 'Aerospace', count: projects.filter(p => p.category === 'aerospace').length },
    { id: 'robotics', label: 'Robotics', count: projects.filter(p => p.category === 'robotics').length },
    { id: 'wearables', label: 'Wearables', count: projects.filter(p => p.category === 'wearables').length },
    { id: 'manufacturing', label: 'Manufacturing', count: projects.filter(p => p.category === 'manufacturing').length },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects-content">
          <div className="projects-header">
            <div className="section-tag">
              <span className="tag-number text-mono">04</span>
              <span className="tag-label">Projects</span>
            </div>
            <h2 className="section-title">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="section-subtitle">
              Innovative solutions spanning aerospace engineering, robotics, wearables technology, and autonomous systems
            </p>
          </div>

          {/* Featured Projects Showcase */}
          <div className="featured-section">
            <h3 className="featured-title">Flagship Projects</h3>
            <div className="featured-grid">
              {featuredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="featured-project glass-card hover-lift clickable-project"
                  onClick={() => project.demo && openProjectDemo(project.demo, project.title)}
                  style={{ cursor: project.demo ? 'pointer' : 'default' }}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-status">
                        <span className={`status-badge ${project.status}`}>
                          {project.status === 'completed' ? '✓ Completed' : '⚡ In Progress'}
                        </span>
                      </div>
                      {project.demo && (
                        <div className="project-3d-indicator">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5"/>
                            <path d="M2 12l10 5 10-5"/>
                          </svg>
                          <span>View 3D Demo</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-meta">
                      <span className="project-category">{project.category}</span>
                      <span className="project-timeline">{project.timeline}</span>
                    </div>
                    
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-achievements">
                      <h5>Key Achievements</h5>
                      <ul>
                        {project.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="project-technologies">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="tech-more">+{project.technologies.length - 4} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Projects with Filters */}
          <div className="all-projects-section">
            <div className="projects-filters">
              <h3 className="filter-title">Explore All Work</h3>
              <div className="filter-buttons">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                    <span className="filter-count">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card glass-card hover-lift">
                  <div className="card-header">
                    <div className="card-meta">
                      <span className="card-category">{project.category}</span>
                      <span className={`card-status ${project.status}`}>
                        {project.status === 'completed' ? '✓' : '⚡'}
                      </span>
                    </div>
                    <h4 className="card-title">{project.title}</h4>
                    <p className="card-timeline">{project.timeline}</p>
                  </div>
                  
                  <div className="card-content">
                    <p className="card-description">{project.description}</p>
                    
                    <div className="card-achievements">
                      {project.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="achievement-item">
                          <span className="achievement-bullet">▶</span>
                          <span className="achievement-text">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="card-technologies">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="projects-cta">
            <div className="cta-content">
              <h3>Interested in Collaborating?</h3>
              <p>
                I'm always looking for exciting projects that push the boundaries of 
                robotics and aerospace engineering. Let's build something amazing together.
              </p>
              <div className="cta-actions">
                <a href="#contact" className="btn btn-primary">
                  Discuss a Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="/RESUME_S_A_M.pdf" target="_blank" className="btn btn-secondary">
                  View Full Resume
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
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

export default Projects;

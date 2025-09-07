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
      title: 'FUJIN VTOL Aircraft',
      category: 'aerospace',
      description: 'Complete VTOL aircraft design from inception to second prototype testing, achieving 25% flight time improvement and streamlined manufacturing process.',
      image: '/api/placeholder/400/300',
      technologies: ['SOLIDWORKS', 'XFLR5', 'ANSYS Fluent', 'ECALC', 'EPP Foam Machining', 'Flight Testing'],
      achievements: [
        'Spearheaded complete design cycle from inception to prototype testing',
        'Achieved 25% improvement in flight time performance',
        'Reduced prototype design to completion time by 1.5 weeks',
        'Engineered EPP foam machining solution reducing costs by 10%',
        'Optimized aerodynamic performance to CL=0.428'
      ],
      status: 'completed',
      timeline: 'Nov 2022 - Nov 2023',
      github: null,
      demo: '/projects/fujin-vtol.html',
      featured: true
    },
    {
      id: 2,
      title: 'Wearable Ring Mouse Device',
      category: 'wearables',
      description: 'IoT-enabled wearable ring mouse with Arduino Nano 33 BLE, enabling click, cursor movement, and scroll functionalities with custom 3D-printed housing.',
      image: '/api/placeholder/400/300',
      technologies: ['Arduino', 'BLE', 'IMU Sensors', 'Hall Effect Sensors', '3D Printing', 'Python', 'PyNput'],
      achievements: [
        'Integrated push button, IMU, and Hall effect sensors in ring form factor',
        'Created custom firmware for sensor data processing and BLE communication',
        'Designed and 3D-printed custom PLA ring and wrist modules',
        'Achieved SUS score of 35.67 through user testing with 3 volunteers',
        'Implemented gesture recognition for swipe-to-tab functionality'
      ],
      status: 'completed',
      timeline: 'May 2025',
      github: null,
      demo: '/projects/wearable-ring.html',
      featured: true
    },
    {
      id: 3,
      title: 'UR5 Robot Vision & Assembly',
      category: 'robotics',
      description: 'Computer vision-based tool sorting and automated flashlight assembly using UR5 cobot with CNN-based object recognition and precise manipulation.',
      image: '/api/placeholder/400/300',
      technologies: ['UR5 Cobot', 'OpenCV', 'TensorFlow', 'Python', 'RoboDK', 'ArUco', 'Robotiq Gripper'],
      achievements: [
        'Developed CNN using TensorFlow/Keras for tool identification',
        'Implemented 6DoF pose estimation using OpenCV and ArUco markers',
        'Programmed multi-step flashlight assembly with pneumatic chuck control',
        'Integrated force-torque sensor for precise screwing operations (2Nm torque)',
        'Applied homogeneous transformations for precise manipulation'
      ],
      status: 'completed',
      timeline: 'Mar 2025 - Apr 2025',
      github: null,
      demo: '/projects/ur5-robot.html',
      featured: true
    },
    {
      id: 4,
      title: 'Real-Time 3D Reconstruction System',
      category: 'robotics',
      description: 'Custom stereo camera system for real-time 3D reconstruction using Raspberry Pi and OpenCV with sub-3ms processing time.',
      image: '/api/placeholder/400/300',
      technologies: ['Raspberry Pi', 'OpenCV', 'SGBM', 'Open3D', 'Stereo Vision', 'Python'],
      achievements: [
        'Designed custom stereo camera using Raspberry Pi Zero 2W',
        'Achieved real-time 3D reconstruction within 3 milliseconds',
        'Camera calibration with 0.2 RMSE error using checkerboard patterns',
        'Implemented Semi-Global Block Matching for depth estimation',
        'Generated 3D point clouds using Open3D library'
      ],
      status: 'completed',
      timeline: 'Dec 2024',
      github: null,
      demo: null,
      featured: false
    },
    {
      id: 5,
      title: 'Fruit Classification using ResNet18',
      category: 'robotics',
      description: 'Deep learning model for classifying 5 fruit categories using ResNet18 and transfer learning with comprehensive data augmentation.',
      image: '/api/placeholder/400/300',
      technologies: ['PyTorch', 'ResNet18', 'Transfer Learning', 'Data Augmentation', 'Computer Vision'],
      achievements: [
        'Achieved 99% training accuracy and 97.5% validation accuracy',
        'Applied data augmentation including rotation, flipping, and zooming',
        'Combined Fruits-262 and Fruits-360 datasets with custom test data',
        'Demonstrated 85% testing accuracy with strong generalization',
        'Evaluated using precision, recall, and F1-score metrics'
      ],
      status: 'completed',
      timeline: 'Dec 2024',
      github: null,
      demo: null,
      featured: false
    },
    {
      id: 6,
      title: 'SAE Aero Design Aircraft',
      category: 'aerospace',
      description: 'Led design team for SAE Aero Design competition, developing autonomous landing aircraft with innovative cost-reduction solutions.',
      image: '/api/placeholder/400/300',
      technologies: ['Aircraft Design', 'Flight Controller', 'Material Engineering', 'CAD', '3D Printing'],
      achievements: [
        'Developed self-gliding aircraft with 30cm wingspan and autonomous landing',
        'Reduced material costs by 45% through alternative material research',
        'Designed torsion box to prevent tail torsion issues',
        'Engineered tension spring-based nose landing gear',
        'Tested four aircraft prototypes to determine performance limits'
      ],
      status: 'completed',
      timeline: 'May 2019 - Aug 2021',
      github: null,
      demo: null,
      featured: false
    },
    {
      id: 7,
      title: 'Fruit/Vegetable Plucking Robot',
      category: 'robotics',
      description: 'Automated strawberry harvesting robot with computer vision-based detection and precise gripper mechanism using gantry-style movement.',
      image: '/api/placeholder/400/300',
      technologies: ['MATLAB', 'Computer Vision', 'Arduino Uno', 'Stepper Motors', 'Bluetooth', 'Servo Control'],
      achievements: [
        'Implemented RGB color segmentation for strawberry detection',
        'Calculated bounding box coordinates for precise targeting',
        'Programmed Arduino-controlled gantry robot mechanism',
        'Designed scissor-inspired gripper for stem cutting',
        'Achieved wireless communication via Bluetooth for coordinate transmission'
      ],
      status: 'completed',
      timeline: 'April 2022',
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
                    
                    {/* Add decorative illustrations based on project category */}
                    <div className="project-illustration">
                      {project.category === 'wearables' && (
                        <svg className="illustration-svg" viewBox="0 0 200 200" fill="none">
                          {/* Smart Ring - Realistic Design */}
                          <defs>
                            <linearGradient id="ringMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#C0C0C0"/>
                              <stop offset="50%" stopColor="#F5F5F5"/>
                              <stop offset="100%" stopColor="#A0A0A0"/>
                            </linearGradient>
                            <linearGradient id="screen" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(0,245,255,0.9)"/>
                              <stop offset="100%" stopColor="rgba(0,150,255,0.9)"/>
                            </linearGradient>
                          </defs>
                          
                          {/* Ring band outer */}
                          <ellipse cx="100" cy="100" rx="50" ry="28" fill="url(#ringMetal)" stroke="#888" strokeWidth="2"/>
                          {/* Ring band inner */}
                          <ellipse cx="100" cy="100" rx="38" ry="20" fill="rgba(40,40,40,0.9)"/>
                          
                          {/* Main display/sensor area */}
                          <rect x="75" y="90" width="50" height="20" rx="10" fill="url(#screen)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                          
                          {/* Biometric sensors */}
                          <circle cx="85" cy="100" r="4" fill="#00FF00"/>
                          <circle cx="100" cy="100" r="4" fill="#FF0080"/>
                          <circle cx="115" cy="100" r="4" fill="#00FFFF"/>
                          
                          {/* Side buttons */}
                          <rect x="70" y="95" width="4" height="10" rx="2" fill="#666"/>
                          <rect x="126" y="95" width="4" height="10" rx="2" fill="#666"/>
                          
                          {/* Health monitoring pulse */}
                          <g opacity="0.7">
                            <path d="M80 100 L85 95 L90 105 L95 85 L100 110 L105 90 L110 100 L115 95 L120 100" 
                                  stroke="#00FF00" strokeWidth="2" fill="none">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                            </path>
                          </g>
                        </svg>
                      )}
                      
                      {project.category === 'aerospace' && (
                        <svg className="illustration-svg" viewBox="0 0 200 200" fill="none">
                          {/* Top-view Aircraft with Rectangular Wings */}
                          <defs>
                            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#F5F5F5"/>
                              <stop offset="100%" stopColor="#E0E0E0"/>
                            </linearGradient>
                          </defs>
                          
                          {/* Main Fuselage */}
                          <rect x="90" y="60" width="20" height="80" rx="8" fill="url(#bodyGrad)" stroke="#B0B0B0" strokeWidth="2"/>
                          
                          {/* Nose */}
                          <path d="M90 60 Q100 45 110 60" fill="url(#bodyGrad)" stroke="#B0B0B0" strokeWidth="2"/>
                          
                          {/* Main Rectangular Wings */}
                          <rect x="40" y="95" width="120" height="12" rx="3" fill="url(#bodyGrad)" stroke="#B0B0B0" strokeWidth="2"/>
                          
                          {/* Tail Section */}
                          <rect x="95" y="140" width="10" height="15" rx="2" fill="url(#bodyGrad)" stroke="#B0B0B0" strokeWidth="1"/>
                          
                          {/* Horizontal Stabilizer (tail wings) */}
                          <rect x="85" y="145" width="30" height="6" rx="2" fill="url(#bodyGrad)" stroke="#B0B0B0" strokeWidth="1"/>
                          
                          {/* Vertical Stabilizer */}
                          <rect x="97" y="140" width="6" height="20" rx="2" fill="url(#bodyGrad)" stroke="#B0B0B0" strokeWidth="1"/>
                          
                          {/* Motor Nacelles on Wings */}
                          <ellipse cx="55" cy="101" rx="8" ry="5" fill="#D0D0D0" stroke="#A0A0A0" strokeWidth="1"/>
                          <ellipse cx="145" cy="101" rx="8" ry="5" fill="#D0D0D0" stroke="#A0A0A0" strokeWidth="1"/>
                          <ellipse cx="75" cy="101" rx="8" ry="5" fill="#D0D0D0" stroke="#A0A0A0" strokeWidth="1"/>
                          <ellipse cx="125" cy="101" rx="8" ry="5" fill="#D0D0D0" stroke="#A0A0A0" strokeWidth="1"/>
                          
                          {/* Propellers - Wing Tip Left */}
                          <g>
                            <circle cx="55" cy="101" r="15" fill="rgba(0,0,0,0.05)" stroke="rgba(0,245,255,0.3)" strokeWidth="1"/>
                            <g>
                              <ellipse cx="55" cy="101" rx="13" ry="3" fill="rgba(0,245,255,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 55 101;360 55 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                              <ellipse cx="55" cy="101" rx="3" ry="13" fill="rgba(0,245,255,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 55 101;360 55 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                            </g>
                          </g>
                          
                          {/* Propellers - Wing Tip Right */}
                          <g>
                            <circle cx="145" cy="101" r="15" fill="rgba(0,0,0,0.05)" stroke="rgba(255,0,128,0.3)" strokeWidth="1"/>
                            <g>
                              <ellipse cx="145" cy="101" rx="13" ry="3" fill="rgba(255,0,128,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 145 101;-360 145 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                              <ellipse cx="145" cy="101" rx="3" ry="13" fill="rgba(255,0,128,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 145 101;-360 145 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                            </g>
                          </g>
                          
                          {/* Propellers - Inner Left */}
                          <g>
                            <circle cx="75" cy="101" r="15" fill="rgba(0,0,0,0.05)" stroke="rgba(255,0,128,0.3)" strokeWidth="1"/>
                            <g>
                              <ellipse cx="75" cy="101" rx="13" ry="3" fill="rgba(255,0,128,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 75 101;-360 75 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                              <ellipse cx="75" cy="101" rx="3" ry="13" fill="rgba(255,0,128,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 75 101;-360 75 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                            </g>
                          </g>
                          
                          {/* Propellers - Inner Right */}
                          <g>
                            <circle cx="125" cy="101" r="15" fill="rgba(0,0,0,0.05)" stroke="rgba(0,245,255,0.3)" strokeWidth="1"/>
                            <g>
                              <ellipse cx="125" cy="101" rx="13" ry="3" fill="rgba(0,245,255,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 125 101;360 125 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                              <ellipse cx="125" cy="101" rx="3" ry="13" fill="rgba(0,245,255,0.6)">
                                <animateTransform attributeName="transform" type="rotate" values="0 125 101;360 125 101" dur="0.08s" repeatCount="indefinite"/>
                              </ellipse>
                            </g>
                          </g>
                          
                          {/* Cockpit */}
                          <ellipse cx="100" cy="75" rx="8" ry="6" fill="rgba(100,150,255,0.7)" stroke="rgba(100,150,255,0.9)" strokeWidth="1"/>
                          
                          {/* Landing Gear */}
                          <circle cx="85" cy="110" r="2" fill="#666"/>
                          <circle cx="115" cy="110" r="2" fill="#666"/>
                          <circle cx="100" cy="155" r="2" fill="#666"/>
                          
                          {/* Navigation Lights */}
                          <circle cx="40" cy="101" r="2" fill="#FF0000"/>
                          <circle cx="160" cy="101" r="2" fill="#00FF00"/>
                          
                          {/* Status LED */}
                          <circle cx="100" cy="100" r="2" fill="#00FF00">
                            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                      )}
                      
                      {project.category === 'robotics' && (
                        <svg className="illustration-svg" viewBox="0 0 200 200" fill="none">
                          {/* UR5 Robot Arm - Realistic Design */}
                          <defs>
                            <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#E0E0E0"/>
                              <stop offset="50%" stopColor="#F8F8F8"/>
                              <stop offset="100%" stopColor="#C8C8C8"/>
                            </linearGradient>
                          </defs>
                          
                          {/* Base */}
                          <g>
                            <ellipse cx="50" cy="155" rx="18" ry="8" fill="url(#metalGrad)" stroke="#999" strokeWidth="2"/>
                            <rect x="32" y="147" width="36" height="16" fill="url(#metalGrad)" stroke="#999" strokeWidth="2"/>
                            <ellipse cx="50" cy="147" rx="18" ry="8" fill="#F0F0F0" stroke="#AAA" strokeWidth="1"/>
                          </g>
                          
                          {/* Joint 1 */}
                          <circle cx="50" cy="147" r="8" fill="url(#metalGrad)" stroke="#777" strokeWidth="2"/>
                          
                          {/* Link 1 */}
                          <rect x="46" y="120" width="8" height="30" rx="4" fill="url(#metalGrad)" stroke="#999" strokeWidth="1"/>
                          
                          {/* Joint 2 */}
                          <circle cx="50" cy="120" r="6" fill="url(#metalGrad)" stroke="#777" strokeWidth="2"/>
                          
                          {/* Link 2 */}
                          <rect x="50" y="116" width="35" height="8" rx="4" fill="url(#metalGrad)" stroke="#999" strokeWidth="1"/>
                          
                          {/* Joint 3 */}
                          <circle cx="85" cy="120" r="6" fill="url(#metalGrad)" stroke="#777" strokeWidth="2"/>
                          
                          {/* Link 3 */}
                          <rect x="81" y="95" width="8" height="25" rx="4" fill="url(#metalGrad)" stroke="#999" strokeWidth="1"/>
                          
                          {/* Joint 4 */}
                          <circle cx="85" cy="95" r="5" fill="url(#metalGrad)" stroke="#777" strokeWidth="2"/>
                          
                          {/* Link 4 */}
                          <rect x="85" y="91" width="25" height="8" rx="4" fill="url(#metalGrad)" stroke="#999" strokeWidth="1"/>
                          
                          {/* Joint 5 */}
                          <circle cx="110" cy="95" r="5" fill="url(#metalGrad)" stroke="#777" strokeWidth="2"/>
                          
                          {/* Link 5 */}
                          <rect x="106" y="80" width="8" height="15" rx="4" fill="url(#metalGrad)" stroke="#999" strokeWidth="1"/>
                          
                          {/* Joint 6 / End Effector */}
                          <circle cx="110" cy="80" r="6" fill="url(#metalGrad)" stroke="#777" strokeWidth="2"/>
                          
                          {/* Gripper */}
                          <rect x="105" y="70" width="4" height="12" rx="2" fill="#666" stroke="#444" strokeWidth="1"/>
                          <rect x="111" y="70" width="4" height="12" rx="2" fill="#666" stroke="#444" strokeWidth="1"/>
                          
                          {/* Status LEDs */}
                          <circle cx="46" cy="125" r="2" fill="#00FF00"/>
                          <circle cx="54" cy="125" r="2" fill="#0080FF"/>
                          
                          {/* Cable management */}
                          <path d="M50 147 Q60 130 Q80 110 Q100 90 Q110 80" stroke="#333" strokeWidth="2" fill="none" strokeDasharray="2,2"/>
                        </svg>
                      )}
                    </div>
                    
                    <div className="project-overlay">
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

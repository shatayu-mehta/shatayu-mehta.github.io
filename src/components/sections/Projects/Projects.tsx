import React, { useState } from 'react';
import './Projects.css';
import projectsData from '../../../data/projects.json';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  achievements: string[];
  status: string;
  timeline: string;
  github: string | string[] | null;
  demo: string | null;
  featured: boolean;
}

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

  // Use imported project data
  const projects: Project[] = projectsData.projects;

  // Old inline data - to be removed
  /*const projects: Project[] = [
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
      description: 'Multi-functional robotic system demonstrating computer vision-based tool sorting, ping pong ball pick & place, and automated flashlight assembly using UR5 cobot with CNN-based object recognition.',
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
      demo: '/projects/3d-reconstruction.html',
      featured: true
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
  */

  const filters = projectsData.filters.map(filter => ({
    ...filter,
    count: filter.id === 'all' ? projects.length : projects.filter(p => p.category === filter.id).length
  }));

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
                      
                      {project.title === 'Real-Time 3D Reconstruction System' && (
                        <svg className="illustration-svg" viewBox="0 0 200 200" fill="none">
                          {/* 3D Reconstruction Stereo Camera System */}
                          <defs>
                            <linearGradient id="cameraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#2A2A2A"/>
                              <stop offset="50%" stopColor="#1A1A1A"/>
                              <stop offset="100%" stopColor="#0A0A0A"/>
                            </linearGradient>
                            <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4A4A4A"/>
                              <stop offset="50%" stopColor="#2A2A2A"/>
                              <stop offset="100%" stopColor="#1A1A1A"/>
                            </linearGradient>
                            <radialGradient id="pointCloudGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="rgba(0,245,255,0.8)"/>
                              <stop offset="50%" stopColor="rgba(0,150,255,0.6)"/>
                              <stop offset="100%" stopColor="rgba(0,100,255,0.3)"/>
                            </radialGradient>
                          </defs>
                          
                          {/* Stereo Camera Mount/Base */}
                          <rect x="60" y="85" width="80" height="30" rx="5" fill="url(#cameraGrad)" stroke="#555" strokeWidth="2"/>
                          
                          {/* Left Camera */}
                          <rect x="70" y="90" width="25" height="20" rx="3" fill="url(#cameraGrad)" stroke="#666" strokeWidth="1"/>
                          <circle cx="82.5" cy="100" r="8" fill="url(#lensGrad)" stroke="#888" strokeWidth="1"/>
                          <circle cx="82.5" cy="100" r="5" fill="#333"/>
                          <circle cx="82.5" cy="100" r="2" fill="rgba(0,245,255,0.7)"/>
                          
                          {/* Right Camera */}
                          <rect x="105" y="90" width="25" height="20" rx="3" fill="url(#cameraGrad)" stroke="#666" strokeWidth="1"/>
                          <circle cx="117.5" cy="100" r="8" fill="url(#lensGrad)" stroke="#888" strokeWidth="1"/>
                          <circle cx="117.5" cy="100" r="5" fill="#333"/>
                          <circle cx="117.5" cy="100" r="2" fill="rgba(255,0,128,0.7)"/>
                          
                          {/* Raspberry Pi Board */}
                          <rect x="75" y="120" width="50" height="35" rx="3" fill="#228B22" stroke="#32CD32" strokeWidth="1"/>
                          <text x="100" y="140" textAnchor="middle" fontSize="8" fill="#FFF">Pi Zero 2W</text>
                          
                          {/* GPIO Pins */}
                          <rect x="80" y="125" width="2" height="8" fill="#FFD700"/>
                          <rect x="83" y="125" width="2" height="8" fill="#FFD700"/>
                          <rect x="86" y="125" width="2" height="8" fill="#FFD700"/>
                          <rect x="115" y="125" width="2" height="8" fill="#FFD700"/>
                          <rect x="118" y="125" width="2" height="8" fill="#FFD700"/>
                          
                          {/* USB/Power connector */}
                          <rect x="78" y="155" width="8" height="4" rx="2" fill="#C0C0C0"/>
                          <rect x="115" y="155" width="8" height="4" rx="2" fill="#C0C0C0"/>
                          
                          {/* 3D Point Cloud Visualization */}
                          <g opacity="0.8">
                            {/* Target Object (being reconstructed) */}
                            <rect x="140" y="70" width="40" height="30" rx="5" fill="rgba(100,100,100,0.3)" stroke="rgba(200,200,200,0.5)" strokeWidth="1"/>
                            
                            {/* Point Cloud Points */}
                            <circle cx="145" cy="75" r="1.5" fill="#00FFFF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="150" cy="78" r="1.5" fill="#00CCFF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="155" cy="82" r="1.5" fill="#0099FF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="160" cy="85" r="1.5" fill="#0066FF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="165" cy="88" r="1.5" fill="#3366FF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="170" cy="92" r="1.5" fill="#6699FF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="175" cy="95" r="1.5" fill="#99CCFF">
                              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
                            </circle>
                          </g>
                          
                          {/* Camera Vision Rays */}
                          <g opacity="0.4">
                            <path d="M82.5 100 L140 70" stroke="rgba(0,245,255,0.5)" strokeWidth="1" strokeDasharray="2,2"/>
                            <path d="M82.5 100 L140 100" stroke="rgba(0,245,255,0.5)" strokeWidth="1" strokeDasharray="2,2"/>
                            <path d="M82.5 100 L140 130" stroke="rgba(0,245,255,0.5)" strokeWidth="1" strokeDasharray="2,2"/>
                            
                            <path d="M117.5 100 L140 70" stroke="rgba(255,0,128,0.5)" strokeWidth="1" strokeDasharray="2,2"/>
                            <path d="M117.5 100 L140 100" stroke="rgba(255,0,128,0.5)" strokeWidth="1" strokeDasharray="2,2"/>
                            <path d="M117.5 100 L140 130" stroke="rgba(255,0,128,0.5)" strokeWidth="1" strokeDasharray="2,2"/>
                          </g>
                          
                          {/* Processing Indicator */}
                          <g opacity="0.9">
                            <circle cx="100" cy="170" r="8" fill="rgba(0,255,0,0.2)" stroke="rgba(0,255,0,0.8)" strokeWidth="2">
                              <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite"/>
                              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                            </circle>
                            <text x="100" y="175" textAnchor="middle" fontSize="6" fill="#00FF00">3ms</text>
                          </g>
                          
                          {/* Data Flow Arrows */}
                          <g opacity="0.6">
                            <path d="M82.5 110 L95 135" stroke="#00FFFF" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                            <path d="M117.5 110 L105 135" stroke="#FF0080" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                          </g>
                          
                          {/* Arrow marker definition */}
                          <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#00FFFF"/>
                            </marker>
                          </defs>
                        </svg>
                      )}
                    </div>
                    
                    <div className="project-overlay">
                      <div className="overlay-top">
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
                    
                    {project.github && (
                      <div className="project-actions">
                        {Array.isArray(project.github) ? (
                          <div className="github-links">
                            <span className="github-label">Repositories:</span>
                            {(project.github as string[]).map((link: string, index: number) => (
                              <a 
                                key={index}
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="github-link"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  window.open(link, '_blank', 'noopener,noreferrer');
                                }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                {index === 0 ? 'Tool Sorting' : index === 1 ? 'Flashlight Assembly' : 'Pick & Place'}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="github-link"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(project.github as string, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View Repository
                          </a>
                        )}
                      </div>
                    )}
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
                    
                    {project.github && (
                      <div className="card-actions">
                        {Array.isArray(project.github) ? (
                          <div className="github-links-small">
                            {(project.github as string[]).map((link: string, index: number) => (
                              <a 
                                key={index}
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="github-link-small"
                                title={index === 0 ? 'Tool Sorting' : index === 1 ? 'Flashlight Assembly' : 'Pick & Place'}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a 
                            href={project.github as string} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="github-link-small"
                            title="View Repository"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
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

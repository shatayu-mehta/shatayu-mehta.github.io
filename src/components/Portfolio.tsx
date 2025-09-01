import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioProps {
  currentSection: string
}

const Portfolio = ({ currentSection }: PortfolioProps) => {
  console.log('Portfolio rendering with section:', currentSection) // Debug log
  
  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return (
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="cyber-title">
              <span className="glitch" data-text="WELCOME TO THE MATRIX">
                WELCOME TO THE MATRIX
              </span>
            </h1>
            <p className="cyber-subtitle">
              Where robotics meets rebellion, and control systems get a little too controlling.
            </p>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">20+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">∞</span>
                <span className="stat-label">Caffeine Consumed</span>
              </div>
            </div>
          </motion.div>
        )

      case 'about':
        return (
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title">ABOUT THE CYBORG</h2>
            <div className="about-content">
              <p className="about-text">
                I'm Shatayu Mehta, a robotics engineer who speaks fluent robot and occasionally human. 
                Currently pursuing a Master's in Robotics at the University of Minnesota, I've spent years teaching 
                machines to be less mechanical and more... well, still mechanical, but significantly cooler.
              </p>
              <p className="about-text">
                When I'm not busy making VTOLs fly better or teaching robots to sort tools with computer vision, 
                you'll find me deep in CAD models, designing the next generation of automated overlords. My specialty? 
                Making control systems so precise, they make Swiss watches jealous.
              </p>
              <div className="bio-stats">
                <div className="bio-item">
                  <strong>Location:</strong> Minneapolis, MN (Land of 10,000 Lakes and Infinite Robots)
                </div>
                <div className="bio-item">
                  <strong>Status:</strong> Available for hire (VTOL aircraft not included)
                </div>
                <div className="bio-item">
                  <strong>Superpower:</strong> Turning coffee into code, CAD models, and flying machines
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'experience':
        return (
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title">BATTLE EXPERIENCE</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Masters Student - Robotics</h3>
                  <h4>University of Minnesota Twin Cities</h4>
                  <span className="timeline-date">Sept 2024 - Present</span>
                  <p>Currently conquering the academic world of robotics while learning to make machines even smarter. 
                     Specializing in making robots that might eventually take over the world (responsibly).</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Research and Development Engineer</h3>
                  <h4>Indrones Solutions PVT LTD</h4>
                  <span className="timeline-date">Nov 2022 - Nov 2023</span>
                  <p>Spearheaded FUJIN VTOL project, achieving 25% flight time increase and reducing costs by 10%. 
                     Also made UAVs so efficient, they're practically showing off.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Design Team Lead</h3>
                  <h4>Team Onyx India</h4>
                  <span className="timeline-date">May 2019 - Aug 2019</span>
                  <p>Led aircraft design decisions for SAE Aero Design competition, reducing material costs by 45%. 
                     Created self-gliding aircraft that lands itself - because autonomous is always better.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'projects':
        return (
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title">DIGITAL CREATIONS</h2>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Wearable Ring Mouse Device</h3>
                <p>Created a futuristic ring mouse with Arduino Nano 33 BLE, because regular mice are for peasants. 
                   Features gesture control and achieves 35.67 SUS score for ultimate user satisfaction.</p>
                <div className="tech-stack">
                  <span>Arduino</span>
                  <span>Python</span>
                  <span>3D Printing</span>
                  <span>BLE</span>
                </div>
              </div>
              
              <div className="project-card">
                <h3>Computer Vision Tool Sorting Robot</h3>
                <p>Taught a UR5 robot to sort tools with the precision of a Swiss watchmaker and the attitude of a 
                   caffeinated engineer. Uses CNN and ArUco markers for 6DoF pose estimation.</p>
                <div className="tech-stack">
                  <span>Python</span>
                  <span>OpenCV</span>
                  <span>TensorFlow</span>
                  <span>RoboDK</span>
                </div>
              </div>
              
              <div className="project-card">
                <h3>Real-Time 3D Stereo Reconstruction</h3>
                <p>Built a custom stereo camera system that reconstructs 3D models in real-time within 3 milliseconds. 
                   Faster than you can say "depth perception".</p>
                <div className="tech-stack">
                  <span>OpenCV</span>
                  <span>Raspberry Pi</span>
                  <span>Open3D</span>
                  <span>SGBM</span>
                </div>
              </div>
              
              <div className="project-card">
                <h3>Fruit Classification with ResNet18</h3>
                <p>Developed a CNN model that classifies fruits with 97.5% validation accuracy. 
                   Now even my computer can tell an apple from an orange better than some humans.</p>
                <div className="tech-stack">
                  <span>PyTorch</span>
                  <span>ResNet18</span>
                  <span>Transfer Learning</span>
                  <span>CNN</span>
                </div>
              </div>
              
              <div className="project-card">
                <h3>Automated Fruit Plucking Robot</h3>
                <p>Designed a gantry robot with computer vision for autonomous strawberry harvesting. 
                   Because robots deserve fresh fruit too.</p>
                <div className="tech-stack">
                  <span>MATLAB</span>
                  <span>Arduino</span>
                  <span>Computer Vision</span>
                  <span>Servo Control</span>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'skills':
        return (
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title">NEURAL NETWORK CAPABILITIES</h2>
            <div className="skills-container">
              <div className="skill-category">
                <h3>Programming Languages</h3>
                <div className="skill-bars">
                  <div className="skill-bar">
                    <span>Python</span>
                    <div className="skill-progress" data-level="95"></div>
                  </div>
                  <div className="skill-bar">
                    <span>C++</span>
                    <div className="skill-progress" data-level="85"></div>
                  </div>
                  <div className="skill-bar">
                    <span>MATLAB</span>
                    <div className="skill-progress" data-level="90"></div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Robotics & Control</h3>
                <div className="skill-bars">
                  <div className="skill-bar">
                    <span>ROS/ROS2</span>
                    <div className="skill-progress" data-level="92"></div>
                  </div>
                  <div className="skill-bar">
                    <span>Control Theory</span>
                    <div className="skill-progress" data-level="88"></div>
                  </div>
                  <div className="skill-bar">
                    <span>Computer Vision</span>
                    <div className="skill-progress" data-level="80"></div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>CAD & Design</h3>
                <div className="skill-bars">
                  <div className="skill-bar">
                    <span>SolidWorks</span>
                    <div className="skill-progress" data-level="93"></div>
                  </div>
                  <div className="skill-bar">
                    <span>AutoCAD</span>
                    <div className="skill-progress" data-level="87"></div>
                  </div>
                  <div className="skill-bar">
                    <span>Fusion 360</span>
                    <div className="skill-progress" data-level="85"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'contact':
        return null // EstablishContact component is rendered separately

      default:
        return null
    }
  }

  return (
    <div className="portfolio-container" style={{ 
      display: currentSection === 'contact' ? 'none' : 'block' 
    }}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio

import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioProps {
  currentSection: string
}

const Portfolio = ({ currentSection }: PortfolioProps) => {
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
                With a Master's in Robotics Engineering from UC San Diego, I've spent years teaching 
                machines to be less mechanical and more... well, still mechanical, but cooler.
              </p>
              <p className="about-text">
                When I'm not busy making robots do my bidding, you'll find me deep in CAD models, 
                designing the next generation of automated overlords. My specialty? Making control 
                systems so precise, they make Swiss watches jealous.
              </p>
              <div className="bio-stats">
                <div className="bio-item">
                  <strong>Location:</strong> San Diego, CA (Land of Eternal Sunshine)
                </div>
                <div className="bio-item">
                  <strong>Status:</strong> Available for hire (Robots not included)
                </div>
                <div className="bio-item">
                  <strong>Superpower:</strong> Turning coffee into code and CAD models
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
                  <h3>Graduate Research Assistant</h3>
                  <h4>UC San Diego</h4>
                  <span className="timeline-date">2022 - 2024</span>
                  <p>Conquered the academic world while making robots dance to my algorithms. 
                     Specialized in making machines smarter than their creators (don't tell my professors).</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Robotics Intern</h3>
                  <h4>Tech Startup (Stealth Mode)</h4>
                  <span className="timeline-date">2023</span>
                  <p>Developed control systems so advanced, they're classified as "potentially sentient." 
                     Also made the office coffee machine slightly more intelligent.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>CAD Modeling Specialist</h3>
                  <h4>Freelance</h4>
                  <span className="timeline-date">2021 - Present</span>
                  <p>Creating 3D models so realistic, reality got jealous. Specializing in 
                     mechanical designs that work both in virtual space and actual physics.</p>
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
                <h3>Autonomous Navigation System</h3>
                <p>Taught a robot to navigate better than most humans in traffic. 
                   Features include path planning, obstacle avoidance, and an attitude problem.</p>
                <div className="tech-stack">
                  <span>ROS</span>
                  <span>Python</span>
                  <span>SLAM</span>
                </div>
              </div>
              
              <div className="project-card">
                <h3>Robotic Arm Control</h3>
                <p>Developed precision control algorithms for a 6-DOF robotic arm. 
                   Now it can perform surgery, paint masterpieces, or make the perfect latte.</p>
                <div className="tech-stack">
                  <span>MATLAB</span>
                  <span>Simulink</span>
                  <span>PID Control</span>
                </div>
              </div>
              
              <div className="project-card">
                <h3>CAD Model Library</h3>
                <p>Created a comprehensive library of mechanical components. 
                   Each model is so detailed, engineers weep tears of joy.</p>
                <div className="tech-stack">
                  <span>SolidWorks</span>
                  <span>AutoCAD</span>
                  <span>Fusion 360</span>
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
        return (
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="section-title">ESTABLISH CONNECTION</h2>
            <div className="contact-content">
              <p className="contact-intro">
                Ready to collaborate on the next generation of intelligent machines? 
                Or just want to chat about the inevitable robot uprising? Drop me a line!
              </p>
              
              <div className="contact-methods">
                <a href="mailto:shatayu@example.com" className="contact-link">
                  <span className="contact-icon">📧</span>
                  <span>shatayu@example.com</span>
                </a>
                
                <a href="https://linkedin.com/in/shatayu-mehta" className="contact-link">
                  <span className="contact-icon">💼</span>
                  <span>LinkedIn Profile</span>
                </a>
                
                <a href="https://github.com/shatayu-mehta" className="contact-link">
                  <span className="contact-icon">💻</span>
                  <span>GitHub Repository</span>
                </a>
                
                <a href="/RESUME_S_A_M.pdf" className="contact-link" download>
                  <span className="contact-icon">📄</span>
                  <span>Download Resume</span>
                </a>
              </div>
              
              <div className="contact-note">
                <p>Available for remote work, on-site collaboration, or interdimensional projects.</p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="portfolio-container">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio

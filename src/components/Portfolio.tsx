interface PortfolioProps {
  currentSection: string
}

const Portfolio: React.FC<PortfolioProps> = ({ currentSection }) => {
  const renderHome = () => (
    <div className="section-content">
      <h1 className="cyber-title glitch" data-text="SHATAYU MEHTA">
        SHATAYU MEHTA
      </h1>
      <div className="glitch-text" data-text="ROBOTICS ENGINEER">
        ROBOTICS ENGINEER
      </div>
      <p className="cyber-subtitle">
        Masters in Robotics at University of Minnesota Twin Cities. 
        Specialized in VTOL aircraft design, autonomous systems, and precision CAD modeling.
        Currently seeking opportunities to revolutionize the future of robotics.
      </p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">3+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">∞</div>
          <div className="stat-label">Coffee Consumed</div>
        </div>
      </div>

      <div className="contact-note">
        <p>🚀 Currently available for full-time opportunities in robotics and autonomous systems</p>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="section-content">
      <h2 className="section-title">ABOUT PROTOCOL</h2>
      <div className="about-content">
        <p className="about-text">
          Hey there! I'm Shatayu, a robotics engineer who's passionate about making machines do cool stuff. 
          Currently pursuing my Masters in Robotics at the University of Minnesota Twin Cities, where I'm diving deep into 
          Machine Learning, Robot Vision, and Feedback Control Systems.
        </p>
        
        <p className="about-text">
          I've got this weird obsession with making things fly, move, and think autonomously. From designing VTOL aircraft 
          that can take off vertically to programming fruit-picking robots (yes, that's a real thing I've done), 
          I love tackling complex engineering challenges with a mix of creativity and technical precision.
        </p>

        <p className="about-text">
          When I'm not busy debugging robot code or optimizing CAD designs, you'll find me exploring the latest in 
          autonomous systems, tinkering with new hardware platforms, or probably consuming unhealthy amounts of caffeine 
          while working on the next big project.
        </p>

        <div className="bio-stats">
          <div className="bio-item">
            <strong>📍 Location:</strong> Minneapolis, MN (willing to relocate)
          </div>
          <div className="bio-item">
            <strong>🎓 Education:</strong> MS Robotics (In Progress), BTech Mechanical Engineering
          </div>
          <div className="bio-item">
            <strong>📱 Contact:</strong> +1 (763) 245-3257
          </div>
          <div className="bio-item">
            <strong>📧 Email:</strong> mehta405@umn.edu
          </div>
          <div className="bio-item">
            <strong>🤖 Specialization:</strong> Autonomous Systems, CAD Design, VTOL Aircraft
          </div>
        </div>
      </div>
    </div>
  )

  const renderExperience = () => (
    <div className="section-content">
      <h2 className="section-title">EXPERIENCE LOG</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Masters Student - Robotics</h3>
            <h4>University of Minnesota Twin Cities</h4>
            <span className="timeline-date">Sept 2024 - Present</span>
            <p>
              Focusing on advanced robotics coursework including Machine Learning, Robot Vision, and Feedback Control Systems. 
              Conducting research in autonomous systems and developing next-generation robotic solutions.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Research and Development Engineer</h3>
            <h4>Indrones Solutions PVT LTD, Mumbai</h4>
            <span className="timeline-date">Nov 2022 - Nov 2023</span>
            <p>
              Spearheaded the FUJIN VTOL project from inception to completion, designing and testing the second prototype. 
              Established streamlined manufacturing processes, reducing prototype completion time by 1.5 weeks. 
              Engineered EPP foam machining solutions, reducing costs by 10% while increasing durability for 5 additional test flights.
            </p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', color: 'var(--text-gray)' }}>
              <li>Achieved 25% increase in flight time for FUJIN VTOL through optimized powerhouse analysis</li>
              <li>Improved coefficient of lift to 0.428 through aerodynamic optimization</li>
              <li>Designed prototypes using SOLIDWORKS and FUSION 360</li>
              <li>Conducted market analysis and influenced aircraft parameters for target customer identification</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Design Team Lead</h3>
            <h4>Team Onyx India, Mumbai</h4>
            <span className="timeline-date">May 2019 - Aug 2019</span>
            <p>
              Led the design team for SAE Aero Design 2021 and advised the team for SAE Aero Design 2022. 
              Made key aircraft design decisions, material selection, and frame manufacturing for regular class aircraft.
            </p>
            <ul style={{ marginTop: '10px', paddingLeft: '20px', color: 'var(--text-gray)' }}>
              <li>Developed autonomous self-gliding aircraft with 30cm wingspan and flight controller</li>
              <li>Reduced material costs by 45% through alternative material research</li>
              <li>Designed torsion box to prevent tail torsion issues and improve stability</li>
              <li>Analyzed and tested 4 aircraft prototypes to determine maximum takeoff weight</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Mechanical Engineering Student</h3>
            <h4>KJ Somaiya College of Engineering, Mumbai</h4>
            <span className="timeline-date">July 2018 - June 2022</span>
            <p>
              Completed Bachelor of Technology in Mechanical Engineering with GPA of 8.64/10. 
              Gained expertise in fundamentals of design, FEA, and various CAD platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="section-content">
      <h2 className="section-title">PROJECT ARCHIVE</h2>
      <div className="projects-grid">
        <div className="project-card">
          <h3>FUJIN VTOL Aircraft</h3>
          <p>
            Spearheaded the complete design and development of a vertical take-off and landing aircraft. 
            Led the project from conception through two prototype iterations, achieving significant improvements 
            in aerodynamic performance and manufacturing efficiency.
          </p>
          <div className="tech-stack">
            <span>SOLIDWORKS</span>
            <span>FUSION 360</span>
            <span>XFLR5</span>
            <span>ANSYS Fluent</span>
            <span>ECALC</span>
          </div>
        </div>

        <div className="project-card">
          <h3>Autonomous Fruit Plucking Robot</h3>
          <p>
            Designed and prototyped a robotic system for automated fruit harvesting using computer vision 
            and precision control. Implemented RGB color segmentation in MATLAB for strawberry detection 
            and coordinated multi-axis robotic movement.
          </p>
          <div className="tech-stack">
            <span>MATLAB</span>
            <span>Arduino Uno</span>
            <span>Computer Vision</span>
            <span>Servo Control</span>
            <span>Bluetooth</span>
          </div>
        </div>

        <div className="project-card">
          <h3>SAE Aero Design Aircraft</h3>
          <p>
            Led design and development of multiple aircraft prototypes for SAE Aero Design competition. 
            Implemented autonomous landing systems, optimized structural design, and conducted comprehensive 
            testing to determine performance limits.
          </p>
          <div className="tech-stack">
            <span>AutoCAD</span>
            <span>Flight Controllers</span>
            <span>Carbon Fiber</span>
            <span>3D Printing</span>
            <span>Aerodynamics</span>
          </div>
        </div>

        <div className="project-card">
          <h3>S25 & S75 UAV Components</h3>
          <p>
            Created and tested advanced components for commercial UAV platforms, improving mechanical performance. 
            Developed innovative hot-swappable payload mechanism for the S75 platform, enabling rapid mission reconfiguration.
          </p>
          <div className="tech-stack">
            <span>Mechanical Design</span>
            <span>Payload Systems</span>
            <span>UAV Integration</span>
            <span>Testing Protocols</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSkills = () => (
    <div className="section-content">
      <h2 className="section-title">SKILL MATRIX</h2>
      <div className="skills-container">
        <div className="skill-category">
          <h3>Programming & Development</h3>
          <div className="skill-bars">
            <div className="skill-bar">
              <span>Python</span>
              <div className="skill-progress" data-level="90"></div>
            </div>
            <div className="skill-bar">
              <span>C++</span>
              <div className="skill-progress" data-level="85"></div>
            </div>
            <div className="skill-bar">
              <span>MATLAB</span>
              <div className="skill-progress" data-level="88"></div>
            </div>
            <div className="skill-bar">
              <span>Android Studio</span>
              <div className="skill-progress" data-level="80"></div>
            </div>
          </div>
        </div>

        <div className="skill-category">
          <h3>CAD & Design Software</h3>
          <div className="skill-bars">
            <div className="skill-bar">
              <span>SOLIDWORKS</span>
              <div className="skill-progress" data-level="95"></div>
            </div>
            <div className="skill-bar">
              <span>FUSION 360</span>
              <div className="skill-progress" data-level="92"></div>
            </div>
            <div className="skill-bar">
              <span>AutoCAD</span>
              <div className="skill-progress" data-level="87"></div>
            </div>
            <div className="skill-bar">
              <span>CREO</span>
              <div className="skill-progress" data-level="85"></div>
            </div>
          </div>
        </div>

        <div className="skill-category">
          <h3>Analysis & Simulation</h3>
          <div className="skill-bars">
            <div className="skill-bar">
              <span>ANSYS Fluent & Workbench</span>
              <div className="skill-progress" data-level="88"></div>
            </div>
            <div className="skill-bar">
              <span>XFLR5</span>
              <div className="skill-progress" data-level="90"></div>
            </div>
            <div className="skill-bar">
              <span>E-Calc</span>
              <div className="skill-progress" data-level="85"></div>
            </div>
          </div>
        </div>

        <div className="skill-category">
          <h3>Hardware & Manufacturing</h3>
          <div className="skill-bars">
            <div className="skill-bar">
              <span>3D Printing (CURA, PrusaSlicer)</span>
              <div className="skill-progress" data-level="93"></div>
            </div>
            <div className="skill-bar">
              <span>CNC Milling</span>
              <div className="skill-progress" data-level="87"></div>
            </div>
            <div className="skill-bar">
              <span>Arduino & Raspberry Pi</span>
              <div className="skill-progress" data-level="90"></div>
            </div>
            <div className="skill-bar">
              <span>ArduPilot</span>
              <div className="skill-progress" data-level="85"></div>
            </div>
          </div>
        </div>

        <div className="skill-category">
          <h3>Domain Expertise</h3>
          <div className="skill-bars">
            <div className="skill-bar">
              <span>Robotics & Control Systems</span>
              <div className="skill-progress" data-level="90"></div>
            </div>
            <div className="skill-bar">
              <span>VTOL Aircraft Design</span>
              <div className="skill-progress" data-level="95"></div>
            </div>
            <div className="skill-bar">
              <span>Computer Vision</span>
              <div className="skill-progress" data-level="85"></div>
            </div>
            <div className="skill-bar">
              <span>FEA & CAE</span>
              <div className="skill-progress" data-level="88"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="section-content">
      <h2 className="section-title">ESTABLISH CONNECTION</h2>
      <div className="contact-content">
        <p className="contact-intro">
          Ready to discuss robotics, autonomous systems, or just chat about the latest in aerospace engineering? 
          I'm always excited to connect with fellow engineers, potential employers, or anyone interested in 
          pushing the boundaries of what's possible with robotics.
        </p>

        <div className="contact-methods">
          <a href="mailto:mehta405@umn.edu" className="contact-link">
            <span className="contact-icon">📧</span>
            <div>
              <div>mehta405@umn.edu</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Primary Email</div>
            </div>
          </a>

          <a href="tel:+17632453257" className="contact-link">
            <span className="contact-icon">📱</span>
            <div>
              <div>+1 (763) 245-3257</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Phone/Text</div>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/shatayumehta" target="_blank" rel="noopener noreferrer" className="contact-link">
            <span className="contact-icon">💼</span>
            <div>
              <div>LinkedIn Profile</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Professional Network</div>
            </div>
          </a>

          <a href="/RESUME_S_A_M.pdf" target="_blank" className="contact-link">
            <span className="contact-icon">📄</span>
            <div>
              <div>Download Resume</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>PDF Format</div>
            </div>
          </a>
        </div>

        <div className="contact-note">
          <p>🚀 Currently seeking full-time opportunities in robotics, autonomous systems, and VTOL aircraft development</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            Available for remote work, relocation, or hybrid arrangements. 
            Particularly interested in positions involving UAV/drone technology, robotic control systems, or CAD/engineering design roles.
          </p>
        </div>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return renderHome()
      case 'about':
        return renderAbout()
      case 'experience':
        return renderExperience()
      case 'projects':
        return renderProjects()
      case 'skills':
        return renderSkills()
      case 'contact':
        return renderContact()
      default:
        return renderHome()
    }
  }

  return (
    <div className="portfolio-container">
      {renderSection()}
    </div>
  )
}

export default Portfolio

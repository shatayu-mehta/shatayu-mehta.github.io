import { useState } from 'react'
import './HomePage.css'

interface HomePageProps {
  currentSection: string
}

export default function HomePage({ currentSection }: HomePageProps) {
  const [photoClicked, setPhotoClicked] = useState(false)
  const [resumeClicked, setResumeClicked] = useState(false)

  const handlePhotoClick = () => {
    setPhotoClicked(!photoClicked)
  }

  const handleResumeClick = () => {
    setResumeClicked(!resumeClicked)
    // Open resume in new tab
    window.open('/RESUME_S_A_M.pdf', '_blank')
  }

  if (currentSection !== 'home') {
    return null
  }

  return (
    <div className="home-page">
      {/* Cyberpunk Times Square Left Side */}
      <div className="times-square-section">
        <div className="cyberpunk-cityscape">
          {/* Main photo screen - large central screen */}
          <div className={`main-screen ${photoClicked ? 'expanded' : ''}`} onClick={handlePhotoClick}>
            <div className="screen-frame">
              <div className="screen-content">
                <div className="photo-placeholder">
                  <div className="neon-border">
                    <div className="cyber-avatar">
                      <div className="avatar-bg">
                        <div className="cyber-face">
                          <div className="cyber-eyes">
                            <div className="eye left-eye"></div>
                            <div className="eye right-eye"></div>
                          </div>
                          <div className="cyber-mouth"></div>
                        </div>
                        <div className="scan-lines"></div>
                      </div>
                    </div>
                  </div>
                  <div className="photo-label">SHATAYU MEHTA</div>
                </div>
              </div>
              <div className="screen-glow"></div>
            </div>
          </div>

          {/* Resume access screen - smaller screen */}
          <div className={`resume-screen ${resumeClicked ? 'clicked' : ''}`} onClick={handleResumeClick}>
            <div className="screen-frame small">
              <div className="screen-content">
                <div className="resume-icon">
                  <div className="document-icon">
                    <div className="doc-lines">
                      <div className="doc-line"></div>
                      <div className="doc-line"></div>
                      <div className="doc-line"></div>
                      <div className="doc-line"></div>
                    </div>
                  </div>
                  <div className="resume-label">RESUME</div>
                </div>
              </div>
              <div className="screen-glow small"></div>
            </div>
          </div>

          {/* Additional smaller screens for atmosphere */}
          <div className="ambient-screen screen-1">
            <div className="matrix-text">MATRIX</div>
          </div>
          
          <div className="ambient-screen screen-2">
            <div className="code-text">
              <div className="code-line">{'> system.init()'}</div>
              <div className="code-line">{'> loading...'}</div>
            </div>
          </div>

          <div className="ambient-screen screen-3">
            <div className="stats-display">
              <div className="stat-item">CPU: 78%</div>
              <div className="stat-item">RAM: 62%</div>
              <div className="stat-item">NET: 1.2GB/s</div>
            </div>
          </div>

          {/* Cyberpunk city silhouette buildings */}
          <div className="city-buildings">
            <div className="building building-1"></div>
            <div className="building building-2"></div>
            <div className="building building-3"></div>
            <div className="building building-4"></div>
            <div className="building building-5"></div>
            <div className="building building-6"></div>
            <div className="building building-7"></div>
            <div className="building building-8"></div>
          </div>

          {/* Neon signs and atmosphere */}
          <div className="neon-signs">
            <div className="neon-sign sign-1">CYBER</div>
            <div className="neon-sign sign-2">TECH</div>
            <div className="neon-sign sign-3">2077</div>
          </div>
        </div>
      </div>

      {/* Welcome message overlay */}
      <div className="welcome-overlay">
        <div className="welcome-text">
          <h1 className="matrix-title">WELCOME TO THE MATRIX</h1>
          <p className="matrix-subtitle">Robotics Engineer & Control Systems Specialist</p>
        </div>
      </div>
    </div>
  )
}

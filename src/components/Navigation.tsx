import { useState, useEffect } from 'react'

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, setCurrentSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const navItems = [
    { id: 'home', label: 'HOME', icon: '⚡' },
    { id: 'about', label: 'ABOUT', icon: '🤖' },
    { id: 'experience', label: 'EXPERIENCE', icon: '⚙️' },
    { id: 'projects', label: 'PROJECTS', icon: '🔧' },
    { id: 'skills', label: 'SKILLS', icon: '🎯' },
    { id: 'contact', label: 'CONTACT', icon: '📡' }
  ]

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <div 
          className={`nav-toggle ${isMobileMenuOpen ? 'nav-toggle-open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <nav className={`navigation ${isMobile && isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-brand">
          <div className="brand-icon">SHATAYU.DEV</div>
          <div className="brand-pulse"></div>
        </div>

        {/* Navigation menu */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className={`nav-item ${currentSection === item.id ? 'active' : ''}`}>
              <button
                className="nav-button"
                onClick={() => {
                  setCurrentSection(item.id)
                  if (isMobile) {
                    setIsMobileMenuOpen(false)
                  }
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
              <div className="nav-glow"></div>
            </li>
          ))}
        </ul>

        <div className="nav-footer">
          <div className="system-status">
            <div className="status-indicator"></div>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 150
          }}
        />
      )}
    </>
  )
}

export default Navigation

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

const Navigation = ({ currentSection, setCurrentSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const sections = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' }
  ]

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="glitch" data-text="S.M">S.M</span>
      </div>
      
      <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
        {sections.map((section) => (
          <motion.li
            key={section.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              className={`nav-link ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(section.id)}
            >
              <span className="nav-text">{section.label}</span>
              <span className="nav-underline"></span>
            </button>
          </motion.li>
        ))}
      </ul>
      
      <button 
        className={`nav-toggle ${isMenuOpen ? 'nav-toggle-open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}

export default Navigation

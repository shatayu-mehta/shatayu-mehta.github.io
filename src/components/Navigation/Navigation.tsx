import React, { useState, useEffect } from 'react';
import './Navigation.css';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Change nav background on scroll
      setIsScrolled(scrollPosition > 50);

      // Update active section
      const sections = document.querySelectorAll('.section');
      let currentSection = 'hero';

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop - windowHeight / 3 && 
            scrollPosition < sectionTop + sectionHeight - windowHeight / 3) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      const offsetTop = (targetElement as HTMLElement).offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Account for fixed nav height
        behavior: 'smooth'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className="logo-text gradient-text">SM</span>
            <span className="logo-subtitle">Robotics Engineer</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-menu desktop-menu">
          {navigationItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <span className="nav-link-text">{item.label}</span>
                <span className="nav-link-indicator"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Resume Download Button */}
        <div className="nav-actions">
          <a
            href="/RESUME_S_A_M.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary nav-resume-btn"
          >
            <span>Resume</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a
                href="/RESUME_S_A_M.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

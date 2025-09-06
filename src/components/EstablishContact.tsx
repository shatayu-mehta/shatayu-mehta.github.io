import { useState, useEffect } from 'react'

interface EstablishContactProps {
  currentSection: string
}

const EstablishContact: React.FC<EstablishContactProps> = ({ currentSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (currentSection !== 'contact') return null

  const socialLinks = [
    {
      id: 'email',
      symbol: '@',
      url: 'mailto:mehta405@umn.edu',
      color: '#00ffff',
      position: { x: '15%', y: '25%' }
    },
    {
      id: 'linkedin',
      symbol: 'in',
      url: 'https://www.linkedin.com/in/shatayumehta',
      color: '#ff0080',
      position: { x: '75%', y: '35%' }
    },
    {
      id: 'phone',
      symbol: '☎',
      url: 'tel:+17632453257',
      color: '#80ff00',
      position: { x: '25%', y: '65%' }
    },
    {
      id: 'resume',
      symbol: 'CV',
      url: '/RESUME_S_A_M.pdf',
      color: '#0080ff',
      position: { x: '65%', y: '75%' }
    }
  ]

  return (
    <div className="establish-contact">
      {/* Dynamic floating social icons */}
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target={link.id === 'email' || link.id === 'phone' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            left: link.position.x,
            top: link.position.y,
            zIndex: 5,
            textDecoration: 'none'
          }}
          onMouseEnter={() => setHoveredIcon(link.id)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <div
            className={`social-icon-overlay ${hoveredIcon === link.id ? 'hovered' : ''}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '2rem',
              color: link.color,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textShadow: `0 0 20px ${link.color}`,
            }}
          >
            {link.symbol}
          </div>
        </a>
      ))}

      {/* Animated connection lines */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {socialLinks.map((link, index) => {
          const x1 = (parseFloat(link.position.x) / 100) * window.innerWidth
          const y1 = (parseFloat(link.position.y) / 100) * window.innerHeight
          
          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke={link.color}
              strokeWidth="1"
              opacity={hoveredIcon === link.id ? "0.6" : "0.1"}
              style={{
                transition: 'opacity 0.3s ease',
                filter: `drop-shadow(0 0 5px ${link.color})`
              }}
            />
          )
        })}
      </svg>

      {/* Background text animation */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '8rem',
          fontWeight: 'bold',
          color: 'rgba(0, 255, 255, 0.05)',
          zIndex: 0,
          pointerEvents: 'none',
          fontFamily: 'Orbitron, monospace'
        }}
      >
        CONNECT
      </div>
    </div>
  )
}

export default EstablishContact

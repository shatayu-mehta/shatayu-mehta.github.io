import { useEffect } from 'react'

const useCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const hideCursor = () => {
      cursor.style.opacity = '0'
    }

    const showCursor = () => {
      cursor.style.opacity = '1'
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', showCursor)
    document.addEventListener('mouseleave', hideCursor)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', showCursor)
      document.removeEventListener('mouseleave', hideCursor)
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor)
      }
    }
  }, [])
}

export default useCursor

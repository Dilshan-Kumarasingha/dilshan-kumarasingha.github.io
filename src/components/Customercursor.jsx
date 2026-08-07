import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import '../styles/CustomCursor.css'

/**
 * Global custom cursor.
 * Mount this ONCE at the root of your app (e.g. in App.jsx, as a sibling
 * of your page content — not nested inside Hero).
 *
 * How targets opt in:
 *   - Add  data-cursor="hover"  to any element that should enlarge the ring
 *     (links, buttons, cards).
 *   - Add  data-cursor="text"   to elements where the cursor should morph
 *     into a thin vertical bar (useful over headlines / big text blocks).
 *   - Add  data-cursor-label="View"  to show a short text label inside the ring.
 *
 * Automatically disables itself on touch devices so it never breaks mobile.
 */
function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [variant, setVariant] = useState('default') // default | hover | text
  const [label, setLabel] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isDown, setIsDown] = useState(false)

  // Raw pointer position
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Springs give the trailing "magnetic" feel without re-rendering React
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.4 })
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.4 })
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 900, mass: 0.2 })
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 900, mass: 0.2 })

  const rafRef = useRef(null)

  useEffect(() => {
    const hasTouch = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(hasTouch)
    if (hasTouch) return

    document.body.classList.add('cx-active')

    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Walk up from the actual hovered element to find opt-in attributes,
      // so nested icons/text inside a button still register as "hover".
      const target = e.target.closest?.('[data-cursor]')
      if (target) {
        setVariant(target.getAttribute('data-cursor') || 'hover')
        setLabel(target.getAttribute('data-cursor-label') || '')
      } else {
        setVariant('default')
        setLabel('')
      }
    }

    const handleDown = () => setIsDown(true)
    const handleUp = () => setIsDown(false)
    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      document.body.classList.remove('cx-active')
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  if (isTouch) return null

  return (
    <div className={`cx-root ${isVisible ? 'cx-visible' : ''}`} aria-hidden="true">
      <motion.div
        className={`cx-ring cx-ring--${variant} ${isDown ? 'cx-ring--down' : ''}`}
        style={{ translateX: ringX, translateY: ringY }}
      >
        {label && <span className="cx-label">{label}</span>}
      </motion.div>
      <motion.div
        className="cx-dot"
        style={{ translateX: dotX, translateY: dotY }}
      />
    </div>
  )
}

export default CustomCursor
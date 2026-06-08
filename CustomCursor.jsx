import { useEffect, useRef } from 'react'
import { useMousePosition } from './hooks'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const { pos, isHovering } = useMousePosition()

  // Smooth ring follow using RAF
  const ringPos = useRef({ x: -100, y: -100 })
  const animRef = useRef(null)

  useEffect(() => {
    const animate = () => {
      ringPos.current.x += (pos.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.y - ringPos.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [pos])

  // Dot follows cursor directly
  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.left = `${pos.x}px`
      dotRef.current.style.top = `${pos.y}px`
    }
  }, [pos])

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
      />
    </>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMenu } from 'react-icons/fi'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      {/* ── Desktop nav — only visible after scrolling past hero ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"
        style={{
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-mono text-sm tracking-widest"
          style={{ color: '#C6F135' }}
        >
          susanpokhrel
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-display text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ background: '#C6F135' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Hire me pill */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-medium transition-colors"
          style={{ background: '#C6F135', color: '#3D2EFF' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse-slow" />
          Hire me
        </motion.a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden p-2"
          style={{ color: '#C6F135' }}
        >
          <FiMenu size={22} />
        </button>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] flex flex-col justify-between p-10"
            style={{ background: '#3D2EFF' }}
          >
            {/* Close */}
            <div className="flex justify-between items-center">
              <span className="font-mono text-sm tracking-widest" style={{ color: '#C6F135' }}>
                susanpokhrel
              </span>
              <button onClick={close} aria-label="Close menu" style={{ color: '#C6F135' }}>
                <FiX size={24} />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-6">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <a
                    href={href}
                    onClick={close}
                    className="font-display font-black"
                    style={{
                      fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                      color: '#C6F135',
                      lineHeight: 1.1,
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Bottom */}
            <p className="font-mono text-xs" style={{ color: 'rgba(198,241,53,0.5)' }}>
              susanpokhrel.com.np
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

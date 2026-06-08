import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowDown } from 'react-icons/fi'
import { personalInfo } from './portfolio'
import ParticleBackground from './ParticleBackground'

const socialLinks = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: personalInfo.twitter, label: 'Twitter' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ display: 'grid', gridTemplateColumns: '60% 40%' }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        className="relative flex flex-col justify-between px-16 py-12 z-10"
        style={{ background: '#3D2EFF' }}
      >
        {/* Particle layer only on left */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ParticleBackground />
        </div>

        {/* Top logo / name */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 font-mono text-sm tracking-widest"
          style={{ color: '#C6F135' }}
        >
          susanpokhrel
        </motion.span>

        {/* Main content */}
        <div className="relative z-10 flex flex-col gap-8">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-black leading-none"
            style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              color: '#C6F135',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Full Stack<br />Developer.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base leading-relaxed max-w-sm"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* Bottom stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 gap-6"
          >
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Highly skilled at progressive enhancement, design systems &amp; UI Engineering.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Experience building products for clients across several countries.
            </p>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-10 flex gap-5 items-center"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: '#C6F135' }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Decorative stair shape bottom-center */}
        <svg
          className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none"
          width="40" height="40" viewBox="0 0 40 40" fill="none"
        >
          <polyline points="0,40 0,20 10,20 10,10 20,10 20,0 40,0"
            stroke="#C6F135" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="relative overflow-hidden" style={{ background: '#C6F135' }}>

        {/* Hamburger menu top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-10 right-10 z-20 flex flex-col gap-1.5 cursor-pointer"
        >
          <span className="block w-7 h-0.5" style={{ background: '#3D2EFF' }} />
          <span className="block w-5 h-0.5 ml-auto" style={{ background: '#3D2EFF' }} />
        </motion.div>

        {/* Dot grid top-left */}
        <div className="absolute top-12 left-8 grid gap-2 opacity-40 pointer-events-none"
          style={{ gridTemplateColumns: 'repeat(5, 8px)' }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="block w-1.5 h-1.5 rounded-full" style={{ background: '#3D2EFF' }} />
          ))}
        </div>

        {/* Dot grid bottom-right */}
        <div className="absolute bottom-24 right-8 grid gap-2 opacity-40 pointer-events-none"
          style={{ gridTemplateColumns: 'repeat(5, 8px)' }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="block w-1.5 h-1.5 rounded-full" style={{ background: '#3D2EFF' }} />
          ))}
        </div>

        {/* Stair deco right side */}
        <svg className="absolute right-12 top-1/3 opacity-30 pointer-events-none"
          width="30" height="50" viewBox="0 0 30 50" fill="none">
          <polyline points="30,0 30,10 20,10 20,20 10,20 10,30 0,30 0,50"
            stroke="#3D2EFF" strokeWidth="2" fill="none" />
        </svg>

        {/* Squiggle left side */}
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
          width="20" height="30" viewBox="0 0 20 30" fill="none">
          <path d="M10 0 Q0 8 10 15 Q20 22 10 30"
            stroke="#3D2EFF" strokeWidth="2" fill="none" />
        </svg>

        {/* Small square deco */}
        <svg className="absolute right-10 bottom-40 opacity-50 pointer-events-none"
          width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="12" height="12" stroke="#3D2EFF" strokeWidth="1.5" />
        </svg>

        {/* Photo — anchored to bottom */}
        <motion.img
          src="/photo.jpg"
          alt="Susan Pokhrel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 object-cover object-top"
          style={{ width: '82%', maxHeight: '90%' }}
        />

        {/* Thin white border frame behind photo */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '6%', left: '22%',
            width: '62%', height: '72%',
            border: '1.5px solid rgba(255,255,255,0.6)',
          }}
        />
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <FiArrowDown size={14} />
      </motion.button>
    </section>
  )
}

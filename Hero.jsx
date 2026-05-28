import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'
import { personalInfo } from '../../data/portfolio'
import ParticleBackground from '../ui/ParticleBackground'

const socialLinks = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: personalInfo.twitter, label: 'Twitter' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />

      {/* Orbit decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] opacity-[0.07]">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-cyan-400"
              style={{ transform: `scale(${0.6 + i * 0.2})` }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Available for new opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-4"
          >
            <span className="gradient-text">Alex</span>
            <br />
            <span className="text-white">Chen</span>
          </motion.h1>

          {/* Type animation */}
          <motion.div variants={item} className="mb-6">
            <p className="font-body text-xl md:text-2xl text-slate-400">
              I'm a{' '}
              <TypeAnimation
                sequence={personalInfo.roles.flatMap(r => [r, 2000])}
                repeat={Infinity}
                className="text-cyan-400 font-medium"
              />
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="font-body text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href={personalInfo.resumeUrl}
              download
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm
                         bg-gradient-to-r from-cyan-500 to-purple-600 text-white
                         shadow-glow-cyan hover:shadow-glow-purple transition-all duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiDownload size={16} />
              Download Resume
            </motion.a>

            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm
                         glass border border-white/10 text-white hover:border-cyan-400/40 transition-all duration-300"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View Work
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex gap-4 justify-center">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-cyan-400/30 transition-all border border-white/5"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <FiArrowDown size={16} />
      </motion.button>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import { personalInfo, skillCategories, techStack } from '../../data/portfolio'
import {
  SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiPython,
  SiPostgresql, SiDocker, SiAmazonwebservices, SiFigma, SiGraphql,
} from 'react-icons/si'
import { FiMapPin, FiCalendar, FiCode } from 'react-icons/fi'

const iconMap = {
  SiReact: SiReact, SiTypescript, SiNextdotjs, SiNodedotjs,
  SiPython, SiPostgresql, SiDocker, SiAmazon: SiAmazonwebservices, SiFigma, SiGraphql,
}

const stats = [
  { label: 'Years Experience', value: '5+', icon: FiCalendar },
  { label: 'Projects Shipped', value: '40+', icon: FiCode },
  { label: 'GitHub Stars', value: '10k+', icon: '⭐' },
  { label: 'Location', value: personalInfo.location, icon: FiMapPin },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-24 bg-dark-900 relative" ref={ref}>
      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <SectionLabel label="ABOUT ME" />

        <div className="grid lg:grid-cols-2 gap-16 items-start mt-12">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Crafting digital{' '}
              <span className="gradient-text">experiences</span>
              <br />that matter
            </h2>

            <div className="space-y-4 text-slate-400 font-body leading-relaxed">
              <p>{personalInfo.bio}</p>
              <p>{personalInfo.bioExtended}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass rounded-xl p-4 glass-hover"
                >
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mb-1">
                    {typeof Icon === 'string' ? Icon : <Icon size={12} />}
                    {label}
                  </div>
                  <p className="font-display font-bold text-xl text-white">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {skillCategories.map((cat, ci) => (
              <div key={cat.label}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                  <span className="font-mono text-xs tracking-widest" style={{ color: cat.color }}>
                    {cat.label.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: ci * 0.1 + si * 0.04 }}
                      className="px-3 py-1.5 rounded-lg glass text-sm font-body font-medium text-slate-300 hover:text-white border border-white/5 transition-all hover:border-cyan-400/20"
                      style={{ '--hover-color': cat.color }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tech stack icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-center font-mono text-xs tracking-widest text-slate-500 mb-8">TECH STACK</p>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map(({ name, icon, color }, i) => {
              const Icon = iconMap[icon]
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex flex-col items-center gap-2 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="p-4 glass rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                    style={{ '--glow': color }}>
                    {Icon && <Icon size={24} style={{ color }} />}
                  </div>
                  <span className="font-body text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{name}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-400/40" />
      <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400/40 max-w-[60px]" />
    </div>
  )
}

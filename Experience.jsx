import { motion } from 'framer-motion'
import { FiBriefcase, FiBook } from 'react-icons/fi'
import { useInView } from './hooks'
import { experiences, education } from './portfolio'
import { SectionLabel } from './About'

const allItems = [...experiences, ...education].sort((a, b) => a.id - b.id)

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience" className="py-24 bg-dark-800 relative" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-4xl mx-auto px-6">
        <SectionLabel label="EXPERIENCE & EDUCATION" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-6 mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            My{' '}
            <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

          <div className="space-y-12">
            {allItems.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={i}
                  isLeft={isLeft}
                  inView={inView}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index, isLeft, inView }) {
  const isWork = item.type === 'work'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`relative flex items-start gap-8 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Desktop: content half */}
      <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan-400/20 transition-all group"
          style={{ borderLeft: `3px solid ${item.color}` }}>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="font-mono text-[10px] tracking-widest"
                style={{ color: item.color }}>
                {item.type === 'work' ? '// WORK' : '// EDUCATION'}
              </span>
              <h3 className="font-display font-bold text-lg text-white mt-1">{item.title}</h3>
              <p className="font-body text-slate-300 text-sm mt-0.5">{item.company}</p>
            </div>
            <div className="flex-shrink-0 p-2.5 rounded-xl"
              style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
              {isWork ? <FiBriefcase size={16} style={{ color: item.color }} />
                      : <FiBook size={16} style={{ color: item.color }} />}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-3 text-xs font-mono text-slate-500">
            <span>{item.period}</span>
            <span>·</span>
            <span>{item.location}</span>
          </div>

          <p className="text-slate-400 text-sm font-body leading-relaxed mb-3">
            {item.description}
          </p>

          {item.bullets && (
            <ul className="space-y-1.5">
              {item.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2 text-sm text-slate-500 font-body">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: item.color }} />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-7 flex-shrink-0">
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-dark-900"
          style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
        />
      </div>

      {/* Desktop: spacer other half */}
      <div className="hidden md:block w-1/2" />
    </motion.div>
  )
}

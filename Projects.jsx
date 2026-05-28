import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi'
import { useInView } from '../../hooks'
import { projects, projectFilters } from '../../data/portfolio'
import { SectionLabel } from './About'

export default function Projects() {
  const [ref, inView] = useInView()
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter))

  return (
    <section id="projects" className="py-24 bg-dark-950 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionLabel label="PROJECTS" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-6 mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Things I've{' '}
              <span className="gradient-text">built</span>
            </h2>
            <p className="text-slate-400 mt-2 font-body">
              Open source and commercial projects I've shipped
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {projectFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                    : 'glass text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {filtered.filter(p => p.featured).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                isHovered={hoveredId === project.id}
                onHover={setHoveredId}
                featured
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Regular grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.filter(p => !p.featured).map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i + 3}
                inView={inView}
                isHovered={hoveredId === project.id}
                onHover={setHoveredId}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, inView, isHovered, onHover, featured }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-400/20 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none' }}
    >
      {/* Gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

      {/* Glow hover effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(400px at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)` }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white group-hover:gradient-text transition-all">
              {project.title}
            </h3>
            {featured && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                FEATURED
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Live Demo"
            >
              <FiExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm font-body leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-[11px] font-mono text-slate-400 bg-white/5 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <FiStar size={12} className="text-yellow-400" />
            {project.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <FiGitBranch size={12} />
            {project.forks}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

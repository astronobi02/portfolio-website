import { motion } from 'framer-motion'
import { FiStar, FiUsers, FiBookOpen, FiGithub, FiExternalLink } from 'react-icons/fi'
import { useInView, useGitHubStats } from './hooks'
import { personalInfo } from './portfolio'
import { SectionLabel } from './About'

const LANG_COLORS = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab',
  Rust: '#dea584', Go: '#00acd7', CSS: '#563d7c', HTML: '#e34c26',
  Shell: '#89e051', Vue: '#41b883', Svelte: '#ff3e00',
}

export default function GitHub() {
  const [ref, inView] = useInView()
  const { stats, repos, loading, error } = useGitHubStats(personalInfo.githubUsername)

  return (
    <section id="github" className="py-24 bg-dark-900 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel label="GITHUB" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-6 mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Open Source{' '}
              <span className="gradient-text">Activity</span>
            </h2>
            <p className="text-slate-400 mt-2 font-body">Live stats from GitHub API</p>
          </motion.div>

          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm text-slate-300 hover:text-white border border-white/5 hover:border-cyan-400/20 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <FiGithub size={16} />
            View Profile
            <FiExternalLink size={12} />
          </motion.a>
        </div>

        {loading ? (
          <GitHubSkeleton />
        ) : error ? (
          <StaticFallback inView={inView} />
        ) : stats ? (
          <LiveStats stats={stats} repos={repos} inView={inView} />
        ) : null}
      </div>
    </section>
  )
}

function LiveStats({ stats, repos, inView }) {
  const statCards = [
    { label: 'Public Repos', value: stats.public_repos, icon: FiBookOpen, color: '#00d4ff' },
    { label: 'Total Stars', value: stats.totalStars.toLocaleString(), icon: FiStar, color: '#f59e0b' },
    { label: 'Followers', value: stats.followers.toLocaleString(), icon: FiUsers, color: '#7c3aed' },
    { label: 'Following', value: stats.following, icon: FiUsers, color: '#10b981' },
  ]

  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5 glass-hover"
          >
            <s.icon size={20} style={{ color: s.color }} className="mb-3" />
            <p className="font-display font-bold text-2xl text-white">{s.value}</p>
            <p className="font-mono text-xs text-slate-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* GitHub contribution graph embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5"
        >
          <p className="font-mono text-xs text-slate-500 mb-4 tracking-widest">CONTRIBUTION ACTIVITY</p>
          <img
            src={`https://ghchart.rshah.org/00d4ff/${personalInfo.githubUsername}`}
            alt="GitHub Contribution Chart"
            className="w-full rounded-lg opacity-80"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <p className="text-xs text-slate-600 mt-3 font-mono">
            Contribution data via GitHub API
          </p>
        </motion.div>

        {/* Top languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 border border-white/5"
        >
          <p className="font-mono text-xs text-slate-500 mb-5 tracking-widest">TOP LANGUAGES</p>
          <div className="space-y-3">
            {stats.topLanguages.slice(0, 6).map(({ lang, count }, i) => {
              const total = stats.topLanguages.reduce((a, l) => a + l.count, 0)
              const pct = Math.round((count / total) * 100)
              const color = LANG_COLORS[lang] || '#64748b'
              return (
                <div key={lang}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-body text-slate-300">{lang}</span>
                    <span className="text-xs font-mono text-slate-500">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}60` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent repos */}
      {repos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {repos.slice(0, 6).map((repo, i) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-400/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-display font-semibold text-sm text-white group-hover:text-cyan-400 transition-colors truncate">
                  {repo.name}
                </span>
                {repo.language && (
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ml-2"
                    style={{ background: LANG_COLORS[repo.language] || '#64748b' }}
                  />
                )}
              </div>
              <p className="text-xs text-slate-500 font-body line-clamp-2 mb-3">{repo.description}</p>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                <span className="flex items-center gap-1"><FiStar size={11} /> {repo.stargazers_count}</span>
                {repo.language && <span>{repo.language}</span>}
              </div>
            </a>
          ))}
        </motion.div>
      )}
    </>
  )
}

function StaticFallback({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="glass rounded-2xl p-8 text-center border border-white/5"
    >
      <FiGithub size={40} className="mx-auto text-slate-600 mb-4" />
      <p className="text-slate-400 font-body mb-2">Set <code className="font-mono text-cyan-400 text-sm">VITE_GITHUB_USERNAME</code> to load live stats</p>
      <p className="text-slate-600 text-sm font-mono">Add your username to .env.local</p>
    </motion.div>
  )
}

function GitHubSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-xl h-24" />
        ))}
      </div>
      <div className="glass rounded-2xl h-48" />
    </div>
  )
}

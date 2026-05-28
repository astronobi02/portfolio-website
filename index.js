import { useState, useEffect, useCallback, useRef } from 'react'

// ── Theme Hook ────────────────────────────────────────────────────────────────
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem('theme')
    return stored ? stored === 'dark' : true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return { isDark, toggleTheme: () => setIsDark(p => !p) }
}

// ── Scroll Progress Hook ──────────────────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

// ── Mouse Position Hook ───────────────────────────────────────────────────────
export function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    const onOver = (e) => {
      const el = e.target
      setIsHovering(
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.dataset.cursor === 'pointer'
      )
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return { pos, isHovering }
}

// ── Mouse Glow Hook ───────────────────────────────────────────────────────────
export function useMouseGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mouse-x', `${x}px`)
      el.style.setProperty('--mouse-y', `${y}px`)
    }

    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return ref
}

// ── GitHub Stats Hook ─────────────────────────────────────────────────────────
export function useGitHubStats(username) {
  const [stats, setStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = import.meta.env.VITE_GITHUB_TOKEN
  const headers = token ? { Authorization: `token ${token}` } : {}

  const fetchData = useCallback(async () => {
    if (!username) { setLoading(false); return }
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=stars`, { headers }),
      ])

      if (!userRes.ok) throw new Error('GitHub API error')

      const user = await userRes.json()
      const reposData = await reposRes.json()

      // Language stats
      const languages = {}
      reposData.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1
        }
      })
      const topLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
        .map(([lang, count]) => ({ lang, count }))

      setStats({
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar_url,
        totalStars: reposData.reduce((acc, r) => acc + r.stargazers_count, 0),
        topLanguages,
      })

      setRepos(reposData
        .filter(r => !r.fork && r.description)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => { fetchData() }, [fetchData])

  return { stats, repos, loading, error }
}

// ── Intersection Observer Hook ────────────────────────────────────────────────
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (options.once !== false) observer.disconnect()
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

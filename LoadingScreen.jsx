import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const steps = [0, 20, 45, 70, 85, 100]
    const timings = [0, 200, 400, 600, 800, 1000]

    timings.forEach((delay, i) => {
      setTimeout(() => {
        setProgress(steps[i])
        if (steps[i] === 100) {
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 500)
          }, 300)
        }
      }, delay)
    })
  }, [])

  const text = 'ALEX CHEN'

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-dark-950 flex flex-col items-center justify-center"
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Glow orb */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)' }}
          />

          {/* Name */}
          <div className="relative z-10 flex gap-[2px] mb-12">
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                className={`font-display font-bold text-4xl md:text-6xl tracking-widest ${
                  char === ' ' ? 'mx-3' : ''
                } ${i < 4 ? 'gradient-text' : 'text-slate-400'}`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative z-10 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                boxShadow: '0 0 10px rgba(0,212,255,0.6)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Progress label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-4 font-mono text-xs text-slate-500 tracking-widest"
          >
            {progress < 100 ? 'LOADING...' : 'READY'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

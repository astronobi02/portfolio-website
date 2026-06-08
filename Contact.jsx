import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { useInView } from '../../hooks'
import { personalInfo } from './portfolio'
import { SectionLabel } from './About'

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub', color: '#e2e8f0' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0077b5' },
  { icon: FiTwitter, href: personalInfo.twitter, label: 'Twitter', color: '#1da1f2' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#00d4ff' },
]

export default function Contact() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // EmailJS integration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      // Fallback: open mailto
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)}`
      window.open(mailtoUrl)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    try {
      const { default: emailjs } = await import('emailjs-com')
      await emailjs.send(serviceId, templateId, {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      }, publicKey)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="py-24 bg-dark-950 relative" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionLabel label="GET IN TOUCH" />

        <div className="mt-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-display font-bold text-4xl md:text-5xl"
          >
            Let's{' '}
            <span className="gradient-text">work together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-3 font-body max-w-xl"
          >
            Have a project in mind? I'd love to hear about it.
            Drop me a message and I'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alex Chen"
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                />
              </div>
              <InputField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, etc."
                required
              />
              <div>
                <label className="block font-mono text-xs tracking-widest text-slate-500 mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full glass rounded-xl px-4 py-3 text-sm font-body text-slate-300 placeholder-slate-600
                             border border-white/5 focus:border-cyan-400/40 focus:outline-none focus:ring-0
                             transition-colors resize-none bg-transparent"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-semibold text-sm
                           transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : status === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90'
                }`}
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {status === 'success' && <FiCheck size={16} />}
                {status === 'error' && <FiAlertCircle size={16} />}
                {status === 'idle' && <FiSend size={16} />}
                {status === 'idle' && 'Send Message'}
                {status === 'sending' && 'Sending...'}
                {status === 'success' && 'Message Sent!'}
                {status === 'error' && 'Failed — Try Again'}
              </motion.button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact info */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <p className="font-mono text-xs tracking-widest text-slate-500 mb-5">CONTACT INFO</p>
              <div className="space-y-4">
                <a href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <div className="p-2 glass rounded-lg group-hover:border-cyan-400/20 border border-white/5 transition-all">
                    <FiMail size={16} className="text-cyan-400" />
                  </div>
                  <span className="text-sm font-body">{personalInfo.email}</span>
                </a>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="p-2 glass rounded-lg border border-white/5">
                    <FiMapPin size={16} className="text-purple-400" />
                  </div>
                  <span className="text-sm font-body">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <p className="font-mono text-xs tracking-widest text-slate-500 mb-5">FIND ME ON</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 glass rounded-xl border border-white/5 hover:border-white/15 text-slate-400 hover:text-white transition-all group"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon size={18} style={{ color }} />
                    <span className="text-sm font-body">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-400 tracking-widest">AVAILABLE</span>
              </div>
              <p className="text-sm text-slate-400 font-body">
                Open to freelance projects, full-time roles, and exciting collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block font-mono text-xs tracking-widest text-slate-500 mb-2">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full glass rounded-xl px-4 py-3 text-sm font-body text-slate-300 placeholder-slate-600
                   border border-white/5 focus:border-cyan-400/40 focus:outline-none
                   transition-colors bg-transparent"
      />
    </div>
  )
}

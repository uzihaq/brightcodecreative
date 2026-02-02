import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mic, Users, Ruler, Camera, Code, Terminal, Sparkles, ArrowRight, Sun, Moon, Play } from 'lucide-react'

// Theme context
const ThemeContext = createContext()

function useTheme() {
  return useContext(ThemeContext)
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
      className="fixed top-4 right-4 z-50 p-3 rounded-full glass hover:border-white/30 transition-colors focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-midnight"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-purple-500" />
        )}
      </motion.div>
    </motion.button>
  )
}

const projects = [
  {
    id: 'vox',
    name: 'Vox',
    tagline: 'Voice to text, perfected',
    description: 'Local-first voice dictation with AI cleanup. Hold a key, speak, release. Your words appear instantly, cleaned and punctuated.',
    icon: Mic,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    features: ['WhisperKit transcription', 'Local LLM cleanup', 'Privacy-first'],
    status: 'Beta',
  },
  {
    id: 'bolo',
    name: 'Bolo',
    tagline: 'Group ordering, simplified',
    description: 'Real-time collaborative ordering for groups. Everyone picks what they want, one person pays, splits calculated automatically.',
    icon: Users,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Real-time sync', 'Smart splitting', 'Restaurant integration'],
    status: 'In Development',
    large: true,
  },
  {
    id: 'fit-furniture',
    name: 'Fit Furniture',
    tagline: 'Design your space',
    description: 'Drag-and-drop floor planning with real furniture dimensions. Cloud sync, collision detection, and export to scale.',
    icon: Ruler,
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    features: ['Real dimensions', 'Cloud save', 'PDF export'],
    status: 'Beta',
  },
  {
    id: 'develop',
    name: 'Develop',
    tagline: 'Photos, elevated',
    description: '10-bit AVIF pipeline with proper gamma correction. Non-destructive editing that preserves shadow detail.',
    icon: Camera,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    features: ['10-bit color', 'AVIF proxies', 'Non-destructive'],
    status: 'Alpha',
  },
  {
    id: 'portfolio',
    name: 'This Website',
    tagline: 'Yes, this too',
    description: 'Built in an afternoon with Claude Code. React, Tailwind, Framer Motion. The portfolio is part of the portfolio.',
    icon: Code,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    features: ['React + Vite', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    meta: true,
  },
]

// Static class mappings for Tailwind JIT compilation
const glowClasses = {
  cyan: 'glow-cyan',
  purple: 'glow-purple',
  green: 'glow-green',
  orange: 'glow-orange',
  pink: 'glow-pink',
}

function ProjectCard({ project, index }) {
  const Icon = project.icon
  const isLarge = project.large
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / centerY * -10
    const tiltY = (x - centerX) / centerX * 10
    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      // Trigger click action - for now just logs, will be updated with actual navigation
      console.log(`Selected project: ${project.name}`)
    }
  }

  return (
    <motion.article
      ref={cardRef}
      role="article"
      tabIndex={0}
      aria-label={`${project.name}: ${project.tagline}. Status: ${project.status}`}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      style={prefersReducedMotion ? {} : {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 || tilt.y !== 0 ? 1.02 : 1})`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`
        relative overflow-hidden rounded-2xl glass p-6 cursor-pointer
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
        ${project.meta ? 'border-dashed border-2 border-white/20' : ''}
        ${glowClasses[project.color]}
        hover:border-white/30 transition-all duration-300
        focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-midnight
      `}
    >
      {/* Gradient orb background */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full opacity-20 blur-3xl`} />

      {/* Video preview overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute inset-0 z-10 flex items-center justify-center rounded-2xl ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{
          background: theme === 'light'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,245,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(26,26,36,0.95) 0%, rgba(10,10,15,0.95) 100%)',
        }}
      >
        <div className="text-center">
          <motion.div
            animate={isHovered && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${project.gradient} mb-3`}
          >
            <Play className="w-7 h-7 text-white ml-1" />
          </motion.div>
          <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Preview coming soon
          </p>
        </div>
      </motion.div>

      {/* Status badge */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient}`} aria-hidden="true">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-white'}`}>
          {project.status}
        </span>
      </div>
      
      {/* Content */}
      <h3 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{project.name}</h3>
      <p className={`text-sm font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-3`}>
        {project.tagline}
      </p>
      <p className={`text-sm leading-relaxed mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        {project.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.features.map((feature, i) => (
          <span key={i} className={`text-xs px-2 py-1 rounded-md ${theme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-gray-300'}`}>
            {feature}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${theme === 'light' ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'}`} aria-hidden="true">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.article>
  )
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()

  return (
    <motion.header
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20 px-4"
      role="banner"
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="inline-block mb-6"
        aria-hidden="true"
      >
        <Terminal className={`w-16 h-16 mx-auto ${theme === 'light' ? 'text-cyan-600' : 'text-glow-cyan'}`} />
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        <span className="gradient-text">Vibe Code</span>
        <br />
        <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Weekend</span>
      </h1>

      <p className={`text-xl max-w-2xl mx-auto mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        Ship real products in a weekend using AI-assisted development.
        These apps were built with Claude Code — and you can too.
      </p>

      <nav className="flex flex-wrap justify-center gap-4" aria-label="Primary actions">
        <motion.button
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center gap-2 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-midnight"
          aria-label="Start building - scroll to projects"
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          Start Building
        </motion.button>
        <motion.a
          href="https://claude.ai/claude-code"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className={`px-6 py-3 rounded-full font-semibold transition-colors focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 inline-flex items-center gap-2 ${theme === 'light' ? 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-offset-gray-50' : 'border border-white/20 hover:bg-white/5 focus:ring-offset-midnight'}`}
          aria-label="Watch demo - opens Claude Code in new tab"
        >
          Watch Demo
        </motion.a>
      </nav>
    </motion.header>
  )
}

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-midnight text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Skip link for keyboard navigation */}
      <a href="#projects" className="skip-link">
        Skip to projects
      </a>

      <ThemeToggle />

      {/* Background grid */}
      <div className={`fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none transition-opacity duration-300 ${theme === 'light' ? 'opacity-0' : ''}`} aria-hidden="true" />

      {/* Gradient orbs */}
      <div className={`fixed top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none transition-opacity duration-300 ${theme === 'light' ? 'opacity-30' : ''}`} aria-hidden="true" />
      <div className={`fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none transition-opacity duration-300 ${theme === 'light' ? 'opacity-30' : ''}`} aria-hidden="true" />

      <main className="relative z-10 max-w-6xl mx-auto px-4">
        <Hero />
        
        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            <span className="gradient-text">Weekend Projects</span>
          </motion.h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-20">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-center py-12 border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}
        >
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            Built with 🫘 by Bean & Uzair
          </p>
        </motion.footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App

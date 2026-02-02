import { motion } from 'framer-motion'
import { Mic, Users, Ruler, Camera, Code, Terminal, Sparkles, ArrowRight } from 'lucide-react'

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

function ProjectCard({ project, index }) {
  const Icon = project.icon
  const isLarge = project.large
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`
        relative overflow-hidden rounded-2xl glass p-6 cursor-pointer
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
        ${project.meta ? 'border-dashed border-2 border-white/20' : ''}
        glow-${project.color}
        hover:border-white/30 transition-all duration-300
      `}
    >
      {/* Gradient orb background */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.gradient} rounded-full opacity-20 blur-3xl`} />
      
      {/* Status badge */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/10`}>
          {project.status}
        </span>
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
      <p className={`text-sm font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-3`}>
        {project.tagline}
      </p>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      
      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.features.map((feature, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300">
            {feature}
          </span>
        ))}
      </div>
      
      {/* CTA */}
      <div className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  )
}

function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20 px-4"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="inline-block mb-6"
      >
        <Terminal className="w-16 h-16 text-glow-cyan mx-auto" />
      </motion.div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        <span className="gradient-text">Vibe Code</span>
        <br />
        <span className="text-white">Weekend</span>
      </h1>
      
      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        Ship real products in a weekend using AI-assisted development. 
        These apps were built with Claude Code — and you can too.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Start Building
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full border border-white/20 font-semibold hover:bg-white/5 transition-colors"
        >
          Watch Demo
        </motion.button>
      </div>
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <Hero />
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {/* Footer */}
        <footer className="text-center py-12 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Built with 🫘 by Bean & Uzair
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App

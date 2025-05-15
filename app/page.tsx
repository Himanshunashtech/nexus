"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePortalTransition } from '@/lib/hooks/use-portal-transition'
import { HolographicCard } from '@/components/ui/holographic-card'
import { QuantumButton } from '@/components/ui/quantum-button'
import { Brain, Dna2, Lightbulb, Orbit, FlaskConical, Atom } from 'lucide-react'

export default function InnovationHub() {
  const { navigateWithPortal } = usePortalTransition()
  const headerRef = useRef<HTMLDivElement>(null)
  const brainSectionRef = useRef<HTMLDivElement>(null)
  
  const headerInView = useInView(headerRef, { once: false, amount: 0.5 })
  const brainInView = useInView(brainSectionRef, { once: true, amount: 0.3 })
  
  const innovationAreas = [
    {
      title: "Quantum Computing",
      icon: <Atom className="w-8 h-8 text-neon-cyan" />,
      description: "Pushing the boundaries of computational capacity through quantum principles.",
      color: "cyan"
    },
    {
      title: "Neural Networks",
      icon: <Brain className="w-8 h-8 text-neon-magenta" />,
      description: "Advancing artificial intelligence through biomimetic neural architectures.",
      color: "magenta"
    },
    {
      title: "DNA Computing",
      icon: <Dna2 className="w-8 h-8 text-neon-purple" />,
      description: "Leveraging biological structures for unprecedented computational power.",
      color: "purple"
    },
    {
      title: "Orbital Systems",
      icon: <Orbit className="w-8 h-8 text-neon-blue" />,
      description: "Developing satellite networks for global data distribution and monitoring.",
      color: "blue"
    },
    {
      title: "Nanotech Research",
      icon: <FlaskConical className="w-8 h-8 text-neon-green" />,
      description: "Creating microscale solutions with macroscale impact across industries.",
      color: "cyan"
    },
    {
      title: "Breakthrough Patents",
      icon: <Lightbulb className="w-8 h-8 text-neon-yellow" />,
      description: "Protecting intellectual property that will define the future of technology.",
      color: "magenta"
    }
  ]
  
  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg z-0 opacity-40"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: headerInView ? 1 : 0, 
              y: headerInView ? 0 : 50 
            }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="neon-text-magenta">Innovation</span>
              <span className="text-white"> Hub</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Where breakthrough technologies converge and new paradigms emerge.
              Explore the cutting edge of human innovation and scientific discovery.
            </p>
            
            <QuantumButton 
              size="lg" 
              variant="secondary"
              onClick={() => {
                const brainSection = document.getElementById('holographic-brain')
                if (brainSection) {
                  brainSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Explore Innovations
            </QuantumButton>
          </motion.div>
        </div>
      </section>
      
      {/* Brain Interface Section */}
      <section 
        id="holographic-brain"
        ref={brainSectionRef}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 quantum-grid z-0 opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: brainInView ? 1 : 0, 
                x: brainInView ? 0 : -50 
              }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-text-purple">
                Holographic Brain Interface
              </h2>
              
              <p className="text-lg text-gray-300 mb-6">
                Our revolutionary neural interface technology creates a direct connection
                between human cognition and computational systems, enabling unprecedented
                levels of interaction and control.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Direct neural signal processing",
                  "Holographic visualization of brain activity",
                  "Thought-based interface controls",
                  "Memory augmentation capabilities",
                  "Enhanced learning protocols"
                ].map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: brainInView ? 1 : 0, 
                      x: brainInView ? 0 : -20 
                    }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-magenta"></div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <QuantumButton onClick={() => navigateWithPortal('/neural')}>
                Neural Hub Details
              </QuantumButton>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: brainInView ? 1 : 0, 
                scale: brainInView ? 1 : 0.8 
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden h-[400px] flex items-center justify-center neon-border-purple">
                <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-sm"></div>
                
                <div className="relative z-10 animate-pulse-neon">
                  <Brain className="w-48 h-48 text-neon-purple" strokeWidth={0.5} />
                  
                  {/* Neural connections animated with pseudo-elements via CSS */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 bg-neon-purple rounded-full animate-glow"
                        style={{
                          top: `${50 + 30 * Math.sin(i * Math.PI / 4)}%`,
                          left: `${50 + 30 * Math.cos(i * Math.PI / 4)}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        <div 
                          className="absolute h-px bg-neon-purple opacity-70"
                          style={{
                            width: '50px',
                            transformOrigin: '0 0',
                            transform: `rotate(${i * 45}deg)`
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  Holographic Neural Projection v2.5
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Innovation Areas */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text-cyan">
              Innovation Areas
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Exploring the frontiers of science and technology across multiple disciplines.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovationAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <HolographicCard
                  variant={area.color as any}
                  className="h-full"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      {area.icon}
                      <h3 className="text-xl font-bold ml-3">{area.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6 flex-grow">
                      {area.description}
                    </p>
                    
                    <QuantumButton 
                      variant={area.color === "cyan" ? "primary" : area.color === "magenta" ? "secondary" : "accent"} 
                      size="sm"
                      onClick={() => navigateWithPortal('/quantum')}
                      className="self-start"
                    >
                      Learn More
                    </QuantumButton>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Patent Wall */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-darker opacity-80 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 holographic-text">
              Holographic Patent Wall
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our growing collection of breakthrough patents that are shaping the future.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
                className="glassmorphism p-4 relative"
              >
                <div className="text-xs text-gray-400 mb-2">
                  Patent #{(10000 + index).toString(16).toUpperCase()}
                </div>
                <h3 className="text-lg font-medium mb-1 neon-text">
                  {[
                    "Quantum Entanglement Communicator",
                    "Neural Interface Bridge",
                    "Holographic Memory Storage",
                    "Nanobot Collective Intelligence",
                    "Space-Time Calculation Engine",
                    "Molecular Computing Array"
                  ][index]}
                </h3>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Filed: 2025</span>
                  <span>Status: Approved</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <QuantumButton onClick={() => navigateWithPortal('/data')}>
              View All Patents
            </QuantumButton>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold holographic-text">NEXUS HORIZON</h3>
              <p className="text-gray-400">Innovation Hub</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 Nexus Horizon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
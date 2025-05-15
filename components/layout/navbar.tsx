"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  ActivitySquare, 
  BarChart3, 
  Brain, 
  Cpu, 
  Globe, 
  Home, 
  Menu, 
  X 
} from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Innovation Hub', path: '/innovation', icon: Brain },
  { name: 'Quantum Lab', path: '/quantum', icon: Cpu },
  { name: 'Global Network', path: '/network', icon: Globe },
  { name: 'Data Insights', path: '/data', icon: BarChart3 },
  { name: 'Neural Hub', path: '/neural', icon: ActivitySquare },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-cosmic-dark/80 backdrop-blur-md py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl sm:text-2xl font-bold holographic-text">
                NEXUS HORIZON
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.path
              
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "relative px-3 py-2 rounded-md transition-colors",
                    isActive 
                      ? "text-neon-cyan" 
                      : "text-gray-300 hover:text-neon-cyan"
                  )}
                >
                  <div className="flex items-center space-x-1">
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan"
                      layoutId="navbar-active-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-neon-cyan"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={cn("md:hidden", isOpen ? "block" : "hidden")}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-4 sm:px-6 pt-2 pb-4 grid gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.path
            
            return (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-cosmic-darker/70 text-neon-cyan neon-border" 
                    : "text-gray-300 hover:bg-cosmic-darker/40 hover:text-neon-cyan"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </motion.div>
    </header>
  )
}
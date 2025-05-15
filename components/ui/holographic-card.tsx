"use client"

import { ReactNode, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HolographicCardProps {
  children: ReactNode
  className?: string
  variant?: 'cyan' | 'magenta' | 'purple' | 'blue'
  glowIntensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
}

export function HolographicCard({
  children,
  className,
  variant = 'cyan',
  glowIntensity = 'medium',
  interactive = true,
  ...props
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const variantClasses = {
    cyan: 'neon-border',
    magenta: 'neon-border-magenta',
    purple: 'neon-border-purple',
    blue: 'neon-border-blue',
  }

  const glowClasses = {
    low: 'after:opacity-20',
    medium: 'after:opacity-30',
    high: 'after:opacity-50',
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateXValue = ((y - centerY) / centerY) * -5
    const rotateYValue = ((x - centerX) / centerX) * 5
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    if (!interactive) return
    setScale(1.02)
  }

  const handleMouseLeave = () => {
    if (!interactive) return
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden glassmorphism p-6',
        variantClasses[variant],
        glowClasses[glowIntensity],
        'after:absolute after:inset-0 after:rounded-lg',
        'after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent',
        'after:pointer-events-none after:z-0',
        interactive && 'cursor-pointer transition-transform',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
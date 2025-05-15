"use client"

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface QuantumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glowEffect?: boolean
}

const QuantumButton = forwardRef<HTMLButtonElement, QuantumButtonProps>(
  ({ className, variant = 'primary', size = 'md', glowEffect = true, ...props }, ref) => {
    const variants = {
      primary: 'bg-transparent border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10',
      secondary: 'bg-transparent border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10',
      accent: 'bg-transparent border-neon-purple text-neon-purple hover:bg-neon-purple/10',
      ghost: 'bg-transparent border-gray-500 text-gray-300 hover:bg-gray-500/10 hover:border-gray-300',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const glowVariants = {
      primary: glowEffect ? 'shadow-neon-cyan' : '',
      secondary: glowEffect ? 'shadow-neon-magenta' : '',
      accent: glowEffect ? 'shadow-neon-purple' : '',
      ghost: '',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-md font-medium',
          'border-2 transition-all duration-200 ease-in-out',
          variants[variant],
          sizes[size],
          glowVariants[variant],
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {props.children}
        
        {glowEffect && variant !== 'ghost' && (
          <motion.span
            className="absolute inset-0 rounded-md opacity-0"
            style={{
              boxShadow: variant === 'primary' 
                ? '0 0 15px #00FFFF' 
                : variant === 'secondary'
                ? '0 0 15px #FF00FF'
                : '0 0 15px #8A2BE2'
            }}
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>
    )
  }
)

QuantumButton.displayName = 'QuantumButton'

export { QuantumButton }
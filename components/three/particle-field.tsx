"use client"

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

interface ParticleFieldProps {
  count?: number
  colors?: string[]
  size?: number
  speed?: number
  mouseInteraction?: boolean
}

export default function ParticleField({
  count = 1000,
  colors = ['#00FFFF', '#FF00FF', '#8A2BE2'],
  size = 0.05,
  speed = 0.1,
  mouseInteraction = true,
}: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  useEffect(() => {
    if (!particlesRef.current) return
    
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Position particles in a large cube centered at the origin
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Create a color gradient across particles
      const colorIndex = Math.floor(Math.random() * 3)
      const color = new THREE.Color(colors[colorIndex])
      
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    particlesRef.current.geometry.setAttribute(
      'position', 
      new THREE.BufferAttribute(positions, 3)
    )
    
    particlesRef.current.geometry.setAttribute(
      'color', 
      new THREE.BufferAttribute(colors, 3)
    )
  }, [count, colors])
  
  useFrame(({ clock, mouse }) => {
    if (!particlesRef.current) return
    
    const time = clock.getElapsedTime() * speed
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length; i += 3) {
      // Create a wave effect
      positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.003
      positions[i] += Math.cos(time + positions[i + 2] * 0.5) * 0.003
      
      // Add mouse interaction
      if (mouseInteraction) {
        const mouseX = (mouse.x * viewport.width) / 2
        const mouseY = (mouse.y * viewport.height) / 2
        const distance = Math.sqrt(
          Math.pow(positions[i] - mouseX, 2) + 
          Math.pow(positions[i + 1] - mouseY, 2)
        )
        
        if (distance < 2) {
          const factor = 1 - distance / 2
          positions[i] += (mouseX - positions[i]) * factor * 0.01
          positions[i + 1] += (mouseY - positions[i + 1]) * factor * 0.01
        }
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = time * 0.05
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial 
        size={size} 
        vertexColors 
        transparent 
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}
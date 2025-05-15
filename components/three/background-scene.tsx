"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  useEffect(() => {
    if (!particlesRef.current) return
    
    // Spread particles across the entire viewport
    const count = 1000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Position particles in a large cube centered at the origin
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Create a cyan to magenta to purple color gradient
      const mixFactor = Math.random()
      
      if (mixFactor < 0.33) {
        // Cyan
        colors[i3] = 0
        colors[i3 + 1] = 1
        colors[i3 + 2] = 1
      } else if (mixFactor < 0.66) {
        // Magenta
        colors[i3] = 1
        colors[i3 + 1] = 0
        colors[i3 + 2] = 1
      } else {
        // Purple
        colors[i3] = 0.54
        colors[i3 + 1] = 0.17
        colors[i3 + 2] = 0.89
      }
    }
    
    particlesRef.current.geometry.setAttribute(
      'position', 
      new THREE.BufferAttribute(positions, 3)
    )
    
    particlesRef.current.geometry.setAttribute(
      'color', 
      new THREE.BufferAttribute(colors, 3)
    )
  }, [])
  
  useFrame(({ clock, mouse }) => {
    if (!particlesRef.current) return
    
    const time = clock.getElapsedTime() * 0.1
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    // Animate particles
    for (let i = 0; i < positions.length; i += 3) {
      // Create a subtle wave effect
      positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.003
      positions[i] += Math.cos(time + positions[i + 2] * 0.5) * 0.003
      
      // Add subtle mouse influence
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
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.rotation.y = time * 0.05
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function QuantumGrid() {
  const gridRef = useRef<THREE.LineSegments>(null)
  
  useEffect(() => {
    if (!gridRef.current) return
    
    const size = 20
    const divisions = 20
    const gridHelper = new THREE.GridHelper(size, divisions, 0x00ffff, 0x00ffff)
    
    // Copy grid helper geometry to our mesh
    gridRef.current.geometry = gridHelper.geometry
    
    // Position the grid below the camera
    gridRef.current.position.y = -5
    gridRef.current.position.z = -5
  }, [])
  
  useFrame(({ clock }) => {
    if (!gridRef.current) return
    
    const time = clock.getElapsedTime()
    
    // Pulse the grid
    gridRef.current.material.opacity = 0.1 + Math.sin(time) * 0.05
    
    // Rotate the grid slowly
    gridRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.1) * 0.1
    gridRef.current.rotation.z = Math.sin(time * 0.05) * 0.05
  })
  
  return (
    <lineSegments ref={gridRef}>
      <lineBasicMaterial 
        attach="material" 
        color={0x00ffff} 
        transparent 
        opacity={0.15} 
      />
    </lineSegments>
  )
}

function Scene() {
  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <ParticleField />
      <QuantumGrid />
      <ambientLight intensity={0.1} />
    </>
  )
}

export default function BackgroundScene() {
  return (
    <div className="three-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
"use client"

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'

export default function EarthModel({ scale = 1, speed = 0.05, ...props }) {
  const earthRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  
  // Load textures
  const [earthMap, earthBump, earthSpec, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ])
  
  useEffect(() => {
    if (earthRef.current) {
      // Apply holographic-like effect by adjusting materials
      const earth = earthRef.current.children[0] as THREE.Mesh
      if (earth && earth.material) {
        const material = earth.material as THREE.MeshStandardMaterial
        material.emissive = new THREE.Color(0x0a2d5a)
        material.emissiveIntensity = 0.1
        material.metalness = 0.3
        material.roughness = 0.7
      }
      
      // Add glow to cloud layer
      if (cloudsRef.current && cloudsRef.current.material) {
        const material = cloudsRef.current.material as THREE.MeshStandardMaterial
        material.transparent = true
        material.opacity = 0.8
        material.emissive = new THREE.Color(0x00ffff)
        material.emissiveIntensity = 0.05
      }
      
      // Make atmosphere glow
      if (atmosphereRef.current && atmosphereRef.current.material) {
        const material = atmosphereRef.current.material as THREE.MeshStandardMaterial
        material.transparent = true
        material.opacity = 0.15
        material.emissive = new THREE.Color(0x00ffff)
        material.emissiveIntensity = 0.3
        material.side = THREE.BackSide
      }
    }
  }, [])
  
  useFrame(({ clock }) => {
    if (earthRef.current) {
      // Rotate the earth
      earthRef.current.rotation.y += speed * 0.1
      
      // Rotate the clouds slightly faster
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += speed * 0.15
      }
      
      // Pulse the atmosphere
      if (atmosphereRef.current && atmosphereRef.current.material) {
        const material = atmosphereRef.current.material as THREE.MeshStandardMaterial
        const time = clock.getElapsedTime()
        material.opacity = 0.1 + Math.sin(time * 0.5) * 0.05
        material.emissiveIntensity = 0.2 + Math.sin(time * 0.5) * 0.1
      }
    }
  })
  
  return (
    <group ref={earthRef} scale={[scale, scale, scale]} {...props}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthMap}
          bumpMap={earthBump}
          bumpScale={0.05}
          specularMap={earthSpec}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef} scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere layer */}
      <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={0x00ffff}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
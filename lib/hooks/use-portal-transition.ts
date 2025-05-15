"use client"

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

export function usePortalTransition() {
  const router = useRouter()
  
  const createPortalTransition = useCallback((duration = 1.5) => {
    const portalElement = document.getElementById('portal-transition')
    if (!portalElement) return

    const timeline = gsap.timeline()

    timeline.to(portalElement, {
      opacity: 1,
      duration: duration / 2,
      ease: "power2.in",
    })

    return {
      timeline,
      complete: () => {
        gsap.to(portalElement, {
          opacity: 0,
          duration: duration / 2,
          ease: "power2.out",
          delay: 0.1,
        })
      }
    }
  }, [])

  const navigateWithPortal = useCallback((path: string) => {
    const portal = createPortalTransition()
    if (!portal) {
      router.push(path)
      return
    }

    portal.timeline.eventCallback('onComplete', () => {
      router.push(path)
      setTimeout(() => {
        portal.complete()
      }, 100)
    })
  }, [router, createPortalTransition])

  return {
    navigateWithPortal
  }
}
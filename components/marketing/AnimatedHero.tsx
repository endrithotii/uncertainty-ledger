"use client"

import { useEffect, useRef, useState } from "react"

interface MousePos { x: number; y: number }

const PARTICLES = [
  { x: 5, y: 15, w: 8, h: 3, r: -35, c: "#4285F4", f: "particle-f1", delay: "0s" },
  { x: 9, y: 72, w: 6, h: 2, r: 20, c: "#EA4335", f: "particle-f2", delay: "1s" },
  { x: 14, y: 45, w: 10, h: 3, r: -55, c: "#FBBC05", f: "particle-f3", delay: "2s" },
  { x: 20, y: 88, w: 7, h: 2, r: 40, c: "#34A853", f: "particle-f1", delay: "0.5s" },
  { x: 28, y: 28, w: 5, h: 2, r: -20, c: "#4285F4", f: "particle-f2", delay: "1.5s" },
  { x: 33, y: 62, w: 9, h: 3, r: 60, c: "#EA4335", f: "particle-f3", delay: "3s" },
  { x: 42, y: 10, w: 6, h: 2, r: -40, c: "#FBBC05", f: "particle-f1", delay: "0.8s" },
  { x: 50, y: 80, w: 8, h: 3, r: 30, c: "#4285F4", f: "particle-f2", delay: "2.2s" },
  { x: 58, y: 35, w: 5, h: 2, r: -15, c: "#34A853", f: "particle-f3", delay: "1.2s" },
  { x: 65, y: 92, w: 10, h: 3, r: 50, c: "#EA4335", f: "particle-f1", delay: "0.3s" },
  { x: 70, y: 18, w: 6, h: 2, r: -60, c: "#4285F4", f: "particle-f2", delay: "1.8s" },
  { x: 75, y: 55, w: 8, h: 3, r: 25, c: "#FBBC05", f: "particle-f3", delay: "2.8s" },
  { x: 80, y: 78, w: 5, h: 2, r: -30, c: "#34A853", f: "particle-f1", delay: "0.7s" },
  { x: 86, y: 42, w: 9, h: 3, r: 45, c: "#EA4335", f: "particle-f2", delay: "1.4s" },
  { x: 91, y: 22, w: 6, h: 2, r: -50, c: "#4285F4", f: "particle-f3", delay: "3.5s" },
  { x: 95, y: 68, w: 7, h: 3, r: 35, c: "#FBBC05", f: "particle-f1", delay: "0.9s" },
  { x: 3, y: 52, w: 5, h: 2, r: -25, c: "#34A853", f: "particle-f2", delay: "2.5s" },
  { x: 47, y: 50, w: 10, h: 3, r: 55, c: "#EA4335", f: "particle-f3", delay: "1.7s" },
  { x: 62, y: 5, w: 6, h: 2, r: -40, c: "#4285F4", f: "particle-f1", delay: "0.4s" },
  { x: 88, y: 95, w: 8, h: 3, r: 20, c: "#34A853", f: "particle-f2", delay: "2.1s" },
]

export function AnimatedHero({ children }: { children: React.ReactNode }) {
  const [mouse, setMouse] = useState<MousePos>({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener("mousemove", handler, { passive: true })
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  const bx = (mouse.x - 0.5) * 60
  const by = (mouse.y - 0.5) * 60

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Blue blob */}
        <div
          className="blob-1 absolute rounded-full opacity-20"
          style={{
            width: 600, height: 600,
            left: "-10%", top: "-20%",
            background: "radial-gradient(circle, #4285F4 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translate(${bx * 0.4}px, ${by * 0.4}px)`,
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Red blob */}
        <div
          className="blob-2 absolute rounded-full opacity-15"
          style={{
            width: 500, height: 500,
            right: "-5%", top: "10%",
            background: "radial-gradient(circle, #EA4335 0%, transparent 70%)",
            filter: "blur(80px)",
            transform: `translate(${-bx * 0.3}px, ${by * 0.3}px)`,
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Yellow blob */}
        <div
          className="blob-3 absolute rounded-full opacity-15"
          style={{
            width: 400, height: 400,
            left: "30%", bottom: "-10%",
            background: "radial-gradient(circle, #FBBC05 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: `translate(${bx * 0.2}px, ${-by * 0.2}px)`,
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
        {/* Green blob */}
        <div
          className="blob-4 absolute rounded-full opacity-10"
          style={{
            width: 350, height: 350,
            left: "60%", top: "40%",
            background: "radial-gradient(circle, #34A853 0%, transparent 70%)",
            filter: "blur(60px)",
            transform: `translate(${-bx * 0.25}px, ${-by * 0.25}px)`,
            transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className={`particle ${p.f}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.w,
              height: p.h,
              background: p.c,
              transform: `rotate(${p.r}deg)`,
              opacity: 0.65,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </section>
  )
}

"use client"

// Deterministic particles — same on every render, no hydration mismatch
const PARTICLES = [
  { x: 4, y: 12, w: 8, h: 3, r: -35, c: "#4285F4", o: 0.7 },
  { x: 8, y: 38, w: 6, h: 2, r: 20, c: "#EA4335", o: 0.6 },
  { x: 12, y: 68, w: 10, h: 3, r: -55, c: "#FBBC05", o: 0.7 },
  { x: 6, y: 82, w: 7, h: 2, r: 40, c: "#34A853", o: 0.6 },
  { x: 18, y: 22, w: 5, h: 2, r: -20, c: "#4285F4", o: 0.5 },
  { x: 22, y: 55, w: 9, h: 3, r: 60, c: "#EA4335", o: 0.65 },
  { x: 15, y: 90, w: 6, h: 2, r: -40, c: "#4285F4", o: 0.5 },
  { x: 28, y: 8, w: 8, h: 3, r: 30, c: "#FBBC05", o: 0.7 },
  { x: 35, y: 78, w: 5, h: 2, r: -15, c: "#34A853", o: 0.6 },
  { x: 42, y: 92, w: 10, h: 3, r: 50, c: "#EA4335", o: 0.65 },
  { x: 48, y: 5, w: 6, h: 2, r: -60, c: "#4285F4", o: 0.55 },
  { x: 55, y: 15, w: 8, h: 3, r: 25, c: "#34A853", o: 0.7 },
  { x: 58, y: 85, w: 5, h: 2, r: -30, c: "#FBBC05", o: 0.6 },
  { x: 63, y: 40, w: 9, h: 3, r: 45, c: "#EA4335", o: 0.5 },
  { x: 68, y: 70, w: 6, h: 2, r: -50, c: "#4285F4", o: 0.65 },
  { x: 72, y: 20, w: 7, h: 3, r: 35, c: "#34A853", o: 0.7 },
  { x: 76, y: 95, w: 5, h: 2, r: -25, c: "#FBBC05", o: 0.55 },
  { x: 80, y: 50, w: 10, h: 3, r: 55, c: "#EA4335", o: 0.6 },
  { x: 85, y: 30, w: 6, h: 2, r: -40, c: "#4285F4", o: 0.7 },
  { x: 88, y: 75, w: 8, h: 3, r: 20, c: "#34A853", o: 0.65 },
  { x: 92, y: 10, w: 5, h: 2, r: -55, c: "#FBBC05", o: 0.6 },
  { x: 95, y: 60, w: 9, h: 3, r: 40, c: "#EA4335", o: 0.55 },
  { x: 97, y: 88, w: 6, h: 2, r: -20, c: "#4285F4", o: 0.7 },
  { x: 3, y: 50, w: 7, h: 3, r: 30, c: "#34A853", o: 0.6 },
  { x: 25, y: 35, w: 5, h: 2, r: -45, c: "#EA4335", o: 0.65 },
  { x: 45, y: 60, w: 8, h: 3, r: 60, c: "#FBBC05", o: 0.5 },
  { x: 70, y: 45, w: 6, h: 2, r: -30, c: "#4285F4", o: 0.7 },
  { x: 90, y: 25, w: 7, h: 3, r: 15, c: "#34A853", o: 0.6 },
  { x: 33, y: 18, w: 5, h: 2, r: -65, c: "#EA4335", o: 0.55 },
  { x: 52, y: 72, w: 9, h: 3, r: 50, c: "#4285F4", o: 0.65 },
]

export function ParticleBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.w}px`,
            height: `${p.h}px`,
            background: p.c,
            transform: `rotate(${p.r}deg)`,
            opacity: p.o,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  )
}

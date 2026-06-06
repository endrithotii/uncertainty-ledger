"use client"

import { cn } from "@/lib/utils"

interface RiskMeterProps {
  score: number
  size?: "sm" | "lg"
}

function getRiskLevel(score: number) {
  if (score <= 20) return { label: "Healthy", color: "text-green-600", ring: "stroke-green-500", bg: "bg-green-50" }
  if (score <= 40) return { label: "Moderate", color: "text-yellow-600", ring: "stroke-yellow-500", bg: "bg-yellow-50" }
  if (score <= 60) return { label: "Elevated", color: "text-orange-600", ring: "stroke-orange-500", bg: "bg-orange-50" }
  if (score <= 80) return { label: "High", color: "text-red-600", ring: "stroke-red-500", bg: "bg-red-50" }
  return { label: "Critical", color: "text-red-800", ring: "stroke-red-700", bg: "bg-red-100" }
}

export function RiskMeter({ score, size = "lg" }: RiskMeterProps) {
  const { label, color, ring, bg } = getRiskLevel(score)

  const radius = size === "lg" ? 54 : 36
  const strokeWidth = size === "lg" ? 8 : 6
  const circumference = 2 * Math.PI * radius
  // We use 75% of the circle (270 degrees) as the arc
  const arcLength = circumference * 0.75
  const offset = circumference * 0.25 / 2 // start offset so arc is centered at bottom
  const filled = arcLength * (score / 100)

  const svgSize = (radius + strokeWidth) * 2 + 4
  const center = svgSize / 2

  return (
    <div className={cn("flex flex-col items-center gap-2", size === "sm" && "gap-1")}>
      <div className={cn("relative rounded-full flex items-center justify-center", bg, size === "lg" ? "p-2" : "p-1")}>
        <svg
          width={svgSize}
          height={svgSize}
          className="-rotate-[135deg]"
          aria-label={`Risk score: ${score}/100 — ${label}`}
        >
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-slate-200"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
          {/* Fill */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={ring}
            strokeDasharray={`${filled} ${circumference}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={cn("font-bold tabular-nums", color, size === "lg" ? "text-3xl" : "text-xl")}>
            {score}
          </span>
          <span className="text-xs text-slate-400 -mt-1">/ 100</span>
        </div>
      </div>
      <span className={cn("font-semibold", color, size === "lg" ? "text-sm" : "text-xs")}>
        {label} Risk
      </span>
    </div>
  )
}

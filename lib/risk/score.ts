import type { Unknown, RiskResult, ClusterInfo, Area, Criticality } from "@/lib/types"

const CRITICALITY_WEIGHT: Record<Criticality, number> = {
  critical: 20,
  high: 10,
  medium: 5,
  low: 2,
}

const CRITICALITY_SCORE: Record<Criticality, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export function computeRiskScore(
  unknowns: Unknown[],
  targetDate: string | null,
  recentlyCreated: number, // unknowns created in last 7 days
  recentlyResolved: number  // unknowns resolved in last 7 days
): RiskResult {
  const active = unknowns.filter(u => u.status === "open" || u.status === "investigating")

  // Base score: sum of active unknowns weighted by criticality
  const base_score = active.reduce((sum, u) => sum + CRITICALITY_WEIGHT[u.criticality], 0)

  // Cluster analysis: group active unknowns by area
  const byArea = new Map<Area, Unknown[]>()
  for (const u of active) {
    const list = byArea.get(u.area) ?? []
    list.push(u)
    byArea.set(u.area, list)
  }

  const clusters: ClusterInfo[] = []
  let cluster_penalty = 0

  for (const [area, items] of byArea.entries()) {
    const avg_criticality_score =
      items.reduce((sum, u) => sum + CRITICALITY_SCORE[u.criticality], 0) / items.length
    const is_flagged = items.length >= 3 && avg_criticality_score >= 3
    if (is_flagged) cluster_penalty += 15
    clusters.push({ area, open_count: items.length, avg_criticality_score, is_flagged })
  }

  clusters.sort((a, b) => b.open_count * b.avg_criticality_score - a.open_count * a.avg_criticality_score)

  // Trajectory: net new unknowns over last 7 days
  const net_7d = recentlyCreated - recentlyResolved
  const trajectory_multiplier = net_7d > 0 ? 1.3 : 1.0

  // Time pressure
  let time_pressure_multiplier = 1.0
  let days_to_deadline: number | null = null
  if (targetDate) {
    const msPerDay = 1000 * 60 * 60 * 24
    days_to_deadline = Math.ceil((new Date(targetDate).getTime() - Date.now()) / msPerDay)
    if (days_to_deadline > 0 && days_to_deadline <= 30 && base_score > 40) {
      time_pressure_multiplier = 1.2
    }
  }

  const score = Math.min(
    100,
    Math.round(base_score * trajectory_multiplier * time_pressure_multiplier + cluster_penalty)
  )

  return {
    score,
    base_score,
    cluster_penalty,
    trajectory_multiplier,
    time_pressure_multiplier,
    clusters,
    net_7d,
    days_to_deadline,
  }
}

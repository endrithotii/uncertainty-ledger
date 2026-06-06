import type { RiskResult, RiskTranslation } from "@/lib/types"

const AREA_LABELS: Record<string, string> = {
  technical: "technical",
  integration: "integration",
  business: "business logic",
  data: "data",
  external: "external dependency",
  people: "team/stakeholder",
  other: "general",
}

function headline(score: number): string {
  if (score <= 20) {
    return "This project has a healthy epistemic profile. The team is working with well-understood requirements and few unresolved questions."
  }
  if (score <= 40) {
    return "Moderate uncertainty. Open questions exist but are being tracked. The project is moving in the right direction."
  }
  if (score <= 60) {
    return "Elevated risk. Multiple unresolved assumptions in critical areas. A focused resolution sprint is recommended before proceeding."
  }
  if (score <= 80) {
    return "High epistemic debt. This uncertainty profile historically precedes timeline or scope changes. Immediate attention is required."
  }
  return "Critical uncertainty. This project matches patterns that precede significant delays or failures. Executive review is recommended."
}

export function translateRisk(result: RiskResult): RiskTranslation {
  const callouts: string[] = []

  // Top cluster callout
  const flagged = result.clusters.filter(c => c.is_flagged)
  if (flagged.length > 0) {
    const top = flagged[0]
    callouts.push(
      `${top.open_count} unresolved unknowns in the ${AREA_LABELS[top.area]} area — this is the highest-risk concentration.`
    )
  } else if (result.clusters.length > 0) {
    const top = result.clusters[0]
    if (top.open_count >= 2) {
      callouts.push(
        `The ${AREA_LABELS[top.area]} area has the most open questions (${top.open_count}) — worth watching.`
      )
    }
  }

  // Trajectory callout
  if (result.net_7d > 0) {
    callouts.push(
      `The team is accumulating unknowns faster than resolving them (net +${result.net_7d} this week). This trend, if sustained, will drive risk significantly higher.`
    )
  } else if (result.net_7d < 0) {
    callouts.push(
      `Good trajectory: the team resolved ${Math.abs(result.net_7d)} more unknowns than it added this week.`
    )
  }

  // Time pressure callout
  if (
    result.days_to_deadline !== null &&
    result.days_to_deadline > 0 &&
    result.days_to_deadline <= 30 &&
    result.score > 40
  ) {
    callouts.push(
      `With ${result.days_to_deadline} days to the target date and elevated uncertainty, the window to resolve critical unknowns is closing.`
    )
  }

  // No issues — positive callout
  if (callouts.length === 0 && result.score <= 20) {
    callouts.push("No concentration of unknowns in any single area. Uncertainty is well-distributed and low.")
  }

  return { headline: headline(result.score), callouts }
}

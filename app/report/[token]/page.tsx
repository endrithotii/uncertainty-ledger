import { notFound } from "next/navigation"
import { createServiceClient } from "@/lib/supabase/server"
import { computeRiskScore } from "@/lib/risk/score"
import { translateRisk } from "@/lib/risk/translate"
import { RiskMeter } from "@/components/dashboard/RiskMeter"
import { RiskSummary } from "@/components/dashboard/RiskSummary"
import { TrajectoryChart } from "@/components/dashboard/TrajectoryChart"
import { ClusterHeatmap } from "@/components/dashboard/ClusterHeatmap"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Unknown, Area, Criticality, ProjectSnapshot } from "@/lib/types"
import { Clock, Lock } from "lucide-react"

const AREA_LABEL: Record<Area, string> = {
  technical: "Technical", integration: "Integration", business: "Business",
  data: "Data", external: "External", people: "People", other: "Other",
}
const STATUS_VARIANT = { open: "open", investigating: "investigating", resolved: "resolved", invalidated: "invalidated" } as const
const CRIT_VARIANT = { low: "secondary", medium: "moderate", high: "elevated", critical: "critical" } as const

export default async function PublicReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const supabase = await createServiceClient()

  const { data: reportToken } = await supabase
    .from("report_tokens")
    .select("project_id, expires_at")
    .eq("token", token)
    .single()

  if (!reportToken) notFound()

  if (reportToken.expires_at && new Date(reportToken.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
          <Lock className="h-8 w-8 text-slate-400 mx-auto" />
          <p className="font-medium text-slate-700">This report link has expired.</p>
        </div>
      </div>
    )
  }

  const [{ data: project }, { data: unknowns }, { data: snapshots }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", reportToken.project_id).single(),
    supabase.from("unknowns").select("*").eq("project_id", reportToken.project_id).order("created_at", { ascending: false }),
    supabase.from("project_snapshots").select("*").eq("project_id", reportToken.project_id).order("date", { ascending: true }).limit(30),
  ])

  if (!project) notFound()

  const proj = project as import("@/lib/types").Project
  const all = (unknowns ?? []) as Unknown[]
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const riskResult = computeRiskScore(
    all,
    proj.target_date,
    all.filter(u => u.created_at >= sevenDaysAgo).length,
    all.filter(u => u.resolved_at && u.resolved_at >= sevenDaysAgo).length
  )
  const translation = translateRisk(riskResult)
  const active = all.filter(u => u.status === "open" || u.status === "investigating")

  const counts: Record<Area, Record<Criticality, number>> = {
    technical: { low: 0, medium: 0, high: 0, critical: 0 },
    integration: { low: 0, medium: 0, high: 0, critical: 0 },
    business: { low: 0, medium: 0, high: 0, critical: 0 },
    data: { low: 0, medium: 0, high: 0, critical: 0 },
    external: { low: 0, medium: 0, high: 0, critical: 0 },
    people: { low: 0, medium: 0, high: 0, critical: 0 },
    other: { low: 0, medium: 0, high: 0, critical: 0 },
  }
  for (const u of active) {
    counts[u.area as Area][u.criticality as Criticality]++
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-6 print:border-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Uncertainty Report</p>
              <h1 className="text-2xl font-bold text-slate-900">{proj.name}</h1>
              {proj.target_date && (
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Target: {new Date(proj.target_date).toLocaleDateString("en-US", { dateStyle: "long" })}
                </p>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Generated {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Risk + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="flex items-center justify-center py-8">
            <RiskMeter score={riskResult.score} size="lg" />
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskSummary translation={translation} score={riskResult.score} />
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Open", count: all.filter((u: Unknown) => u.status === "open").length, color: "text-blue-600" },
            { label: "Investigating", count: all.filter((u: Unknown) => u.status === "investigating").length, color: "text-purple-600" },
            { label: "Resolved", count: all.filter((u: Unknown) => u.status === "resolved").length, color: "text-green-600" },
            { label: "Total logged", count: all.length, color: "text-slate-700" },
          ].map(stat => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className={`text-2xl font-bold tabular-nums ${stat.color}`}>{stat.count}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trajectory + Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">30-Day Trajectory</CardTitle></CardHeader>
            <CardContent>
              <TrajectoryChart snapshots={(snapshots ?? []) as ProjectSnapshot[]} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Cluster Heatmap</CardTitle></CardHeader>
            <CardContent>
              <ClusterHeatmap clusters={riskResult.clusters} counts={counts} />
            </CardContent>
          </Card>
        </div>

        {/* Open unknowns table */}
        {active.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-sm">Open Unknowns ({active.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {active.map((u: Unknown) => (
                  <div key={u.id} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{u.title}</p>
                      {u.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{u.description}</p>}
                      <p className="text-xs text-slate-400 mt-0.5">{AREA_LABEL[u.area as Area]}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Badge variant={STATUS_VARIANT[u.status as keyof typeof STATUS_VARIANT]}>{u.status}</Badge>
                      <Badge variant={CRIT_VARIANT[u.criticality as Criticality] as any}>{u.criticality}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-slate-400 pt-4">
          Powered by Uncertainty Ledger — track epistemic debt, make invisible risk visible.
        </p>
      </main>
    </div>
  )
}

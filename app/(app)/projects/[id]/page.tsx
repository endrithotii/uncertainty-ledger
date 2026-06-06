import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { computeRiskScore } from "@/lib/risk/score"
import { translateRisk } from "@/lib/risk/translate"
import { RiskMeter } from "@/components/dashboard/RiskMeter"
import { RiskSummary } from "@/components/dashboard/RiskSummary"
import { TrajectoryChart } from "@/components/dashboard/TrajectoryChart"
import { ClusterHeatmap } from "@/components/dashboard/ClusterHeatmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Unknown, Area, Criticality, ProjectSnapshot } from "@/lib/types"
import { Plus, ArrowLeft, Share2, Clock } from "lucide-react"

const STATUS_VARIANT = {
  open: "open",
  investigating: "investigating",
  resolved: "resolved",
  invalidated: "invalidated",
} as const

const AREA_LABEL: Record<Area, string> = {
  technical: "Technical",
  integration: "Integration",
  business: "Business",
  data: "Data",
  external: "External",
  people: "People",
  other: "Other",
}

const CRIT_VARIANT = {
  low: "secondary",
  medium: "moderate",
  high: "elevated",
  critical: "critical",
} as const

export default async function ProjectDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()

  if (!project) notFound()

  const [{ data: unknowns }, { data: snapshots }] = await Promise.all([
    supabase.from("unknowns").select("*").eq("project_id", id).order("created_at", { ascending: false }),
    supabase
      .from("project_snapshots")
      .select("*")
      .eq("project_id", id)
      .order("date", { ascending: true })
      .limit(30),
  ])

  const all = (unknowns ?? []) as Unknown[]
  const proj = project as import("@/lib/types").Project
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const recentlyCreated = all.filter(u => u.created_at >= sevenDaysAgo).length
  const recentlyResolved = all.filter(u => u.resolved_at && u.resolved_at >= sevenDaysAgo).length

  const riskResult = computeRiskScore(all, proj.target_date, recentlyCreated, recentlyResolved)
  const translation = translateRisk(riskResult)

  const active = all.filter(u => u.status === "open" || u.status === "investigating")
  const topUnknowns = active.slice(0, 5)

  // Build counts for heatmap
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
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">{proj.name}</h1>
              {proj.target_date && (
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Target: {new Date(proj.target_date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/projects/${id}/report`}>
                <Share2 className="h-4 w-4" />
                Share report
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/projects/${id}/unknowns/new`}>
                <Plus className="h-4 w-4" />
                Add unknown
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Top row: Risk meter + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="flex items-center justify-center py-8">
            <RiskMeter score={riskResult.score} size="lg" />
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskSummary translation={translation} score={riskResult.score} />
            </CardContent>
          </Card>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Open", count: all.filter((u: Unknown) => u.status === "open").length, color: "text-blue-600" },
            { label: "Investigating", count: all.filter((u: Unknown) => u.status === "investigating").length, color: "text-purple-600" },
            { label: "Resolved", count: all.filter((u: Unknown) => u.status === "resolved").length, color: "text-green-600" },
            { label: "Net this week", count: `${riskResult.net_7d > 0 ? "+" : ""}${riskResult.net_7d}`, color: riskResult.net_7d > 0 ? "text-red-600" : "text-green-600" },
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
            <CardHeader>
              <CardTitle className="text-sm">30-Day Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              <TrajectoryChart snapshots={(snapshots ?? []) as ProjectSnapshot[]} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cluster Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ClusterHeatmap clusters={riskResult.clusters} counts={counts} />
            </CardContent>
          </Card>
        </div>

        {/* Top open unknowns */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Open Unknowns</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/projects/${id}/unknowns`}>View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {topUnknowns.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No open unknowns — this project has a clean epistemic state.</p>
            ) : (
              <div className="space-y-3">
                {topUnknowns.map((u: Unknown) => (
                  <Link key={u.id} href={`/projects/${id}/unknowns/${u.id}`}>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{u.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{AREA_LABEL[u.area as Area]}</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <Badge variant={STATUS_VARIANT[u.status as keyof typeof STATUS_VARIANT]}>
                          {u.status}
                        </Badge>
                        <Badge variant={CRIT_VARIANT[u.criticality as Criticality] as any}>
                          {u.criticality}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

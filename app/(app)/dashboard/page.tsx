import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskMeter } from "@/components/dashboard/RiskMeter"
import { computeRiskScore } from "@/lib/risk/score"
import type { Unknown } from "@/lib/types"
import { Plus, FolderOpen } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Get org membership
  const { data: memberships } = await supabase
    .from("organization_members")
    .select("org_id")
    .eq("user_id", user.id)
    .limit(1)

  const membership = memberships?.[0] ?? null
  if (!membership) redirect("/onboarding")

  // Get org details separately (avoids join type issues before supabase gen types)
  const { data: org } = await supabase
    .from("organizations")
    .select("id, name, slug")
    .eq("id", membership.org_id)
    .single()

  if (!org) redirect("/onboarding")

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("org_id", org.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })

  const projectsWithRisk = await Promise.all(
    (projects ?? []).map(async project => {
      const { data: unknowns } = await supabase
        .from("unknowns")
        .select("*")
        .eq("project_id", project.id)

      const all = (unknowns ?? []) as Unknown[]
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const recentlyCreated = all.filter(u => u.created_at >= sevenDaysAgo).length
      const recentlyResolved = all.filter(u => u.resolved_at && u.resolved_at >= sevenDaysAgo).length

      const risk = computeRiskScore(all, project.target_date, recentlyCreated, recentlyResolved)
      return { ...project, risk, unknowns: all }
    })
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">{org.name}</h1>
          <p className="text-xs text-slate-500">Uncertainty Ledger</p>
        </div>
        <Button asChild size="sm">
          <Link href="/projects/new">
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Active Projects</h2>
          <p className="text-sm text-slate-500 mt-1">Risk scores reflect current epistemic debt — unknowns weighted by criticality and trajectory.</p>
        </div>

        {projectsWithRisk.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-16">
              <FolderOpen className="h-10 w-10 text-slate-300" />
              <div className="text-center">
                <p className="font-medium text-slate-700">No active projects</p>
                <p className="text-sm text-slate-500 mt-1">Create your first project to start tracking uncertainty.</p>
              </div>
              <Button asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4" />
                  Create project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectsWithRisk.map(project => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{project.name}</CardTitle>
                        {project.target_date && (
                          <CardDescription className="mt-1">
                            Due {new Date(project.target_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </CardDescription>
                        )}
                      </div>
                      <RiskMeter score={project.risk.score} size="sm" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>
                        <span className="font-medium text-slate-700">
                          {project.unknowns.filter(u => u.status === "open" || u.status === "investigating").length}
                        </span>{" "}open
                      </span>
                      <span>
                        <span className="font-medium text-slate-700">
                          {project.unknowns.filter(u => u.status === "resolved").length}
                        </span>{" "}resolved
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

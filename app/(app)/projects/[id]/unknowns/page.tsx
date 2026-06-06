import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Unknown, Area, Criticality } from "@/lib/types"
import { Plus, ArrowLeft } from "lucide-react"

const AREA_LABEL: Record<Area, string> = {
  technical: "Technical", integration: "Integration", business: "Business",
  data: "Data", external: "External", people: "People", other: "Other",
}

const STATUS_VARIANT = { open: "open", investigating: "investigating", resolved: "resolved", invalidated: "invalidated" } as const
const CRIT_VARIANT = { low: "secondary", medium: "moderate", high: "elevated", critical: "critical" } as const

export default async function UnknownListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single()
  if (!project) notFound()

  const proj = project as { id: string; name: string }

  const { data: unknowns } = await supabase
    .from("unknowns")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false })

  const all = (unknowns ?? []) as import("@/lib/types").Unknown[]

  const groups = {
    open: all.filter((u: Unknown) => u.status === "open"),
    investigating: all.filter((u: Unknown) => u.status === "investigating"),
    resolved: all.filter((u: Unknown) => u.status === "resolved"),
    invalidated: all.filter((u: Unknown) => u.status === "invalidated"),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/projects/${id}`} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-lg font-semibold text-slate-900">{proj.name} — Unknowns</h1>
          </div>
          <Button size="sm" asChild>
            <Link href={`/projects/${id}/unknowns/new`}>
              <Plus className="h-4 w-4" />
              Add unknown
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {(["open", "investigating", "resolved", "invalidated"] as const).map(status => (
          <section key={status}>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3 capitalize">
              {status} ({groups[status].length})
            </h2>
            {groups[status].length === 0 ? (
              <p className="text-sm text-slate-400 pl-1">None</p>
            ) : (
              <div className="space-y-2">
                {groups[status].map((u: Unknown) => (
                  <Link key={u.id} href={`/projects/${id}/unknowns/${u.id}`}>
                    <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="flex items-start gap-3 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800">{u.title}</p>
                          {u.description && (
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{u.description}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">{AREA_LABEL[u.area as Area]}</p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <Badge variant={STATUS_VARIANT[u.status as keyof typeof STATUS_VARIANT]}>
                            {u.status}
                          </Badge>
                          <Badge variant={CRIT_VARIANT[u.criticality as Criticality] as any}>
                            {u.criticality}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  )
}

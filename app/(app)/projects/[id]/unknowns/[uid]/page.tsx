import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusUpdater } from "@/components/unknowns/StatusUpdater"
import type { Unknown, UnknownUpdate, Area, Criticality, UnknownStatus } from "@/lib/types"
import { ArrowLeft } from "lucide-react"

const AREA_LABEL: Record<Area, string> = {
  technical: "Technical", integration: "Integration", business: "Business",
  data: "Data", external: "External", people: "People", other: "Other",
}

const STATUS_VARIANT = { open: "open", investigating: "investigating", resolved: "resolved", invalidated: "invalidated" } as const
const CRIT_VARIANT = { low: "secondary", medium: "moderate", high: "elevated", critical: "critical" } as const

export default async function UnknownDetailPage({
  params,
}: {
  params: Promise<{ id: string; uid: string }>
}) {
  const { id, uid } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const [{ data: unknown }, { data: updates }, { data: project }] = await Promise.all([
    supabase.from("unknowns").select("*").eq("id", uid).single(),
    supabase.from("unknown_updates").select("*").eq("unknown_id", uid).order("created_at", { ascending: true }),
    supabase.from("projects").select("id, name").eq("id", id).single(),
  ])

  if (!unknown || !project) notFound()

  const u = unknown as import("@/lib/types").Unknown
  const p = project as { id: string; name: string }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href={`/projects/${id}/unknowns`} className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">{u.title}</h1>
            <p className="text-xs text-slate-500">{p.name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Meta */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={STATUS_VARIANT[u.status]}>{u.status}</Badge>
              <Badge variant={CRIT_VARIANT[u.criticality] as any}>{u.criticality}</Badge>
              <Badge variant="outline">{AREA_LABEL[u.area]}</Badge>
            </div>
            {u.description && (
              <p className="text-sm text-slate-700 leading-relaxed">{u.description}</p>
            )}
            <p className="text-xs text-slate-400">
              Logged {new Date(u.created_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
              {u.resolved_at && ` · Resolved ${new Date(u.resolved_at).toLocaleDateString("en-US", { dateStyle: "medium" })}`}
            </p>
          </CardContent>
        </Card>

        {/* Status updater */}
        <StatusUpdater
          unknownId={uid}
          projectId={id}
          currentStatus={u.status}
          userId={user.id}
        />

        {/* History timeline */}
        {(updates ?? []).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(updates as UnknownUpdate[]).map((update, i) => (
                  <div key={update.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-slate-300 mt-1 flex-shrink-0" />
                      {i < (updates ?? []).length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 mt-1" />
                      )}
                    </div>
                    <div className="pb-4 min-w-0 flex-1">
                      <p className="text-xs text-slate-400">
                        {new Date(update.created_at).toLocaleDateString("en-US", { dateStyle: "medium" })}
                      </p>
                      <p className="text-sm text-slate-700 mt-0.5">
                        Status changed to{" "}
                        <span className="font-medium">{update.new_status}</span>
                        {update.old_status && <span className="text-slate-400"> from {update.old_status}</span>}
                      </p>
                      {update.note && (
                        <p className="text-sm text-slate-600 mt-1 italic">&ldquo;{update.note}&rdquo;</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

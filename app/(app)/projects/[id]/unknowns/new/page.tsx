import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { UnknownForm } from "@/components/unknowns/UnknownForm"
import { ArrowLeft } from "lucide-react"

export default async function NewUnknownPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: project } = await supabase.from("projects").select("id, name, org_id").eq("id", id).single()
  if (!project) notFound()

  const proj = project as { id: string; name: string; org_id: string }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href={`/projects/${id}`} className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">Log an unknown</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">
        <UnknownForm projectId={id} orgId={proj.org_id} userId={user.id} />
      </main>
    </div>
  )
}

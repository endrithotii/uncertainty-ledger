import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { NewProjectForm } from "@/components/projects/NewProjectForm"
import { ArrowLeft } from "lucide-react"

export default async function NewProjectPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: membership } = await supabase
    .from("organization_members")
    .select("org_id")
    .eq("user_id", user.id)
    .limit(1)
    .single()

  if (!membership) redirect("/onboarding")

  const mem = membership as { org_id: string }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">New project</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">
        <NewProjectForm orgId={mem.org_id} userId={user.id} />
      </main>
    </div>
  )
}

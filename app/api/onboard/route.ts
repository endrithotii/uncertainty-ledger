import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const { orgName } = await request.json()

  if (!orgName?.trim()) {
    return NextResponse.json({ error: "Workspace name is required" }, { status: 400 })
  }

  // Get current user from regular client (respects session)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  // Check if user already has an org
  const { data: existing } = await supabase
    .from("organization_members")
    .select("org_id")
    .eq("user_id", user.id)
    .limit(1)
    .single()

  if (existing) {
    return NextResponse.json({ success: true, already_exists: true })
  }

  // Use service client to bypass RLS for org creation
  const service = createServiceClient()

  const slug = orgName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
    + "-" + user.id.slice(0, 8)

  const { data: org, error: orgErr } = await service
    .from("organizations")
    .insert({ name: orgName.trim(), slug })
    .select("id")
    .single()

  if (orgErr || !org) {
    return NextResponse.json({ error: orgErr?.message ?? "Failed to create workspace" }, { status: 500 })
  }

  const { error: memberErr } = await service
    .from("organization_members")
    .insert({ org_id: org.id, user_id: user.id, role: "owner" })

  if (memberErr) {
    return NextResponse.json({ error: memberErr.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

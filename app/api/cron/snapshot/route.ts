import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { computeRiskScore } from "@/lib/risk/score"
import type { Unknown } from "@/lib/types"

export async function GET(request: Request) {
  // Verify Vercel cron secret
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServiceClient()
  const today = new Date().toISOString().split("T")[0]

  const { data: projects } = await supabase
    .from("projects")
    .select("id, target_date")
    .eq("status", "active")

  if (!projects?.length) return NextResponse.json({ snapshotted: 0 })

  let snapshotted = 0
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  for (const proj of projects) {
    const { data: unknowns } = await supabase
      .from("unknowns")
      .select("*")
      .eq("project_id", proj.id)

    const all = (unknowns ?? []) as Unknown[]
    const recentlyCreated = all.filter(u => u.created_at >= sevenDaysAgo).length
    const recentlyResolved = all.filter(u => u.resolved_at && u.resolved_at >= sevenDaysAgo).length
    const risk = computeRiskScore(all, proj.target_date ?? null, recentlyCreated, recentlyResolved)

    await supabase.from("project_snapshots").upsert({
      project_id: proj.id,
      date: today,
      open_count: all.filter(u => u.status === "open").length,
      investigating_count: all.filter(u => u.status === "investigating").length,
      resolved_count: all.filter(u => u.status === "resolved").length,
      invalidated_count: all.filter(u => u.status === "invalidated").length,
      risk_score: risk.score,
    }, { onConflict: "project_id,date" })

    snapshotted++
  }

  return NextResponse.json({ snapshotted, date: today })
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UnknownStatus } from "@/lib/types"

const STATUSES: { value: UnknownStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "investigating", label: "Investigating" },
  { value: "resolved", label: "Resolved" },
  { value: "invalidated", label: "Invalidated (was never a real unknown)" },
]

interface Props {
  unknownId: string
  projectId: string
  currentStatus: UnknownStatus
  userId: string
}

export function StatusUpdater({ unknownId, projectId, currentStatus, userId }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<UnknownStatus>(currentStatus)
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changed = status !== currentStatus

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!changed) return
    setLoading(true)
    setError(null)

    const supabase = createClient()

    const updates: { status: string; resolved_at?: string | null } = { status }
    if (status === "resolved") updates.resolved_at = new Date().toISOString()
    if (status === "open" || status === "investigating") updates.resolved_at = null

    const [{ error: updateErr }, { error: historyErr }] = await Promise.all([
      supabase.from("unknowns").update(updates).eq("id", unknownId),
      supabase.from("unknown_updates").insert({
        unknown_id: unknownId,
        user_id: userId,
        old_status: currentStatus,
        new_status: status,
        note: note.trim() || null,
      }),
    ])

    if (updateErr || historyErr) {
      setError(updateErr?.message ?? historyErr?.message ?? "Failed to update")
      setLoading(false)
      return
    }

    router.push(`/projects/${projectId}/unknowns/${unknownId}`)
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Update status</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={v => setStatus(v as UnknownStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {changed && (
            <div className="space-y-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                placeholder="What changed? How was this resolved?"
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={2}
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={!changed || loading} size="sm">
            {loading ? "Saving…" : "Save status"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

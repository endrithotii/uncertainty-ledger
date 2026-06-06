"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  orgId: string
  userId: string
}

export function NewProjectForm({ orgId, userId }: Props) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error } = await supabase
      .from("projects")
      .insert({
        org_id: orgId,
        name: name.trim(),
        description: description.trim() || null,
        target_date: targetDate || null,
        created_by: userId,
      })
      .select("id")
      .single()

    if (error || !data) {
      setError(error?.message ?? "Failed to create project")
      setLoading(false)
      return
    }

    router.push(`/projects/${data.id}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border border-slate-200 p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>
        <Input
          id="name"
          placeholder="e.g. Payment Gateway Integration"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="What is this project trying to achieve?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="targetDate">Target date (optional)</Label>
        <Input
          id="targetDate"
          type="date"
          value={targetDate}
          onChange={e => setTargetDate(e.target.value)}
        />
        <p className="text-xs text-slate-400">Used to compute time-pressure risk multiplier.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create project"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

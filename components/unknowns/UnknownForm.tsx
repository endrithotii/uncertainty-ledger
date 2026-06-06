"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Area, Criticality } from "@/lib/types"

const AREAS: { value: Area; label: string; description: string }[] = [
  { value: "technical", label: "Technical", description: "Architecture, code, performance, security" },
  { value: "integration", label: "Integration", description: "External APIs, third-party services, system connections" },
  { value: "business", label: "Business", description: "Requirements, rules, policies, edge cases" },
  { value: "data", label: "Data", description: "Volume, schema, quality, migration" },
  { value: "external", label: "External", description: "Vendors, compliance, market, legal" },
  { value: "people", label: "People", description: "Stakeholders, team capacity, expertise" },
  { value: "other", label: "Other", description: "Doesn't fit elsewhere" },
]

const CRITICALITIES: { value: Criticality; label: string; description: string }[] = [
  { value: "critical", label: "Critical", description: "Blocks delivery if unresolved" },
  { value: "high", label: "High", description: "Significant impact on scope or timeline" },
  { value: "medium", label: "Medium", description: "Notable risk, manageable" },
  { value: "low", label: "Low", description: "Good to know, low impact" },
]

interface Props {
  projectId: string
  orgId: string
  userId: string
}

export function UnknownForm({ projectId, orgId, userId }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [area, setArea] = useState<Area>("technical")
  const [criticality, setCriticality] = useState<Criticality>("medium")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.from("unknowns").insert({
      project_id: projectId,
      org_id: orgId,
      title: title.trim(),
      description: description.trim() || null,
      area,
      criticality,
      status: "open",
      created_by: userId,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(`/projects/${projectId}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border border-slate-200 p-6">
      <div className="space-y-2">
        <Label htmlFor="title">What don&apos;t you know?</Label>
        <Input
          id="title"
          placeholder="e.g. Whether the payment provider API supports batch operations"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <p className="text-xs text-slate-400">State it as a question or an unvalidated assumption.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">More context (optional)</Label>
        <Textarea
          id="description"
          placeholder="What do you know so far? What happens if this stays unresolved?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Area</Label>
          <Select value={area} onValueChange={v => setArea(v as Area)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AREAS.map(a => (
                <SelectItem key={a.value} value={a.value}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-400">
            {AREAS.find(a => a.value === area)?.description}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Criticality</Label>
          <Select value={criticality} onValueChange={v => setCriticality(v as Criticality)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CRITICALITIES.map(c => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-400">
            {CRITICALITIES.find(c => c.value === criticality)?.description}
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Logging…" : "Log unknown"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

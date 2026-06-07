"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OnboardingPage() {
  const router = useRouter()
  const [orgName, setOrgName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch("/api/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgName }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? "Something went wrong")
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Create your workspace</h1>
          <p className="text-sm text-slate-500">You&apos;re almost in. Give your workspace a name.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Workspace name</Label>
            <Input
              id="orgName"
              placeholder="e.g. Acme Engineering"
              value={orgName}
              onChange={e => setOrgName(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !orgName.trim()}>
            {loading ? "Creating…" : "Create workspace"}
          </Button>
        </form>
      </div>
    </div>
  )
}

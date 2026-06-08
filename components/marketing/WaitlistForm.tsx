"use client"

import { useState } from "react"

export function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? "Something went wrong")
      setLoading(false)
      return
    }
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className={`flex items-center gap-4 border px-6 py-4 ${dark ? "border-[#1e3a2f] bg-[#0a1f16]" : "border-[#c6f0d8] bg-[#f0fdf4]"}`}>
        <div className="w-2 h-2 rounded-full bg-[#00d97e] flex-shrink-0" />
        <div>
          <p className={`font-semibold text-sm ${dark ? "text-[#00d97e]" : "text-[#065f46]"}`}>You&apos;re on the list.</p>
          <p className={`text-xs mt-0.5 ${dark ? "text-[#4a7c63]" : "text-[#047857]"}`}>We reach out personally. No automated drip. Just a real conversation when your spot is ready.</p>
        </div>
      </div>
    )
  }

  const inputClass = dark
    ? "w-full bg-[#0e0e17] border border-[#1c1c2e] text-[#f5f5f7] placeholder-[#3d3d5c] px-4 py-3 text-sm focus:outline-none focus:border-[#ff4d00] transition-colors font-mono"
    : "w-full bg-white border border-[#d1d5db] text-[#111827] placeholder-[#9ca3af] px-4 py-3 text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"

  const selectClass = dark
    ? "w-full bg-[#0e0e17] border border-[#1c1c2e] text-[#8b8ba7] px-4 py-3 text-sm focus:outline-none focus:border-[#ff4d00] transition-colors appearance-none cursor-pointer"
    : "w-full bg-white border border-[#d1d5db] text-[#6b7280] px-4 py-3 text-sm focus:outline-none focus:border-[#ff4d00] transition-colors appearance-none cursor-pointer"

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md">
      <input
        type="email"
        placeholder="work@yourcompany.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className={inputClass}
      />
      <select value={role} onChange={e => setRole(e.target.value)} className={selectClass}>
        <option value="">Your role — optional but helps us prioritize</option>
        <option value="cto">CTO / VP Engineering</option>
        <option value="director">Director / Head of Engineering</option>
        <option value="em">Engineering Manager</option>
        <option value="pm">Product Manager / Program Manager</option>
        <option value="engineer">Tech Lead / Senior Engineer</option>
        <option value="founder">Founder / CEO</option>
        <option value="other">Other</option>
      </select>
      {error && <p className="text-xs text-[#ff4d00]">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ff4d00] text-white py-3 px-6 text-sm font-bold tracking-wide hover:bg-[#e63d00] transition-colors disabled:opacity-50 uppercase"
      >
        {loading ? "JOINING…" : "REQUEST EARLY ACCESS →"}
      </button>
      <p className={`text-xs ${dark ? "text-[#3d3d5c]" : "text-[#9ca3af]"}`}>
        No pitch deck. No sales call unless you want one. No credit card.
      </p>
    </form>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, AlertTriangle, Share2, ChevronDown, Check } from "lucide-react"

function WaitlistForm() {
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
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-6 py-4">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-green-900">You&apos;re on the list.</p>
          <p className="text-sm text-green-700">We&apos;ll reach out personally when your spot is ready.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
      />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white text-slate-600"
      >
        <option value="">Your role (optional)</option>
        <option value="cto">CTO / VP Engineering</option>
        <option value="director">Director / Head of Engineering</option>
        <option value="em">Engineering Manager</option>
        <option value="pm">Product Manager</option>
        <option value="engineer">Senior Engineer / Tech Lead</option>
        <option value="founder">Founder</option>
        <option value="other">Other</option>
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? "Joining…" : <>Request early access <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="text-xs text-slate-400 text-center">No credit card. No spam. Just a heads-up when you&apos;re in.</p>
    </form>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 px-6 py-4 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">Uncertainty Ledger</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      <main>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-8">
            <AlertTriangle className="h-3.5 w-3.5" />
            Early access — limited spots
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Stop being blindsided<br />by your own projects.
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Every project failure has warning signs. They were always there —
            nobody was tracking them.
          </p>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
            Uncertainty Ledger tracks what your team <em>doesn&apos;t know</em>,
            scores the risk in real time, and gives you one link to brief anyone —
            from your team to your CEO — in under 60 seconds.
          </p>

          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </section>

        {/* The real problem */}
        <section className="bg-slate-900 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">The problem nobody admits</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 max-w-2xl">
              Two kinds of debt. Only one gets tracked.
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-3 p-6 rounded-xl bg-slate-800">
                <p className="font-semibold text-slate-300 text-sm uppercase tracking-wide">Technical debt</p>
                <p className="text-slate-400 leading-relaxed">
                  Everyone talks about it. Tools measure it. Jira tracks it.
                  It&apos;s visible, debatable, and occasionally addressed.
                </p>
              </div>
              <div className="space-y-3 p-6 rounded-xl bg-amber-900/40 border border-amber-700/40">
                <p className="font-semibold text-amber-400 text-sm uppercase tracking-wide">Epistemic debt ← this one kills projects</p>
                <p className="text-slate-300 leading-relaxed">
                  Unresolved unknowns. Untested assumptions. Deferred decisions.
                  Nobody tracks it. It grows silently. It&apos;s what actually ends projects.
                </p>
              </div>
            </div>
            <blockquote className="border-l-4 border-amber-400 pl-6">
              <p className="text-slate-300 text-lg leading-relaxed italic">
                &ldquo;The database that couldn&apos;t handle load in month 8 was an unknown assumption in month 2.
                The integration that took 6 weeks had warning signs at kickoff.
                The signals were always there. Nobody was watching them.&rdquo;
              </p>
            </blockquote>
          </div>
        </section>

        {/* Use case scenarios */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-4 text-center">Real scenarios</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            The conversation that happens every week
          </h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-16">
            At every company. At every level. The same problem — no shared language for uncertainty.
          </p>

          <div className="space-y-8">

            {/* Scenario 1 */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="bg-red-50 border border-red-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Without Uncertainty Ledger</p>
                <p className="text-sm font-semibold text-slate-800">CEO → VP Engineering</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-red-100">
                    <span className="font-medium">CEO:</span> &ldquo;How&apos;s the payment integration? Still Q3?&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-red-100">
                    <span className="font-medium">VP:</span> &ldquo;We&apos;re making progress, some challenges, the team is working through them.&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-500 border border-red-100 italic text-xs">
                    CEO hears: &ldquo;I don&apos;t actually know.&rdquo;
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">With Uncertainty Ledger</p>
                <p className="text-sm font-semibold text-slate-800">CEO → VP Engineering</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100">
                    <span className="font-medium">CEO:</span> &ldquo;How&apos;s the payment integration? Still Q3?&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100">
                    <span className="font-medium">VP:</span> &ldquo;Risk score is 67 — elevated. 5 open unknowns in the integration area. I&apos;ll send you the report.&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100 text-xs">
                    CEO opens the link. Reads it in 60 seconds. Asks the right question.
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="bg-red-50 border border-red-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Without Uncertainty Ledger</p>
                <p className="text-sm font-semibold text-slate-800">Engineer → Manager</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-red-100">
                    <span className="font-medium">Manager:</span> &ldquo;Are we on track for the demo Friday?&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-red-100">
                    <span className="font-medium">Engineer:</span> &ldquo;Should be fine… I mean, there are some things we haven&apos;t figured out yet.&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-500 border border-red-100 italic text-xs">
                    Friday arrives. It&apos;s not fine.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">With Uncertainty Ledger</p>
                <p className="text-sm font-semibold text-slate-800">Engineer → Manager</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100">
                    <span className="font-medium">Manager:</span> &ldquo;Are we on track for the demo Friday?&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100">
                    <span className="font-medium">Engineer:</span> &ldquo;We have 3 critical unknowns in the auth area. Two need your decision today or Friday is at risk.&rdquo;
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100 text-xs">
                    Manager makes the decision Tuesday. Demo happens.
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario 3 */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="bg-red-50 border border-red-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Without Uncertainty Ledger</p>
                <p className="text-sm font-semibold text-slate-800">VP Engineering → Board</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-red-100">
                    Board review. VP presents a 20-slide deck. 3 slides of Gantt charts. Nobody believes them.
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-500 border border-red-100 italic text-xs">
                    Board asks: &ldquo;What are the real risks?&rdquo; Awkward silence.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">With Uncertainty Ledger</p>
                <p className="text-sm font-semibold text-slate-800">VP Engineering → Board</p>
                <div className="space-y-2 text-sm">
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100">
                    VP shares one link before the meeting. Board reads it in 2 minutes. Risk score: 42. Trajectory improving. Top cluster: data migration.
                  </p>
                  <p className="bg-white rounded-lg px-3 py-2 text-slate-600 border border-green-100 text-xs">
                    Board asks the right question. VP has the answer. Credibility earned.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-4 text-center">How it works</p>
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Simple. Transparent. No black boxes.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
                  step: "01",
                  title: "Log what you don't know",
                  body: "Not tasks. Not bugs. Open questions and unvalidated assumptions — the things that could change everything if they resolve wrong. Takes 30 seconds per unknown.",
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
                  step: "02",
                  title: "Watch the risk score",
                  body: "A transparent 0–100 score tracks whether uncertainty is growing or shrinking. Weighted by criticality, area clustering, and time to deadline. Every point is explainable.",
                },
                {
                  icon: <Share2 className="h-6 w-6 text-green-500" />,
                  step: "03",
                  title: "Share the real picture",
                  body: "One link. No login required. Any stakeholder — CEO, board, client — reads a plain-English risk briefing in 60 seconds. Not a dashboard. A briefing.",
                },
              ].map(f => (
                <div key={f.step} className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                      {f.icon}
                    </div>
                    <span className="text-3xl font-bold text-slate-100">{f.step}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The algorithm — transparency builds trust */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-4 text-center">The score is explainable</p>
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Not AI. Not a black box. Expert rules.</h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-12">
            The risk score is built on 40+ years of watching projects fail in predictable patterns.
            Every point traces back to a specific unknown. You always know why.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Critical unknown", pts: "+20 pts", desc: "Blocks delivery if unresolved" },
              { label: "High unknown", pts: "+10 pts", desc: "Significant scope/timeline impact" },
              { label: "Cluster penalty", pts: "+15 pts", desc: "3+ unknowns concentrated in one area" },
              { label: "Trajectory warning", pts: "×1.3", desc: "Accumulating faster than resolving" },
              { label: "Time pressure", pts: "×1.2", desc: "<30 days to deadline with elevated score" },
              { label: "Medium unknown", pts: "+5 pts", desc: "Notable risk, manageable" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                <span className="font-bold text-slate-900 tabular-nums w-16 text-right flex-shrink-0">{item.pts}</span>
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-slate-900 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4 text-center">Who it&apos;s for</p>
            <h2 className="text-3xl font-bold text-center mb-12">Built for the people accountable for outcomes</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { role: "VP / Director of Engineering", pain: "Tired of being blindsided. Needs something defensible to show upward before the crisis — not after." },
                { role: "Engineering Manager", pain: "Runs the team. Needs to surface blockers early enough that decisions can still be made." },
                { role: "CTO / Founder", pain: "Responsible for delivery. Needs to know which projects are actually at risk, not which ones look bad in a status meeting." },
              ].map(p => (
                <div key={p.role} className="bg-slate-800 rounded-xl p-6 space-y-3">
                  <p className="font-semibold text-white">{p.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA — waitlist */}
        <section className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Know what you don&apos;t know.<br />Before it&apos;s too late.
          </h2>
          <p className="text-slate-500 mb-10 text-lg leading-relaxed">
            We&apos;re opening access in small batches. Join the waitlist —
            we&apos;ll reach out personally to get you set up.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-100 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2026 Uncertainty Ledger. Built by engineers who&apos;ve seen what kills projects.
          </p>
          <Link href="/login" className="text-sm text-slate-400 hover:text-slate-600">
            Already have an account? Sign in →
          </Link>
        </div>
      </footer>
    </div>
  )
}

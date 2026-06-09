import type { Metadata } from "next"
import Link from "next/link"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"
import { ParticleBg } from "@/components/marketing/ParticleBg"

export const metadata: Metadata = {
  title: "Know what you don't know before it's too late",
  description:
    "Uncertainty Ledger tracks the unresolved unknowns in your projects before they become the reason your launch slipped.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "var(--font-geist-sans)" }}>

      {/* ── NAV ── */}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-semibold text-sm text-gray-900">Uncertainty Ledger</span>
          </div>
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "88vh" }}>
        <ParticleBg />
        <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-28 text-center">

          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 mb-10 bg-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Limited early access — Q3 2026
          </div>

          <h1
            className="font-bold text-gray-900 mb-6"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Every project failure
            <br />you&apos;ve ever had
            <br />was predictable.
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Not bad code. Not bad engineers. Unresolved questions that piled up silently — until month 8, when they arrived all at once.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── THE MOMENT ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">The moment every engineering leader recognizes</p>
          <blockquote
            className="font-bold text-gray-900 mb-6"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em", lineHeight: 1.2 }}
          >
            &ldquo;We should have known this was coming in month 3.&rdquo;
          </blockquote>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            The database that couldn&apos;t handle load. The integration that took 6 weeks. The demo that wasn&apos;t ready. The signals were always there — nobody was watching them.
          </p>
        </div>
      </section>

      {/* ── TWO DEBTS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-12">Two kinds of debt. Only one gets tracked.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-2xl p-8">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Technical debt</p>
              <p className="font-bold text-gray-900 text-xl mb-3">Tracked. Measured. Debated.</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every team talks about it. Tools measure it. It&apos;s visible and arguable. It&apos;s also rarely what actually kills a project.
              </p>
            </div>
            <div className="border-2 border-red-100 bg-red-50 rounded-2xl p-8">
              <p className="text-xs font-medium text-red-400 uppercase tracking-widest mb-3">Epistemic debt — this one kills projects</p>
              <p className="font-bold text-gray-900 text-xl mb-3">Invisible. Unmeasured. Lethal.</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Unresolved questions. Untested assumptions. Deferred decisions. Nobody tracks this. It compounds quietly. It&apos;s responsible for the majority of failures that catch leadership off guard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONVERSATIONS ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 text-center">This conversation happens every week</p>
          <p className="text-center font-bold text-gray-900 text-2xl mb-14" style={{ letterSpacing: "-0.02em" }}>
            At every company. At every level.
          </p>

          <div className="space-y-6">
            {[
              {
                label: "CEO → VP Engineering",
                bad: { who: "CEO", line: "Payment integration — still Q3?" },
                badReply: { who: "VP", line: "We're making progress. Some challenges. The team is working through them." },
                badOutcome: "CEO hears: \"I don't actually know.\" Trust erodes quietly.",
                good: { who: "CEO", line: "Payment integration — still Q3?" },
                goodReply: { who: "VP", line: "Risk score is 67 — elevated. 5 open unknowns in the integration area. Sending you the report now." },
                goodOutcome: "CEO reads it in 60 seconds. Asks the right question. Trust built.",
              },
              {
                label: "Engineer → Manager",
                bad: { who: "Manager", line: "On track for the demo Friday?" },
                badReply: { who: "Engineer", line: "Should be fine… there are some things we haven't fully figured out yet." },
                badOutcome: "Friday arrives. It's not fine. It never was.",
                good: { who: "Manager", line: "On track for the demo Friday?" },
                goodReply: { who: "Engineer", line: "3 critical unknowns in auth. Two need your decision by Tuesday or Friday is at risk." },
                goodOutcome: "Decision made Tuesday. Demo happens Friday.",
              },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-3">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{s.label}</p>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-medium text-red-400 mb-4">Without Uncertainty Ledger</p>
                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">{s.bad.who}:</span> &ldquo;{s.bad.line}&rdquo;</p>
                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">{s.badReply.who}:</span> &ldquo;{s.badReply.line}&rdquo;</p>
                    <p className="text-xs text-red-400 pt-2 border-t border-gray-100">{s.badOutcome}</p>
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-medium text-green-500 mb-4">With Uncertainty Ledger</p>
                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">{s.good.who}:</span> &ldquo;{s.good.line}&rdquo;</p>
                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">{s.goodReply.who}:</span> &ldquo;{s.goodReply.line}&rdquo;</p>
                    <p className="text-xs text-green-500 pt-2 border-t border-gray-100">{s.goodOutcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-12">How it works</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "Log what you don't know",
                body: "Not tasks. Not bugs. Open questions and unvalidated assumptions — the things that could change everything. 30 seconds each.",
              },
              {
                n: "02",
                title: "Watch the risk score",
                body: "A 0–100 score tracks whether uncertainty is growing or shrinking. Not AI. Expert rules built from 40 years of project patterns. Every point is traceable.",
              },
              {
                n: "03",
                title: "Brief anyone in 60 seconds",
                body: "One link. No login required. Your CEO reads a plain-English risk briefing — score, trend, biggest cluster, and what it means.",
              },
            ].map(item => (
              <div key={item.n} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xs font-bold text-gray-400">{item.n}</span>
                </div>
                <p className="font-semibold text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCORE EXAMPLE ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-4">What it looks like</p>
          <p className="text-center font-bold text-gray-900 text-2xl mb-12" style={{ letterSpacing: "-0.02em" }}>
            Not AI. Not a black box. A number you can always explain.
          </p>
          <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <p className="text-xs text-gray-400 mb-6">Payment Gateway Project · Live score</p>
            <div className="flex items-end gap-3 mb-6">
              <span className="font-bold text-red-500" style={{ fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.04em" }}>74</span>
              <div className="pb-2">
                <p className="font-bold text-sm text-red-500 uppercase tracking-wide">High Risk</p>
                <p className="text-xs text-gray-400 mt-1">↑ +12 this week</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { k: "Open unknowns", v: "11", note: "3 critical" },
                { k: "Trend", v: "Accumulating", note: "faster than resolving" },
                { k: "Highest cluster", v: "Integration", note: "5 unknowns" },
                { k: "Days to deadline", v: "23", note: "time pressure active" },
              ].map(row => (
                <div key={row.k} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-500">{row.k}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{row.v}</span>
                    <span className="text-xs text-gray-400 ml-1">· {row.note}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-xs text-red-600 leading-relaxed">
                <span className="font-semibold">Assessment: </span>
                Elevated risk with 23 days remaining. The integration cluster is the primary driver. Teams with this profile at this stage historically experience significant timeline changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-12">Built for the people accountable for outcomes</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "VP / Director of Engineering",
                pain: "You've been in that room. The one where you're explaining why a project that was 'on track' is now three months late. You didn't have the signal early enough.",
              },
              {
                role: "Engineering Manager",
                pain: "You know which projects are in trouble before anyone else does. The problem is turning that gut feeling into something concrete enough to escalate.",
              },
              {
                role: "CTO / Founder",
                pain: "You can't be in every project. You need to trust the signal, not the status update. A number you can interrogate beats a green checkbox you can't.",
              },
            ].map(p => (
              <div key={p.role} className="border-t-2 border-gray-900 pt-6">
                <p className="font-bold text-gray-900 mb-3">{p.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{p.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-gray-100 py-28 px-6">
        <ParticleBg />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            The project that&apos;s going to surprise you
            is already in flight.
          </h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            Join the waitlist. We open access in small batches and reach out personally.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-gray-400">Uncertainty Ledger</span>
          </div>
          <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            Already have an account? Sign in →
          </Link>
        </div>
      </footer>

    </div>
  )
}

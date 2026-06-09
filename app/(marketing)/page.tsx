import type { Metadata } from "next"
import Link from "next/link"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"
import { AnimatedHero } from "@/components/marketing/AnimatedHero"
import { ScrollReveal } from "@/components/marketing/ScrollReveal"

export const metadata: Metadata = {
  title: "Know what you don't know before it's too late",
  description:
    "Uncertainty Ledger tracks the unresolved unknowns in your projects before they become the reason your launch slipped.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "var(--font-geist-sans)" }}>

      {/* ── NAV ── */}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-semibold text-sm text-gray-900">Uncertainty Ledger</span>
          </div>
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <AnimatedHero>
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-28 text-center">
          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 mb-10 bg-white/80 backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Limited early access · Q3 2026
          </div>

          <h1
            className="font-bold text-gray-900 mb-6"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)", lineHeight: 1.08, letterSpacing: "-0.035em" }}
          >
            Every project failure
            <br />you&apos;ve ever had
            <br />was predictable.
          </h1>

          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">
            Not bad code. Not bad engineers. Unresolved questions that piled up silently — until month 8, when they arrived all at once.
          </p>

          <div className="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </AnimatedHero>

      {/* ── THE MOMENT ── */}
      <section className="border-t border-gray-100 bg-gray-50/80 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>

      {/* ── TWO DEBTS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-12">Two kinds of debt. Only one gets tracked.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={1}>
              <div className="card-hover border border-gray-200 rounded-2xl p-8 h-full bg-white">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Technical debt</p>
                <p className="font-bold text-gray-900 text-xl mb-3">Tracked. Measured. Debated.</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Every team talks about it. Tools measure it. It&apos;s visible and arguable. It&apos;s also rarely what actually kills a project.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="card-hover border-2 border-red-100 bg-red-50/50 rounded-2xl p-8 h-full">
                <p className="text-xs font-medium text-red-400 uppercase tracking-widest mb-3">Epistemic debt — this one kills projects</p>
                <p className="font-bold text-gray-900 text-xl mb-3">Invisible. Unmeasured. Lethal.</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Unresolved questions. Untested assumptions. Deferred decisions. Nobody tracks this. It compounds quietly. It&apos;s responsible for the majority of failures that catch leadership off guard.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CONVERSATIONS ── */}
      <section className="bg-gray-50/80 border-t border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 text-center">This conversation happens every week</p>
            <p className="text-center font-bold text-gray-900 text-2xl mb-14" style={{ letterSpacing: "-0.02em" }}>
              At every company. At every level.
            </p>
          </ScrollReveal>

          <div className="space-y-5">
            {[
              {
                label: "CEO → VP Engineering",
                bad: "\"Payment integration — still Q3?\" / \"We're making progress. Some challenges. The team is working through them.\"",
                badNote: "CEO hears: \"I don't actually know.\" Trust erodes quietly.",
                good: "\"Payment integration — still Q3?\" / \"Risk score is 67 — elevated. 5 open unknowns in integration. Sending the report now.\"",
                goodNote: "CEO reads it in 60 seconds. Asks the right question. Trust built.",
              },
              {
                label: "Engineer → Manager",
                bad: "\"On track for the demo Friday?\" / \"Should be fine… there are some things we haven't fully figured out yet.\"",
                badNote: "Friday arrives. It's not fine. It never was.",
                good: "\"On track for the demo Friday?\" / \"3 critical unknowns in auth. Two need your decision by Tuesday or Friday is at risk.\"",
                goodNote: "Decision made Tuesday. Demo happens Friday.",
              },
              {
                label: "VP Engineering → Board",
                bad: "20-slide deck. 3 pages of Gantt charts. Status colors that went from yellow to red with no warning. \"What are the real risks?\" Room goes quiet.",
                badNote: "Nobody in the room believes the slide.",
                good: "VP sends one link 10 minutes before the meeting. Score: 42, improving. Top cluster: data migration, 4 unknowns, all assigned.",
                goodNote: "Board asks a smart question. VP has the answer. Credibility compounds.",
              },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div className="card-hover bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="border-b border-gray-100 px-6 py-3 bg-gray-50/50">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{s.label}</p>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-6 space-y-3">
                      <p className="text-xs font-medium text-red-400 mb-3">Without Uncertainty Ledger</p>
                      <p className="text-sm text-gray-600 leading-relaxed italic">{s.bad}</p>
                      <p className="text-xs text-red-400 pt-3 border-t border-gray-100">{s.badNote}</p>
                    </div>
                    <div className="p-6 space-y-3">
                      <p className="text-xs font-medium text-green-500 mb-3">With Uncertainty Ledger</p>
                      <p className="text-sm text-gray-600 leading-relaxed italic">{s.good}</p>
                      <p className="text-xs text-green-500 pt-3 border-t border-gray-100">{s.goodNote}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-12">How it works</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", title: "Log what you don't know", body: "Not tasks. Not bugs. Open questions and unvalidated assumptions — the things that could change everything. 30 seconds each." },
              { n: "02", title: "Watch the risk score", body: "A 0–100 score tracks whether uncertainty is growing or shrinking. Expert rules — not AI. Built from 40 years of project patterns. Every point is traceable." },
              { n: "03", title: "Brief anyone in 60 seconds", body: "One link. No login. Your CEO reads a plain-English risk briefing — score, trend, biggest cluster, and what it means for the outcome." },
            ].map((item, i) => (
              <ScrollReveal key={item.n} delay={(i + 1) as 1 | 2 | 3}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 card-hover cursor-default">
                    <span className="text-xs font-bold text-gray-400">{item.n}</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCORE EXAMPLE ── */}
      <section className="bg-gray-50/80 border-t border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-4">What it looks like</p>
            <p className="text-center font-bold text-gray-900 text-2xl mb-12" style={{ letterSpacing: "-0.02em" }}>
              Not AI. Not a black box.<br />A number you can always explain.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="max-w-md mx-auto card-hover bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <p className="text-xs text-gray-400 mb-6">Payment Gateway Project · Live score</p>
              <div className="flex items-end gap-3 mb-6">
                <span className="font-bold text-red-500" style={{ fontSize: "5.5rem", lineHeight: 1, letterSpacing: "-0.04em" }}>74</span>
                <div className="pb-2">
                  <p className="font-bold text-sm text-red-500 uppercase tracking-wide">High Risk</p>
                  <p className="text-xs text-gray-400 mt-1">↑ +12 this week</p>
                </div>
              </div>
              <div className="space-y-0 mb-6">
                {[
                  { k: "Open unknowns", v: "11", n: "3 critical" },
                  { k: "Trend", v: "Accumulating", n: "faster than resolving" },
                  { k: "Highest cluster", v: "Integration", n: "5 unknowns" },
                  { k: "Days to deadline", v: "23", n: "time pressure active" },
                ].map(row => (
                  <div key={row.k} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-500">{row.k}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{row.v}</span>
                      <span className="text-xs text-gray-400 ml-1.5">· {row.n}</span>
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
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xs text-gray-400 uppercase tracking-widest text-center mb-12">Built for the people accountable for outcomes</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: "VP / Director of Engineering", pain: "You've been in that room — explaining why a project that was 'on track' is now three months late. You didn't have the signal early enough." },
              { role: "Engineering Manager", pain: "You know which projects are in trouble before anyone else does. The problem is turning that gut feeling into something concrete enough to escalate." },
              { role: "CTO / Founder", pain: "You can't be in every project. You need to trust the signal, not the status update. A number you can interrogate beats a green checkbox you can't." },
            ].map((p, i) => (
              <ScrollReveal key={p.role} delay={(i + 1) as 1 | 2 | 3}>
                <div className="card-hover border-t-2 border-gray-900 pt-6 h-full">
                  <p className="font-bold text-gray-900 mb-3">{p.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.pain}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <AnimatedHero>
        <div className="max-w-2xl mx-auto px-6 py-28 text-center">
          <ScrollReveal>
            <h2
              className="font-bold text-gray-900 mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
            >
              The project that&apos;s going to
              <br />surprise you is already in flight.
            </h2>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed">
              We open access in small batches and reach out personally. No automated drip. No pitch deck. Just a real conversation.
            </p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </ScrollReveal>
        </div>
      </AnimatedHero>

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

import type { Metadata } from "next"
import Link from "next/link"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"

export const metadata: Metadata = {
  title: "Know what you don't know before it's too late",
  description:
    "Uncertainty Ledger tracks the unresolved unknowns in your software projects — before they become the reason you're standing in a room explaining why the launch slipped.",
}

export default function LandingPage() {
  return (
    <div style={{ background: "#06060f", color: "#f5f5f7", fontFamily: "var(--font-geist-sans)" }} className="min-h-screen">

      {/* ── NAV ── */}
      <nav style={{ borderBottom: "1px solid #1c1c2e" }} className="px-6 py-4 sticky top-0 z-50" >
        <div style={{ background: "#06060f" }} className="absolute inset-0" />
        <div className="max-w-6xl mx-auto flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div style={{ background: "#ff4d00", width: 8, height: 8 }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#f5f5f7", letterSpacing: "0.15em" }}>
              Uncertainty Ledger
            </span>
          </div>
          <Link
            href="/login"
            className="text-xs uppercase tracking-widest hover:text-white transition-colors"
            style={{ color: "#3d3d5c", letterSpacing: "0.12em" }}
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div style={{ color: "#ff4d00" }} className="text-xs font-mono uppercase tracking-widest mb-8 flex items-center gap-3">
          <span style={{ background: "#ff4d00", width: 6, height: 6, display: "inline-block" }} />
          Limited early access — Q3 2026
        </div>

        <h1
          className="font-bold leading-none mb-8"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
            color: "#f5f5f7",
            maxWidth: "900px",
          }}
        >
          Every project failure
          you&apos;ve ever had
          <span style={{ color: "#ff4d00" }}> was predictable.</span>
        </h1>

        <p
          className="mb-4 leading-relaxed"
          style={{ color: "#8b8ba7", fontSize: "1.2rem", maxWidth: "600px" }}
        >
          Not because your engineers were bad.
          Not because of bad code or bad luck.
          Because of questions nobody answered.
          Assumptions nobody validated.
          Decisions that kept getting deferred.
        </p>
        <p
          className="mb-12 leading-relaxed"
          style={{ color: "#8b8ba7", fontSize: "1.2rem", maxWidth: "600px" }}
        >
          They pile up silently. And then, in month 8, they arrive all at once —
          in a meeting you weren&apos;t ready for.
        </p>

        <WaitlistForm dark />
      </section>

      {/* ── THE MOMENT ── */}
      <section style={{ borderTop: "1px solid #1c1c2e", borderBottom: "1px solid #1c1c2e" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "#3d3d5c" }}>
                — The moment every engineering leader recognizes
              </p>
              <blockquote
                className="font-bold leading-snug"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#f5f5f7", letterSpacing: "-0.02em" }}
              >
                &ldquo;We should have known this was coming in month 3.&rdquo;
              </blockquote>
            </div>
            <div style={{ borderLeft: "1px solid #1c1c2e", paddingLeft: "3rem" }}>
              <p className="leading-relaxed mb-4" style={{ color: "#8b8ba7" }}>
                The database that couldn&apos;t handle load in month 8? That was an unvalidated assumption in month 2. The integration that took 6 weeks instead of 3 days? The signal was there at kickoff — buried in a Slack thread nobody referenced again.
              </p>
              <p className="leading-relaxed" style={{ color: "#8b8ba7" }}>
                The problem was never that your team was blind. The problem was there was no system to make the invisible visible — to track what you didn&apos;t know, watch it accumulate, and surface it before options close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO DEBTS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono uppercase tracking-widest mb-12" style={{ color: "#3d3d5c" }}>
          — The debt nobody measures
        </p>
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "#1c1c2e" }}>
          <div style={{ background: "#06060f" }} className="p-8">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#3d3d5c" }}>
              Technical debt
            </p>
            <p className="font-bold text-xl mb-4" style={{ color: "#f5f5f7" }}>Tracked. Measured. Debated.</p>
            <p style={{ color: "#8b8ba7" }} className="leading-relaxed">
              Every engineering team talks about it. There are tools, dashboards, sprints dedicated to it. It&apos;s visible, arguable, politically manageable. It&apos;s also rarely what actually kills projects.
            </p>
          </div>
          <div style={{ background: "#0e0e17" }} className="p-8">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#ff4d00" }}>
              Epistemic debt ← this one kills projects
            </p>
            <p className="font-bold text-xl mb-4" style={{ color: "#f5f5f7" }}>Invisible. Unmeasured. Lethal.</p>
            <p style={{ color: "#8b8ba7" }} className="leading-relaxed">
              Unresolved questions. Untested assumptions. Deferred decisions. The things your team is collectively pretending will work out. Nobody tracks this. It compounds quietly. And it&apos;s responsible for the majority of project failures that catch leadership off guard.
            </p>
          </div>
        </div>
      </section>

      {/* ── REAL CONVERSATIONS ── */}
      <section style={{ background: "#0a0a14", borderTop: "1px solid #1c1c2e", borderBottom: "1px solid #1c1c2e" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#3d3d5c" }}>
            — This conversation happens every week
          </p>
          <p className="font-bold mb-16" style={{ color: "#f5f5f7", fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
            At every company. At every level. And it always ends the same way.
          </p>

          {/* Scenario 1 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs" style={{ color: "#3d3d5c" }}>01</span>
              <p className="font-bold text-sm uppercase tracking-widest" style={{ color: "#f5f5f7" }}>CEO → VP Engineering</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: "#1c1c2e" }}>
              <div style={{ background: "#0a0a14" }} className="p-8">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: "#5a1a0a" }}>Without Uncertainty Ledger</p>
                <div className="space-y-3 font-mono text-sm">
                  <p><span style={{ color: "#3d3d5c" }}>CEO: </span><span style={{ color: "#f5f5f7" }}>&ldquo;Payment integration — still Q3?&rdquo;</span></p>
                  <p><span style={{ color: "#3d3d5c" }}>VP:&nbsp; </span><span style={{ color: "#f5f5f7" }}>&ldquo;We&apos;re making progress. Some challenges. The team is working through them.&rdquo;</span></p>
                  <p style={{ borderTop: "1px solid #1c1c2e", color: "#5a1a0a" }} className="text-xs mt-4 pt-4">
                    CEO hears: &ldquo;I don&apos;t actually know.&rdquo; Trust erodes. Quietly.
                  </p>
                </div>
              </div>
              <div style={{ background: "#0a150e" }} className="p-8">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: "#00d97e" }}>With Uncertainty Ledger</p>
                <div className="space-y-3 font-mono text-sm">
                  <p><span style={{ color: "#3d3d5c" }}>CEO: </span><span style={{ color: "#f5f5f7" }}>&ldquo;Payment integration — still Q3?&rdquo;</span></p>
                  <p><span style={{ color: "#3d3d5c" }}>VP:&nbsp; </span><span style={{ color: "#f5f5f7" }}>&ldquo;Risk score is 67 — elevated. 5 open unknowns in the integration area. Sending you the report now.&rdquo;</span></p>
                  <p className="text-xs mt-4 pt-4" style={{ borderTop: "1px solid #1c1c2e", color: "#4a7c63" }}>
                    CEO opens the link. Reads it in 60 seconds. Asks the right question. Trust built.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs" style={{ color: "#3d3d5c" }}>02</span>
              <p className="font-bold text-sm uppercase tracking-widest" style={{ color: "#f5f5f7" }}>Engineer → Manager</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: "#1c1c2e" }}>
              <div style={{ background: "#0a0a14" }} className="p-8">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: "#5a1a0a" }}>Without Uncertainty Ledger</p>
                <div className="space-y-3 font-mono text-sm">
                  <p><span style={{ color: "#3d3d5c" }}>Mgr: </span><span style={{ color: "#f5f5f7" }}>&ldquo;On track for the demo Friday?&rdquo;</span></p>
                  <p><span style={{ color: "#3d3d5c" }}>Eng: </span><span style={{ color: "#f5f5f7" }}>&ldquo;Should be fine… there are some things we haven&apos;t fully figured out yet.&rdquo;</span></p>
                  <p className="text-xs mt-4 pt-4" style={{ borderTop: "1px solid #1c1c2e", color: "#5a1a0a" }}>
                    Friday arrives. It&apos;s not fine. It never was.
                  </p>
                </div>
              </div>
              <div style={{ background: "#0a150e" }} className="p-8">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: "#00d97e" }}>With Uncertainty Ledger</p>
                <div className="space-y-3 font-mono text-sm">
                  <p><span style={{ color: "#3d3d5c" }}>Mgr: </span><span style={{ color: "#f5f5f7" }}>&ldquo;On track for the demo Friday?&rdquo;</span></p>
                  <p><span style={{ color: "#3d3d5c" }}>Eng: </span><span style={{ color: "#f5f5f7" }}>&ldquo;3 critical unknowns in auth. Two need your decision by Tuesday or Friday is at risk.&rdquo;</span></p>
                  <p className="text-xs mt-4 pt-4" style={{ borderTop: "1px solid #1c1c2e", color: "#4a7c63" }}>
                    Decision made Tuesday. Demo happens Friday.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 3 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs" style={{ color: "#3d3d5c" }}>03</span>
              <p className="font-bold text-sm uppercase tracking-widest" style={{ color: "#f5f5f7" }}>VP Engineering → Board</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: "#1c1c2e" }}>
              <div style={{ background: "#0a0a14" }} className="p-8">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: "#5a1a0a" }}>Without Uncertainty Ledger</p>
                <p style={{ color: "#8b8ba7" }} className="leading-relaxed text-sm">
                  20-slide deck. 3 pages of Gantt charts. Status colors that went from yellow to red with no warning. Board asks: &ldquo;What are the real risks?&rdquo; Room goes quiet.
                </p>
              </div>
              <div style={{ background: "#0a150e" }} className="p-8">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: "#00d97e" }}>With Uncertainty Ledger</p>
                <p style={{ color: "#8b8ba7" }} className="leading-relaxed text-sm">
                  VP sends one link 10 minutes before the meeting. Board reads: risk score 42, improving trajectory, primary cluster in data migration — 4 unknowns, all assigned. Board asks a smart question. VP has the answer. Credibility compounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono uppercase tracking-widest mb-12" style={{ color: "#3d3d5c" }}>
          — How it works
        </p>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "#1c1c2e" }}>
          {[
            {
              n: "01",
              title: "Log what your team doesn't know",
              body: "Not tasks. Not bugs. Open questions and unvalidated assumptions — the things that could change everything if they resolve wrong. 30 seconds per unknown. That's the habit.",
            },
            {
              n: "02",
              title: "Watch the risk score move",
              body: "A 0–100 score built on 40 years of watching projects fail in the same patterns. Weighted by criticality, area clustering, trajectory, and time pressure. Every point is traceable.",
            },
            {
              n: "03",
              title: "Brief anyone in 60 seconds",
              body: "One link. No login required. Your CEO, your board, your client — reads a plain-English risk briefing with the current score, the top cluster, the trajectory, and what it means for the outcome.",
            },
          ].map(item => (
            <div key={item.n} style={{ background: "#06060f" }} className="p-8">
              <p className="font-mono text-4xl font-bold mb-6" style={{ color: "#1c1c2e" }}>{item.n}</p>
              <p className="font-bold mb-3" style={{ color: "#f5f5f7", letterSpacing: "-0.01em" }}>{item.title}</p>
              <p style={{ color: "#8b8ba7" }} className="text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SCORE ── */}
      <section style={{ background: "#0a0a14", borderTop: "1px solid #1c1c2e", borderBottom: "1px solid #1c1c2e" }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "#3d3d5c" }}>
                — The score is explainable
              </p>
              <h2 className="font-bold mb-6" style={{ fontSize: "2rem", color: "#f5f5f7", letterSpacing: "-0.02em" }}>
                Not AI. Not a black box.<br />Built from 40 years of watching projects fail in the same patterns.
              </h2>
              <p style={{ color: "#8b8ba7" }} className="leading-relaxed mb-6">
                Every point in the risk score traces back to a specific unknown in your project. You always know why the number is what it is.
              </p>
              <p style={{ color: "#8b8ba7" }} className="leading-relaxed mb-6">
                The score accounts for what you don&apos;t know, how quickly unknowns are accumulating, where they cluster, and how much time you have left to resolve them. It compounds the way real risk does — not linearly.
              </p>
              <p style={{ color: "#5a5a7a" }} className="leading-relaxed text-sm italic">
                &ldquo;A number you can&apos;t explain is a number nobody trusts. The calibration is ours — the reasoning is always yours to see.&rdquo;
              </p>
            </div>

            {/* Risk score visual — hint, not reveal */}
            <div style={{ border: "1px solid #1c1c2e", background: "#06060f", fontFamily: "var(--font-geist-mono)" }} className="p-8">
              <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#3d3d5c" }}>
                Example — Payment Gateway Project
              </p>
              <div className="flex items-end gap-4 mb-6">
                <span className="font-bold" style={{ fontSize: "4.5rem", color: "#ff4d00", lineHeight: 1, letterSpacing: "-0.04em" }}>74</span>
                <div className="pb-2">
                  <p className="font-bold text-sm uppercase tracking-widest" style={{ color: "#ff4d00" }}>HIGH RISK</p>
                  <p className="text-xs mt-1" style={{ color: "#5a5a7a" }}>↑ +12 this week</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Open unknowns", val: "11", note: "3 critical" },
                  { label: "Trajectory", val: "↑", note: "accumulating faster than resolving" },
                  { label: "Highest cluster", val: "Integration", note: "5 unknowns, avg criticality: high" },
                  { label: "Days to deadline", val: "23", note: "time pressure active" },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-start py-2" style={{ borderBottom: "1px solid #1c1c2e" }}>
                    <span className="text-xs" style={{ color: "#5a5a7a" }}>{row.label}</span>
                    <div className="text-right">
                      <span className="text-xs font-bold" style={{ color: "#f5f5f7" }}>{row.val}</span>
                      <span className="text-xs ml-2" style={{ color: "#3d3d5c" }}>{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#5a5a7a" }}>
                <span style={{ color: "#ff4d00" }}>Assessment: </span>
                Elevated risk with 23 days remaining. The integration cluster is the primary driver. Teams with this profile at this stage historically experience significant timeline changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-mono uppercase tracking-widest mb-12" style={{ color: "#3d3d5c" }}>
          — Built for the people accountable for outcomes
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              role: "VP / Director of Engineering",
              pain: "You've been in that room. The one where you're explaining why a project that was 'on track' is now three months late. You didn't have the signal early enough. You do now.",
            },
            {
              role: "Engineering Manager",
              pain: "You know which projects are in trouble before anyone else does. The problem is translating that gut feeling into something concrete enough to act on — or to escalate.",
            },
            {
              role: "CTO / Founder",
              pain: "You can't be in every project. You need to trust the signal, not the status update. A number you can interrogate beats a green checkbox you can't.",
            },
          ].map(p => (
            <div key={p.role} style={{ borderTop: "2px solid #ff4d00" }} className="pt-6">
              <p className="font-bold mb-3" style={{ color: "#f5f5f7" }}>{p.role}</p>
              <p style={{ color: "#8b8ba7" }} className="text-sm leading-relaxed">{p.pain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#0e0e17", borderTop: "1px solid #1c1c2e" }}>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "#ff4d00" }}>
              — Limited early access
            </p>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: "#f5f5f7", lineHeight: 1.1 }}
            >
              The project that&apos;s going to surprise you is already in flight.
            </h2>
            <p className="mb-10 text-lg leading-relaxed" style={{ color: "#8b8ba7" }}>
              We&apos;re opening access in small batches — and being selective about it. We want users who will tell us the hard truth. If that&apos;s you, join the list.
            </p>
            <WaitlistForm dark />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #1c1c2e" }} className="px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{ background: "#ff4d00", width: 6, height: 6 }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "#3d3d5c" }}>
              Uncertainty Ledger
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-xs font-mono uppercase tracking-widest hover:text-white transition-colors" style={{ color: "#3d3d5c" }}>
              Sign in
            </Link>
            <span className="text-xs font-mono" style={{ color: "#1c1c2e" }}>
              Built by engineers who&apos;ve seen what kills projects.
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}

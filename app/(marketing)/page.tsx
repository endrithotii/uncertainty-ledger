import type { Metadata } from "next"
import Link from "next/link"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"
import { AnimatedHero } from "@/components/marketing/AnimatedHero"

export const metadata: Metadata = {
  title: "Know what you don't know before it's too late",
  description:
    "Uncertainty Ledger tracks the unresolved unknowns in your projects before they become the reason your launch slipped.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-geist-sans)" }}>

      {/* NAV */}
      <nav className="px-8 py-5 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50" style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="3" fill="#ef4444" />
            <circle cx="9" cy="9" r="7" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
          </svg>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>Uncertainty Ledger</span>
        </div>
        <Link href="/login" style={{ fontSize: 13, color: "#888", textDecoration: "none" }} className="hover:text-gray-900 transition-colors">
          Sign in
        </Link>
      </nav>

      {/* HERO — left aligned, product visual right */}
      <AnimatedHero>
        <div className="max-w-6xl mx-auto px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy + form */}
            <div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#fff8f0", border: "1px solid #fed7aa",
                  borderRadius: 20, padding: "4px 12px",
                  fontSize: 11, color: "#ea580c", fontWeight: 500,
                  marginBottom: 28,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                Early access open
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  color: "#0a0a0a",
                  marginBottom: 20,
                }}
              >
                Stop being surprised
                <br />by your own projects.
              </h1>

              <p style={{ fontSize: 17, color: "#555", lineHeight: 1.7, marginBottom: 12, maxWidth: 420 }}>
                Every project failure has warning signs. They were always there.
              </p>
              <p style={{ fontSize: 17, color: "#555", lineHeight: 1.7, marginBottom: 36, maxWidth: 420 }}>
                Uncertainty Ledger tracks what your team <em>doesn&apos;t know</em> — and turns it into a risk score your CEO can read in 60 seconds.
              </p>

              <WaitlistForm />
            </div>

            {/* Right: Floating product card */}
            <div className="hidden lg:flex justify-center items-center">
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: 16,
                  padding: "28px 28px 24px",
                  width: 300,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
                  transform: "rotate(1.5deg)",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 16, fontFamily: "var(--font-geist-mono)" }}>
                  payment-gateway · live
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 64, fontWeight: 800, color: "#ef4444", lineHeight: 1, letterSpacing: "-0.04em" }}>74</span>
                  <div style={{ paddingBottom: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.06em" }}>High Risk</div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>↑ +12 this week</div>
                  </div>
                </div>
                {[
                  { k: "Open unknowns", v: "11", c: "#ef4444" },
                  { k: "Integration cluster", v: "5 critical", c: "#f97316" },
                  { k: "Days to deadline", v: "23", c: "#eab308" },
                ].map(row => (
                  <div key={row.k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <span style={{ fontSize: 12, color: "#888" }}>{row.k}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: row.c }}>{row.v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, background: "#fff5f5", borderRadius: 8, padding: "10px 12px" }}>
                  <p style={{ fontSize: 11, color: "#dc2626", lineHeight: 1.5 }}>
                    Integration cluster is the primary driver. Teams with this profile historically experience significant timeline changes.
                  </p>
                </div>

                {/* Second card peeking behind */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -12, right: -12,
                    width: "100%", height: "100%",
                    background: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: 16,
                    zIndex: -1,
                    transform: "rotate(-2deg)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </AnimatedHero>

      {/* THE PROBLEM — full width, dark, no cards */}
      <section style={{ background: "#0a0a0a", padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#444", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
            40 years of watching projects fail
          </p>
          <p style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#fff", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 24 }}>
            The database that failed in month 8 was an unvalidated assumption in month 2.
          </p>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 0 }}>
            It&apos;s not about bad code or bad engineers. It&apos;s about questions nobody tracked, assumptions nobody challenged, and decisions that kept getting deferred. They compound. Silently. Until they don&apos;t.
          </p>
        </div>
      </section>

      {/* TWO DEBTS — asymmetric */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#e8e8e8" }}>
            <div style={{ background: "#fff", padding: "40px 36px" }}>
              <p style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Technical debt</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 16 }}>Everyone knows it exists.</p>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>
                Tools measure it. Sprints address it. It&apos;s visible, debatable, politically manageable. It&apos;s also rarely what kills a project.
              </p>
            </div>
            <div style={{ background: "#fff8f5", padding: "40px 36px" }}>
              <p style={{ fontSize: 11, color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Epistemic debt — the one that kills projects</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 16 }}>Nobody even has a word for it.</p>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>
                Unresolved questions. Untested assumptions. Deferred decisions. Nobody tracks it. Nobody talks about it. It&apos;s responsible for the majority of failures that catch leadership off guard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE REAL CONVERSATION — different treatment */}
      <section style={{ background: "#f9f9f9", padding: "80px 32px", borderTop: "1px solid #efefef" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 12 }}>
            This conversation kills credibility.
            <br />It happens every week.
          </h2>
          <p style={{ fontSize: 15, color: "#888", marginBottom: 48 }}>At every company. At every level. And it always ends the same way.</p>

          {[
            {
              context: "Board meeting. CEO asks the VP of Engineering.",
              bad: { line: "\"How's the payment integration? Still Q3?\"", reply: "\"We're making progress. Some challenges. The team is working through them.\"", result: "CEO hears: I don't actually know. Meeting over." },
              good: { reply: "\"Risk score is 67 — elevated. 5 open unknowns in integration. Sending you the report.\"", result: "CEO opens the link. Reads it in 60 seconds. Asks the right question." },
            },
            {
              context: "Tuesday standup. Manager asks the lead engineer.",
              bad: { line: "\"On track for the demo Friday?\"", reply: "\"Should be fine… there are some things we haven't fully figured out yet.\"", result: "Friday arrives. It's not fine." },
              good: { reply: "\"3 critical unknowns in auth. Two need your decision by Wednesday or Friday is at risk.\"", result: "Decision made Wednesday. Demo happens Friday." },
            },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{s.context}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "#e8e8e8" }}>
                <div style={{ background: "#fff", padding: "24px 24px" }}>
                  <p style={{ fontSize: 11, color: "#f87171", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Without</p>
                  <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, fontFamily: "var(--font-geist-mono)", marginBottom: 8 }}>{s.bad.line}</p>
                  <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, fontFamily: "var(--font-geist-mono)", marginBottom: 12 }}>{s.bad.reply}</p>
                  <p style={{ fontSize: 11, color: "#f87171" }}>{s.bad.result}</p>
                </div>
                <div style={{ background: "#f0fdf4", padding: "24px 24px" }}>
                  <p style={{ fontSize: 11, color: "#22c55e", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>With Uncertainty Ledger</p>
                  <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, fontFamily: "var(--font-geist-mono)", marginBottom: 8 }}>{s.bad.line}</p>
                  <p style={{ fontSize: 13, color: "#333", lineHeight: 1.6, fontFamily: "var(--font-geist-mono)", marginBottom: 12 }}>{s.good.reply}</p>
                  <p style={{ fontSize: 11, color: "#16a34a" }}>{s.good.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — numbered, not grid */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 48 }}>
            Simple enough to actually use.
          </h2>
          {[
            { n: 1, t: "Log what your team doesn't know", b: "Not tasks. Not bugs. Open questions and unvalidated assumptions. The things that could change everything if they resolve wrong. 30 seconds per unknown." },
            { n: 2, t: "Watch the risk score", b: "A 0–100 score tracks whether uncertainty is growing or shrinking. Weighted by criticality, clustering, trajectory, and time to deadline. Every point traces back to a specific unknown." },
            { n: 3, t: "Brief anyone in 60 seconds", b: "One shareable link. No login required. Your CEO, your board, your client reads a plain-English risk briefing. The calibration comes from 40 years of watching projects fail — not from AI." },
          ].map(item => (
            <div key={item.n} style={{ display: "flex", gap: 24, marginBottom: 36, paddingBottom: 36, borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#aaa", fontFamily: "var(--font-geist-mono)" }}>{item.n}</span>
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 8 }}>{item.t}</p>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{item.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR — three paragraphs, not cards */}
      <section style={{ background: "#0a0a0a", padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 40 }}>
            Who it&apos;s built for
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { role: "VP / Director of Engineering", text: "You've been in that room. Explaining why 'on track' became three months late. You didn't have the signal early enough. Now you will." },
              { role: "Engineering Manager", text: "You know which projects are in trouble before anyone else. The problem is turning that gut feeling into something concrete enough to escalate." },
              { role: "CTO / Founder", text: "You can't be everywhere. You need a signal you can trust — not a status update that tells you what you want to hear." },
            ].map(p => (
              <div key={p.role} style={{ borderTop: "1px solid #222", paddingTop: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 10 }}>{p.role}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <AnimatedHero>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "96px 32px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            The project that&apos;s going to surprise you is already in flight.
          </h2>
          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 36 }}>
            We open access in small batches. No automated drip. No pitch deck. We reach out personally.
          </p>
          <WaitlistForm />
        </div>
      </AnimatedHero>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #f0f0f0", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="3" fill="#ef4444" />
            <circle cx="9" cy="9" r="7" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
          </svg>
          <span style={{ fontSize: 12, color: "#aaa" }}>Uncertainty Ledger</span>
        </div>
        <Link href="/login" style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }} className="hover:text-gray-600 transition-colors">
          Sign in →
        </Link>
      </footer>

    </div>
  )
}

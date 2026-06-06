import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, AlertTriangle, Share2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-slate-900">Uncertainty Ledger</span>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get started free</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-8">
            <AlertTriangle className="h-3.5 w-3.5" />
            Technical debt is visible. Epistemic debt is not.
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Software projects don&apos;t fail<br />because of bad code.
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            They fail because of bad conversations about uncertainty — what the team doesn&apos;t know,
            what hasn&apos;t been validated, what everyone is assuming but nobody has confirmed.
          </p>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Uncertainty Ledger makes the invisible visible: track your open questions, watch the trajectory,
            and share a plain-English risk report with anyone — no login required.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start tracking for free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </section>

        {/* The insight */}
        <section className="bg-slate-900 text-white py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">Two kinds of debt. Only one gets tracked.</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-300">Technical debt</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every engineering team talks about it. Tools measure it. Jira tracks it.
                  Code quality gates enforce it. It&apos;s visible, arguable, and occasionally addressed.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-amber-400">Epistemic debt</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The accumulation of unresolved unknowns, untested assumptions, and deferred decisions.
                  Nobody tracks it. It grows silently. It&apos;s what actually kills projects.
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed border-l-4 border-amber-400 pl-4">
              The database that couldn&apos;t handle load in month 8 was an unknown in month 2.
              The integration that took 6 weeks had warning signs at kickoff.
              The warning signals were always there — nobody was watching them.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
                title: "Log what you don't know",
                body: "Not tasks. Not bugs. Open questions and unvalidated assumptions — the things that could change everything if they resolve wrong.",
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
                title: "Watch the trajectory",
                body: "A risk score (0–100) tracks whether uncertainty is growing or shrinking. Cluster analysis flags dangerous concentrations in specific areas.",
              },
              {
                icon: <Share2 className="h-6 w-6 text-green-500" />,
                title: "Share the real picture",
                body: "One link gives any stakeholder a plain-English risk report — no jargon, no login required. Business and technology, finally speaking the same language.",
              },
            ].map(f => (
              <div key={f.title} className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Simple pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { plan: "Free", price: "$0", features: ["1 active project", "Unlimited unknowns", "Risk score & trajectory", "Shareable reports", "Unlimited team members"] },
                { plan: "Pro", price: "$29/mo", features: ["Unlimited projects", "Everything in Free", "30-day trajectory history", "Priority support", "Coming soon: Slack alerts"], highlight: true },
              ].map(p => (
                <div key={p.plan} className={`rounded-xl border p-8 text-left space-y-6 ${p.highlight ? "border-slate-900 bg-white shadow-lg" : "bg-white border-slate-200"}`}>
                  <div>
                    <p className="font-semibold text-slate-900">{p.plan}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{p.price}</p>
                  </div>
                  <ul className="space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={p.highlight ? "default" : "outline"} asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 px-6 py-8 text-center">
        <p className="text-sm text-slate-400">
          Uncertainty Ledger — built by engineers who&apos;ve seen what kills projects.
        </p>
      </footer>
    </div>
  )
}

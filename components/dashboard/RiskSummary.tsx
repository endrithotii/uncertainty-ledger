import type { RiskTranslation } from "@/lib/types"
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"

interface RiskSummaryProps {
  translation: RiskTranslation
  score: number
}

function SummaryIcon({ score }: { score: number }) {
  if (score <= 20) return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
  if (score <= 40) return <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
  return <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
}

export function RiskSummary({ translation, score }: RiskSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <SummaryIcon score={score} />
        <p className="text-sm text-slate-700 leading-relaxed">{translation.headline}</p>
      </div>
      {translation.callouts.length > 0 && (
        <ul className="space-y-2 pl-8">
          {translation.callouts.map((callout, i) => (
            <li key={i} className="text-sm text-slate-600 leading-relaxed before:content-['—'] before:mr-2 before:text-slate-400">
              {callout}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

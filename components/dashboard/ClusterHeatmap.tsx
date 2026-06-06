import type { ClusterInfo, Area, Criticality } from "@/lib/types"
import { cn } from "@/lib/utils"

const AREAS: Area[] = ["technical", "integration", "business", "data", "external", "people", "other"]
const AREA_LABELS: Record<Area, string> = {
  technical: "Technical",
  integration: "Integration",
  business: "Business",
  data: "Data",
  external: "External",
  people: "People",
  other: "Other",
}
const CRITICALITIES: Criticality[] = ["critical", "high", "medium", "low"]

interface ClusterHeatmapProps {
  clusters: ClusterInfo[]
  // raw unknowns grouped by area+criticality
  counts: Record<Area, Record<Criticality, number>>
}

function cellColor(count: number, criticality: Criticality): string {
  if (count === 0) return "bg-slate-50 text-slate-300"
  if (criticality === "critical") {
    if (count >= 3) return "bg-red-600 text-white font-bold"
    if (count >= 2) return "bg-red-400 text-white"
    return "bg-red-200 text-red-800"
  }
  if (criticality === "high") {
    if (count >= 3) return "bg-orange-500 text-white font-bold"
    if (count >= 2) return "bg-orange-300 text-orange-900"
    return "bg-orange-100 text-orange-700"
  }
  if (criticality === "medium") {
    if (count >= 3) return "bg-yellow-400 text-yellow-900 font-bold"
    if (count >= 2) return "bg-yellow-200 text-yellow-800"
    return "bg-yellow-100 text-yellow-700"
  }
  // low
  if (count >= 3) return "bg-blue-200 text-blue-800 font-bold"
  return "bg-blue-50 text-blue-600"
}

export function ClusterHeatmap({ counts }: ClusterHeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="text-left text-slate-400 font-normal pb-1 pr-2 w-24"></th>
            {CRITICALITIES.map(c => (
              <th key={c} className="text-center text-slate-500 font-medium pb-1 capitalize">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AREAS.map(area => (
            <tr key={area}>
              <td className="text-slate-600 font-medium pr-2 py-0.5">{AREA_LABELS[area]}</td>
              {CRITICALITIES.map(criticality => {
                const count = counts[area]?.[criticality] ?? 0
                return (
                  <td key={criticality} className="text-center">
                    <div
                      className={cn(
                        "rounded w-10 h-7 flex items-center justify-center mx-auto transition-colors",
                        cellColor(count, criticality)
                      )}
                      title={`${AREA_LABELS[area]} / ${criticality}: ${count} open`}
                    >
                      {count > 0 ? count : "·"}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-slate-400 mt-2">Active unknowns by area and criticality. Darker = higher concentration.</p>
    </div>
  )
}

"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { ProjectSnapshot } from "@/lib/types"

interface TrajectoryChartProps {
  snapshots: ProjectSnapshot[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function TrajectoryChart({ snapshots }: TrajectoryChartProps) {
  const data = snapshots.map(s => ({
    date: formatDate(s.date),
    Open: s.open_count,
    Investigating: s.investigating_count,
    Resolved: s.resolved_count,
    "Risk Score": s.risk_score,
  }))

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-slate-400">
        No trajectory data yet — check back after the first snapshot.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 6 }}
          labelStyle={{ fontWeight: 600, marginBottom: 4 }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="Open" stroke="#3b82f6" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Investigating" stroke="#a855f7" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Resolved" stroke="#22c55e" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="Risk Score" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 2" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReportToken } from "@/lib/types"
import { Copy, Check, Plus, Trash2 } from "lucide-react"

interface Props {
  projectId: string
  userId: string
  existingTokens: ReportToken[]
}

export function ReportManager({ projectId, userId, existingTokens }: Props) {
  const [tokens, setTokens] = useState<ReportToken[]>(existingTokens)
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function createToken() {
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from("report_tokens")
      .insert({ project_id: projectId, created_by: userId })
      .select("*")
      .single()

    if (!error && data) setTokens(prev => [data, ...prev])
    setLoading(false)
  }

  async function deleteToken(tokenId: string) {
    const supabase = createClient()
    await supabase.from("report_tokens").delete().eq("id", tokenId)
    setTokens(prev => prev.filter(t => t.id !== tokenId))
  }

  function getReportUrl(token: string) {
    return `${window.location.origin}/report/${token}`
  }

  async function copyUrl(token: ReportToken) {
    await navigator.clipboard.writeText(getReportUrl(token.token))
    setCopiedId(token.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="text-sm text-slate-700">
            Generate a shareable link to this project&apos;s risk report. Recipients can view the live dashboard without creating an account.
          </p>
          <p className="text-xs text-slate-500">
            The report updates in real time. Revoke a link at any time by deleting it below.
          </p>
          <Button onClick={createToken} disabled={loading} size="sm">
            <Plus className="h-4 w-4" />
            {loading ? "Generating…" : "Generate link"}
          </Button>
        </CardContent>
      </Card>

      {tokens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tokens.map(token => (
                <div key={token.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <code className="flex-1 text-xs text-slate-600 truncate font-mono">
                    /report/{token.token.slice(0, 16)}…
                  </code>
                  <button
                    onClick={() => copyUrl(token)}
                    className="p-1.5 rounded hover:bg-slate-200 transition-colors text-slate-500"
                    title="Copy link"
                  >
                    {copiedId === token.id ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => deleteToken(token.id)}
                    className="p-1.5 rounded hover:bg-red-50 transition-colors text-slate-400 hover:text-red-500"
                    title="Revoke link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

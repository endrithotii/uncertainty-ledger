// ─── Domain enums ────────────────────────────────────────────────────────────

export type Area = "technical" | "integration" | "business" | "data" | "external" | "people" | "other"
export type Criticality = "low" | "medium" | "high" | "critical"
export type UnknownStatus = "open" | "investigating" | "resolved" | "invalidated"
export type OrgRole = "owner" | "admin" | "member" | "viewer"
export type ProjectStatus = "active" | "completed" | "archived"

// ─── Domain rows ─────────────────────────────────────────────────────────────

export interface Organization {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface OrganizationMember {
  id: string
  org_id: string
  user_id: string
  role: OrgRole
  created_at: string
}

export interface Project {
  id: string
  org_id: string
  name: string
  description: string | null
  status: ProjectStatus
  target_date: string | null
  created_by: string
  created_at: string
}

export interface Unknown {
  id: string
  project_id: string
  org_id: string
  title: string
  description: string | null
  area: Area
  criticality: Criticality
  status: UnknownStatus
  owner_id: string | null
  created_by: string
  created_at: string
  resolved_at: string | null
}

export interface UnknownUpdate {
  id: string
  unknown_id: string
  user_id: string
  old_status: UnknownStatus | null
  new_status: UnknownStatus
  note: string | null
  created_at: string
}

export interface ProjectSnapshot {
  id: string
  project_id: string
  date: string
  open_count: number
  investigating_count: number
  resolved_count: number
  invalidated_count: number
  risk_score: number
  computed_at: string
}

export interface ReportToken {
  id: string
  project_id: string
  token: string
  created_by: string
  expires_at: string | null
  created_at: string
}

// ─── Risk types ───────────────────────────────────────────────────────────────

export interface ClusterInfo {
  area: Area
  open_count: number
  avg_criticality_score: number
  is_flagged: boolean
}

export interface RiskResult {
  score: number
  base_score: number
  cluster_penalty: number
  trajectory_multiplier: number
  time_pressure_multiplier: number
  clusters: ClusterInfo[]
  net_7d: number
  days_to_deadline: number | null
}

export interface RiskTranslation {
  headline: string
  callouts: string[]
}

// ─── Supabase Database type (matches generated format exactly) ────────────────

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: { id: string; name: string; slug: string; created_at: string }
        Insert: { id?: string; name: string; slug: string; created_at?: string }
        Update: { id?: string; name?: string; slug?: string; created_at?: string }
        Relationships: []
      }
      organization_members: {
        Row: { id: string; org_id: string; user_id: string; role: string; created_at: string }
        Insert: { id?: string; org_id: string; user_id: string; role: string; created_at?: string }
        Update: { id?: string; org_id?: string; user_id?: string; role?: string; created_at?: string }
        Relationships: []
      }
      projects: {
        Row: { id: string; org_id: string; name: string; description: string | null; status: string; target_date: string | null; created_by: string; created_at: string }
        Insert: { id?: string; org_id: string; name: string; description?: string | null; status?: string; target_date?: string | null; created_by: string; created_at?: string }
        Update: { id?: string; org_id?: string; name?: string; description?: string | null; status?: string; target_date?: string | null; created_by?: string; created_at?: string }
        Relationships: []
      }
      unknowns: {
        Row: { id: string; project_id: string; org_id: string; title: string; description: string | null; area: string; criticality: string; status: string; owner_id: string | null; created_by: string; created_at: string; resolved_at: string | null }
        Insert: { id?: string; project_id: string; org_id: string; title: string; description?: string | null; area: string; criticality?: string; status?: string; owner_id?: string | null; created_by: string; created_at?: string; resolved_at?: string | null }
        Update: { id?: string; project_id?: string; org_id?: string; title?: string; description?: string | null; area?: string; criticality?: string; status?: string; owner_id?: string | null; created_by?: string; created_at?: string; resolved_at?: string | null }
        Relationships: []
      }
      unknown_updates: {
        Row: { id: string; unknown_id: string; user_id: string; old_status: string | null; new_status: string; note: string | null; created_at: string }
        Insert: { id?: string; unknown_id: string; user_id: string; old_status?: string | null; new_status: string; note?: string | null; created_at?: string }
        Update: { id?: string; unknown_id?: string; user_id?: string; old_status?: string | null; new_status?: string; note?: string | null; created_at?: string }
        Relationships: []
      }
      project_snapshots: {
        Row: { id: string; project_id: string; date: string; open_count: number; investigating_count: number; resolved_count: number; invalidated_count: number; risk_score: number; computed_at: string }
        Insert: { id?: string; project_id: string; date: string; open_count?: number; investigating_count?: number; resolved_count?: number; invalidated_count?: number; risk_score?: number; computed_at?: string }
        Update: { id?: string; project_id?: string; date?: string; open_count?: number; investigating_count?: number; resolved_count?: number; invalidated_count?: number; risk_score?: number; computed_at?: string }
        Relationships: []
      }
      report_tokens: {
        Row: { id: string; project_id: string; token: string; created_by: string; expires_at: string | null; created_at: string }
        Insert: { id?: string; project_id: string; token?: string; created_by: string; expires_at?: string | null; created_at?: string }
        Update: { id?: string; project_id?: string; token?: string; created_by?: string; expires_at?: string | null; created_at?: string }
        Relationships: []
      }
      waitlist: {
        Row: { id: string; email: string; role: string | null; company: string | null; created_at: string }
        Insert: { id?: string; email: string; role?: string | null; company?: string | null; created_at?: string }
        Update: { id?: string; email?: string; role?: string | null; company?: string | null; created_at?: string }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

-- Enable pgcrypto for gen_random_bytes
create extension if not exists pgcrypto;

-- Organizations (tenants)
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

-- Membership: links auth.users to orgs
create table organization_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member','viewer')),
  created_at timestamptz default now(),
  unique(org_id, user_id)
);

-- Projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'active' check (status in ('active','completed','archived')),
  target_date date,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Unknowns — the core entity
create table unknowns (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  org_id uuid references organizations(id) on delete cascade,
  title text not null,
  description text,
  area text not null check (area in ('technical','integration','business','data','external','people','other')),
  criticality text not null default 'medium' check (criticality in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','investigating','resolved','invalidated')),
  owner_id uuid references auth.users(id),
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- Status change history
create table unknown_updates (
  id uuid primary key default gen_random_uuid(),
  unknown_id uuid references unknowns(id) on delete cascade,
  user_id uuid references auth.users(id),
  old_status text,
  new_status text not null,
  note text,
  created_at timestamptz default now()
);

-- Daily project snapshots for trajectory charts
create table project_snapshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  date date not null,
  open_count int not null default 0,
  investigating_count int not null default 0,
  resolved_count int not null default 0,
  invalidated_count int not null default 0,
  risk_score int not null default 0,
  computed_at timestamptz default now(),
  unique(project_id, date)
);

-- Tokens for public shareable reports
create table report_tokens (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  created_by uuid references auth.users(id),
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table projects enable row level security;
alter table unknowns enable row level security;
alter table unknown_updates enable row level security;
alter table project_snapshots enable row level security;
alter table report_tokens enable row level security;

-- Helper: is the current user a member of this org?
create or replace function is_org_member(org uuid)
returns boolean language sql security definer as $$
  select exists (
    select 1 from organization_members
    where org_id = org and user_id = auth.uid()
  );
$$;

-- Organizations: members can read their own org
create policy "org members can read" on organizations
  for select using (is_org_member(id));

create policy "org members can update" on organizations
  for update using (
    exists (
      select 1 from organization_members
      where org_id = id and user_id = auth.uid() and role in ('owner','admin')
    )
  );

-- Organization members
create policy "members can read own org members" on organization_members
  for select using (is_org_member(org_id));

create policy "owners can manage members" on organization_members
  for all using (
    exists (
      select 1 from organization_members om
      where om.org_id = organization_members.org_id
        and om.user_id = auth.uid()
        and om.role = 'owner'
    )
  );

-- Projects
create policy "org members can read projects" on projects
  for select using (is_org_member(org_id));

create policy "org members can insert projects" on projects
  for insert with check (is_org_member(org_id));

create policy "org admins can update projects" on projects
  for update using (
    exists (
      select 1 from organization_members
      where org_id = projects.org_id and user_id = auth.uid() and role in ('owner','admin','member')
    )
  );

-- Unknowns
create policy "org members can read unknowns" on unknowns
  for select using (is_org_member(org_id));

create policy "org members can insert unknowns" on unknowns
  for insert with check (is_org_member(org_id));

create policy "org members can update unknowns" on unknowns
  for update using (is_org_member(org_id));

create policy "org members can delete unknowns" on unknowns
  for delete using (
    exists (
      select 1 from organization_members
      where org_id = unknowns.org_id and user_id = auth.uid() and role in ('owner','admin','member')
    )
  );

-- Unknown updates
create policy "org members can read updates" on unknown_updates
  for select using (
    exists (
      select 1 from unknowns u
      join organization_members om on om.org_id = u.org_id
      where u.id = unknown_updates.unknown_id and om.user_id = auth.uid()
    )
  );

create policy "org members can insert updates" on unknown_updates
  for insert with check (
    exists (
      select 1 from unknowns u
      join organization_members om on om.org_id = u.org_id
      where u.id = unknown_updates.unknown_id and om.user_id = auth.uid()
    )
  );

-- Project snapshots
create policy "org members can read snapshots" on project_snapshots
  for select using (
    exists (
      select 1 from projects p
      join organization_members om on om.org_id = p.org_id
      where p.id = project_snapshots.project_id and om.user_id = auth.uid()
    )
  );

-- Report tokens
create policy "org members can read tokens" on report_tokens
  for select using (
    exists (
      select 1 from projects p
      join organization_members om on om.org_id = p.org_id
      where p.id = report_tokens.project_id and om.user_id = auth.uid()
    )
  );

create policy "org members can create tokens" on report_tokens
  for insert with check (
    exists (
      select 1 from projects p
      join organization_members om on om.org_id = p.org_id
      where p.id = report_tokens.project_id and om.user_id = auth.uid()
    )
  );

create policy "org members can delete tokens" on report_tokens
  for delete using (
    exists (
      select 1 from projects p
      join organization_members om on om.org_id = p.org_id
      where p.id = report_tokens.project_id and om.user_id = auth.uid()
        and om.role in ('owner','admin','member')
    )
  );

-- Indexes for performance
create index on organization_members(user_id);
create index on organization_members(org_id);
create index on projects(org_id);
create index on unknowns(project_id);
create index on unknowns(org_id);
create index on unknowns(status);
create index on unknown_updates(unknown_id);
create index on project_snapshots(project_id, date);
create index on report_tokens(token);

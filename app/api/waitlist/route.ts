import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const { email, role, company } = await request.json()

  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const service = createServiceClient()

  const { error } = await service.from("waitlist").insert({
    email: email.trim().toLowerCase(),
    role: role?.trim() || null,
    company: company?.trim() || null,
  })

  if (error) {
    if (error.code === "23505") {
      // Already on waitlist — treat as success, don't reveal it's a duplicate
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

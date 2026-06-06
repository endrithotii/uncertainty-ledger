import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Uncertainty Ledger</h1>
          <p className="text-sm text-slate-500">Sign in to your workspace</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/admin/quotes",
      email,
      password,
    })
    if ((res as any)?.error) setError((res as any).error)
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded bg-white/10 border border-white/10 px-3 py-2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="w-full rounded bg-white/10 border border-white/10 px-3 py-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="px-4 py-2 rounded bg-dlq-gold text-dlq-navy font-medium">Sign in</button>
      </form>
      <p className="text-xs opacity-60 mt-3">Tip: default admin password is admin123 (dev only).</p>
    </div>
  )
}

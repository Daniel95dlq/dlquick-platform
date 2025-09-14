"use client"
import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const choice = localStorage.getItem('dlq.cookie.choice')
    if (!choice) setVisible(true)
  }, [])

  const choose = async (v: 'accept' | 'reject' | 'manage') => {
    localStorage.setItem('dlq.cookie.choice', v)
    try {
      await fetch('/api/consent/cookies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ choice: v }) })
    } catch {}
    setVisible(false)
  }

  if (!visible) return null
  return (
    <div className="fixed bottom-0 inset-x-0 z-[60]">
      <div className="mx-auto max-w-5xl m-3 p-3 rounded border border-dlq-gold/30 bg-[#0f2238] text-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm opacity-90">We use cookies to improve your experience. Choose your preferences.</p>
          <div className="flex gap-2 text-sm">
            <button onClick={() => choose('reject')} className="px-3 py-1 rounded border border-dlq-gold text-dlq-gold">Reject</button>
            <button onClick={() => choose('manage')} className="px-3 py-1 rounded border border-dlq-gold text-dlq-gold">Manage</button>
            <button onClick={() => choose('accept')} className="px-3 py-1 rounded bg-dlq-gold text-[#0a1a4f] font-semibold">Accept</button>
          </div>
        </div>
      </div>
    </div>
  )
}

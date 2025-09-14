"use client"
import { useEffect, useRef, useState } from 'react'
export const dynamic = 'force-dynamic'

export default function TrackPage() {
  const [orderId, setOrderId] = useState("")
  const [data, setData] = useState<any>(null)
  const esRef = useRef<EventSource | null>(null)
  const fetchTrack = async () => {
    if (!orderId) return
    try {
      const res = await fetch(`/api/tracking/${orderId}`)
      setData(await res.json())
    } catch (_) {}
  }
  const startLive = () => {
    if (!orderId) return
    esRef.current?.close()
    const es = new EventSource(`/api/tracking/stream?orderId=${encodeURIComponent(orderId)}`)
    es.onmessage = (ev) => {
      try { setData(JSON.parse(ev.data)) } catch {}
    }
    es.onerror = () => { es.close() }
    esRef.current = es
  }
  useEffect(() => () => esRef.current?.close(), [])
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Track your delivery</h1>
      <p className="opacity-80 mb-6">Live tracking will appear here with driver GPS, ETA and updates.</p>
      <div className="mb-4 flex gap-2">
        <input className="flex-1 border border-white/10 rounded bg-white/5 px-3 py-2" placeholder="Enter Order ID (e.g., DLQ-...)" value={orderId} onChange={(e: any) => setOrderId(e.target.value)} />
        <button className="px-3 py-2 rounded border border-white/20" onClick={fetchTrack}>Track</button>
        <button className="px-3 py-2 rounded border border-white/20" onClick={startLive}>Go live</button>
      </div>
      <div className="border border-white/10 rounded h-[420px] flex items-center justify-center bg-white/5">
        <span className="opacity-60">Live map placeholder</span>
      </div>
      {data && (
        <div className="mt-4 text-sm opacity-90">
          <div>Status: {data.status} • ETA: {data.etaMinutes} min</div>
          <div>Vehicle: {data.vehicle?.type?.toUpperCase()} • Reg: {data.vehicle?.registration}</div>
        </div>
      )}
      <ul className="mt-6 text-sm list-disc pl-6 opacity-80">
        <li>Driver vehicle type + registration + branding status</li>
        <li>Auto-call and SMS when the driver arrives</li>
        <li>Delays and ETA updates in real time</li>
      </ul>
    </div>
  )
}

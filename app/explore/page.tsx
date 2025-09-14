"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { pillars, services, type Service } from "../../lib/services-data"

const FILTER_CHIPS = ["Urgent", "Tracked", "Halal", "Vegan", "Gluten-Free", "18+"] as const

export default function ExplorePage() {
  const [q, setQ] = useState("")
  const [active, setActive] = useState<string[]>([])
  const [limit, setLimit] = useState(10)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Optional voice input (Web Speech API)
  const [listening, setListening] = useState(false)
  const recogRef = useRef<any>(null)
  useEffect(() => {
    const w = window as any
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.lang = 'en-GB'
    rec.continuous = false
    rec.interimResults = false
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(' ')
      setQ(text)
      setListening(false)
    }
    rec.onend = () => setListening(false)
    recogRef.current = rec
  }, [])

  const toggleChip = (chip: string) => {
    setLimit(10)
    setActive((prev) => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return services.filter((s) => {
      const matchQ = !term || s.title.toLowerCase().includes(term) || s.summary.toLowerCase().includes(term) || s.sections.overview.toLowerCase().includes(term)
      const matchTags = active.length === 0 || (s.tags && active.every(t => s.tags!.includes(t)))
      return matchQ && matchTags
    })
  }, [q, active])

  // Infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return
    const el = sentinelRef.current
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setLimit((l) => Math.min(filtered.length, l + 10))
      }
    }, { rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [filtered.length])

  const groupedByPillar = useMemo(() => {
    const map: Record<string, Service[]> = {}
    for (const p of pillars) map[p] = []
    for (const s of filtered) (map[s.pillar] ||= []).push(s as Service)
    return map
  }, [filtered])

  const visible = filtered.slice(0, limit)

  const startVoice = () => {
    if (!recogRef.current) return
    setListening(true)
    recogRef.current.start()
  }

  return (
    <div>
      {/* Hero with gradient overlay. Add city/category backgrounds later under /public/assets/backgrounds. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08132a]/70 via-[#0a1a4f]/70 to-[#08132a]/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 text-gray-100">
          <h1 className="text-3xl md:text-4xl font-semibold text-dlq-gold">Explore DLQuick</h1>
          <p className="opacity-80 mt-1">Search everything in one place: deliveries, removals, trades, pets, events and more.</p>
          <div className="mt-6 flex gap-2">
            <input value={q} onChange={(e) => { setLimit(10); setQ(e.target.value) }} placeholder="Search services, categories…"
                   className="flex-1 rounded border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 text-gray-100 placeholder:text-gray-300 px-4 py-2" />
            <button onClick={startVoice} disabled={listening}
                    className="text-xs px-3 py-2 rounded border border-dlq-gold text-dlq-gold disabled:opacity-50 backdrop-blur-sm">
              {listening ? 'Listening…' : 'Voice'}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {FILTER_CHIPS.map((c) => (
              <button key={c} onClick={() => toggleChip(c)}
                      className={`text-[11px] px-2 py-1 rounded-full border ${active.includes(c) ? 'bg-dlq-gold text-[#0a1a4f] border-dlq-gold' : 'border-white/10 bg-white/5 text-dlq-gold'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category accordions */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-xl font-medium text-dlq-gold mb-2">Browse by category</h2>
    <div className="space-y-2">
          {pillars.map((p) => (
      <details key={p} className="group rounded border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7">
              <summary className="cursor-pointer list-none p-3 flex items-center justify-between">
                <span className="text-gray-100">{p}</span>
                <span className="text-xs text-dlq-gold/80">{groupedByPillar[p].length} result{groupedByPillar[p].length === 1 ? '' : 's'}</span>
              </summary>
              <div className="p-3 grid md:grid-cols-2 gap-3">
                {groupedByPillar[p].map((s) => (
                  <ServiceCard key={s.slug} s={s} />
                ))}
                {groupedByPillar[p].length === 0 && (
                  <div className="text-sm opacity-70">No matches in this category.</div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* All results with infinite scroll */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-xl font-medium text-dlq-gold mb-3">All results</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {visible.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
        <div ref={sentinelRef} className="h-10" />
        <div className="mt-2 text-sm text-gray-300">Showing {visible.length} of {filtered.length}</div>
      </section>
    </div>
  )
}

function ServiceCard({ s }: { s: Service }) {
  return (
  <div className="rounded border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 p-4 transition hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-100">{s.title}</h3>
        {s.tags && (
          <div className="flex gap-2">
            {s.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-dlq-gold/10 text-dlq-gold border border-dlq-gold/30">{t}</span>
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-300 mt-1">{s.summary}</p>
      <div className="mt-3 flex gap-2">
        <a href={`/services/${s.slug}`} className="inline-block text-xs px-3 py-1 rounded bg-dlq-gold text-[#0a1a4f] font-semibold">Learn more</a>
        <a href={`/services/${s.slug}#get-started`} className="inline-block text-xs px-3 py-1 rounded border border-dlq-gold text-dlq-gold">Get a quote</a>
      </div>
    </div>
  )
}

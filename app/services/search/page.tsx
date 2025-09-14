// @ts-nocheck
"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import { services } from "../../../lib/services-data"
import type { Service } from "../../../lib/services-data"

const TAGS = ["Vegan", "Halal", "Gluten-Free", "Urgent", "Tracked", "Same-day", "Certified"] as const

export default function ServicesSearchPage() {
  const [q, setQ] = useState("")
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 8

  const toggleTag = (tag: string) => {
    setPage(1)
    setActiveTags((prev: string[]) => prev.includes(tag) ? prev.filter((t: string) => t !== tag) : [...prev, tag])
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return services.filter((s) => {
      const matchQ = !term || s.title.toLowerCase().includes(term) || s.summary.toLowerCase().includes(term) || s.sections.overview.toLowerCase().includes(term)
      const matchTags = activeTags.length === 0 || (s.tags && activeTags.every((t: string) => s.tags!.includes(t)))
      return matchQ && matchTags
    })
  }, [q, activeTags])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const results = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  // Optional voice input (Web Speech API)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as any
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const rec = new SpeechRecognition()
    rec.lang = 'en-GB'
    rec.continuous = false
    rec.interimResults = false
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join(' ')
      setQ(text)
      setListening(false)
    }
    rec.onend = () => setListening(false)
    recognitionRef.current = rec
  }, [])

  const startVoice = () => {
    if (!recognitionRef.current) return
    setListening(true)
    recognitionRef.current.start()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-4">Find a service</h1>
      <div className="flex gap-2 mb-3">
  <input value={q} onChange={(e: any) => { setPage(1); setQ(e.target.value) }} placeholder="Search services..."
               className="flex-1 border border-dlq-gold/30 bg-[#0f2238] text-gray-100 placeholder:text-gray-400 rounded px-4 py-2" />
        <button onClick={startVoice} disabled={listening} className="text-xs px-3 py-2 rounded border border-dlq-gold text-dlq-gold disabled:opacity-50">{listening ? 'Listening…' : 'Voice'}</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {TAGS.map(tag => (
          <button key={tag} onClick={() => toggleTag(tag)}
                  className={`text-[10px] px-2 py-1 rounded-full border ${activeTags.includes(tag) ? 'bg-dlq-gold text-[#0a1a4f] border-dlq-gold' : 'bg-dlq-gold/10 text-dlq-gold border-dlq-gold/30'}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
  {results.map((s: Service) => (
          <div key={s.slug} className="border border-dlq-gold/20 rounded p-4 bg-[#0f2238] hover:bg-white/5 transition">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-100">{s.title}</h2>
              {s.tags && (
                <div className="flex gap-2">
                  {s.tags.map((t: string) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-dlq-gold/10 text-dlq-gold border border-dlq-gold/30">
                      {t}
                    </span>
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
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 text-sm">
        <div className="text-gray-300">Page {page} of {totalPages} • {total} result{total === 1 ? '' : 's'}</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p: number) => Math.max(1, p-1))} className="px-3 py-1 rounded border border-dlq-gold text-dlq-gold disabled:opacity-50">Prev</button>
          <button disabled={page >= totalPages} onClick={() => setPage((p: number) => Math.min(totalPages, p+1))} className="px-3 py-1 rounded border border-dlq-gold text-dlq-gold disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useMemo, useState } from "react"
import { services } from "../../../lib/services-data"

export default function ServicesSearchPage() {
  const [q, setQ] = useState("")
  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return services
    return services.filter(s => (
      s.title.toLowerCase().includes(term) ||
      s.summary.toLowerCase().includes(term) ||
      s.sections.overview.toLowerCase().includes(term)
    ))
  }, [q])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-4">Find a service</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services..."
             className="w-full border border-dlq-gold/30 bg-[#0f2238] text-gray-100 placeholder:text-gray-400 rounded px-4 py-2 mb-6" />

      <div className="grid md:grid-cols-2 gap-4">
        {results.map((s) => (
          <a key={s.slug} href={`/services/${s.slug}`} className="block border border-dlq-gold/20 rounded p-4 bg-[#0f2238] hover:bg-white/5 transition">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-100">{s.title}</h2>
              {s.tags && (
                <div className="flex gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-dlq-gold/10 text-dlq-gold border border-dlq-gold/30">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-300 mt-1">{s.summary}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

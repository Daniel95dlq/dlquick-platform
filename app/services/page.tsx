import Link from 'next/link'
import { services } from '@/src/lib/services'

export default function ServicesPage() {
  const byPillar = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.pillar] ||= []).push(s)
    return acc
  }, {})

  const pillars = Object.keys(byPillar)

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-navy via-[#0A1224] to-brand-navy px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10 text-yellow-300">Services</h1>
        <div className="space-y-10">
          {pillars.map((pillar) => (
            <section key={pillar}>
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-200 mb-4">{pillar}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {byPillar[pillar].map((s) => (
                  <Link href={`/services/${s.slug}`} key={s.slug} className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all block">
                    <div className="text-yellow-300 font-bold text-lg mb-1">{s.title}</div>
                    <div className="text-gray-200/90 mb-2">{s.summary}</div>
                    {s.tags && (
                      <div className="flex flex-wrap gap-2 text-xs">
                        {s.tags.map(t => (
                          <span key={t} className="px-2 py-1 rounded border border-yellow-400/40 text-yellow-200/90">{t}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

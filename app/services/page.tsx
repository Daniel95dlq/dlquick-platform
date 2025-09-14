import { pillars, getServicesByPillar } from "../../lib/services-data"

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-2">Services</h1>
  <p className="text-gray-200 mb-8">Explore our full suite of services tailored to your needs.</p>
      <div className="space-y-8">
        {pillars.map((pillar) => (
          <section key={pillar} className="border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
            <h2 className="text-2xl font-semibold text-dlq-gold mb-2">{pillar}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {getServicesByPillar(pillar).map((s) => (
                <div key={s.slug} className="border border-dlq-gold/20 rounded-lg p-4 hover:bg-white/5 transition">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-100">{s.title}</h3>
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
                  <p className="text-gray-300 text-sm mt-1">{s.summary}</p>
                  {s.comingSoon && (
                    <div className="mt-2 text-xs text-[#ffd28a] bg-[#3a2a0a] inline-block px-2 py-0.5 rounded border border-[#b07b00]">Coming soon</div>
                  )}
                  <div className="mt-3 flex gap-2">
                    <a href={`/services/${s.slug}`} className="inline-block text-xs px-3 py-1 rounded bg-dlq-gold text-[#0a1a4f] font-semibold">Learn more</a>
                    <a href={`/services/${s.slug}#get-started`} className="inline-block text-xs px-3 py-1 rounded border border-dlq-gold text-dlq-gold">Get a quote</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

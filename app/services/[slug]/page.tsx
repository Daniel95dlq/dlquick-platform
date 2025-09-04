import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { services, type Service } from '@/src/lib/services'

type Params = { slug: string }

function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = getService(params.slug)
  if (!s) return { title: 'Service not found • DLQuick' }
  const title = `${s.title} • DLQuick Services`
  const description = s.summary
  return {
    title,
    description,
    openGraph: { title, description, images: ['/og.jpg'] },
  }
}

export default function ServiceDetail({ params }: { params: Params }) {
  const s = getService(params.slug)
  if (!s) return notFound()

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-navy via-[#0A1224] to-brand-navy px-6 py-24">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-yellow-200/80 text-sm mb-2">{s.pillar}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 mb-3">{s.title}</h1>
              <p className="text-gray-200/90 text-lg max-w-3xl">{s.summary}</p>
            </div>
            <div className="text-right">
              {s.comingSoon ? (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-400/40">
                  Coming Soon
                </span>
              ) : (
                <Link href="/track" className="inline-block px-5 py-2 rounded-lg font-semibold bg-brand-gold text-brand-navy border border-yellow-400/50 shadow hover:bg-yellow-400 transition">
                  Get quote
                </Link>
              )}
            </div>
          </div>
          {s.tags && s.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {s.tags.map((t) => (
                <span key={t} className="px-2 py-1 rounded border border-yellow-400/40 text-yellow-200/90 text-xs">
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {s.sections.overview && (
              <section className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur">
                <h2 className="text-xl font-bold text-yellow-200 mb-3">Overview</h2>
                <p className="text-gray-200/90 leading-relaxed whitespace-pre-line">{s.sections.overview}</p>
              </section>
            )}

            {/* Included */}
            {s.sections.included?.length > 0 && (
              <section className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur">
                <h2 className="text-xl font-bold text-yellow-200 mb-3">Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.sections.included.map((item) => (
                    <li key={item} className="text-gray-200/90">
                      • {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Options */}
            {s.sections.options && s.sections.options.length > 0 && (
              <section className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur">
                <h2 className="text-xl font-bold text-yellow-200 mb-3">Options</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.sections.options.map((item) => (
                    <li key={item} className="text-gray-200/90">
                      • {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQs */}
            {s.sections.faqs && s.sections.faqs.length > 0 && (
              <section className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur">
                <h2 className="text-xl font-bold text-yellow-200 mb-4">FAQs</h2>
                <div className="space-y-4">
                  {s.sections.faqs.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="cursor-pointer font-semibold text-white group-open:text-yellow-300">
                        {f.q}
                      </summary>
                      <p className="mt-2 text-gray-200/90">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {s.sections.pricingNotes && s.sections.pricingNotes.length > 0 && (
              <div className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur">
                <h3 className="text-lg font-bold text-yellow-200 mb-3">Pricing notes</h3>
                <ul className="space-y-2 text-gray-200/90">
                  {s.sections.pricingNotes.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
              </div>
            )}

            {s.sections.policies && s.sections.policies.length > 0 && (
              <div className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur">
                <h3 className="text-lg font-bold text-yellow-200 mb-3">Policies</h3>
                <ul className="space-y-2 text-gray-200/90">
                  {s.sections.policies.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
              </div>
            )}

            {!s.comingSoon && (
              <div className="p-6 rounded-2xl border border-brand-gold/30 bg-brand-gold/10">
                <div className="text-yellow-200 font-semibold mb-2">Ready to book?</div>
                <Link href="/track" className="inline-block w-full text-center px-4 py-2 rounded-lg bg-brand-gold text-brand-navy font-bold border border-yellow-400/50">
                  Get a quote
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}

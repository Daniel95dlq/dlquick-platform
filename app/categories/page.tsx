import { pillars, getServicesByPillar } from "../../lib/services-data"
import { CategoryIcon } from "../../components/site/icons"

export default function CategoriesIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-2">Categories</h1>
      <p className="text-gray-200 mb-8">Browse categories and subcategories.</p>
      <div className="space-y-8">
    {pillars.map(cat => (
          <section key={cat} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <h2 className="text-2xl text-dlq-gold mb-3 flex items-center gap-2"><CategoryIcon name={cat} /> {cat}</h2>
            <div className="flex flex-wrap gap-3">
              {getServicesByPillar(cat).map(s => (
                <a key={s.slug} href={`/services/${s.slug}`} className="px-3 py-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">{s.title}</a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

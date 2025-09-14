import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Platform Overview',
  description: 'Highlights from DLQuick PDF specs: platform, POS, legal, branding, and fees.',
}

function readDoc(rel: string) {
  try {
    const p = path.join(process.cwd(), rel)
    return fs.readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

function Section({ title, body }: { title: string, body: string }) {
  if (!body) return null
  const snippet = body.length > 2000 ? body.slice(0, 2000) + '\n\n…' : body
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-dlq-gold mb-3">{title}</h2>
      <pre className="whitespace-pre-wrap rounded-lg bg-black/20 p-4 text-sm leading-relaxed text-gray-100 border border-white/10">
        {snippet}
      </pre>
    </section>
  )
}

export default function OverviewPage() {
  const legalPack = readDoc('docs/ingested/DLQuick_Web_Platform_and_Legal_Pack.txt')
  const megaWithWires = readDoc('docs/ingested/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.txt')
  const masterBible = readDoc('docs/ingested/DLQuick_Master_Bible.txt')
  const allInOne = readDoc('docs/ingested/DLQuick_All_In_One_Developer_Bible.txt')

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-semibold text-dlq-gold mb-6">DLQuick Platform Overview</h1>
      <p className="text-gray-300 mb-8">
        Live extracts from your private PDFs as ingested in this repo. This page is for verification that
        requirements from the packs are visible on the deployed site.
      </p>

      <Section title="Web Platform & Legal Master Pack" body={legalPack} />
      <Section title="Mega Master Developer Pack (With Wireframes)" body={megaWithWires} />
      <Section title="Developer Master Bible (extract)" body={masterBible} />
      <Section title="All-in-One Developer Bible (extract)" body={allInOne} />

      <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-400">
        <p>Notes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Legal PDFs are still blocked from direct access and disallowed to crawlers.</li>
          <li>This page surfaces the text extracted during ingestion and is safe to show.</li>
          <li>If you want a curated spec page instead of raw extracts, I can replace snippets with designed sections.</li>
        </ul>
      </div>
    </div>
  )
}

import { Button } from "../../components/ui/button"

export default function LegalPackPage() {
  const pdfPath = "/DLQuick_Web_Platform_and_Legal_Pack.pdf"
  const extraPackPath = "/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf"
  return (
    <section className="px-4 py-10 text-gray-100">
      <div className="max-w-5xl mx-auto">
  <h1 className="text-3xl md:text-4xl font-serif text-dlq-gold mb-3">DLQuick Web Platform & Legal Pack</h1>
        <p className="mb-5 text-gray-200">View or download the legal pack as a PDF.</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <a href={pdfPath} download>
            <Button>Download PDF</Button>
          </a>
          <a href={pdfPath} target="_blank" rel="noreferrer">
            <Button variant="outline">Open in new tab</Button>
          </a>
        </div>
        <div className="border border-dlq-gold/40 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={pdfPath}
            className="w-full h-[80vh] bg-white"
            title="DLQuick Legal Pack"
          />
        </div>

        <h2 className="text-2xl font-serif text-dlq-gold mb-3">Extra Pack</h2>
        <p className="mb-5 text-gray-200">Additional details PDF.</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <a href={extraPackPath} download>
            <Button>Download Extra Pack</Button>
          </a>
          <a href={extraPackPath} target="_blank" rel="noreferrer">
            <Button variant="outline">Open Extra Pack</Button>
          </a>
        </div>
        <div className="border border-dlq-gold/40 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={extraPackPath}
            className="w-full h-[80vh] bg-white"
            title="DLQuick Extra Pack"
          />
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <h1 className="text-3xl font-bold mb-4 text-dlq-gold">Contact</h1>
        <p className="text-gray-200 mb-6">For partnerships, questions, or support, use the details below.</p>
        <div className="space-y-2 text-gray-100/90">
        <p>Email: support@dlquick.com</p>
        <p>Phone: +44 0000 000000</p>
        <p>Address: London, UK</p>
        </div>
      </div>
    </div>
  )
}

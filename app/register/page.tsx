export default function RegisterIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-3">Register</h1>
      <p className="text-gray-200 mb-6">Choose how you want to join DLQuick.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="/partners/drivers/register" className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition">Driver</a>
        <a href="/partners/merchants/register" className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition">Merchant / Shop</a>
        <a href="/partners/ltd/register" className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition">LTD Partner</a>
      </div>
    </div>
  )
}

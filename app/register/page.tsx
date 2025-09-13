export default function RegisterIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-3">Register</h1>
      <p className="text-gray-200 mb-6">Choose how you want to join DLQuick.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <a href="/partners/drivers/register" className="border border-dlq-gold/30 rounded p-5 hover:bg-white/5">Driver</a>
        <a href="/partners/merchants/register" className="border border-dlq-gold/30 rounded p-5 hover:bg-white/5">Merchant / Shop</a>
        <a href="/partners/ltd/register" className="border border-dlq-gold/30 rounded p-5 hover:bg-white/5">LTD Partner</a>
      </div>
    </div>
  )
}

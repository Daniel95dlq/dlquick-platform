export default function PartnersIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-3">Partners</h1>
      <p className="text-gray-200 mb-6">Join DLQuick as a Driver, Merchant/Shop, or LTD Partner.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <a className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition" href="/partners/drivers/register">
          <h2 className="text-lg text-dlq-gold mb-1">Drivers</h2>
          <p className="text-sm text-gray-300">Courier, rider, or van driver. UK licence, insurance, right to work.</p>
        </a>
        <a className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition" href="/partners/merchants/register">
          <h2 className="text-lg text-dlq-gold mb-1">Merchants / Shops</h2>
          <p className="text-sm text-gray-300">Restaurants, stores, trades. Company details and compliance.</p>
        </a>
        <a className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 supports-[backdrop-filter]:backdrop-blur-xl p-5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition" href="/partners/ltd/register">
          <h2 className="text-lg text-dlq-gold mb-1">LTD Partners</h2>
          <p className="text-sm text-gray-300">Limited companies partnering for logistics and services.</p>
        </a>
      </div>
    </div>
  )
}

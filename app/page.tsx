export default function Home() {
  const services = [
    { title: 'Gourmet Dining', desc: 'Premium restaurants delivered fast' },
    { title: 'Groceries', desc: 'Fresh groceries in 30 minutes' },
    { title: 'Parcels', desc: 'Same-day local deliveries' },
    { title: 'Removals', desc: 'White-glove moving services' },
    { title: 'Trades', desc: 'Certified trades & repairs' },
    { title: 'Business', desc: 'B2B logistics solutions' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-navy via-[#0A1224] to-brand-navy">
      {/* Royal Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e3a8a_0%,_transparent_60%)] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Premium Logo */}
          <div className="mb-10">
            <div className="mx-auto w-40 h-40 rounded-full bg-brand-gold/10 backdrop-blur-sm animate-pulse" />
            <img
              src="/dlq-premium-logo.svg"
              alt="DLQuick Premium"
              className="w-40 h-40 mx-auto -mt-40 drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.6))' }}
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold bg-clip-text text-transparent">
              DLQuick
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100/90 max-w-3xl mx-auto mb-10">
            The UK’s most royal delivery platform — from premium dining to executive removals, with crown-level excellence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="/services" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-bold text-brand-navy bg-gradient-to-r from-brand-gold to-yellow-500 shadow-2xl hover:from-yellow-400 hover:to-brand-gold transition-all">
              <span className="relative z-10 flex items-center gap-2">👑 Royal Services</span>
              <span className="absolute inset-0 rounded-2xl bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </a>
            <a href="/track" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl text-lg font-semibold text-yellow-300 border-2 border-brand-gold/60 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all">
              📱 Track Royal Order
            </a>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all text-left">
                <h3 className="text-xl font-bold text-yellow-300 mb-2">{s.title}</h3>
                <p className="text-gray-200/90">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Royal Stats */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { k: '50K+', v: 'Royal Customers' },
            { k: '200+', v: 'UK Cities' },
            { k: '99.9%', v: 'Satisfaction' },
          ].map((it) => (
            <div key={it.k} className="text-center p-10 rounded-2xl border border-brand-gold/20 bg-white/5 backdrop-blur-xl">
              <div className="text-5xl font-extrabold text-brand-gold mb-2">{it.k}</div>
              <div className="text-gray-200">{it.v}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
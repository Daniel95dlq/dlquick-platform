export default function Home() {
	const categories = [
		{ name: 'Deliveries', href: '/services?cat=deliveries', icon: '📦' },
		{ name: 'Groceries', href: '/services?cat=groceries', icon: '🛒' },
		{ name: 'Food', href: '/services?cat=food', icon: '🍔' },
		{ name: 'Marketplace', href: '/services?cat=marketplace', icon: '🛍️' },
		{ name: 'Removals', href: '/services?cat=removals', icon: '🏠' },
		{ name: 'Trades', href: '/services?cat=trades', icon: '🛠️' },
		{ name: 'Auto', href: '/services?cat=auto', icon: '🚗' },
		{ name: 'Pets', href: '/services?cat=pets', icon: '🐾' },
		{ name: 'Events', href: '/services?cat=events', icon: '🎉' },
		{ name: 'Business Services', href: '/services?cat=business', icon: '💼' },
	]
	return (
		<main>
			{/* Hero with double CTA */}
			<section className="relative min-h-[70vh] flex items-center">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.06),transparent_40%)]" />
				<div className="relative mx-auto max-w-6xl px-4 py-20 grid gap-8">
					<div className="max-w-2xl">
						<h1 className="text-4xl md:text-6xl font-serif tracking-wide text-dlq-gold mb-4">On‑demand deliveries, groceries and services</h1>
						<p className="text-lg md:text-xl text-gray-200 mb-8">Premium, fast and reliable. Get a quote or partner with DLQuick today.</p>
						<div className="flex items-center gap-4">
							<a href="/services" className="inline-flex items-center justify-center bg-dlq-gold text-[#0a1a4f] hover:bg-dlq-gold-600 rounded-md px-6 py-3 font-medium shadow-lg">Get a Quote</a>
							<a href="/partners" className="inline-flex items-center justify-center border border-dlq-gold text-dlq-gold hover:bg-dlq-gold/10 rounded-md px-6 py-3 font-medium">Partner with DLQuick</a>
						</div>
					</div>
				</div>
			</section>

			{/* Categories grid */}
			<section className="py-12">
				<div className="mx-auto max-w-6xl px-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-medium">Explore categories</h2>
						<a className="text-sm underline" href="/services">View all services</a>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
						{categories.map((c) => (
							<a key={c.name} href={c.href} className="group border border-white/10 rounded p-4 hover:bg-white/5 transition">
								<div className="text-2xl mb-2" aria-hidden>{c.icon}</div>
								<div className="font-medium">{c.name}</div>
								<div className="text-xs opacity-70 mt-1 group-hover:opacity-90">Book Now · Get a Quote</div>
							</a>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

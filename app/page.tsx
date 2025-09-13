export default function Home() {
	return (
		<section className="relative min-h-[70vh] flex items-center">
			<div className="mx-auto max-w-6xl px-4 py-20 grid gap-8">
				<div className="max-w-2xl">
					<h1 className="text-4xl md:text-6xl font-serif tracking-wide text-dlq-gold mb-4">On-demand deliveries and services</h1>
					<p className="text-lg md:text-xl text-gray-200 mb-8">Fast, reliable and professional—get a tailored quote in minutes.</p>
					<div className="flex items-center gap-4">
						<a href="/services" className="inline-flex items-center justify-center bg-dlq-gold text-[#0E2640] hover:bg-dlq-gold-600 rounded-md px-6 py-3 font-medium">Browse services</a>
						<a href="/legal" className="inline-flex items-center justify-center border border-dlq-gold text-dlq-gold hover:bg-dlq-gold/10 rounded-md px-6 py-3 font-medium">Legal Pack</a>
					</div>
				</div>
			</div>
		</section>
	)
}

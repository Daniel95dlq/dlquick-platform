import BrandLogo from "./brand-logo"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-dlq-navy/80 backdrop-blur supports-[backdrop-filter]:bg-dlq-navy/70 text-dlq-gold">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <BrandLogo className="w-7 h-7" fill="#D4AF37" />
          <span className="text-lg tracking-wide text-dlq-gold group-hover:opacity-90">DLQuick</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-dlq-gold">
          <a href="/explore" className="hover:opacity-90">Explore</a>
          <a href="/partners/drivers" className="hover:opacity-90">Drivers</a>
          <a href="/partners/merchants" className="hover:opacity-90">Merchants</a>
          <a href="/register" className="hover:opacity-90">Register</a>
          <a href="/contact" className="hover:opacity-90">Contact</a>
          <a href="/admin" className="hover:opacity-90">Admin</a>
        </nav>
      </div>
    </header>
  )
}

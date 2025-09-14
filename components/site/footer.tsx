export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dlq-navy/70 backdrop-blur supports-[backdrop-filter]:bg-dlq-navy/60 mt-16 text-dlq-gold">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="DLQuick" className="w-6 h-6" />
          <span>© {new Date().getFullYear()} DLQuick</span>
        </a>
        <nav className="flex items-center gap-4">
          <a href="/privacy" className="hover:opacity-90">Privacy</a>
          <a href="/terms" className="hover:opacity-90">Terms</a>
          <a href="/partners" className="hover:opacity-90">Partners</a>
          <a href="/register" className="hover:opacity-90">Register</a>
        </nav>
      </div>
    </footer>
  )
}

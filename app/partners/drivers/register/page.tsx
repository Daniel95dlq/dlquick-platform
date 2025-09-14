export default function DriversRegisterPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur supports-[backdrop-filter]:bg-white/5 shadow-xl">
        <h1 className="text-3xl font-semibold text-white">Register as a Driver</h1>
        <p className="mt-3 text-slate-300">
          Join DLQuick to accept delivery requests in your area. Fill in your details and we’ll
          get back to you shortly.
        </p>
        <div className="mt-6">
          <a
            href="/partners/register?role=driver"
            className="inline-flex items-center justify-center rounded-lg bg-amber-400/90 px-5 py-3 font-medium text-slate-900 hover:bg-amber-300 transition-colors"
          >
            Continue to registration
          </a>
        </div>
      </div>
    </main>
  )
}

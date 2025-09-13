export default function DriversPartnerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-3">Drivers</h1>
      <p className="text-gray-600 mb-6">Join DLQuick as a Driver. Transparent payouts, routes, and proof of delivery. Detalii conform pachetului legal.</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Onboarding și verificări</li>
        <li>Planificare rute, multi-stop</li>
        <li>Policy: dovezi foto/semnătură, retururi</li>
        <li>Payouts: comisioane și split-uri</li>
      </ul>
      <div className="mt-8">
        <a href="/legal" className="underline text-blue-600">Vezi pachetul legal</a>
      </div>
    </div>
  )
}

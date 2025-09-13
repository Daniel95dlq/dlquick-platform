export default function MerchantsPartnerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-3">Merchants</h1>
      <p className="text-gray-600 mb-6">Conectați-vă magazinul la DLQuick pentru livrare, click & collect, retururi. Detalii conform pachetului legal.</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Integrare și validare comenzi</li>
        <li>Slots, livrare programată, retururi</li>
        <li>Comisioane și taxe platformă</li>
        <li>Politici de suport și litigii</li>
      </ul>
      <div className="mt-8">
        <a href="/legal" className="underline text-blue-600">Vezi pachetul legal</a>
      </div>
    </div>
  )
}

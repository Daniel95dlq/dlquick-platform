import { getServiceBySlug } from "../../../lib/services-data"
import QuoteForm from "../../../components/forms/QuoteForm"

const quoteFieldsByService: Record<string, any[]> = {
  food: [
    { name: 'restaurant', label: 'Restaurant name', type: 'text', required: true },
    { name: 'pickupAddress', label: 'Pickup address', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
    { name: 'deliveryWindow', label: 'Preferred delivery window', type: 'text' },
  ],
  groceries: [
    { name: 'store', label: 'Store', type: 'text' },
    { name: 'list', label: 'Shopping list', type: 'textarea', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
  ],
  parcels: [
    { name: 'parcelCount', label: 'Number of parcels', type: 'number', required: true },
    { name: 'pickupAddress', label: 'Pickup address', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
  ],
  'click-collect': [
    { name: 'orderRef', label: 'Order reference', type: 'text', required: true },
    { name: 'store', label: 'Store', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
  ],
  'people-to-people': [
    { name: 'item', label: 'Item description', type: 'text', required: true },
    { name: 'pickupAddress', label: 'Pickup address', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
  ],
  'locker-to-people': [
    { name: 'lockerProvider', label: 'Locker provider (InPost/Amazon)', type: 'text', required: true },
    { name: 'pickupCode', label: 'Locker OTP/QR code', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
  ],
  'store-to-home': [
    { name: 'item', label: 'Item(s)', type: 'text', required: true },
    { name: 'helpers', label: 'Helpers needed', type: 'select', options: ['No', '1 helper', '2 helpers'] },
    { name: 'pickupAddress', label: 'Store/warehouse address', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'Delivery address', type: 'text', required: true },
  ],
  removals: [
    { name: 'propertyType', label: 'Property type', type: 'select', options: ['Flat', 'House', 'Office'], required: true },
    { name: 'bedrooms', label: 'Bedrooms (if home)', type: 'number' },
    { name: 'helpers', label: 'Helpers needed', type: 'select', options: ['0', '1', '2', '3+'] },
    { name: 'pickupAddress', label: 'From', type: 'text', required: true },
    { name: 'deliveryAddress', label: 'To', type: 'text', required: true },
    { name: 'date', label: 'Preferred date', type: 'date' },
  ],
  electrician: [
    { name: 'jobType', label: 'Job type', type: 'text', required: true },
    { name: 'address', label: 'Property address', type: 'text', required: true },
    { name: 'date', label: 'Preferred date', type: 'date' },
  ],
  plumber: [
    { name: 'issue', label: 'Issue description', type: 'textarea', required: true },
    { name: 'address', label: 'Property address', type: 'text', required: true },
    { name: 'urgency', label: 'Urgency', type: 'select', options: ['Emergency', 'Soon', 'Flexible'] },
  ],
  handyman: [
    { name: 'tasks', label: 'Tasks', type: 'textarea', required: true },
    { name: 'address', label: 'Property address', type: 'text', required: true },
  ],
  cleaning: [
    { name: 'cleanType', label: 'Cleaning type', type: 'select', options: ['Standard', 'Deep', 'End of tenancy'], required: true },
    { name: 'rooms', label: 'Rooms (approx.)', type: 'number' },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'materials', label: 'Include materials', type: 'select', options: ['Yes', 'No'] },
  ],
  gardening: [
    { name: 'work', label: 'Work details', type: 'textarea', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'waste', label: 'Waste removal', type: 'select', options: ['Yes', 'No'] },
  ],
  tyre: [
    { name: 'vehicle', label: 'Vehicle', type: 'text', required: true },
    { name: 'size', label: 'Tyre size', type: 'text' },
    { name: 'location', label: 'Location', type: 'text', required: true },
  ],
  barber: [
    { name: 'service', label: 'Service', type: 'select', options: ['Haircut', 'Beard', 'Both'] },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'date', label: 'Preferred date', type: 'date' },
  ],
  'dog-walking': [
    { name: 'dog', label: 'Dog details', type: 'textarea', required: true },
    { name: 'frequency', label: 'Frequency', type: 'select', options: ['One-off', 'Weekly', 'Daily'] },
    { name: 'pickupAddress', label: 'Pickup address', type: 'text', required: true },
  ],
  'b2b-logistics': [
    { name: 'company', label: 'Company', type: 'text', required: true },
    { name: 'scope', label: 'Scope/volume', type: 'textarea', required: true },
    { name: 'contact', label: 'Contact person', type: 'text', required: true },
  ],
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-gray-100">
        <h1 className="text-2xl font-bold text-dlq-gold">Service not found</h1>
        <p className="mt-2 text-gray-300"><a href="/services" className="underline">Back to services</a></p>
      </div>
    )
  }

  const { title, summary, sections, tags, comingSoon } = service

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-gray-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-dlq-gold mb-1">{title}</h1>
          <p className="text-gray-200">{summary}</p>
        </div>
        <div className="flex gap-2">
          {tags?.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-dlq-gold/10 text-dlq-gold border border-dlq-gold/30 h-fit">
              {t}
            </span>
          ))}
          {comingSoon && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3a2a0a] text-[#ffd28a] border border-[#b07b00] h-fit">
              Coming soon
            </span>
          )}
        </div>
      </div>

  <div className="mt-8 grid md:grid-cols-2 gap-6">
        <section className="border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
          <h2 className="font-semibold text-dlq-gold mb-2">Overview</h2>
          <p className="text-gray-200 text-sm leading-relaxed">{sections.overview}</p>
        </section>

        <section className="border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
          <h2 className="font-semibold text-dlq-gold mb-2">Included</h2>
          <ul className="text-gray-200 text-sm list-disc pl-5 space-y-1">
            {sections.included.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        {sections.options && (
          <section className="border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
            <h2 className="font-semibold text-dlq-gold mb-2">Options</h2>
            <ul className="text-gray-200 text-sm list-disc pl-5 space-y-1">
              {sections.options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
        )}

        {sections.pricingNotes && (
          <section className="border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
            <h2 className="font-semibold text-dlq-gold mb-2">Pricing notes</h2>
            <ul className="text-gray-200 text-sm list-disc pl-5 space-y-1">
              {sections.pricingNotes.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        )}

        {sections.policies && (
          <section className="border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
            <h2 className="font-semibold text-dlq-gold mb-2">Policies</h2>
            <ul className="text-gray-200 text-sm list-disc pl-5 space-y-1">
              {sections.policies.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        )}

        {sections.faqs && sections.faqs.length > 0 && (
          <section className="md:col-span-2 border border-dlq-gold/30 rounded-lg bg-[#0f2238] p-5">
            <h2 className="font-semibold text-dlq-gold mb-2">FAQs</h2>
            <div className="divide-y">
              {sections.faqs.map((f) => (
                <div key={f.q} className="py-3">
                  <p className="font-medium text-gray-100">Q: {f.q}</p>
                  <p className="text-gray-200 text-sm mt-1">A: {f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

  <div id="get-started" className="mt-10 border border-dlq-gold/30 rounded-lg bg-[#10243d] p-5">
        <h2 className="font-semibold text-dlq-gold mb-3">Get started</h2>
        <p className="text-gray-200 text-sm mb-4">Tell us a few details and we’ll send you a quote.</p>
        <QuoteForm serviceSlug={service.slug} serviceTitle={service.title} fields={quoteFieldsByService[service.slug] ?? []} />
      </div>

      <div className="mt-8 text-sm text-gray-300">
        Sections above summarise our standard approach. Full policy texts will be published soon.
      </div>
    </div>
  )
}

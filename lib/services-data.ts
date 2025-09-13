export type Pillar =
  | 'Deliveries'
  | 'Removals'
  | 'Trades & Repairs'
  | 'Home & Garden'
  | 'Auto & Transport'
  | 'Personal & Events'
  | 'Pets'
  | 'Business & Logistics'

export type FAQ = { q: string; a: string }

export type Service = {
  slug: string
  title: string
  pillar: Pillar
  summary: string
  tags?: string[]
  comingSoon?: boolean
  sections: {
    overview: string
    included: string[]
    options?: string[]
    pricingNotes?: string[]
    policies?: string[]
    faqs?: FAQ[]
  }
}

export const services: Service[] = [
  {
    slug: 'food',
    title: 'Food Delivery',
    pillar: 'Deliveries',
    summary: 'Restaurante la ușă. Local, rapid, cu dovezi de livrare.',
    tags: ['Same-day'],
    sections: {
      overview: 'Livrare mâncare din restaurante/fast-food local.',
      included: ['Preluare din restaurant', 'Livrare la adresă', 'Timer sosire', 'Dovadă livrare (foto)'],
      options: ['Instrucțiuni specifice', 'Livrare contactless'],
      pricingNotes: ['Comision platformă 20%', 'Driver min £4/comandă'],
      policies: ['Food returns: fără ramburs (igienă & siguranță)'],
      faqs: [
        { q: 'Pot modifica adresa după plasare?', a: 'Doar înainte de preluare; altfel anulare + rebook.' },
      ],
    },
  },
  {
    slug: 'locksmith',
    title: 'Locksmith',
    pillar: 'Trades & Repairs',
    summary: '24/7 access and lock solutions.',
    sections: {
      overview: 'Emergency and scheduled locksmith services.',
      included: ['Call-out', 'Unlock/Replace locks', 'Basic security advice'],
      pricingNotes: ['DLQ 15%'],
      policies: ['ID may be required for property access'],
      faqs: [],
    },
  },
  {
    slug: 'car-body',
    title: 'Car Body Repairs',
    pillar: 'Trades & Repairs',
    summary: 'Bodywork repairs and paint correction.',
    sections: {
      overview: 'Mobile or workshop car body repairs.',
      included: ['Assessment', 'Repair/paint', 'Quality check'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Work may require workshop drop-off'],
      faqs: [],
    },
  },
  {
    slug: 'wheels-refurb',
    title: 'Wheels Refurbishment',
    pillar: 'Trades & Repairs',
    summary: 'Alloy wheel refurbishment and finishing.',
    sections: {
      overview: 'Refurbishing alloy wheels (curb rash, colour refresh).',
      included: ['Preparation', 'Refinish', 'Protective coat'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Colour matching subject to availability'],
      faqs: [],
    },
  },
  {
    slug: 'mobile-mechanic',
    title: 'Mobile Mechanical Call-Outs',
    pillar: 'Trades & Repairs',
    summary: 'Mobile mechanic diagnostics and minor repairs.',
    sections: {
      overview: 'On-site diagnostic and small repairs.',
      included: ['Diagnostic', 'Repair if possible', 'Report'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Complex jobs may require a workshop'],
      faqs: [],
    },
  },
  {
    slug: 'moto-services',
    title: 'Motorcycle Transport & Repairs',
    pillar: 'Trades & Repairs',
    summary: 'Bike transport and repair services.',
    sections: {
      overview: 'Transport and repair for motorcycles.',
      included: ['Transport', 'Repair assessment'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Securing methods compliant with standards'],
      faqs: [],
    },
  },
  {
    slug: 'window-cleaning',
    title: 'Window Cleaning',
    pillar: 'Home & Garden',
    summary: 'Residential and commercial window cleaning.',
    sections: {
      overview: 'Pure water pole or traditional cleaning.',
      included: ['External windows', 'Frames (on request)'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Weather-dependent scheduling'],
      faqs: [],
    },
  },
  {
    slug: 'cars',
    title: 'Car Ads',
    pillar: 'Auto & Transport',
    summary: 'Listing cars for sale (coming soon).',
    comingSoon: true,
    sections: {
      overview: 'Marketplace for cars.',
      included: ['Listing tools'],
      pricingNotes: ['Listing fee'],
      policies: ['No odometer fraud'],
      faqs: [],
    },
  },
  {
    slug: 'car-parts',
    title: 'Car Parts',
    pillar: 'Auto & Transport',
    summary: 'Marketplace for parts (coming soon).',
    comingSoon: true,
    sections: {
      overview: 'Listings for car parts.',
      included: ['Listing tools'],
      pricingNotes: ['—'],
      policies: ['Prohibited items list'],
      faqs: [],
    },
  },
  {
    slug: 'beauty',
    title: 'Beauty (Hair & Nails)',
    pillar: 'Personal & Events',
    summary: 'Mobile or in-salon beauty services.',
    sections: {
      overview: 'Hair, nails, and beauty treatments.',
      included: ['Appointment', 'Hygiene standards'],
      pricingNotes: ['£30/month in-store subs (example)'],
      policies: ['Hygiene & safety'],
      faqs: [],
    },
  },
  {
    slug: 'photographers',
    title: 'Photographers',
    pillar: 'Personal & Events',
    summary: 'Event and commercial photography.',
    sections: {
      overview: 'Photography sessions with deliverables.',
      included: ['Shoot', 'Editing', 'Delivery'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Usage rights clarified in booking'],
      faqs: [],
    },
  },
  {
    slug: 'djs',
    title: 'DJs',
    pillar: 'Personal & Events',
    summary: 'Music for events, with equipment options.',
    sections: {
      overview: 'DJ services for events.',
      included: ['Set', 'Basic equipment (on request)'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Venue access and power required'],
      faqs: [],
    },
  },
  {
    slug: 'bouncers',
    title: 'Bouncers / Security',
    pillar: 'Personal & Events',
    summary: 'Licensed security staff for events.',
    sections: {
      overview: 'Trained and licensed security.',
      included: ['On-site presence'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Licensing verification required'],
      faqs: [],
    },
  },
  {
    slug: 'decorators',
    title: 'Decorators',
    pillar: 'Personal & Events',
    summary: 'Event decoration and styling.',
    sections: {
      overview: 'Event and venue decoration.',
      included: ['Design', 'Setup', 'Tear-down'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Venue policies apply'],
      faqs: [],
    },
  },
  {
    slug: 'pet-sitting',
    title: 'Pet Sitting',
    pillar: 'Pets',
    summary: 'In-home pet sitting and care.',
    sections: {
      overview: 'Pet care at home.',
      included: ['Feeding', 'Walks', 'Updates'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Pet health info required'],
      faqs: [],
    },
  },
  {
    slug: 'pet-feeding',
    title: 'Pet Feeding',
    pillar: 'Pets',
    summary: 'Scheduled feeding visits.',
    sections: {
      overview: 'Feeding visits with updates.',
      included: ['Feeding', 'Water refresh', 'Updates'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Pet health info required'],
      faqs: [],
    },
  },
  {
    slug: 'estate-agent',
    title: 'Estate Agent Partner Mode',
    pillar: 'Business & Logistics',
    summary: 'Partner mode for estate agents.',
    sections: {
      overview: 'Tools and flows tailored for estate agents.',
      included: ['Access to partner tools'],
      pricingNotes: ['—'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'warehouse-pickup',
    title: 'Warehouse Drop-Off & Pickup',
    pillar: 'Business & Logistics',
    summary: 'eBay/Vinted logistics to/from warehouse.',
    sections: {
      overview: 'Drop-off and pickup to/from warehouses.',
      included: ['Labels', 'POD', 'Scheduling'],
      pricingNotes: ['DLQ 15%'],
      policies: ['Warehouse cut-off times apply'],
      faqs: [],
    },
  },
  {
    slug: 'groceries',
    title: 'Groceries',
    pillar: 'Deliveries',
    summary: 'Supermarket rapid, alternative produse și notificări.',
    tags: ['Same-day'],
    sections: {
      overview: 'Coș de cumpărături din magazine locale.',
      included: ['Ridicare', 'Livrare', 'Notificări status'],
      options: ['Note pentru magazin', 'Alternative produse'],
      pricingNotes: ['Fee platformă £2 + £0.50 service charge'],
      policies: ['Return conform politicii magazinului (cu confirmare)'],
      faqs: [],
    },
  },
  {
    slug: 'parcels',
    title: 'Parcels',
    pillar: 'Deliveries',
    summary: 'Same-day local parcels, inclusiv bulk multi-stop.',
    tags: ['Same-day'],
    sections: {
      overview: 'Colete locale, inclusiv bulk 100/route.',
      included: ['QR scan la pickup', 'Dovadă livrare', 'Timeline tracking'],
      options: ['Mai multe opriri', 'Fereastră orară'],
      pricingNotes: ['Preț în funcție de distanță/greutate/opriri'],
      policies: ["Return: magazinul confirmă primirea înainte de 'Returned'"],
      faqs: [],
    },
  },
  {
    slug: 'click-collect',
    title: 'Click & Collect Assistant',
    pillar: 'Deliveries',
    summary: 'Ridicare comenzi retail și livrare la ușă.',
    sections: {
      overview: 'Ridicăm comenzi plasate online din magazine.',
      included: ['Validare comandă', 'Ridicare', 'Livrare'],
      pricingNotes: ['Fee platformă £2 + £0.50 service charge'],
      policies: ['Return conform magazin'],
      faqs: [],
    },
  },
  {
    slug: 'people-to-people',
    title: 'People-to-People',
    pillar: 'Deliveries',
    summary: 'Obiecte între două persoane, cu dovadă de predare.',
    sections: {
      overview: 'Predare obiecte personal între utilizatori.',
      included: ['Pickup', 'Livrare', 'Dovadă'],
      pricingNotes: ['Comision DLQ 15%'],
      policies: ['Prohibited list respectată'],
      faqs: [],
    },
  },
  {
    slug: 'locker-to-people',
    title: 'Locker-to-People',
    pillar: 'Deliveries',
    summary: 'Ridicare din locker (InPost/Amazon) și livrare.',
    sections: {
      overview: 'Ridicare din locker și livrare către persoană.',
      included: ['OTP/QR locker', 'Livrare', 'Dovadă'],
      pricingNotes: ['Comision DLQ 15%'],
      policies: ['Dovezi necesare la litigii'],
      faqs: [],
    },
  },
  {
    slug: 'store-to-home',
    title: 'Store-to-Home (Bulky)',
    pillar: 'Deliveries',
    summary: 'Obiecte voluminoase, 2-man lift opțional.',
    sections: {
      overview: 'Livrare obiecte voluminoase.',
      included: ['Protecții', 'Dovadă', 'Opțional 2-man lift'],
      options: ['Helpers', 'Programare slot'],
      pricingNotes: ['Comision DLQ 10%'],
      policies: ['Acces scări/parcare divulgat corect'],
      faqs: [],
    },
  },
  {
    slug: 'removals',
    title: 'Removals',
    pillar: 'Removals',
    summary: 'Mutări home/office cu opțiuni complete.',
    sections: {
      overview: 'Mutări home/office cu helpers, packing și timeline.',
      included: ['Van', 'Timeline', 'Dovadă'],
      options: ['Helpers', 'Packing/Unpacking', 'Dismantle/Reassembly', 'Extra stops', 'Materials', 'Lift?'],
      pricingNotes: ['DLQ 15% split automat', 'Breakdown transparent'],
      policies: ['Declari acces dificil în avans'],
      faqs: [],
    },
  },
  {
    slug: 'electrician',
    title: 'Electrician',
    pillar: 'Trades & Repairs',
    summary: 'Lucrări electrice cu certificare.',
    tags: ['Certified'],
    sections: {
      overview: 'Lucrări electrice cu certificare.',
      included: ['Vizită', 'Execuție', 'Raport'],
      pricingNotes: ['Comision DLQ 15%'],
      policies: ['Verificare documente'],
      faqs: [],
    },
  },
  {
    slug: 'plumber',
    title: 'Plumber',
    pillar: 'Trades & Repairs',
    summary: 'Instalații & urgențe.',
    sections: {
      overview: 'Intervenții instalații sanitare și urgențe.',
      included: ['Diagnostic', 'Execuție'],
      pricingNotes: ['DLQ 15%'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'handyman',
    title: 'Handyman',
    pillar: 'Trades & Repairs',
    summary: 'Reparații mici, montaj, ajustări.',
    sections: {
      overview: 'Servicii handyman pentru reparații și montaj.',
      included: ['Unelte', 'Execuție', 'Curățenie sumară'],
      pricingNotes: ['DLQ 15%'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'cleaning',
    title: 'Cleaning',
    pillar: 'Home & Garden',
    summary: 'Curățenie generală sau specializată.',
    sections: {
      overview: 'Curățenie generală sau specializată.',
      included: ['Checklist', 'Before/After photos'],
      options: ['Carpet cleaning', 'Materials incl.'],
      pricingNotes: ['DLQ 15%'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'gardening',
    title: 'Gardening',
    pillar: 'Home & Garden',
    summary: 'Întreținere grădină, tuns, curățare.',
    sections: {
      overview: 'Servicii grădinărit și întreținere.',
      included: ['Unelte', 'Transport deșeuri (opțional)'],
      pricingNotes: ['DLQ 15%'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'tyre',
    title: 'Tyre Services',
    pillar: 'Auto & Transport',
    summary: 'Montaj mobil și intervenții pentru anvelope.',
    sections: {
      overview: 'Servicii anvelope: fitting, balans, call-out.',
      included: ['Deplasare', 'Montaj', 'Echilibrare'],
      pricingNotes: ['DLQ 15%'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'barber',
    title: 'Barber',
    pillar: 'Personal & Events',
    summary: 'Service acasă sau în locație, programare.',
    sections: {
      overview: 'Servicii frizerie la domiciliu sau în locații partenere.',
      included: ['Appointment', 'Hygiene policy'],
      pricingNotes: ['£30/lună in-store subs (exemplu)'],
      policies: ['Hygiene'],
      faqs: [],
    },
  },
  {
    slug: 'dog-walking',
    title: 'Dog Walking',
    pillar: 'Pets',
    summary: 'Plimbare câini, siguranță și tracking simplu.',
    sections: {
      overview: 'Plimbare câini cu verificări și update-uri.',
      included: ['Programare', 'Update foto (opțional)'],
      pricingNotes: ['DLQ 15%'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'b2b-logistics',
    title: 'B2B Logistics',
    pillar: 'Business & Logistics',
    summary: 'Contracte pentru companii, SLA și rutare.',
    sections: {
      overview: 'Servicii B2B cu SLA și integrare.',
      included: ['SLA', 'POD', 'Account manager'],
      pricingNotes: ['Contracte - prețuri negociate'],
      policies: ['—'],
      faqs: [],
    },
  },
]

export const pillars: Pillar[] = [
  'Deliveries',
  'Removals',
  'Trades & Repairs',
  'Home & Garden',
  'Auto & Transport',
  'Personal & Events',
  'Pets',
  'Business & Logistics',
]

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function getServicesByPillar(pillar: Pillar) {
  return services.filter((s) => s.pillar === pillar)
}

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
    summary: 'Restaurant meals to your door. Local, fast, with proof of delivery.',
    tags: ['Same-day', 'Vegan', 'Halal', 'Gluten-Free', 'Tracked'],
    sections: {
      overview: 'Food delivery from local restaurants and takeaways.',
      included: ['Restaurant pick-up', 'Delivery to address', 'Arrival timer', 'Proof of delivery (photo)'],
      options: ['Special instructions', 'Contactless delivery'],
      pricingNotes: ['Transparent pricing', 'Minimum driver fee may apply'],
      policies: ['Food returns: no refunds for hygiene and safety reasons'],
      faqs: [
        { q: 'Can I change the address after placing the order?', a: 'Only before pick-up; otherwise cancel and rebook.' },
      ],
    },
  },
  {
    slug: 'locksmith',
    title: 'Locksmith',
    pillar: 'Trades & Repairs',
    summary: '24/7 access and lock solutions.',
    tags: ['Urgent'],
    sections: {
      overview: 'Emergency and scheduled locksmith services.',
      included: ['Call-out', 'Unlock/Replace locks', 'Basic security advice'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Colour matching subject to availability'],
      faqs: [],
    },
  },
  {
    slug: 'mobile-mechanic',
    title: 'Mobile Mechanical Call-Outs',
    pillar: 'Trades & Repairs',
    summary: 'Mobile mechanic diagnostics and minor repairs.',
    tags: ['Urgent'],
    sections: {
      overview: 'On-site diagnostic and small repairs.',
      included: ['Diagnostic', 'Repair if possible', 'Report'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
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
    tags: ['Tracked'],
    sections: {
      overview: 'Drop-off and pickup to/from warehouses.',
      included: ['Labels', 'POD', 'Scheduling'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Warehouse cut-off times apply'],
      faqs: [],
    },
  },
  {
    slug: 'groceries',
    title: 'Groceries',
    pillar: 'Deliveries',
    summary: 'Fast supermarket runs, substitutions and notifications.',
    tags: ['Same-day', 'Vegan', 'Halal', 'Gluten-Free', 'Tracked'],
    sections: {
      overview: 'Shopping lists fulfilled from local stores.',
      included: ['Collection', 'Delivery', 'Status notifications'],
      options: ['Notes for the store', 'Product substitutions'],
      pricingNotes: ['Service fee may apply'],
      policies: ['Returns follow the store policy (with confirmation)'],
      faqs: [],
    },
  },
  {
    slug: 'parcels',
    title: 'Parcels',
    pillar: 'Deliveries',
    summary: 'Same-day local parcels, including bulk multi-stop.',
    tags: ['Same-day', 'Tracked', 'Urgent'],
    sections: {
      overview: 'Local parcels, including multi-stop routes.',
      included: ['QR scan at pickup', 'Proof of delivery', 'Timeline tracking'],
      options: ['Multiple stops', 'Time window'],
      pricingNotes: ['Price depends on distance/weight/stops'],
      policies: ["Returns: store must confirm receipt before status 'Returned'"],
      faqs: [],
    },
  },
  {
    slug: 'click-collect',
    title: 'Click & Collect Assistant',
    pillar: 'Deliveries',
    summary: 'Retail order pick-up and delivery to your door.',
    tags: ['Tracked'],
    sections: {
      overview: 'We collect online orders from stores and deliver to you.',
      included: ['Order validation', 'Collection', 'Delivery'],
      pricingNotes: ['Service fee may apply'],
      policies: ['Returns follow the store policy'],
      faqs: [],
    },
  },
  {
    slug: 'people-to-people',
    title: 'People-to-People',
    pillar: 'Deliveries',
    summary: 'Items between two people, with handover proof.',
    tags: ['Tracked'],
    sections: {
      overview: 'In-person handover between users.',
      included: ['Pickup', 'Delivery', 'Proof of handover'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Prohibited items list applies'],
      faqs: [],
    },
  },
  {
    slug: 'locker-to-people',
    title: 'Locker-to-People',
    pillar: 'Deliveries',
    summary: 'Pick-up from lockers (InPost/Amazon) and delivery.',
    tags: ['Tracked'],
    sections: {
      overview: 'Collect from lockers and deliver to a person.',
      included: ['Locker OTP/QR', 'Delivery', 'Proof of delivery'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Evidence required for disputes'],
      faqs: [],
    },
  },
  {
    slug: 'store-to-home',
    title: 'Store-to-Home (Bulky)',
    pillar: 'Deliveries',
    summary: 'Bulky items, optional two-person lift.',
    tags: ['Tracked'],
    sections: {
      overview: 'Delivery of bulky items.',
      included: ['Protective wrapping', 'Proof of delivery', 'Optional two-person lift'],
      options: ['Helpers', 'Booked time slot'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Stair/parking access disclosed accurately'],
      faqs: [],
    },
  },
  {
    slug: 'removals',
    title: 'Removals',
    pillar: 'Removals',
    summary: 'Home/office moves with end-to-end options.',
    tags: ['Tracked'],
    sections: {
      overview: 'Moves with helpers, packing and timeline.',
      included: ['Van', 'Timeline', 'Proof of delivery'],
      options: ['Helpers', 'Packing/Unpacking', 'Dismantle/Reassembly', 'Extra stops', 'Materials', 'Lift?'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Declare difficult access in advance'],
      faqs: [],
    },
  },
  {
    slug: 'electrician',
    title: 'Electrician',
    pillar: 'Trades & Repairs',
    summary: 'Certified electrical works.',
    tags: ['Certified', 'Urgent'],
    sections: {
      overview: 'Certified electrical work and testing.',
      included: ['Site visit', 'Works', 'Report'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Document verification required'],
      faqs: [],
    },
  },
  {
    slug: 'plumber',
    title: 'Plumber',
    pillar: 'Trades & Repairs',
    summary: 'Plumbing and emergencies.',
    tags: ['Urgent'],
    sections: {
      overview: 'Plumbing interventions and emergencies.',
      included: ['Diagnosis', 'Works'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'handyman',
    title: 'Handyman',
    pillar: 'Trades & Repairs',
    summary: 'Minor repairs, fittings, adjustments.',
    sections: {
      overview: 'Handyman services for repairs and fittings.',
      included: ['Tools', 'Work carried out', 'Basic clean-up'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'cleaning',
    title: 'Cleaning',
    pillar: 'Home & Garden',
    summary: 'General or specialist cleaning.',
    sections: {
      overview: 'General or specialist cleaning.',
      included: ['Checklist', 'Before/After photos'],
      options: ['Carpet cleaning', 'Materials included'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'gardening',
    title: 'Gardening',
    pillar: 'Home & Garden',
    summary: 'Garden maintenance, trimming, clearing.',
    sections: {
      overview: 'Gardening and maintenance services.',
      included: ['Tools', 'Waste removal (optional)'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'tyre',
    title: 'Tyre Services',
    pillar: 'Auto & Transport',
    summary: 'Mobile fitting and tyre call-outs.',
    tags: ['Urgent'],
    sections: {
      overview: 'Tyre services: fitting, balancing, call-out.',
      included: ['Call-out', 'Fitting', 'Balancing'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'barber',
    title: 'Barber',
    pillar: 'Personal & Events',
    summary: 'At-home or in-venue service, by appointment.',
    sections: {
      overview: 'Barber services at home or partner venues.',
      included: ['Appointment', 'Hygiene policy'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['Hygiene'],
      faqs: [],
    },
  },
  {
    slug: 'dog-walking',
    title: 'Dog Walking',
    pillar: 'Pets',
    summary: 'Dog walking, safety and simple tracking.',
    tags: ['Tracked'],
    sections: {
      overview: 'Dog walking with checks and updates.',
      included: ['Scheduling', 'Photo update (optional)'],
      pricingNotes: ['Transparent pricing; full breakdown provided in your quote'],
      policies: ['—'],
      faqs: [],
    },
  },
  {
    slug: 'b2b-logistics',
    title: 'B2B Logistics',
    pillar: 'Business & Logistics',
    summary: 'Contracts for businesses, SLAs and routing.',
    tags: ['Tracked'],
    sections: {
      overview: 'B2B services with SLAs and integration.',
      included: ['SLA', 'POD', 'Account manager'],
      pricingNotes: ['Contract pricing by agreement'],
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

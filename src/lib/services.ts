export type Pillar =
  | 'Deliveries'
  | 'Removals'
  | 'Trades & Repairs'
  | 'Home & Garden'
  | 'Auto & Transport'
  | 'Personal & Events'
  | 'Pets'
  | 'Business & Logistics'
  | 'Marketplace & Shops';

export type Service = {
  slug: string;
  title: string;
  pillar: Pillar;
  summary: string;
  icon: string; // lucide icon name
  comingSoon?: boolean;
  tags?: string[];
  sections: {
    overview: string;
    included: string[];
    options?: string[];
    pricingNotes?: string[];
    policies?: string[];
    faqs?: { q: string; a: string }[];
  };
};

export const services: Service[] = [
  { slug: 'food', title: 'Food Delivery', pillar: 'Deliveries', summary: 'Restaurante la ușă.', icon: 'Utensils', tags: ['Same-day'], sections: {
    overview: 'Livrare mâncare din restaurante/fast-food local.',
    included: ['Preluare din restaurant','Livrare la adresă','Timer sosire','Dovadă livrare (foto)'],
    options: ['Instrucțiuni specifice','Livrare contactless'],
    pricingNotes: ['Comision DLQ 20%','Driver min £4/order'],
    policies: ['Food returns: fără ramburs (igienă & siguranță)'],
    faqs: [{ q: 'Pot modifica adresa după plasare?', a: 'Doar înainte de preluare; altfel anulare + rebook.' }]
  }},
  { slug: 'groceries', title: 'Groceries', pillar: 'Deliveries', summary: 'Supermarket rapid.', icon: 'ShoppingBasket', tags: ['Same-day'], sections: {
    overview: 'Coș de cumpărături din magazine locale.',
    included: ['Ridicare','Livrare','Notificări status'],
    options: ['Note pentru magazin','Alternative produse'],
    pricingNotes: ['Fee platformă £2 + £0.50 service charge'],
    policies: ['Return conform politicii magazinului (cu confirmare)'],
    faqs: []
  }},
  { slug: 'parcels', title: 'Parcels', pillar: 'Deliveries', summary: 'Same-day local parcels.', icon: 'Package', tags: ['Same-day'], sections: {
    overview: 'Colete locale, inclusiv bulk 100/route.',
    included: ['QR scan la pickup','Dovadă livrare','Timeline tracking'],
    options: ['Mai multe opriri','Fereastră orară'],
    pricingNotes: ['Preț în funcție de distanță/greutate/opriri'],
    policies: ["Return: magazinul confirmă primirea înainte de 'Returned'"],
    faqs: []
  }},
  { slug: 'click-collect', title: 'Click & Collect Assistant', pillar: 'Deliveries', summary: 'Ridicare comenzi retail.', icon: 'Hand', sections: {
    overview: 'Ridicăm comenzi plasate online din magazine.',
    included: ['Validare comandă','Ridicare','Livrare'],
    pricingNotes: ['Fee platformă £2 + £0.50 service charge'],
    policies: ['Return conform magazin'],
    faqs: []
  }},
  { slug: 'people-to-people', title: 'People-to-People', pillar: 'Deliveries', summary: 'Obiecte între două persoane.', icon: 'Users', sections: {
    overview: 'Predare obiecte personal între utilizatori.',
    included: ['Pickup','Livrare','Dovadă'],
    pricingNotes: ['Comision DLQ 15%'],
    policies: ['Prohibited list respectată'],
    faqs: []
  }},
  { slug: 'locker-to-people', title: 'Locker-to-People', pillar: 'Deliveries', summary: 'Locker → persoană.', icon: 'BoxSelect', sections: {
    overview: 'Ridicare din locker (InPost/Amazon) și livrare.',
    included: ['OTP/QR locker','Livrare','Dovadă'],
    pricingNotes: ['Comision DLQ 15%'],
    policies: ['Dovezi necesare la litigii'],
    faqs: []
  }},
  { slug: 'store-to-home', title: 'Store-to-Home (Bulky)', pillar: 'Deliveries', summary: 'Articole mari (IKEA-style).', icon: 'Truck', sections: {
    overview: 'Livrare obiecte voluminoase.',
    included: ['2-man lift opțional','Protecții','Dovadă'],
    options: ['Helpers','Programare slot'],
    pricingNotes: ['Comision DLQ 10%'],
    policies: ['Acces scări/parcare divulgat corect'],
    faqs: []
  }},
  { slug: 'removals', title: 'Removals', pillar: 'Removals', summary: 'Mutări transparente.', icon: 'Truck', sections: {
    overview: 'Mutări home/office cu opțiuni complete.',
    included: ['Van','Timeline','Dovadă'],
    options: ['Helpers','Packing/Unpacking','Dismantle/Reassembly','Extra stops','Materials','Lift?'],
    pricingNotes: ['DLQ 15% split automat','Breakdown transparent'],
    policies: ['Declari acces dificil în avans'],
    faqs: []
  }},
  { slug: 'electrician', title: 'Electrician', pillar: 'Trades & Repairs', summary: 'Certificat.', icon: 'Zap', tags: ['Certified'], sections: {
    overview: 'Lucrări electrice cu certificare.',
    included: ['Vizită','Execuție','Raport'],
    pricingNotes: ['Comision DLQ 15%'],
    policies: ['Verificare documente'],
    faqs: []
  }},
  { slug: 'plumber', title: 'Plumber', pillar: 'Trades & Repairs', summary: 'Instalații & urgențe.', icon: 'Tornado', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'locksmith', title: 'Locksmith', pillar: 'Trades & Repairs', summary: '24/7.', icon: 'KeyRound', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'handyman', title: 'Handyman', pillar: 'Trades & Repairs', summary: 'Reparații mici.', icon: 'Wrench', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'car-body', title: 'Car Body Repairs', pillar: 'Trades & Repairs', summary: 'Caroserie.', icon: 'Car', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'wheels-refurb', title: 'Wheels Refurbishment', pillar: 'Trades & Repairs', summary: 'Jante.', icon: 'CircleDot', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'mobile-mechanic', title: 'Mobile Mechanical Call-Outs', pillar: 'Trades & Repairs', summary: 'Mecanic mobil.', icon: 'Settings2', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'moto-services', title: 'Motorcycle Transport & Repairs', pillar: 'Trades & Repairs', summary: 'Moto.', icon: 'Bike', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'cleaning', title: 'Cleaning', pillar: 'Home & Garden', summary: 'Casnic/comercial.', icon: 'Sparkles', sections: {
    overview: 'Curățenie generală sau specializată.',
    included: ['Checklist','Before/After photos'],
    options: ['Carpet cleaning','Materials included'],
    pricingNotes: ['DLQ 15%'],
    policies: ['—'],
    faqs: []
  }},
  { slug: 'window-cleaning', title: 'Window Cleaning', pillar: 'Home & Garden', summary: '—', icon: 'PanelsTopLeft', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'gardening', title: 'Gardening', pillar: 'Home & Garden', summary: '—', icon: 'Leaf', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'tyre', title: 'Tyre Services', pillar: 'Auto & Transport', summary: 'Mobile fitting.', icon: 'Circle', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'cars', title: 'Car Ads', pillar: 'Auto & Transport', summary: 'Coming Soon.', icon: 'Car', comingSoon: true, sections: { overview: '—', included: ['—'], pricingNotes: ['Listing fee'], policies: ['No odometer fraud'], faqs: [] }},
  { slug: 'car-parts', title: 'Car Parts', pillar: 'Auto & Transport', summary: 'Coming Soon.', icon: 'Cog', comingSoon: true, sections: { overview: '—', included: ['—'], pricingNotes: ['—'], policies: ['Prohibited items list'], faqs: [] }},
  { slug: 'barber', title: 'Barber', pillar: 'Personal & Events', summary: 'Home/shop.', icon: 'Scissors', sections: { overview: '—', included: ['—'], pricingNotes: ['£30/month in-store subs'], policies: ['Hygiene'], faqs: [] }},
  { slug: 'beauty', title: 'Beauty (Hair & Nails)', pillar: 'Personal & Events', summary: '—', icon: 'Brush', sections: { overview: '—', included: ['—'], pricingNotes: ['£30/month in-store subs'], policies: ['—'], faqs: [] }},
  { slug: 'photographers', title: 'Photographers', pillar: 'Personal & Events', summary: '—', icon: 'Camera', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'djs', title: 'DJs', pillar: 'Personal & Events', summary: '—', icon: 'Music', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'bouncers', title: 'Bouncers / Security', pillar: 'Personal & Events', summary: '—', icon: 'Shield', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['Licențe'], faqs: [] }},
  { slug: 'decorators', title: 'Decorators', pillar: 'Personal & Events', summary: '—', icon: 'Paintbrush', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'dog-walking', title: 'Dog Walking', pillar: 'Pets', summary: '—', icon: 'PawPrint', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'pet-sitting', title: 'Pet Sitting', pillar: 'Pets', summary: '—', icon: 'Bed', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'pet-feeding', title: 'Pet Feeding', pillar: 'Pets', summary: '—', icon: 'Bone', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
  { slug: 'estate-agent', title: 'Estate Agent Partner Mode', pillar: 'Business & Logistics', summary: '—', icon: 'Building', sections: { overview: '—', included: ['—'], pricingNotes: ['—'], policies: ['—'], faqs: [] }},
  { slug: 'b2b-logistics', title: 'B2B Logistics', pillar: 'Business & Logistics', summary: '—', icon: 'Boxes', sections: { overview: '—', included: ['—'], pricingNotes: ['Contracte'], policies: ['—'], faqs: [] }},
  { slug: 'warehouse-pickup', title: 'Warehouse Drop-Off & Pickup', pillar: 'Business & Logistics', summary: 'eBay/Vinted', icon: 'Warehouse', sections: { overview: '—', included: ['—'], pricingNotes: ['DLQ 15%'], policies: ['—'], faqs: [] }},
];

'use client'

import { useEffect, useState } from "react";
import data from '@/content/services.json';

const statusColors: Record<string, string> = {
  Live: 'bg-green-600',
  'Coming Soon': 'bg-yellow-500',
  'In Progress': 'bg-blue-500',
};

const cityBackgrounds: Record<string, string> = {
  London: "/img/bg-london.mp4",
  Manchester: "/img/bg-manchester.mp4",
  Liverpool: "/img/bg-liverpool.mp4",
  Default: "/img/bg-company.mp4"
};

export default function Services() {
  const [tab, setTab] = useState(0);
  const [city, setCity] = useState<string>("");
  const [bg, setBg] = useState(cityBackgrounds.Default);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
          const data = await res.json();
          const cityName = data.address.city || data.address.town || data.address.village || "";
          setCity(cityName);
          setBg(cityBackgrounds[cityName] || cityBackgrounds.Default);
        } catch {
          setBg(cityBackgrounds.Default);
        }
      }, () => setBg(cityBackgrounds.Default));
    }
  }, []);

  return (
    <main className="container py-12 relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-1] opacity-60 blur-[2px]"
        src={bg}
      />
      <h2 className="h2 mb-6">Services {city && <span className="text-xs ml-2">({city})</span>}</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {data.map((cat: any, i: number) => (
          <button
            key={cat.category}
            className={`px-4 py-2 rounded-xl font-semibold border border-[rgba(212,175,55,.45)] bg-[rgba(11,26,58,.7)] text-white transition shadow-dlq ${tab===i ? 'bg-gold text-navy' : ''}`}
            onClick={() => setTab(i)}
          >
            {cat.category}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data[tab].services.map((srv: any) => (
          <div key={srv.title} className="card flex flex-col bg-white/30 backdrop-blur-xl border border-white/30">
            <div className="relative h-40 w-full mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-[#0B1C39] to-[#1a237e] flex items-center justify-center">
              <img src={srv.img ? `/img/${srv.img}` : '/img/placeholder.jpg'} alt={srv.title} className="object-cover w-full h-full opacity-80" />
              <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold text-white ${statusColors[srv.status]||'bg-gray-500'}`}>{srv.status}</span>
            </div>
            <h3 className="text-[var(--dlq-accent)] text-lg mb-1">{srv.title}</h3>
            <p className="opacity-90 flex-1">{srv.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

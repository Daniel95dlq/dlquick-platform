// Link replaced with native anchors to avoid client hook usage in SSR
import { prisma } from "../../lib/prisma"
import { requireAuth } from "../../lib/auth"
import { UserRole } from "@prisma/client"
import DashboardQuickQuotes from "./DashboardQuickQuotes"
import DashboardQuickPartners from "./DashboardQuickPartners"

export default async function AdminIndex({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  await requireAuth(UserRole.ADMIN)
  const range = (searchParams?.range as string | undefined) === '24h' ? '24h' : 'all'
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const qTime = range === '24h' ? { createdAt: { gte: since } } : {}
  const pTime = range === '24h' ? { createdAt: { gte: since } } : {}

  const [quotes, partners, newQuotes, newPartners, latestQuotes, latestPartners,
    qNEW, qCONTACTED, qQUOTED, qWON, qLOST,
    pNEW, pREVIEWING, pAPPROVED, pREJECTED,
    quoteActs, partnerActs,
  ] = await Promise.all([
    (prisma as any).quoteRequest.count({ where: { ...qTime } }),
    (prisma as any).partnerApplication.count({ where: { ...pTime } }),
    (prisma as any).quoteRequest.count({ where: { ...qTime, status: 'NEW' } }),
    (prisma as any).partnerApplication.count({ where: { ...pTime, status: 'NEW' } }),
    (prisma as any).quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, serviceTitle: true, name: true, email: true, status: true, createdAt: true },
    }),
    (prisma as any).partnerApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, type: true, name: true, email: true, status: true, createdAt: true },
    }),
    // Quote status counts
    (prisma as any).quoteRequest.count({ where: { ...qTime, status: 'NEW' } }),
    (prisma as any).quoteRequest.count({ where: { ...qTime, status: 'CONTACTED' } }),
    (prisma as any).quoteRequest.count({ where: { ...qTime, status: 'QUOTED' } }),
    (prisma as any).quoteRequest.count({ where: { ...qTime, status: 'WON' } }),
    (prisma as any).quoteRequest.count({ where: { ...qTime, status: 'LOST' } }),
    // Partner status counts
    (prisma as any).partnerApplication.count({ where: { ...pTime, status: 'NEW' } }),
    (prisma as any).partnerApplication.count({ where: { ...pTime, status: 'REVIEWING' } }),
    (prisma as any).partnerApplication.count({ where: { ...pTime, status: 'APPROVED' } }),
    (prisma as any).partnerApplication.count({ where: { ...pTime, status: 'REJECTED' } }),
    // Latest activity (merge in memory)
    (prisma as any).quoteActivity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { user: true, quote: { select: { id: true, serviceTitle: true } } },
    }),
    (prisma as any).partnerApplicationActivity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { user: true, application: { select: { id: true, name: true, type: true } } },
    }),
  ])
  const recent = [
    ...quoteActs.map((a: any) => ({
      t: 'quote' as const,
      id: a.quote.id,
      label: a.quote.serviceTitle,
      when: a.createdAt,
      from: a.fromStatus,
      to: a.toStatus,
      user: a.user?.email || 'system',
      note: a.note || '',
      href: `/admin/quotes/${a.quote.id}`,
    })),
    ...partnerActs.map((a: any) => ({
      t: 'partner' as const,
      id: a.application.id,
      label: a.application.name,
      when: a.createdAt,
      from: a.fromStatus,
      to: a.toStatus,
      user: a.user?.email || 'system',
      note: a.note || '',
      href: `/admin/partners/${a.application.id}`,
      extra: a.application.type,
    })),
  ].sort((a, b) => +new Date(b.when) - +new Date(a.when)).slice(0, 8)
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <div className="text-sm">
          <span className="opacity-70 mr-2">Show:</span>
          <a className={`underline mr-3 ${range === 'all' ? 'font-semibold' : ''}`} href="/admin?range=all">All time</a>
          <a className={`underline ${range === '24h' ? 'font-semibold' : ''}`} href="/admin?range=24h">Last 24h</a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 p-4">
          <div className="text-sm opacity-70">Quotes {range === '24h' && <span className='ml-1'>(24h)</span>}</div>
          <div className="text-2xl font-semibold">{quotes}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 p-4">
          <div className="text-sm opacity-70">New quotes {range === '24h' && <span className='ml-1'>(24h)</span>}</div>
          <div className="text-2xl font-semibold">{newQuotes}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 p-4">
          <div className="text-sm opacity-70">Partners {range === '24h' && <span className='ml-1'>(24h)</span>}</div>
          <div className="text-2xl font-semibold">{partners}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 p-4">
          <div className="text-sm opacity-70">New partners {range === '24h' && <span className='ml-1'>(24h)</span>}</div>
          <div className="text-2xl font-semibold">{newPartners}</div>
        </div>
      </div>

      {/* Per-status mini cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h2 className="font-medium">Quotes by status</h2>
            <a className="text-sm underline" href="/admin/quotes">Manage</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 text-sm">
            <a href="/admin/quotes?status=NEW" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">NEW</div>
              <div className="text-xl font-semibold">{qNEW}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/quotes/export?status=NEW&limit=1000">Export</a></div>
            </a>
            <a href="/admin/quotes?status=CONTACTED" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">CONTACTED</div>
              <div className="text-xl font-semibold">{qCONTACTED}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/quotes/export?status=CONTACTED&limit=1000">Export</a></div>
            </a>
            <a href="/admin/quotes?status=QUOTED" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">QUOTED</div>
              <div className="text-xl font-semibold">{qQUOTED}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/quotes/export?status=QUOTED&limit=1000">Export</a></div>
            </a>
            <a href="/admin/quotes?status=WON" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">WON</div>
              <div className="text-xl font-semibold">{qWON}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/quotes/export?status=WON&limit=1000">Export</a></div>
            </a>
            <a href="/admin/quotes?status=LOST" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">LOST</div>
              <div className="text-xl font-semibold">{qLOST}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/quotes/export?status=LOST&limit=1000">Export</a></div>
            </a>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h2 className="font-medium">Partner applications by status</h2>
            <a className="text-sm underline" href="/admin/partners">Manage</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 text-sm">
            <a href="/admin/partners?status=NEW" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">NEW</div>
              <div className="text-xl font-semibold">{pNEW}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/partners/export?status=NEW&limit=1000">Export</a></div>
            </a>
            <a href="/admin/partners?status=REVIEWING" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">REVIEWING</div>
              <div className="text-xl font-semibold">{pREVIEWING}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/partners/export?status=REVIEWING&limit=1000">Export</a></div>
            </a>
            <a href="/admin/partners?status=APPROVED" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">APPROVED</div>
              <div className="text-xl font-semibold">{pAPPROVED}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/partners/export?status=APPROVED&limit=1000">Export</a></div>
            </a>
            <a href="/admin/partners?status=REJECTED" className="rounded border border-white/10 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm supports-[backdrop-filter]:bg-white/7">
              <div className="opacity-70">REJECTED</div>
              <div className="text-xl font-semibold">{pREJECTED}</div>
              <div className="mt-1 text-xs"><a className="underline" href="/admin/partners/export?status=REJECTED&limit=1000">Export</a></div>
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h2 className="font-medium">Latest Quotes</h2>
            <div className="flex items-center gap-3">
              <a className="text-sm underline" href="/admin/quotes/export?limit=100">Export latest</a>
              <a className="text-sm underline" href="/admin/quotes">View all</a>
            </div>
          </div>
          <DashboardQuickQuotes items={latestQuotes.map((q: any) => ({
            id: q.id,
            label: q.serviceTitle,
            subline: `${q.name} • ${q.email}`,
            when: new Date(q.createdAt).toISOString().slice(0,16).replace('T',' '),
            status: q.status,
          }))} />
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h2 className="font-medium">Latest Partner Applications</h2>
            <div className="flex items-center gap-3">
              <a className="text-sm underline" href="/admin/partners/export?limit=100">Export latest</a>
              <a className="text-sm underline" href="/admin/partners">View all</a>
            </div>
          </div>
          <DashboardQuickPartners items={latestPartners.map((a: any) => ({
            id: a.id,
            label: a.name,
            extra: a.type,
            subline: a.email,
            when: new Date(a.createdAt).toISOString().slice(0,16).replace('T',' '),
            status: a.status,
          }))} />
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-white/7 mb-8">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="font-medium">Recent activity</h2>
          <div className="text-xs opacity-70">Last {recent.length} updates</div>
        </div>
        <ul className="divide-y divide-white/10">
          {recent.map((r) => (
            <li key={`${r.t}-${r.id}-${(r as any).when}`} className="px-4 py-3 flex items-center justify-between text-sm">
              <div>
                <span className="opacity-70 mr-2">{new Date(r.when as any).toISOString().slice(0,16).replace('T',' ')}</span>
                <a className="underline" href={r.href}>{r.label}</a>
                {('extra' in r && r.extra) ? <span className="ml-2 opacity-70 text-xs">{(r as any).extra}</span> : null}
                <span className="ml-2">{r.from} → {r.to}</span>
                {r.note && <span className="ml-2 opacity-80">({r.note})</span>}
              </div>
              <div className="opacity-70 text-xs">{r.user}</div>
            </li>
          ))}
          {recent.length === 0 && <li className="px-4 py-6 text-sm opacity-70">No activity yet.</li>}
        </ul>
      </div>

      <ul className="list-disc pl-6 space-y-2">
        <li><a className="underline" href="/admin/quotes">Quotes</a></li>
        <li><a className="underline" href="/admin/partners">Partner Applications</a></li>
        <li><a className="underline" href="/admin/consents">Cookie Consents</a></li>
        <li><a className="underline" href="/admin/dsar">DSAR Requests</a></li>
        <li><a className="underline" href="/admin/reviews">Reviews</a></li>
      </ul>
    </div>
  )
}

import { prisma } from "../../../lib/prisma"
import { requireAuth } from "../../../lib/auth"

export const dynamic = 'force-dynamic'

export default async function AdminConsents({ searchParams }: { searchParams?: Record<string,string | string[] | undefined> }) {
  await requireAuth('ADMIN' as any)
  const take = Math.min(200, Number(searchParams?.limit ?? 50))
  const page = Math.max(1, Number(searchParams?.page ?? 1))
  const skip = (page - 1) * take
  const [items, total] = await Promise.all([
    (prisma as any).cookieConsent.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    (prisma as any).cookieConsent.count(),
  ])
  const pages = Math.max(1, Math.ceil(total / take))
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Cookie Consents</h1>
        <div className="text-sm opacity-70">Total: {total}</div>
      </div>
      <div className="border border-white/10 rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-2">When</th>
              <th className="text-left p-2">Choice</th>
              <th className="text-left p-2">IP</th>
              <th className="text-left p-2">User-Agent</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r: any) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2 whitespace-nowrap">{new Date(r.createdAt).toISOString().slice(0,16).replace('T',' ')}</td>
                <td className="p-2">{r.choice}</td>
                <td className="p-2">{r.ip || '-'}</td>
                <td className="p-2 max-w-[480px] truncate" title={r.userAgent || ''}>{r.userAgent || '-'}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="p-4 text-center opacity-70">No records</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span>Page {page} / {pages}</span>
        {page > 1 && <a className="underline" href={`/admin/consents?page=${page-1}&limit=${take}`}>Prev</a>}
        {page < pages && <a className="underline" href={`/admin/consents?page=${page+1}&limit=${take}`}>Next</a>}
      </div>
    </div>
  )
}

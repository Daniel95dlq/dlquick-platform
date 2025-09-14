import { requireAuth } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"
import { UserRole } from "@prisma/client"
import AdminQuotesTable from "./AdminQuotesTable"

type QuoteRow = {
  id: string
  serviceTitle: string
  name: string
  email: string
  phone: string
  status: string
  createdAt: Date
}

const STATUSES = ['ALL','NEW','CONTACTED','QUOTED','WON','LOST'] as const

export default async function AdminQuotesPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  await requireAuth(UserRole.ADMIN)

  const raw = (searchParams?.status as string | undefined) || 'ALL'
  const s = raw.toUpperCase()
  const where = s !== 'ALL' ? { status: s } : {}
  const page = Math.max(1, parseInt((searchParams?.page as string) || '1', 10))
  const pageSize = 50
  const skip = (page - 1) * pageSize
  const total = await (prisma as any).quoteRequest.count({ where })

  const quotes = (await (prisma as any).quoteRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: pageSize,
    skip,
  })) as QuoteRow[]

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Recent Quote Requests</h1>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm opacity-70">Showing {quotes.length} of {total}</div>
        <form className="flex items-center">
          <label className="text-sm mr-2">Status</label>
          <select name="status" defaultValue={s} className="bg-transparent border rounded px-2 py-1 text-sm">
            {STATUSES.map(x => (<option key={x} value={x}>{x}</option>))}
          </select>
          <button className="ml-2 text-sm underline">Apply</button>
          <a href="/admin/quotes/export" className="ml-4 text-sm underline">Export CSV</a>
        </form>
      </div>
      <div className="mb-4 flex items-center gap-3 text-sm">
        <span>Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</span>
        <a className="underline" href={`?status=${s}&page=${Math.max(1, page - 1)}`}>Prev</a>
        <a className="underline" href={`?status=${s}&page=${page + 1}`}>Next</a>
      </div>
      <AdminQuotesTable items={quotes.map(q => ({
        id: q.id,
        when: q.createdAt.toISOString().slice(0,16).replace('T',' '),
        serviceTitle: q.serviceTitle,
        name: q.name,
        email: q.email,
        phone: q.phone,
        status: q.status,
      }))} />
    </div>
  )
}

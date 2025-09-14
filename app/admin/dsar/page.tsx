import { prisma } from "../../../lib/prisma"
import { requireAuth } from "../../../lib/auth"
import DSARTable from "../../../components/admin/DSARTable"

export const dynamic = 'force-dynamic'

export default async function AdminDSAR({ searchParams }: { searchParams?: Record<string,string | string[] | undefined> }) {
  await requireAuth('ADMIN' as any)
  const take = Math.min(200, Number(searchParams?.limit ?? 50))
  const page = Math.max(1, Number(searchParams?.page ?? 1))
  const skip = (page - 1) * take
  const [items, total] = await Promise.all([
    (prisma as any).dSARRequest.findMany({ orderBy: { createdAt: 'desc' }, skip, take }),
    (prisma as any).dSARRequest.count(),
  ])
  const pages = Math.max(1, Math.ceil(total / take))
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">DSAR Requests</h1>
        <div className="text-sm opacity-70">Total: {total}</div>
      </div>
      <DSARTable items={items as any} page={page} pages={pages} take={take} />
    </div>
  )
}

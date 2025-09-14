"use client"
import { useState } from "react"

type DSAR = {
  id: string
  createdAt: string | Date
  email: string
  type?: string | null
  status?: string | null
  notes?: string | null
}

export default function DSARTable({ items, page, pages, take }: { items: DSAR[]; page: number; pages: number; take: number }) {
  const [busyId, setBusyId] = useState<string | null>(null)

  const updateRow = async (id: string, data: Partial<Pick<DSAR, 'status' | 'notes'>>) => {
    try {
      setBusyId(id)
      const res = await fetch(`/api/admin/dsar/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Update failed')
      location.reload()
    } catch (e) {
      alert('Failed to update DSAR entry')
    } finally {
      setBusyId(null)
    }
  }

  const deleteRow = async (id: string) => {
    if (!confirm('Delete this DSAR request?')) return
    try {
      setBusyId(id)
      const res = await fetch(`/api/admin/dsar/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      location.reload()
    } catch (e) {
      alert('Failed to delete DSAR entry')
    } finally {
      setBusyId(null)
    }
  }

  const exportCsv = () => {
    window.location.href = `/api/admin/dsar/export`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm opacity-80">Page {page} / {pages}</div>
        <div className="flex items-center gap-2">
          <button onClick={exportCsv} className="text-xs px-3 py-1.5 rounded border border-dlq-gold text-dlq-gold">Export CSV</button>
          {page > 1 && <a className="text-xs underline" href={`/admin/dsar?page=${page-1}&limit=${take}`}>Prev</a>}
          {page < pages && <a className="text-xs underline" href={`/admin/dsar?page=${page+1}&limit=${take}`}>Next</a>}
        </div>
      </div>
      <div className="border border-white/10 rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-2">When</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Notes</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <Row key={r.id} r={r} busy={busyId === r.id} onUpdate={updateRow} onDelete={deleteRow} />
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} className="p-4 text-center opacity-70">No records</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row({ r, busy, onUpdate, onDelete }: { r: DSAR; busy: boolean; onUpdate: (id: string, d: any) => void; onDelete: (id: string) => void }) {
  const [status, setStatus] = useState(r.status ?? '')
  const [notes, setNotes] = useState(r.notes ?? '')
  const when = new Date(r.createdAt).toISOString().slice(0,16).replace('T',' ')
  return (
    <tr className="border-t border-white/10">
      <td className="p-2 whitespace-nowrap">{when}</td>
      <td className="p-2">{r.email}</td>
      <td className="p-2">{r.type || '-'}</td>
      <td className="p-2">
        <input value={status} onChange={(e)=>setStatus(e.target.value)} className="w-40 border border-white/20 bg-transparent rounded px-2 py-1" />
      </td>
      <td className="p-2">
        <input value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-64 border border-white/20 bg-transparent rounded px-2 py-1" />
      </td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          <button disabled={busy} onClick={()=>onUpdate(r.id, { status, notes })} className="text-xs px-2 py-1 rounded bg-dlq-gold text-[#0a1a4f] disabled:opacity-50">Save</button>
          <button disabled={busy} onClick={()=>onDelete(r.id)} className="text-xs px-2 py-1 rounded border border-red-400 text-red-300 disabled:opacity-50">Delete</button>
        </div>
      </td>
    </tr>
  )
}

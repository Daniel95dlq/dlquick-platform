"use client"

type Row = {
  id: string
  when: string
  serviceTitle: string
  name: string
  email: string
  phone: string
  status: string
}

export default function AdminQuotesTable({ items }: { items: Row[] }) {
  const toggleAll = (checked: boolean) => {
    document.querySelectorAll('tbody input[type="checkbox"]').forEach((el) => {
      ;(el as HTMLInputElement).checked = checked
    })
  }
  const onBulk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const status = (new FormData(form).get('status') as string) || ''
    const ids = Array.from(document.querySelectorAll('tbody input[type="checkbox"]'))
      .filter((el) => (el as HTMLInputElement).checked)
      .map((el) => (el as HTMLInputElement).getAttribute('data-id'))
      .filter(Boolean)
    if (!ids.length || !status) return
    await fetch('/api/quotes/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, status }) })
    location.reload()
  }

  return (
    <>
      <form className="mb-3 flex items-center gap-2" onSubmit={onBulk}>
        <span className="text-sm opacity-70">Bulk update selected:</span>
        <select name="status" className="bg-transparent border rounded px-2 py-1 text-sm">
          <option value="CONTACTED">CONTACTED</option>
          <option value="QUOTED">QUOTED</option>
          <option value="WON">WON</option>
          <option value="LOST">LOST</option>
        </select>
        <button className="text-sm underline">Apply</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left opacity-70">
            <tr>
              <th className="p-2"><input type="checkbox" onChange={(e) => toggleAll(e.currentTarget.checked)} /></th>
              <th className="p-2">When</th>
              <th className="p-2">Service</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((q) => (
              <tr key={q.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-2"><input type="checkbox" data-id={q.id} /></td>
                <td className="p-2 whitespace-nowrap">{q.when}</td>
                <td className="p-2"><a className="underline" href={`/admin/quotes/${q.id}`}>{q.serviceTitle}</a></td>
                <td className="p-2">{q.name}</td>
                <td className="p-2">{q.email}</td>
                <td className="p-2">{q.phone}</td>
                <td className="p-2">{q.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

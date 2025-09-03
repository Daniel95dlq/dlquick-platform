'use client';
import { useState } from 'react';

export default function Partners() {
  const [status, setStatus] = useState<string>('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/partner', { method:'POST', body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Request failed');
      setStatus('Submitted! We will contact you.');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('Error. Try again.');
    }
  }
  return (
    <main className="container py-12">
      <h2 className="h2">Become a DLQuick Partner</h2>
      <p className="opacity-90 mt-1">Drivers, stores, LTDs — join the premium network.</p>
      <form onSubmit={submit} className="card mt-4 grid gap-3 md:grid-cols-2">
        <div><label className="small">Full Name</label><input name="name" required className="w-full bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.15)] p-3 rounded-xl"/></div>
        <div><label className="small">Email</label><input type="email" name="email" required className="w-full bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.15)] p-3 rounded-xl"/></div>
        <div><label className="small">Role</label>
          <select name="role" className="w-full bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.15)] p-3 rounded-xl">
            <option>Driver/Partner</option>
            <option>Store/Merchant</option>
            <option>LTD Company</option>
          </select>
        </div>
        <div><label className="small">City</label><input name="city" className="w-full bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.15)] p-3 rounded-xl"/></div>
        <div className="md:col-span-2"><label className="small">Notes</label><textarea name="notes" rows={4} className="w-full bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.15)] p-3 rounded-xl"/></div>
        <div><button className="btn">Send</button></div>
        <div className="small">{status}</div>
      </form>
    </main>
  );
}

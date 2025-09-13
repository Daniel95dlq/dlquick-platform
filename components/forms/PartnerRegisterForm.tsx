"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Role = "driver" | "merchant" | "ltd"

type Props = { role: Role }

const tabsByRole: Record<Role, string[]> = {
  driver: ["Personal", "Documents", "Vehicle", "Compliance"],
  merchant: ["Business", "Contacts", "Operations", "Compliance"],
  ltd: ["Company", "Contacts", "Operations", "Compliance"],
}

export default function PartnerRegisterForm({ role }: Props) {
  const { register, handleSubmit } = useForm()
  const [tab, setTab] = useState(0)
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const inputClass = "border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2 placeholder:text-gray-400"

  const onSubmit = async (data: any) => {
    setStatus("saving")
    try {
      const res = await fetch("/api/partners/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, data }),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
    } catch (e) {
      setStatus("error")
    }
  }

  const TabButton = ({ i, children }: any) => (
    <button type="button" onClick={() => setTab(i)} className={`px-3 py-2 text-sm rounded border ${tab === i ? 'bg-dlq-gold text-[#0E2640]' : 'border-dlq-gold/30 text-dlq-gold'}`}>{children}</button>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabsByRole[role].map((t, i) => (
          <TabButton i={i} key={t}>{t}</TabButton>
        ))}
      </div>

      {/* Personal / Business */}
    {tab === 0 && role === 'driver' && (
        <div className="grid md:grid-cols-2 gap-4">
      <input className={inputClass} placeholder="First name" {...register('firstName', { required: true })} />
      <input className={inputClass} placeholder="Last name" {...register('lastName', { required: true })} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Email" type="email" {...register('email', { required: true })} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Phone" {...register('phone', { required: true })} />
      <input className={`${inputClass} md:col-span-2`} placeholder="UK Postcode" {...register('postcode', { required: true })} />
      <select className={inputClass} {...register('rightToWork', { required: true })}>
            <option value="">Right to work in the UK?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
      <input className={inputClass} placeholder="NI Number (optional)" {...register('ni')} />
        </div>
      )}
      {tab === 0 && role !== 'driver' && (
        <div className="grid md:grid-cols-2 gap-4">
      <input className={inputClass} placeholder="Company name" {...register('companyName', { required: true })} />
      <input className={inputClass} placeholder="Trading name (if different)" {...register('tradingName')} />
      <input className={inputClass} placeholder="Company number (Companies House)" {...register('companyNumber', { required: true })} />
      <input className={inputClass} placeholder="VAT number (if registered)" {...register('vatNumber')} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Registered address" {...register('registeredAddress', { required: true })} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Operations address" {...register('opsAddress')} />
      <input className={inputClass} placeholder="Primary contact name" {...register('contactName', { required: true })} />
      <input className={inputClass} placeholder="Contact email" type="email" {...register('contactEmail', { required: true })} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Contact phone" {...register('contactPhone', { required: true })} />
        </div>
      )}

      {/* Documents */}
    {tab === 1 && role === 'driver' && (
        <div className="grid md:grid-cols-2 gap-4">
      <input className={inputClass} placeholder="Driving licence number" {...register('licence', { required: true })} />
      <input className={inputClass} placeholder="Licence expiry (YYYY-MM)" {...register('licenceExpiry', { required: true })} />
      <input className={inputClass} placeholder="DBS Check reference (optional)" {...register('dbs')} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Proof of address (describe)" {...register('proofAddress', { required: true })} />
        </div>
      )}
      {tab === 1 && role !== 'driver' && (
        <div className="grid md:grid-cols-2 gap-4">
      <input className={inputClass} placeholder="Public liability insurance policy no." {...register('pli', { required: true })} />
      <input className={inputClass} placeholder="Insurance expiry (YYYY-MM)" {...register('insuranceExpiry', { required: true })} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Risk assessments / Method statements (RAMS) summary" {...register('rams')} />
        </div>
      )}

      {/* Vehicle / Operations */}
    {tab === 2 && role === 'driver' && (
        <div className="grid md:grid-cols-2 gap-4">
      <select className={inputClass} {...register('vehicleType', { required: true })}>
            <option value="">Vehicle type</option>
            <option>Bike</option>
            <option>Car</option>
            <option>Van (SWB)</option>
            <option>Van (LWB)</option>
          </select>
      <input className={inputClass} placeholder="Insurance policy no." {...register('vehicleInsurance', { required: true })} />
      <input className={inputClass} placeholder="MOT expiry (YYYY-MM)" {...register('motExpiry')} />
      <input className={inputClass} placeholder="Courier hire and reward? (Yes/No)" {...register('hireReward', { required: true })} />
        </div>
      )}
      {tab === 2 && role !== 'driver' && (
        <div className="grid md:grid-cols-2 gap-4">
      <input className={inputClass} placeholder="Operating hours (e.g. Mon–Sun 08:00–22:00)" {...register('hours')} />
      <input className={inputClass} placeholder="Service categories (comma separated)" {...register('categories')} />
      <input className={`${inputClass} md:col-span-2`} placeholder="Coverage areas / postcodes" {...register('areas')} />
        </div>
      )}

      {/* Compliance */}
    {tab === 3 && (
        <div className="grid md:grid-cols-2 gap-4">
      <select className={inputClass} {...register('gdpr', { required: true })}>
            <option value="">GDPR consent to process data?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
      <select className={inputClass} {...register('terms', { required: true })}>
            <option value="">Accept DLQuick terms?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
      <textarea className={`${inputClass} md:col-span-2`} placeholder="Notes / additional info" rows={4} {...register('notes')} />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button disabled={status==='saving'} className="bg-dlq-gold text-[#0E2640] px-5 py-2 rounded hover:bg-dlq-gold-600" type="submit">Submit</button>
        {status === 'success' && <span className="text-green-400 text-sm">Submitted. We’ll be in touch.</span>}
        {status === 'error' && <span className="text-red-400 text-sm">Failed to submit. Try again.</span>}
      </div>
    </form>
  )
}

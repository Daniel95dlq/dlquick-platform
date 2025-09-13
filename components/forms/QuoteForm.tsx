"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Field = {
  name: string
  label: string
  type: "text" | "textarea" | "number" | "select" | "date" | "time" | "address" | "boolean"
  required?: boolean
  placeholder?: string
  options?: string[]
}

export default function QuoteForm({ serviceSlug, serviceTitle, fields }: { serviceSlug: string; serviceTitle: string; fields: Field[] }) {
  const { register, handleSubmit, reset } = useForm()
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  const onSubmit = async (data: any) => {
    setStatus("submitting")
    setMessage("")
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceSlug, serviceTitle, data }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setMessage("Thanks! We’ve received your request. We’ll get back with a quote shortly.")
      reset()
    } catch (e) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input className="border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2 placeholder:text-gray-400" placeholder="Full name" {...register("name", { required: true })} />
        <input className="border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2 placeholder:text-gray-400" placeholder="Email" type="email" {...register("email", { required: true })} />
        <input className="border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2 md:col-span-2 placeholder:text-gray-400" placeholder="Phone" {...register("phone", { required: true })} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.name} className={f.type === "textarea" ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium mb-1">{f.label}{f.required ? " *" : ""}</label>
            {f.type === "textarea" && (
              <textarea className="w-full border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2 placeholder:text-gray-400" placeholder={f.placeholder} rows={4} {...register(f.name, { required: f.required })} />
            )}
            {f.type === "select" && (
              <select className="w-full border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2" {...register(f.name, { required: f.required })}>
                <option value="">Select...</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            )}
            {f.type !== "textarea" && f.type !== "select" && (
              <input className="w-full border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2" type={f.type === "boolean" ? "checkbox" : f.type}
                     placeholder={f.placeholder} {...register(f.name, { required: f.required })} />
            )}
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Additional details</label>
        <textarea className="w-full border border-dlq-gold/30 bg-[#0f2238] text-gray-100 rounded px-3 py-2" rows={4} placeholder="Anything we should know?" {...register("notes")} />
      </div>
      <button disabled={status === "submitting"} className="bg-dlq-gold text-[#0E2640] px-5 py-2 rounded hover:bg-dlq-gold-600 disabled:opacity-60" type="submit">
        {status === "submitting" ? "Sending..." : "Request a quote"}
      </button>
      {message && (
        <p className={`text-sm mt-2 ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : ""}`}>{message}</p>
      )}
    </form>
  )}

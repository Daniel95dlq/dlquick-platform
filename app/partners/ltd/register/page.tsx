import PartnerRegisterForm from "../../../../components/forms/PartnerRegisterForm"

export default function LTDRegisterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-3">Register as an LTD Partner</h1>
      <p className="text-gray-200 mb-6">We work with Limited companies across logistics and services.</p>
      <PartnerRegisterForm role="ltd" />
    </div>
  )
}

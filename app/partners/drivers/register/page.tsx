import PartnerRegisterForm from "../../../../components/forms/PartnerRegisterForm"

export default function DriverRegisterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-serif text-dlq-gold mb-3">Register as a Driver</h1>
      <p className="text-gray-200 mb-6">Provide your details to start delivering with DLQuick.</p>
      <PartnerRegisterForm role="driver" />
    </div>
  )
}

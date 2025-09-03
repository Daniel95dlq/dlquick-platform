'use client'

import React from 'react'
import Link from 'next/link'

const BuyerProtectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Buyer <span className="text-brand-gold">Protection</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive protection for all your DLQuick transactions and services
            </p>
          </div>
        </div>
      </section>

      {/* Protection Content */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card prose prose-invert max-w-none">
            
            <div className="mb-8 text-sm text-gray-400">
              <p><strong>Coverage Start:</strong> 3 September 2025</p>
              <p><strong>Policy Provider:</strong> DLQuick UK Ltd in partnership with licensed insurers</p>
              <p><strong>Customer Service:</strong> Available 24/7 for urgent protection claims</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">1. Protection Overview</h2>
            <p className="text-gray-300 mb-6">
              DLQuick Buyer Protection ensures you're covered when things don't go as planned. Our comprehensive protection program 
              covers service failures, damage, theft, and other issues that may arise during your service booking.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">2. What's Covered</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Delivery Protection</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Lost Items:</strong> Full refund for items lost during delivery</li>
              <li><strong>Damaged Goods:</strong> Repair or replacement value up to £1,000 per item</li>
              <li><strong>Late Delivery:</strong> Service credit for significant delays</li>
              <li><strong>Wrong Address:</strong> Re-delivery at no additional cost</li>
              <li><strong>Food Safety:</strong> Full refund for food safety violations</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Removals Protection</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Furniture Damage:</strong> Professional repair or replacement</li>
              <li><strong>Property Damage:</strong> Coverage up to £5,000 for property damage</li>
              <li><strong>Lost Items:</strong> Full value compensation for lost belongings</li>
              <li><strong>Team No-Show:</strong> Emergency replacement team or full refund</li>
              <li><strong>Incomplete Service:</strong> Partial refund or completion guarantee</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.3 Trade Services Protection</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Poor Workmanship:</strong> Correction or re-do at no cost</li>
              <li><strong>Material Issues:</strong> Coverage for defective materials</li>
              <li><strong>Safety Violations:</strong> Professional safety inspection and correction</li>
              <li><strong>Incomplete Work:</strong> Completion guarantee or full refund</li>
              <li><strong>Emergency Repairs:</strong> 24/7 emergency response coverage</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.4 Personal Services Protection</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>Service Standards:</strong> Quality guarantee for all personal services</li>
              <li><strong>Professional Conduct:</strong> Protection against unprofessional behaviour</li>
              <li><strong>Property Security:</strong> Coverage for items damaged during home services</li>
              <li><strong>No-Show Protection:</strong> Immediate rebooking or full refund</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Coverage Limits</h2>
            
            <div className="bg-brand-navy/30 border border-brand-gold/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Standard Coverage Limits</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><strong>Food Delivery:</strong> Up to £100 per order</p>
                  <p><strong>Parcels/Packages:</strong> Up to £500 per item</p>
                  <p><strong>Groceries:</strong> Up to £200 per order</p>
                  <p><strong>Personal Items:</strong> Up to £1,000 per item</p>
                </div>
                <div>
                  <p><strong>Furniture/Large Items:</strong> Up to £2,500 per item</p>
                  <p><strong>Full Removals:</strong> Up to £25,000 per move</p>
                  <p><strong>Trade Services:</strong> Up to £10,000 per project</p>
                  <p><strong>Vehicle Services:</strong> Up to £5,000 per service</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">4. Claims Process</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Immediate Reporting</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Report issues within 24 hours of service completion</li>
              <li>Use in-app reporting for fastest processing</li>
              <li>Emergency claims line: +44 (0) 20 7946 0999</li>
              <li>Email claims: protection@dlquick.co.uk</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Required Documentation</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Photos of damage or issues</li>
              <li>Service booking confirmation</li>
              <li>Communication records with service provider</li>
              <li>Receipts or proof of value for items</li>
              <li>Third-party reports (if applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.3 Processing Timeline</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>Emergency Claims:</strong> 2-4 hours response</li>
              <li><strong>Standard Claims:</strong> 24-48 hours initial review</li>
              <li><strong>Complex Claims:</strong> 5-7 business days investigation</li>
              <li><strong>Payment:</strong> 3-5 business days after approval</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">5. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">5.1 First-Level Resolution</h3>
            <p className="text-gray-300 mb-4">
              Our customer service team will work directly with you and the service provider to resolve issues quickly and fairly. 
              Most disputes are resolved within 48 hours at this level.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Escalated Disputes</h3>
            <p className="text-gray-300 mb-4">
              For complex cases, we engage independent mediators and, when necessary, work with Trading Standards or other 
              regulatory bodies to ensure fair resolution.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">5.3 Appeal Process</h3>
            <p className="text-gray-300 mb-6">
              If you disagree with a claim decision, you can appeal within 14 days. Appeals are reviewed by a different team 
              and include additional documentation review.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">6. Fraud Protection</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Payment Security</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>All payments secured with bank-level encryption</li>
              <li>Fraud monitoring on all transactions</li>
              <li>Instant refunds for unauthorized charges</li>
              <li>Chargeback protection for customers</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 Identity Verification</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>All service providers undergo background checks</li>
              <li>Real-time identity verification</li>
              <li>Insurance requirements for all providers</li>
              <li>Regular re-verification processes</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">7. Emergency Support</h2>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">24/7 Emergency Line</h3>
              <p className="text-gray-300 mb-2">
                <strong>Phone:</strong> +44 (0) 20 7946 0999
              </p>
              <p className="text-gray-300 mb-2">
                <strong>Emergency situations include:</strong>
              </p>
              <ul className="text-gray-300 list-disc ml-6">
                <li>Safety concerns or threats</li>
                <li>Significant property damage</li>
                <li>Theft or criminal activity</li>
                <li>Service provider misconduct</li>
                <li>Medical emergencies during service</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">8. Exclusions</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">8.1 Not Covered</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Pre-existing damage not disclosed</li>
              <li>Items prohibited by our terms</li>
              <li>Damage due to customer negligence</li>
              <li>Natural disasters and acts of God</li>
              <li>Wear and tear from normal use</li>
              <li>Consequential or indirect losses</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">8.2 Reduced Coverage</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Cash transactions have limited protection</li>
              <li>Services outside UK may have different terms</li>
              <li>High-value items require pre-declaration</li>
              <li>DIY or customer-assisted services have modified coverage</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">9. Contact Protection Team</h2>
            <div className="text-gray-300 mb-6">
              <p><strong>Buyer Protection Team</strong></p>
              <p>Email: protection@dlquick.co.uk</p>
              <p>Phone: +44 (0) 20 7946 0958</p>
              <p>Emergency: +44 (0) 20 7946 0999</p>
              <p>Hours: 24/7 for urgent claims, 8am-8pm for general inquiries</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                DLQuick Buyer Protection is backed by comprehensive insurance and our commitment to customer satisfaction. 
                Protection terms are subject to the main Terms of Service.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/legal/terms" className="glass-button">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="glass-button">
              Privacy Policy
            </Link>
            <Link href="/legal/partner-agreement" className="glass-button">
              Partner Agreement
            </Link>
            <Link href="/" className="glass-button">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BuyerProtectionPage

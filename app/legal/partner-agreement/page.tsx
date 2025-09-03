'use client'

import React from 'react'
import Link from 'next/link'

const PartnerAgreementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Partner <span className="text-brand-gold">Agreement</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Terms and conditions for DLQuick service providers, drivers, and delivery partners
            </p>
          </div>
        </div>
      </section>

      {/* Agreement Content */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card prose prose-invert max-w-none">
            
            <div className="mb-8 text-sm text-gray-400">
              <p><strong>Agreement Date:</strong> 3 September 2025</p>
              <p><strong>Company:</strong> DLQuick UK Ltd</p>
              <p><strong>Partner Type:</strong> Independent Service Providers & Drivers</p>
              <p><strong>Jurisdiction:</strong> England and Wales</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">1. Partnership Overview</h2>
            <p className="text-gray-300 mb-6">
              This agreement governs the relationship between DLQuick UK Ltd ("DLQuick") and independent service providers, 
              drivers, and delivery partners ("Partners") who provide services through our platform. Partners operate as 
              independent contractors, not employees.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">2. Partner Requirements</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 General Requirements</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Must be 18 years or older</li>
              <li>Valid UK residency or work authorization</li>
              <li>Clean DBS check (Enhanced for vulnerable services)</li>
              <li>Professional liability insurance minimum £1 million</li>
              <li>Smartphone with GPS capability</li>
              <li>Professional appearance and conduct</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Driver Requirements</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Valid UK driving licence (minimum 2 years)</li>
              <li>Vehicle insurance for commercial use</li>
              <li>MOT certificate (if applicable)</li>
              <li>Vehicle registration documents</li>
              <li>Maximum 6 penalty points on licence</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.3 Specialist Service Requirements</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>Removals:</strong> Team certification, lifting equipment training</li>
              <li><strong>Trades:</strong> Relevant qualifications, Gas Safe registration (where applicable)</li>
              <li><strong>Healthcare:</strong> Professional registration, CQC compliance</li>
              <li><strong>Pet Care:</strong> Animal handling certification, veterinary references</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Earnings & Payment Structure</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">3.1 Commission Structure</h3>
            <div className="bg-brand-navy/30 border border-brand-gold/20 rounded-lg p-6 mb-4">
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><strong>Food Delivery:</strong> 80% of order value</p>
                  <p><strong>Standard Services:</strong> 85% of booking value</p>
                  <p><strong>Large Items/Taxi:</strong> 90% of booking value</p>
                  <p><strong>Removals:</strong> 85% split among team</p>
                </div>
                <div>
                  <p><strong>Platform Fee:</strong> Deducted from total</p>
                  <p><strong>Service Charge:</strong> £0.50 per booking</p>
                  <p><strong>Bulk Deliveries:</strong> £2.50 per parcel + £10 van bonus</p>
                  <p><strong>Tips:</strong> 100% to service provider</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">3.2 Fair Stack Pay System</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>First Order:</strong> Full payment amount goes to partner</li>
              <li><strong>Subsequent Orders:</strong> Minimum £3.00 + distance/time bonuses</li>
              <li><strong>Peak Time Multipliers:</strong> Up to 2x during high demand</li>
              <li><strong>Quality Bonuses:</strong> Extra earnings for excellent ratings</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.3 Payment Schedule</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>"Pay Me Now":</strong> Instant transfer (small fee applies)</li>
              <li><strong>Daily Payouts:</strong> Automatic daily transfers</li>
              <li><strong>Weekly Payouts:</strong> Every Friday for previous week</li>
              <li><strong>Minimum Payout:</strong> £5.00 threshold</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">4. Service Standards</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Professional Conduct</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Punctual arrival within agreed time windows</li>
              <li>Professional communication with customers</li>
              <li>Appropriate dress code for service type</li>
              <li>Respectful treatment of customer property</li>
              <li>Follow all safety protocols</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Quality Metrics</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Rating Requirement:</strong> Maintain 4.7+ star average</li>
              <li><strong>Completion Rate:</strong> 95%+ acceptance of accepted bookings</li>
              <li><strong>Response Time:</strong> Respond to bookings within 5 minutes</li>
              <li><strong>Customer Communication:</strong> Regular updates during service</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.3 Performance Monitoring</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Weekly performance reviews</li>
              <li>Customer feedback analysis</li>
              <li>GPS tracking for delivery optimization</li>
              <li>Photo verification for completed services</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">5. Partner Responsibilities</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">5.1 Legal Compliance</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Maintain all required licenses and certifications</li>
              <li>Comply with health and safety regulations</li>
              <li>Follow data protection requirements</li>
              <li>Report incidents immediately</li>
              <li>Maintain current insurance coverage</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Equipment & Vehicle Maintenance</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Keep vehicles roadworthy and clean</li>
              <li>Maintain professional tools and equipment</li>
              <li>Ensure smartphone is functional and charged</li>
              <li>Provide own safety equipment (where applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.3 Financial Obligations</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Responsible for own tax obligations</li>
              <li>Maintain appropriate business insurance</li>
              <li>Handle vehicle costs and maintenance</li>
              <li>Provide valid bank account for payments</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">6. DLQuick Obligations</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Platform Services</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Provide functional booking platform</li>
              <li>Process payments securely and promptly</li>
              <li>Offer customer support for disputes</li>
              <li>Maintain partner insurance coverage</li>
              <li>Provide marketing and customer acquisition</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 Partner Support</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>24/7 partner support hotline</li>
              <li>Training materials and resources</li>
              <li>Equipment financing options</li>
              <li>Performance feedback and coaching</li>
              <li>Legal support for work-related issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">7. Termination Conditions</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">7.1 Immediate Termination</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Theft or fraud</li>
              <li>Violence or threats</li>
              <li>Serious safety violations</li>
              <li>Criminal conviction</li>
              <li>Insurance lapse</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">7.2 Performance-Based Termination</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Rating below 4.5 for 30 days</li>
              <li>Completion rate below 90%</li>
              <li>Repeated customer complaints</li>
              <li>Non-compliance with training requirements</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">7.3 Voluntary Termination</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>14 days notice required</li>
              <li>Complete all accepted bookings</li>
              <li>Final payment within 7 days</li>
              <li>Return any DLQuick-provided equipment</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">8. Insurance & Liability</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">8.1 Required Insurance</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Public Liability:</strong> Minimum £2 million</li>
              <li><strong>Professional Indemnity:</strong> £1 million for specialist services</li>
              <li><strong>Vehicle Insurance:</strong> Business use coverage</li>
              <li><strong>Goods in Transit:</strong> Coverage for valuable items</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">8.2 DLQuick Coverage</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Additional liability protection for qualifying partners</li>
              <li>Customer protection fund</li>
              <li>Legal support for work-related disputes</li>
              <li>Equipment insurance for provided items</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">9. Dispute Resolution</h2>
            <p className="text-gray-300 mb-4">
              Disputes between partners and DLQuick will be handled through mediation first, 
              with escalation to arbitration if necessary. All disputes are subject to UK jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">10. Contact Information</h2>
            <div className="text-gray-300 mb-6">
              <p><strong>Partner Support Team</strong></p>
              <p>Email: partners@dlquick.co.uk</p>
              <p>Phone: +44 (0) 20 7946 0950</p>
              <p>Emergency: +44 (0) 20 7946 0999</p>
              <p>Hours: 24/7 support available</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                This Partner Agreement is subject to UK law and the main DLQuick Terms of Service. 
                Partners operate as independent contractors, not employees of DLQuick UK Ltd.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/legal/terms" className="glass-button">
              Terms of Service
            </Link>
            <Link href="/legal/merchant-agreement" className="glass-button">
              Merchant Agreement
            </Link>
            <Link href="/legal/buyer-protection" className="glass-button">
              Buyer Protection
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

export default PartnerAgreementPage

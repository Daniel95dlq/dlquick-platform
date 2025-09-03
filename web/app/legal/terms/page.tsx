'use client'

import React from 'react'
import Link from 'next/link'

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Terms of <span className="text-brand-gold">Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These terms govern your use of DLQuick services in the United Kingdom
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card prose prose-invert max-w-none">
            
            <div className="mb-8 text-sm text-gray-400">
              <p><strong>Last Updated:</strong> 3 September 2025</p>
              <p><strong>Effective Date:</strong> 3 September 2025</p>
              <p><strong>Company:</strong> DLQuick UK Ltd, Registered in England and Wales</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">1. About DLQuick</h2>
            <p className="text-gray-300 mb-6">
              DLQuick UK Ltd ("DLQuick", "we", "us", "our") is a logistics and service platform registered in England and Wales. 
              We connect customers with independent service providers for deliveries, removals, trades, home services, and other logistics solutions across the United Kingdom.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing or using DLQuick services, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Service Categories & Pricing</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">3.1 Food Delivery</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Minimum £4.00 order for driver allocation</li>
              <li>DLQuick commission: 20% of order value</li>
              <li>No refunds for food orders due to safety and hygiene requirements</li>
              <li>Returns require merchant confirmation before driver can process</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.2 Standard Services</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Commission: 15% of service value</li>
              <li>Platform fee: £2.00 per booking</li>
              <li>Service charge: £0.50 per booking</li>
              <li>Applies to: Parcels, Groceries, Home Services, Personal Services, Pet Care</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.3 Large Items & Taxi Services</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Commission: 10% of service value</li>
              <li>Includes: Furniture delivery, bulky items, passenger transport</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.4 Removals Services</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Commission: 15% automatically split between team members</li>
              <li>Minimum team insurance requirements apply</li>
              <li>Background checks mandatory for all removal staff</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.5 Bulk Van Deliveries</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Customer rate: £6.99 per parcel</li>
              <li>Driver payment: £2.50 per parcel + £10.00 van bonus</li>
              <li>Maximum 100 parcels per van route</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">4. User Responsibilities</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Customer Obligations</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Provide accurate delivery/service information</li>
              <li>Be available at specified times</li>
              <li>Ensure safe access to service locations</li>
              <li>Pay all fees and charges promptly</li>
              <li>Treat service providers with respect</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Service Provider Obligations</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Complete background checks where required</li>
              <li>Maintain appropriate insurance coverage</li>
              <li>Provide professional, timely service</li>
              <li>Follow all safety protocols</li>
              <li>Comply with UK laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">5. Prohibited Activities</h2>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Illegal goods or services</li>
              <li>Age-restricted items without proper verification</li>
              <li>Dangerous or hazardous materials</li>
              <li>Theft or fraudulent activity</li>
              <li>Harassment or abusive behaviour</li>
              <li>Circumventing platform fees</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">6. Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Fair Stack Pay Mode</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>First order: Full payment to service provider</li>
              <li>Subsequent orders: Minimum £3.00 + distance/time bonus</li>
              <li>Ensures fair compensation while maintaining efficiency</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 Cash Out Options</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>"Pay Me Now" instant transfer available</li>
              <li>Scheduled payouts available</li>
              <li>Standard processing times apply</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">7. Insurance & Liability</h2>
            <p className="text-gray-300 mb-4">
              All service providers must maintain appropriate insurance coverage. DLQuick provides additional protection for qualifying services. 
              We are not liable for damages beyond the scope of our insurance coverage.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">8. Dispute Resolution</h2>
            <p className="text-gray-300 mb-4">
              Disputes are handled through our internal resolution process first, with escalation to formal dispute resolution if necessary. 
              All disputes are subject to UK jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">9. Termination</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right to terminate accounts for violations of these terms, illegal activity, or other breaches of conduct. 
              Immediate termination applies to theft or serious safety violations.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">10. Privacy & Data Protection</h2>
            <p className="text-gray-300 mb-4">
              We comply with UK GDPR and Data Protection Act 2018. See our <Link href="/legal/privacy" className="text-brand-gold hover:underline">Privacy Policy</Link> for full details.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">11. Changes to Terms</h2>
            <p className="text-gray-300 mb-6">
              We may update these terms periodically. Continued use of our services constitutes acceptance of any changes.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">12. Contact Information</h2>
            <div className="text-gray-300 mb-6">
              <p><strong>DLQuick UK Ltd</strong></p>
              <p>Email: legal@dlquick.co.uk</p>
              <p>Phone: +44 (0) 20 7946 0958</p>
              <p>Address: [UK Registered Office Address]</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                © 2025 DLQuick UK Ltd. All rights reserved. Company registered in England and Wales.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/legal/privacy" className="glass-button">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies" className="glass-button">
              Cookie Policy
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

export default TermsPage

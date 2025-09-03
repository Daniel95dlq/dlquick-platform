'use client'

import React from 'react'
import Link from 'next/link'

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Privacy <span className="text-brand-gold">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              How we collect, use, and protect your personal information under UK GDPR
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card prose prose-invert max-w-none">
            
            <div className="mb-8 text-sm text-gray-400">
              <p><strong>Last Updated:</strong> 3 September 2025</p>
              <p><strong>Data Controller:</strong> DLQuick UK Ltd</p>
              <p><strong>ICO Registration:</strong> [Registration Number]</p>
              <p><strong>UK GDPR Compliance:</strong> Data Protection Act 2018</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">1. Introduction</h2>
            <p className="text-gray-300 mb-6">
              DLQuick UK Ltd ("we", "us", "our") is committed to protecting your privacy and personal data. This policy explains how we collect, 
              use, store, and share your information when you use our platform, in accordance with UK GDPR and the Data Protection Act 2018.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">2. Data We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Account Information</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Full name, email address, phone number</li>
              <li>Postal address for deliveries and services</li>
              <li>Age verification for restricted services</li>
              <li>Profile photo (optional)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Service Provider Data</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Identity verification documents</li>
              <li>DBS/Background check results</li>
              <li>Insurance and qualification certificates</li>
              <li>Vehicle registration and MOT details</li>
              <li>Banking details for payments</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.3 Usage Data</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Service booking history and preferences</li>
              <li>Location data for deliveries and route optimization</li>
              <li>Communication records between users</li>
              <li>Performance ratings and reviews</li>
              <li>App usage analytics and device information</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.4 Financial Data</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Payment card information (securely processed by payment providers)</li>
              <li>Transaction history and receipts</li>
              <li>Billing addresses and VAT information</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Legal Basis for Processing</h2>
            
            <div className="text-gray-300 mb-6">
              <p className="mb-4">We process your data under the following legal bases:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Contract Performance:</strong> To provide our logistics services</li>
                <li><strong>Legitimate Interest:</strong> Platform security, fraud prevention, service improvement</li>
                <li><strong>Legal Obligation:</strong> Tax reporting, regulatory compliance, safety checks</li>
                <li><strong>Consent:</strong> Marketing communications, optional features</li>
                <li><strong>Vital Interests:</strong> Emergency situations, safety protection</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">4. How We Use Your Data</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Delivery</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Matching customers with appropriate service providers</li>
              <li>Processing bookings and payments</li>
              <li>Real-time tracking and updates</li>
              <li>Customer support and dispute resolution</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Safety & Security</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Identity verification and background checks</li>
              <li>Fraud detection and prevention</li>
              <li>Insurance claims processing</li>
              <li>Incident reporting and investigation</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.3 Business Operations</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Platform analytics and performance monitoring</li>
              <li>Service quality improvement</li>
              <li>Legal compliance and regulatory reporting</li>
              <li>Financial accounting and tax obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">5. Data Sharing</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">5.1 Service Providers</h3>
            <p className="text-gray-300 mb-4">
              We share necessary contact and delivery information with assigned service providers to complete your booking. 
              This includes your name, phone number, delivery address, and specific service requirements.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Third-Party Services</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Payment Processors:</strong> Stripe, PayPal for secure transactions</li>
              <li><strong>Background Checks:</strong> DBS services and verification providers</li>
              <li><strong>Insurance:</strong> Claims processing and risk assessment</li>
              <li><strong>Analytics:</strong> Google Analytics (anonymized data only)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.3 Legal Requirements</h3>
            <p className="text-gray-300 mb-6">
              We may disclose data when required by law, court orders, or to protect rights, property, or safety.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">6. Data Retention</h2>
            
            <div className="text-gray-300 mb-6">
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Account Data:</strong> Retained while account is active + 7 years after closure</li>
                <li><strong>Transaction Records:</strong> 7 years for tax and legal compliance</li>
                <li><strong>Background Checks:</strong> Updated every 3 years, historical records kept for audit</li>
                <li><strong>Communication Logs:</strong> 2 years for dispute resolution</li>
                <li><strong>Location Data:</strong> 30 days unless required for specific incident investigation</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">7. Your Rights Under UK GDPR</h2>
            
            <div className="text-gray-300 mb-6">
              <p className="mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Remove consent for marketing communications</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">8. Cookies & Tracking</h2>
            <p className="text-gray-300 mb-4">
              We use essential cookies for platform functionality and optional cookies for analytics and personalization. 
              See our <Link href="/legal/cookies" className="text-brand-gold hover:underline">Cookie Policy</Link> for detailed information.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">9. Data Security</h2>
            
            <div className="text-gray-300 mb-6">
              <p className="mb-4">We implement comprehensive security measures:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>SSL/TLS encryption for all data transmission</li>
                <li>Encrypted storage of sensitive information</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and staff security training</li>
                <li>Incident response procedures</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">10. International Transfers</h2>
            <p className="text-gray-300 mb-6">
              We primarily process data within the UK. Any international transfers are protected by adequacy decisions 
              or appropriate safeguards as required by UK GDPR.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">11. Children's Privacy</h2>
            <p className="text-gray-300 mb-6">
              Our services are not intended for children under 16. We do not knowingly collect personal data from children. 
              Age verification is required for accounts and certain services.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">12. Updates to This Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this policy to reflect legal changes or service improvements. 
              Significant changes will be communicated via email or platform notifications.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">13. Contact & Complaints</h2>
            <div className="text-gray-300 mb-6">
              <p className="mb-4"><strong>Data Protection Officer:</strong></p>
              <p>Email: dpo@dlquick.co.uk</p>
              <p>Phone: +44 (0) 20 7946 0958</p>
              <p>Post: DLQuick UK Ltd, Data Protection Officer, [UK Address]</p>
              
              <p className="mt-4 mb-2"><strong>Right to Complain:</strong></p>
              <p>Information Commissioner's Office (ICO)</p>
              <p>Website: ico.org.uk</p>
              <p>Helpline: 0303 123 1113</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                This privacy policy complies with UK GDPR and Data Protection Act 2018. 
                © 2025 DLQuick UK Ltd. All rights reserved.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/legal/terms" className="glass-button">
              Terms of Service
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

export default PrivacyPage

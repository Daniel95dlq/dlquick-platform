'use client'

import React from 'react'
import Link from 'next/link'

const MerchantAgreementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Merchant <span className="text-brand-gold">Agreement</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Terms and conditions for restaurants, retailers, and businesses using DLQuick platform
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
              <p><strong>Merchant Type:</strong> Restaurants, Retailers, Service Businesses</p>
              <p><strong>Jurisdiction:</strong> England and Wales</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">1. Merchant Partnership Overview</h2>
            <p className="text-gray-300 mb-6">
              This agreement governs the relationship between DLQuick UK Ltd ("DLQuick") and businesses, restaurants, 
              and retailers ("Merchants") who sell products or services through our platform. This creates a marketplace 
              where customers can order from multiple merchants with unified delivery.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">2. Merchant Requirements</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Business Registration</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Valid UK business registration (Companies House or self-employed)</li>
              <li>Appropriate business insurance coverage</li>
              <li>Food hygiene rating 4+ (for food merchants)</li>
              <li>Current licenses for regulated products</li>
              <li>VAT registration if applicable</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Food Safety (Restaurants & Food Retailers)</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>FSA food hygiene rating minimum 4 stars</li>
              <li>HACCP compliance certification</li>
              <li>Allergen information for all products</li>
              <li>Temperature control for delivery items</li>
              <li>Packaging suitable for delivery</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.3 Retail Requirements</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Product liability insurance</li>
              <li>Age verification systems (for restricted items)</li>
              <li>Clear product descriptions and images</li>
              <li>Accurate stock management</li>
              <li>Returns and refunds policy</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Commission & Fee Structure</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">3.1 Food Delivery Commission</h3>
            <div className="bg-brand-navy/30 border border-brand-gold/20 rounded-lg p-6 mb-4">
              <div className="text-gray-300">
                <p><strong>Standard Rate:</strong> 20% of order value</p>
                <p><strong>Minimum Order:</strong> £4.00 for driver allocation</p>
                <p><strong>No Refund Policy:</strong> Food orders cannot be refunded once prepared</p>
                <p><strong>Return Requirements:</strong> Merchant must approve all returns before driver processing</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">3.2 Retail Commission</h3>
            <div className="bg-brand-navy/30 border border-brand-gold/20 rounded-lg p-6 mb-4">
              <div className="text-gray-300">
                <p><strong>Standard Rate:</strong> 15% of product value</p>
                <p><strong>Platform Fee:</strong> £2.00 per order</p>
                <p><strong>Service Charge:</strong> £0.50 per order</p>
                <p><strong>Large Items:</strong> 10% commission (furniture, appliances)</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">3.3 Payment Schedule</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>Daily Payouts:</strong> Automatic transfer every 24 hours</li>
              <li><strong>Weekly Payouts:</strong> Every Friday for previous week</li>
              <li><strong>Reserve Fund:</strong> 10% held for 14 days for refunds/disputes</li>
              <li><strong>Minimum Payout:</strong> £10.00 threshold</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">4. Product Listing & Management</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Product Information</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Accurate product descriptions and pricing</li>
              <li>High-quality product images (minimum 800x800px)</li>
              <li>Complete ingredient/material lists</li>
              <li>Allergen and safety warnings</li>
              <li>Preparation/delivery time estimates</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Inventory Management</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Real-time stock level updates</li>
              <li>Automatic item disabling when out of stock</li>
              <li>Seasonal menu/product management</li>
              <li>Bulk upload capabilities</li>
              <li>Integration with existing POS systems</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.3 Prohibited Items</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Illegal or regulated substances</li>
              <li>Age-restricted items without verification</li>
              <li>Counterfeit or unauthorized products</li>
              <li>Perishable items unsuitable for delivery</li>
              <li>Dangerous or hazardous materials</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">5. Order Management</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">5.1 Order Processing</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Accept or decline orders within 5 minutes</li>
              <li>Prepare orders within estimated time</li>
              <li>Package items securely for delivery</li>
              <li>Provide order ready notifications</li>
              <li>Handle special requests and modifications</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Quality Standards</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Acceptance Rate:</strong> Maintain 95%+ order acceptance</li>
              <li><strong>Preparation Time:</strong> Meet estimated preparation times</li>
              <li><strong>Customer Rating:</strong> Maintain 4.5+ star average</li>
              <li><strong>Order Accuracy:</strong> 98%+ order accuracy rate</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.3 Peak Time Management</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Adjust preparation times during busy periods</li>
              <li>Temporarily disable items if overwhelmed</li>
              <li>Communicate delays promptly</li>
              <li>Maintain quality standards during high volume</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">6. Marketing & Promotion</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Platform Marketing</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Featured placement in app and website</li>
              <li>Social media promotion</li>
              <li>Email marketing to customer base</li>
              <li>Local advertising campaigns</li>
              <li>Search engine optimization</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 Merchant Promotions</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Create discount codes and offers</li>
              <li>Bundle deals and meal combos</li>
              <li>Loyalty program integration</li>
              <li>Seasonal and special event promotions</li>
              <li>Free delivery promotions</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.3 Brand Guidelines</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Consistent brand representation</li>
              <li>Approved logo and image usage</li>
              <li>Professional product photography</li>
              <li>Accurate business information</li>
              <li>Customer review management</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">7. Returns & Refunds</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">7.1 Food Orders</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>No Refund Policy:</strong> Food cannot be refunded once prepared</li>
              <li><strong>Quality Issues:</strong> Merchant covers replacement costs</li>
              <li><strong>Wrong Orders:</strong> Merchant responsible for corrections</li>
              <li><strong>Allergic Reactions:</strong> Immediate resolution required</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">7.2 Retail Products</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>14-Day Return Policy:</strong> Standard consumer rights</li>
              <li><strong>Damaged Items:</strong> Full refund or replacement</li>
              <li><strong>Wrong Items:</strong> Exchange at merchant cost</li>
              <li><strong>Defective Products:</strong> Warranty claims processing</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">7.3 Refund Process</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Merchant approves refund requests</li>
              <li>DLQuick processes refund to customer</li>
              <li>Refund amount deducted from merchant payments</li>
              <li>Dispute resolution for contested refunds</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">8. Performance Standards</h2>
            
            <div className="bg-brand-navy/30 border border-brand-gold/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Key Performance Indicators</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><strong>Order Acceptance:</strong> 95%+</p>
                  <p><strong>Customer Rating:</strong> 4.5+ stars</p>
                  <p><strong>Order Accuracy:</strong> 98%+</p>
                  <p><strong>Preparation Time:</strong> On-time delivery</p>
                </div>
                <div>
                  <p><strong>Response Time:</strong> 5 minutes max</p>
                  <p><strong>Stock Accuracy:</strong> 95%+</p>
                  <p><strong>Refund Rate:</strong> Under 5%</p>
                  <p><strong>Complaint Resolution:</strong> 24 hours</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">9. Data & Analytics</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">9.1 Merchant Dashboard</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Real-time sales analytics</li>
              <li>Customer feedback and ratings</li>
              <li>Peak time performance data</li>
              <li>Popular product insights</li>
              <li>Financial reporting and statements</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">9.2 Customer Data</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Aggregated customer preferences</li>
              <li>Order history trends</li>
              <li>Delivery area analytics</li>
              <li>Seasonal demand patterns</li>
              <li>Competition benchmarking</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">10. Termination Conditions</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">10.1 Immediate Termination</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Food safety violations</li>
              <li>Fraudulent activity or theft</li>
              <li>Selling prohibited items</li>
              <li>Consistent poor performance</li>
              <li>Breach of agreement terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">10.2 Performance-Based Termination</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Rating below 4.0 for 30 days</li>
              <li>Acceptance rate below 85%</li>
              <li>Excessive customer complaints</li>
              <li>Repeated late or incorrect orders</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">11. Support & Training</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">11.1 Onboarding Support</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li>Platform training and setup assistance</li>
              <li>Menu/product upload support</li>
              <li>Photography services available</li>
              <li>Marketing launch package</li>
              <li>Dedicated account manager</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">11.2 Ongoing Support</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>24/7 technical support</li>
              <li>Regular performance reviews</li>
              <li>Best practices training</li>
              <li>Industry trend insights</li>
              <li>Growth optimization consultation</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">12. Contact Information</h2>
            <div className="text-gray-300 mb-6">
              <p><strong>Merchant Support Team</strong></p>
              <p>Email: merchants@dlquick.co.uk</p>
              <p>Phone: +44 (0) 20 7946 0955</p>
              <p>Emergency: +44 (0) 20 7946 0999</p>
              <p>Hours: 8am-10pm daily for merchant support</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                This Merchant Agreement is subject to UK law and Consumer Rights Act 2015. 
                All merchants must comply with applicable trading standards and regulations.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/legal/terms" className="glass-button">
              Terms of Service
            </Link>
            <Link href="/legal/partner-agreement" className="glass-button">
              Partner Agreement
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

export default MerchantAgreementPage

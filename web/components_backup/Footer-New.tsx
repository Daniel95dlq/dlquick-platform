'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="relative bg-gradient-to-b from-brand-navy to-black border-t border-brand-gold/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand-gold)_0%,_transparent_70%)] opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="glass-card text-center mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Stay Updated with <span className="text-brand-gold">DLQuick</span>
          </h3>
          <p className="text-gray-300 mb-6">
            Get the latest updates on new services, exclusive offers, and logistics insights.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 backdrop-blur-sm"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-gold text-brand-navy font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-navy">
                  <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-brand-gold">DLQuick</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Australia's premium logistics platform. Delivering excellence with cutting-edge technology 
              and unmatched reliability across all services.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services?tab=deliveries" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Express Deliveries</Link></li>
              <li><Link href="/services?tab=groceries" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Grocery Delivery</Link></li>
              <li><Link href="/services?tab=business" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Business Solutions</Link></li>
              <li><Link href="/services?tab=home" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Home Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/track" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Track Package</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Partner Hub</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Terms of Service</Link></li>
              <li><Link href="/legal/cookies" className="text-gray-400 hover:text-brand-gold transition-colors duration-300 text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 DLQuick Pty Ltd. All rights reserved. | ABN: 12 345 678 901
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🇦🇺 Australia Wide Service</span>
              <span>⚡ 24/7 Support</span>
              <span>🛡️ Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

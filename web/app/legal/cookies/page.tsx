'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const CookiesPage: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  const handleCookieToggle = (type: string) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }))
  }

  const saveCookieSettings = () => {
    // Save settings to localStorage
    localStorage.setItem('dlquick-cookie-preferences', JSON.stringify(cookieSettings))
    
    // Show confirmation
    alert('Cookie preferences saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cookie <span className="text-brand-gold">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              How we use cookies and similar technologies to improve your DLQuick experience
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Content */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card prose prose-invert max-w-none">
            
            <div className="mb-8 text-sm text-gray-400">
              <p><strong>Last Updated:</strong> 3 September 2025</p>
              <p><strong>Cookie Controller:</strong> DLQuick UK Ltd</p>
              <p><strong>GDPR Compliance:</strong> UK Data Protection Act 2018</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">1. What are Cookies?</h2>
            <p className="text-gray-300 mb-6">
              Cookies are small text files stored on your device when you visit our website or use our app. 
              They help us provide you with a better, more personalized experience by remembering your preferences 
              and understanding how you interact with our services.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">2. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Essential Cookies (Always Active)</h3>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mb-4">
              <p className="text-gray-300 mb-4">
                These cookies are necessary for our website and app to function properly. 
                They cannot be disabled as they are essential for core functionality.
              </p>
              <ul className="text-gray-300 list-disc ml-6 space-y-2">
                <li><strong>Session Management:</strong> Keep you logged in during your visit</li>
                <li><strong>Shopping Cart:</strong> Remember items in your cart</li>
                <li><strong>Security:</strong> Protect against fraud and maintain secure connections</li>
                <li><strong>Load Balancing:</strong> Distribute traffic for optimal performance</li>
                <li><strong>Accessibility:</strong> Remember your accessibility preferences</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Functional Cookies</h3>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-4">
              <p className="text-gray-300 mb-4">
                These cookies enable enhanced functionality and personalization features.
              </p>
              <ul className="text-gray-300 list-disc ml-6 space-y-2">
                <li><strong>Language Preferences:</strong> Remember your language choice</li>
                <li><strong>Location Services:</strong> Store your delivery area preferences</li>
                <li><strong>Theme Settings:</strong> Remember display preferences</li>
                <li><strong>Recently Viewed:</strong> Show recently viewed products/services</li>
                <li><strong>Saved Addresses:</strong> Store frequently used addresses</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">2.3 Analytics Cookies</h3>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6 mb-4">
              <p className="text-gray-300 mb-4">
                These help us understand how visitors interact with our website and app.
              </p>
              <ul className="text-gray-300 list-disc ml-6 space-y-2">
                <li><strong>Google Analytics:</strong> Website usage statistics (anonymized)</li>
                <li><strong>Performance Monitoring:</strong> Page load times and errors</li>
                <li><strong>User Journey:</strong> How users navigate through our platform</li>
                <li><strong>Feature Usage:</strong> Which features are most popular</li>
                <li><strong>Conversion Tracking:</strong> Measure booking completion rates</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">2.4 Marketing Cookies</h3>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
              <p className="text-gray-300 mb-4">
                These cookies are used to deliver relevant advertisements and marketing content.
              </p>
              <ul className="text-gray-300 list-disc ml-6 space-y-2">
                <li><strong>Targeted Advertising:</strong> Show relevant ads based on interests</li>
                <li><strong>Social Media:</strong> Enable sharing and social features</li>
                <li><strong>Retargeting:</strong> Show ads for services you've viewed</li>
                <li><strong>Campaign Tracking:</strong> Measure effectiveness of ad campaigns</li>
                <li><strong>Partner Integration:</strong> Work with advertising partners</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">3. Cookie Management</h2>
            
            <div className="bg-brand-navy/30 border border-brand-gold/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Cookie Preferences</h3>
              <p className="text-gray-300 mb-4">
                You can manage your cookie preferences below. Essential cookies cannot be disabled 
                as they are required for basic website functionality.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-brand-navy/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Essential Cookies</h4>
                    <p className="text-gray-400 text-sm">Required for website functionality</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 text-sm mr-2">Always Active</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-navy/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Functional Cookies</h4>
                    <p className="text-gray-400 text-sm">Enhanced features and personalization</p>
                  </div>
                  <button
                    onClick={() => handleCookieToggle('functional')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      cookieSettings.functional ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      cookieSettings.functional ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-navy/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Analytics Cookies</h4>
                    <p className="text-gray-400 text-sm">Help us improve our services</p>
                  </div>
                  <button
                    onClick={() => handleCookieToggle('analytics')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      cookieSettings.analytics ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      cookieSettings.analytics ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-navy/50 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Marketing Cookies</h4>
                    <p className="text-gray-400 text-sm">Personalized advertising and content</p>
                  </div>
                  <button
                    onClick={() => handleCookieToggle('marketing')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      cookieSettings.marketing ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      cookieSettings.marketing ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={saveCookieSettings}
                  className="glass-button bg-brand-gold/20 hover:bg-brand-gold/30"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => {
                    setCookieSettings({
                      essential: true,
                      analytics: true,
                      marketing: true,
                      functional: true
                    })
                  }}
                  className="glass-button"
                >
                  Accept All
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">4. Third-Party Cookies</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Analytics Partners</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Google Analytics:</strong> Website performance and user behavior analysis</li>
              <li><strong>Hotjar:</strong> User experience and heatmap analysis</li>
              <li><strong>Mixpanel:</strong> Event tracking and user journey analysis</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Marketing Partners</h3>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Facebook Pixel:</strong> Social media advertising and tracking</li>
              <li><strong>Google Ads:</strong> Search and display advertising</li>
              <li><strong>LinkedIn Insight:</strong> Professional network advertising</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.3 Functional Partners</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>Stripe:</strong> Payment processing and fraud prevention</li>
              <li><strong>Intercom:</strong> Customer support chat functionality</li>
              <li><strong>Cloudflare:</strong> Content delivery and security</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">5. Browser Cookie Controls</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">5.1 Browser Settings</h3>
            <p className="text-gray-300 mb-4">
              You can control cookies through your browser settings. Here's how:
            </p>
            <ul className="text-gray-300 mb-4 list-disc ml-6">
              <li><strong>Chrome:</strong> Settings > Privacy and Security > Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings > Privacy & Security > Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences > Privacy > Manage Website Data</li>
              <li><strong>Edge:</strong> Settings > Cookies and site permissions</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Mobile App Settings</h3>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li><strong>iOS:</strong> Settings > Privacy & Security > Tracking</li>
              <li><strong>Android:</strong> Settings > Privacy > Ads</li>
              <li><strong>DLQuick App:</strong> Settings > Privacy > Cookie Preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">6. Impact of Disabling Cookies</h2>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">What happens when you disable cookies:</h3>
              <ul className="text-gray-300 list-disc ml-6 space-y-2">
                <li><strong>Essential cookies disabled:</strong> Website may not function properly</li>
                <li><strong>Functional cookies disabled:</strong> Personalization features won't work</li>
                <li><strong>Analytics cookies disabled:</strong> We can't improve user experience</li>
                <li><strong>Marketing cookies disabled:</strong> Ads may be less relevant</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">7. Cookie Retention</h2>
            
            <div className="text-gray-300 mb-6">
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Stored for specific periods:
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Essential cookies: Up to 1 year</li>
                    <li>Functional cookies: Up to 2 years</li>
                    <li>Analytics cookies: Up to 2 years</li>
                    <li>Marketing cookies: Up to 1 year</li>
                  </ul>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">8. Your Rights</h2>
            
            <p className="text-gray-300 mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="text-gray-300 mb-6 list-disc ml-6">
              <li>Be informed about our cookie usage</li>
              <li>Access data collected through cookies</li>
              <li>Withdraw consent for non-essential cookies</li>
              <li>Object to processing for marketing purposes</li>
              <li>Data portability for cookie-collected data</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">9. Updates to Cookie Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this cookie policy to reflect changes in technology, legislation, or our practices. 
              Significant changes will be communicated through our website banner or email notifications.
            </p>

            <h2 className="text-2xl font-bold text-brand-gold mb-4">10. Contact Information</h2>
            <div className="text-gray-300 mb-6">
              <p><strong>Data Protection Officer</strong></p>
              <p>Email: dpo@dlquick.co.uk</p>
              <p>Phone: +44 (0) 20 7946 0958</p>
              <p>Post: DLQuick UK Ltd, Data Protection Officer, [UK Address]</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                This cookie policy complies with UK GDPR, ePrivacy Directive, and PECR regulations. 
                Last updated: 3 September 2025.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/legal/privacy" className="glass-button">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="glass-button">
              Terms of Service
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

export default CookiesPage
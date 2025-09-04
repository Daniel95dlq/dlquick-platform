'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Track', href: '/track' },
    { name: 'Partners', href: '/partners' },
    { name: 'Legal', href: '/legal/terms' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-nav shadow-2xl shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo with Winged Clock Design */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/dlq-premium-logo.svg" 
                alt="DLQuick Premium Logo" 
                className="h-14 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors duration-300">
                DLQuick
              </div>
              <div className="text-xs text-brand-gold font-medium -mt-1">
                Ultra-Fast Delivery
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <div 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/30'
                      : 'text-white hover:bg-white/10 hover:text-brand-gold'
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/track">
              <button className="glass-button text-white hover:text-brand-gold border border-brand-gold/30 hover:border-brand-gold/60">
                Get Quote
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'
                }`}
              />
              <span 
                className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-card mt-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <div 
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-brand-gold text-brand-navy'
                      : 'text-white hover:bg-white/10 hover:text-brand-gold'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/20">
              <Link href="/track">
                <button 
                  className="w-full glass-button text-white hover:text-brand-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

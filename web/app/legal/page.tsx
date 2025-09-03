import React from "react";

export default function LegalPage() {
  return (
    <main>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-[#0B1C39] to-[#1a237e]">
        <div className="absolute inset-0 bg-[url('/dlq-hero.jpg')] bg-cover bg-center opacity-10 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 text-center">
          <h1 className="h1 text-gold mb-4">Legal & Compliance</h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">Read our Terms, Privacy Policy, Cookie Notice, and Returns Policy. All UK and GDPR compliant.</p>
        </div>
      </section>
      {/* Legal links and content go here */}
    </main>
  );
}

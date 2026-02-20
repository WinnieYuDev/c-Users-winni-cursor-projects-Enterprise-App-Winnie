"use client";

import Image from "next/image";
import Link from "next/link";

export function HomeNav({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/80 bg-primary/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          <span>ThermoGuard</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <a href="#features" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            Pricing
          </a>
          <Link href="/about" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            About
          </Link>
          {children}
        </nav>
      </div>
    </header>
  );
}

export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Where cold chain compliance is verified
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-2 max-w-2xl mx-auto">
          The compliance platform that grows with you. Real-time monitoring, excursion detection, and audit-ready records.
        </p>
        <p className="text-slate-500 text-sm mb-8">ThermoGuard — &ldquo;Cold Chain Compliance. Verified.&rdquo;</p>
        <div className="flex flex-wrap gap-4 justify-center">{children}</div>
      </div>
    </section>
  );
}

const KPI_ITEMS = [
  { label: "Active shipments", value: "—", sub: "Tracked in real time" },
  { label: "Open excursions", value: "—", sub: "Alerts surfaced" },
  { label: "Audit-ready events", value: "—", sub: "Append-only log" },
  { label: "Risk tier coverage", value: "—", sub: "Per-shipment scoring" },
];

export function KpiPreviewStrip() {
  return (
    <section className="py-12 border-y border-slate-700/60 bg-slate-800/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {KPI_ITEMS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-700 bg-slate-800/40 p-5 text-center"
            >
              <p className="table-label mb-1">{item.label}</p>
              <p className="metric-value text-3xl">{item.value}</p>
              <p className="metadata mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Data ingestion",
    description: "CSV, JSON, and API. Ingest temperature data from existing systems and devices.",
  },
  {
    title: "Single source of truth",
    description: "Normalize and consolidate readings for compliance reporting and audits.",
  },
  {
    title: "Configurable policy engine",
    description: "Threshold, duration, and repeat-violation rules aligned to HACCP, FSMA, GDP, and GxP.",
  },
  {
    title: "Append-only audit log",
    description: "Immutable event trail. Export-ready for regulatory submission.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="enterprise-section border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-title text-2xl mb-2">Built for compliance</h2>
        <p className="body-text mb-10 max-w-2xl">Everything you need to stay audit-ready without the clutter.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 hover:border-slate-600 transition-colors"
            >
              <h3 className="card-header mb-2">{f.title}</h3>
              <p className="body-text">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DEMO_ROWS = [
  { id: "SHP-001", product: "Vaccines", facility: "Boston WH", risk: "Low" },
  { id: "SHP-002", product: "Produce", facility: "Chicago DC", risk: "Medium" },
  { id: "SHP-003", product: "Dairy", facility: "Boston WH", risk: "Low" },
  { id: "SHP-004", product: "Biologics", facility: "NYC Cold", risk: "High" },
];

export function DemoPreview() {
  return (
    <section className="enterprise-section border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-title text-2xl mb-2">See it in action</h2>
        <p className="body-text mb-8 max-w-2xl">A clean, fast interface that gets out of your way.</p>
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <span className="card-header text-sm">Shipments</span>
            <span className="metadata text-xs">Preview</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 table-label">Shipment ID</th>
                <th className="text-left px-4 py-3 table-label">Product type</th>
                <th className="text-left px-4 py-3 table-label">Facility</th>
                <th className="text-left px-4 py-3 table-label">Risk</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-slate-700/50 last:border-0">
                  <td className="px-4 py-3 text-accent font-medium">{row.id}</td>
                  <td className="px-4 py-3 body-text">{row.product}</td>
                  <td className="px-4 py-3 body-text">{row.facility}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        row.risk === "High"
                          ? "bg-danger/20 text-red-400"
                          : row.risk === "Medium"
                            ? "bg-warning/20 text-amber-400"
                            : "bg-success/20 text-emerald-400"
                      }`}
                    >
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const PRICING_TIERS = [
  { name: "Starter", price: "$25", period: "/mo", desc: "Get started", features: ["Up to 5 facilities", "Basic analytics", "Email support"], popular: false },
  {
    name: "Professional",
    price: "$99",
    period: "/mo",
    desc: "For compliance teams",
    features: ["Unlimited facilities", "Advanced analytics", "Priority support", "Export data"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For enterprises",
    features: ["Everything in Pro", "SSO (coming soon)", "Dedicated success", "SLA"],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="enterprise-section border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-title text-2xl mb-2">Simple pricing</h2>
        <p className="body-text mb-10">Start free. Upgrade when you need more.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-6 flex flex-col ${
                tier.popular ? "border-accent bg-accent/5" : "border-slate-700 bg-slate-800/30"
              }`}
            >
              {tier.popular && (
                <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Popular</span>
              )}
              <h3 className="card-header mb-1">{tier.name}</h3>
              <p className="text-2xl font-bold text-white">
                {tier.price}
                <span className="text-slate-400 font-normal text-base">{tier.period}</span>
              </p>
              <p className="metadata mt-2 mb-4">{tier.desc}</p>
              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="body-text flex items-center gap-2">
                    <span className="text-success">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`mt-6 block text-center py-2.5 rounded-lg font-medium transition-colors ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "border border-slate-600 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                {tier.name === "Enterprise" ? "Contact sales" : "Get started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote: "ThermoGuard replaced spreadsheets and manual logs for us. Clean, fast, and the audit trail actually helps.",
    author: "Jordan Lee",
    role: "Head of Quality, Seed Pharma",
  },
  {
    quote: "Finally a compliance platform that doesn't get in the way. We passed our last audit with less prep time.",
    author: "Sam Chen",
    role: "Compliance Lead, Flow Logistics",
  },
  {
    quote: "The real-time excursion alerts are a game-changer. No more 'did you catch that spike?' in Slack.",
    author: "Alex Rivera",
    role: "Founder, ColdChain Studio",
  },
];

export function Testimonials() {
  return (
    <section className="enterprise-section border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-title text-2xl mb-2">Loved by compliance teams</h2>
        <p className="body-text mb-10">See what others are saying about ThermoGuard.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
              <p className="body-text italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-medium text-white">{t.author}</p>
              <p className="metadata">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ children }: { children: React.ReactNode }) {
  return (
    <section className="enterprise-section">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="section-title text-2xl mb-2">Start your free trial</h2>
        <p className="body-text mb-8">No credit card required. Get full access to ThermoGuard in seconds.</p>
        <div className="flex flex-wrap gap-4 justify-center">{children}</div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-700/80 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Image src="/logo.svg" alt="" width={24} height={24} />
          <span>ThermoGuard — Where cold chain compliance is verified.</span>
        </div>
        <div className="flex gap-6">
          <a href="#features" className="text-slate-500 hover:text-white text-sm transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-slate-500 hover:text-white text-sm transition-colors">
            Pricing
          </a>
          <Link href="/about" className="text-slate-500 hover:text-white text-sm transition-colors">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

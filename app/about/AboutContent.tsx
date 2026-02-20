"use client";

import Image from "next/image";
import Link from "next/link";

const platformFeatures = [
  {
    title: "Data ingestion",
    description: "Ingest temperature data from CSV, JSON, or API. Multi-format support for existing systems.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    title: "Single source of truth",
    description: "Normalize and consolidate readings into one authoritative dataset for compliance reporting.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Configurable policy engine",
    description: "Threshold, duration, and repeated-violation rules aligned to HACCP, FSMA, GDP, and GxP.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Automated excursion detection",
    description: "Real-time alerts when temperatures breach policy. Severity and duration tracked for audits.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "Shipment-level risk scoring",
    description: "Per-shipment risk tiers and factors. Optional AI summaries for corrective action.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Append-only audit log",
    description: "Immutable event trail. Export-ready for regulatory submission and internal reviews.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Role-based dashboards",
    description: "Admin, supervisor, and viewer roles. Policy management, data upload, and read-only monitoring.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Enterprise subscription",
    description: "Multi-tenant architecture. Subscription scaffolding for scale and compliance teams.",
    icon: (
      <svg className="w-6 h-6 text-arctic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

const verticals = [
  {
    title: "Food Producers & Distributors",
    badge: "HACCP / FSMA",
    description:
      "Monitor temperature-sensitive food and beverage shipments. Stay audit-ready for FDA and FSMA requirements with configurable policies and excursion alerts.",
  },
  {
    title: "Pharmaceutical & Biotech Companies",
    badge: "GDP / GxP",
    description:
      "Cold chain compliance for vaccines, biologics, and APIs. Align to Good Distribution Practice and GxP with immutable audit logs and risk scoring.",
  },
  {
    title: "Logistics & 3PL Providers",
    badge: "Cold storage + transport",
    description:
      "Unified visibility across cold storage and transport legs. Support multiple clients and policies with role-based access and export-ready audit trails.",
  },
];

const architecturePoints = [
  "Real-time Convex backend for database, auth, and policy execution",
  "Configurable risk scoring engine with severity bands",
  "Immutable append-only audit logs for regulatory submission",
  "Role-based dashboards (Admin, Supervisor, Viewer)",
  "Seeded realistic compliance data for demos and evaluation",
  "Production-ready architecture with subscription scaffolding for enterprise",
];

export function AboutContent() {
  return (
    <div className="space-y-0 w-full max-w-full">
      {/* 1. Executive Positioning Hero */}
      <section className="enterprise-section border-b border-slate-700/80">
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-800/60 to-slate-900/40 p-10 md:p-14">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <Image src="/logo.svg" alt="" width={56} height={56} className="flex-shrink-0" />
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
                Enterprise Cold Chain Compliance, Simplified.
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
                ThermoGuard helps food, pharmaceutical, and logistics companies monitor
                temperature-sensitive shipments, detect excursions, and maintain audit-ready
                compliance records.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-500 font-medium">ThermoGuard</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 italic">&ldquo;Cold Chain Compliance. Verified.&rdquo;</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white shadow-card hover:bg-accent/90 transition-colors"
            >
              Request Demo
            </Link>
            <a
              href="mailto:contact@thermoguard.example.com"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-800/50 px-6 py-3 text-base font-semibold text-white hover:border-slate-500 hover:bg-slate-700/50 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* 2. Platform Overview */}
      <section className="enterprise-section border-b border-slate-700/80">
        <h2 className="section-title text-2xl mb-8">Platform overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 hover:border-slate-600 transition-colors"
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="card-header mb-2">{f.title}</h3>
              <p className="body-text">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Who We Serve */}
      <section className="enterprise-section border-b border-slate-700/80">
        <h2 className="section-title text-2xl mb-8">Who we serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticals.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 flex flex-col"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-arctic-400 mb-2">
                {v.badge}
              </span>
              <h3 className="card-header mb-3">{v.title}</h3>
              <p className="body-text flex-1">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Architecture Credibility */}
      <section className="enterprise-section border-b border-slate-700/80">
        <h2 className="section-title text-2xl mb-8">Architecture & credibility</h2>
        <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
            {architecturePoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 body-text">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-arctic-500/20 text-arctic-400 flex items-center justify-center text-xs font-semibold">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Contact, Follow, Pricing */}
      <section className="enterprise-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
            <h3 className="card-header mb-4">Contact</h3>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li><strong className="text-slate-200">Address:</strong> 123 Cold Chain Way, Suite 400, Boston, MA 02108</li>
              <li><strong className="text-slate-200">Phone:</strong> +1 (555) 123-4567</li>
              <li><strong className="text-slate-200">Email:</strong> contact@thermoguard.example.com</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
            <h3 className="card-header mb-4">Follow us</h3>
            <div className="flex gap-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium text-sm">
                Twitter / X
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium text-sm">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium text-sm">
                GitHub
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
            <h3 className="card-header mb-2">Pricing</h3>
            <p className="body-text mb-4">Starting at</p>
            <div className="inline-flex items-baseline gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-6 py-4">
              <span className="text-3xl font-bold text-white">$25</span>
              <span className="text-slate-400">/month</span>
            </div>
            <p className="metadata mt-3">Per organization. Dashboards, excursion detection, risk scoring, and AI insights.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { KPICard } from "@/components/KPICard";
import { TemperatureChart, type ExcursionBand } from "@/components/TemperatureChart";
import { AuditLogTable } from "@/components/AuditLogTable";
import { AIInsightCard } from "@/components/AIInsightCard";
import { Card } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Badge, severityToBadgeVariant } from "@/components/ui/Badge";

const EXCURSION_BAND_COLOR = "#F59E0B";

export default function DashboardPage() {
  const kpis = useQuery(api.dashboard.kpis, {});
  const readings = useQuery(api.dashboard.recentTemperatureReadings, { limit: 60 });
  const mostRecent = useQuery(api.dashboard.mostRecentExcursionWithInsight);
  const auditLogs = useQuery(api.dashboard.recentAuditLogs, { limit: 15 });
  const recentExcursions = useQuery(api.dashboard.recentExcursions, { limit: 5 });

  const excursionBands: ExcursionBand[] = useMemo(() => {
    const ex = mostRecent?.excursion;
    if (!ex) return [];
    return [
      { startTime: ex.startTime, endTime: ex.endTime, severity: ex.severity, color: EXCURSION_BAND_COLOR },
    ];
  }, [mostRecent?.excursion]);

  const singleInsightForCard = useMemo(() => {
    const insight = mostRecent?.insight;
    if (!insight) return [];
    return [{ _id: insight._id, type: insight.type, content: insight.content, shipmentId: insight.shipmentId }];
  }, [mostRecent?.insight]);

  const isLoading = kpis === undefined;
  const chartLoading = readings === undefined;

  return (
    <div className="space-y-8">
      <h1 className="page-title">Compliance Dashboard</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <KPICard
              title="Active Shipments"
              value={kpis?.totalShipments ?? "—"}
              icon={<StatusIndicator variant="active" label="Live" className="!text-slate-500" />}
            />
            <KPICard
              title="Temperature Alerts"
              value={kpis?.openExcursions ?? "—"}
              variant={kpis?.openExcursions ? "warning" : "default"}
            />
            <KPICard
              title="High Risk"
              value={kpis?.highRiskCount ?? "—"}
              variant={kpis?.highRiskCount ? "danger" : "default"}
            />
            <KPICard title="Audit Events Today" value={kpis?.auditEventsToday ?? "—"} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Temperature chart + insight */}
        <div className="lg:col-span-2">
          <Card title="Temperature log (recent) — excursions highlighted">
            {chartLoading ? (
              <div className="h-[300px] flex items-center justify-center metadata">Loading chart…</div>
            ) : readings && readings.length > 0 ? (
              <>
                <TemperatureChart
                  data={readings}
                  minSafeTemp={2}
                  maxSafeTemp={8}
                  excursions={excursionBands}
                />
                <div className="mt-6 pt-6 border-t border-slate-600">
                  <h3 className="table-label mb-2">Most recent excursion — auditing & policy compliance</h3>
                  {mostRecent === undefined ? (
                    <p className="metadata">Loading…</p>
                  ) : mostRecent === null ? (
                    <p className="metadata">No recent excursion.</p>
                  ) : mostRecent.insight === null ? (
                    <p className="metadata">No AI analysis for this excursion yet.</p>
                  ) : (
                    <AIInsightCard insights={singleInsightForCard} />
                  )}
                </div>
              </>
            ) : (
              <p className="metadata py-8 text-center">No readings yet.</p>
            )}
          </Card>
        </div>

        {/* Alerts + Recent activity */}
        <div className="space-y-6">
          <Card
            title="Temperature Alerts"
            action={
              <Link
                href="/dashboard/excursions"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                View all
              </Link>
            }
          >
            {recentExcursions === undefined ? (
              <p className="metadata">Loading…</p>
            ) : recentExcursions.length === 0 ? (
              <p className="metadata">No recent alerts.</p>
            ) : (
              <ul className="space-y-2">
                {recentExcursions.slice(0, 5).map((e) => (
                  <li key={e._id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="body-text truncate">{e.ruleViolated}</span>
                    <Badge variant={severityToBadgeVariant(e.severity)} size="sm">
                      {e.severity}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card
            title="Recent activity"
            action={
              <Link
                href="/dashboard/audit"
                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                View log
              </Link>
            }
          >
            {auditLogs === undefined ? (
              <p className="metadata">Loading…</p>
            ) : auditLogs.length === 0 ? (
              <p className="metadata">No recent activity.</p>
            ) : (
              <ul className="space-y-3 max-h-48 overflow-y-auto">
                {auditLogs.slice(0, 8).map((log) => (
                  <li key={log._id} className="text-sm border-b border-slate-600/50 pb-2 last:border-0 last:pb-0">
                    <span className="metadata block font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</span>
                    <span className="body-text">{log.eventType}</span>
                    {log.severity && (
                      <Badge variant={severityToBadgeVariant(log.severity)} size="sm" className="ml-2">
                        {log.severity}
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {/* Audit log table */}
      <div>
        <h2 className="section-title mb-4">Audit Log</h2>
        <AuditLogTable logs={auditLogs ?? []} />
      </div>
    </div>
  );
}

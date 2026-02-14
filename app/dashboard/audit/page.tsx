"use client";

import { useState } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuditLogTable } from "@/components/AuditLogTable";

export default function AuditPage() {
  const auditLogs = useQuery(api.dashboard.recentAuditLogs, { limit: 100 });
  const exportCSV = useAction(api.export.exportAuditLogsCSV);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const now = Date.now();
      const start = now - 30 * 24 * 60 * 60 * 1000;
      const csv = await exportCSV({ startTime: start, endTime: now });
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="body-text mt-1">
            Append-only audit trail. Export available for regulatory submission.
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="h-10 px-4 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {exporting ? "Exporting…" : "Export CSV"}
        </button>
      </div>
      <AuditLogTable logs={auditLogs ?? []} pageSize={25} />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { Badge, severityToBadgeVariant } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

interface LogEntry {
  _id: string;
  timestamp: number;
  eventType: string;
  ruleViolated?: string;
  severity?: string;
  aiExplanation?: string;
}

interface AuditLogTableProps {
  logs: LogEntry[];
  pageSize?: number;
}

export function AuditLogTable({ logs, pageSize = 25 }: AuditLogTableProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(logs.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const slice = useMemo(
    () => logs.slice(currentPage * pageSize, currentPage * pageSize + pageSize),
    [logs, currentPage, pageSize]
  );

  if (logs.length === 0) {
    return (
      <EmptyState
        title="No audit entries"
        message="Audit log will show events as they occur."
        icon={<EmptyState.BoxIcon />}
      />
    );
  }

  return (
    <div className="rounded-md border border-slate-600 bg-slate-blue/30 overflow-hidden">
      <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableHead>Time</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Explanation</TableHead>
          </TableHeader>
          <TableBody>
            {slice.map((log, idx) => (
              <TableRow
                key={log._id}
                className={idx % 2 === 1 ? "bg-slate-800/20" : undefined}
              >
                <TableCell className="whitespace-nowrap metadata font-mono text-xs">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <span className="body-text">{log.eventType}</span>
                  {log.ruleViolated && (
                    <span className="metadata ml-1">({log.ruleViolated})</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={severityToBadgeVariant(log.severity)}>
                    {log.severity ?? "—"}
                  </Badge>
                </TableCell>
                <TableCell
                  className="max-w-xs truncate text-slate-400"
                  title={log.aiExplanation ?? undefined}
                >
                  {log.aiExplanation ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-600 px-4 py-3">
          <p className="metadata">
            Showing {currentPage * pageSize + 1}–{Math.min((currentPage + 1) * pageSize, logs.length)} of {logs.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="h-8 px-3 rounded-md border border-slate-600 text-sm text-cool-gray hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="h-8 px-3 rounded-md border border-slate-600 text-sm text-cool-gray hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

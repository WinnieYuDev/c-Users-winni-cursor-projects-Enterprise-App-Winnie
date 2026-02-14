"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { Badge, severityToBadgeVariant } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

const PAGE_SIZE = 25;

export default function ExcursionsPage() {
  const excursions = useQuery(api.dashboard.recentExcursions, { limit: 100 });
  const [page, setPage] = useState(0);
  const list = excursions ?? [];
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const slice = useMemo(
    () => list.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [list, currentPage]
  );

  return (
    <div className="space-y-6">
      <h1 className="page-title">Excursions</h1>
      <p className="body-text">Temperature threshold and policy violations.</p>

      {list.length === 0 ? (
        <EmptyState
          title="No excursions"
          message="Excursions will appear here when detected."
          icon={<EmptyState.BoxIcon />}
        />
      ) : (
        <>
          <div className="rounded-md border border-slate-600 bg-slate-blue/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableHead>Shipment</TableHead>
                <TableHead>Rule</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Duration (min)</TableHead>
                <TableHead>Detected</TableHead>
              </TableHeader>
              <TableBody>
                {slice.map((e) => (
                  <TableRow key={e._id}>
                    <TableCell className="body-text">{e.shipmentId}</TableCell>
                    <TableCell className="body-text">{e.ruleViolated}</TableCell>
                    <TableCell>
                      <Badge variant={severityToBadgeVariant(e.severity)}>{e.severity}</Badge>
                    </TableCell>
                    <TableCell className="body-text">{e.durationMinutes}</TableCell>
                    <TableCell className="metadata whitespace-nowrap">
                      {new Date(e.detectedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-600 px-4 py-3">
                <p className="metadata">
                  Showing {currentPage * PAGE_SIZE + 1}–{Math.min((currentPage + 1) * PAGE_SIZE, list.length)} of {list.length}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="h-8 px-3 rounded-md border border-slate-600 text-sm text-cool-gray hover:bg-slate-600/50 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="h-8 px-3 rounded-md border border-slate-600 text-sm text-cool-gray hover:bg-slate-600/50 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

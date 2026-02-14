"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import { EmptyState } from "@/components/ui/EmptyState";

const PAGE_SIZE = 25;

export default function ShipmentsPage() {
  const shipments = useQuery(api.shipments.listShipments, {});
  const [page, setPage] = useState(0);
  const list = shipments ?? [];
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const slice = useMemo(
    () => list.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [list, currentPage]
  );

  return (
    <div className="space-y-6">
      <h1 className="page-title">Shipments</h1>
      <p className="body-text">View and monitor cold chain shipments.</p>

      {list.length === 0 ? (
        <EmptyState
          title="No shipments"
          message="Run seed or upload data to see shipments."
          icon={<EmptyState.BoxIcon />}
        />
      ) : (
        <>
          <div className="rounded-md border border-slate-600 bg-slate-blue/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Product Type</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableHeader>
              <TableBody>
                {slice.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/shipments/${s._id}`}
                        className="text-accent hover:text-accent/80 font-medium transition-colors"
                      >
                        {s.shipmentId}
                      </Link>
                    </TableCell>
                    <TableCell className="body-text">{s.productType}</TableCell>
                    <TableCell className="body-text">{s.facilityId}</TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/shipments/${s._id}`}
                        className="text-sm text-accent hover:text-accent/80 transition-colors"
                      >
                        View details
                      </Link>
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

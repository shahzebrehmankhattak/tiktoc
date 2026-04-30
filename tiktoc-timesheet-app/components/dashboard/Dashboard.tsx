"use client";

import { useMemo, useState } from "react";
import { useTimesheets } from "@/hooks/useTimesheets";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import DataTable from "@/components/ui/Table";
import { fmt } from "@/lib/helpers";
import { Column, Status, TimesheetRow } from "@/types/Timesheet";

const STATUS_STYLES: Record<Status, string> = {
  COMPLETED: "bg-green-100 text-green-700",
  INCOMPLETE: "bg-yellow-100 text-yellow-700",
  MISSING: "bg-red-100 text-red-600",
};

const ACTION_LABEL: Record<Status, string> = {
  COMPLETED: "View",
  INCOMPLETE: "Update",
  MISSING: "Create",
};
const Dashboard = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const { data: apiData = [], isLoading, error } = useTimesheets();

  const filtered = useMemo(() => {
    console.log("Filtering with:", { statusFilter, startDate, endDate });
    const result = apiData.filter((row: any) => {
      if (statusFilter && row.status !== statusFilter) return false;

      if (startDate) {
        const sd = new Date(startDate);
        const rowStart = new Date(row.startDate);
        if (!isNaN(rowStart.getTime()) && rowStart < sd) return false;
      }

      if (endDate) {
        const ed = new Date(endDate);
        const rowEnd = new Date(row.endDate);
        if (!isNaN(rowEnd.getTime()) && rowEnd > ed) return false;
      }

      return true;
    });
    return result;
  }, [apiData, startDate, endDate, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  const goPage = (p: any) => setPage(Math.max(1, Math.min(totalPages, p)));
  const handleFilterChange = (setter: any) => (e: any) => {
    setter(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setStatusFilter("");
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    const visible = new Set(
      [1, totalPages, safePage - 1, safePage, safePage + 1].filter(
        (p) => p >= 1 && p <= totalPages,
      ),
    );
    return [...visible].sort((a, b) => a - b);
  }, [safePage, totalPages]);

  const handleClick = (id: number) => {
    router.push(`/dashboard/timesheet-list/${id}`);
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <RefreshCcw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  if (error) return <p>Error loading data: {error.message}</p>;

  const columns :Column<TimesheetRow>[] = [
    {
      header: "Week #",
      accessor: "week",
      className: "w-20",
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.week}</span>
      ),
    },
    {
      header: "Date Range",
      accessor: "date",
      render: (row) => `${fmt(row.startDate)} – ${fmt(row.endDate)}`,
    },
    {
      header: "Status",
      accessor: "status",
      className: "w-36",
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_STYLES[row?.status]}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      className: "w-28 text-right",
      render: (row) => (
        <button
          onClick={() => handleClick(row.id)}
          className="cursor-pointer text-blue-600 font-medium hover:underline text-sm"
        >
          {ACTION_LABEL[row.status]}
        </button>
      ),
    },
  ];

  return (
    <main className="max-w-5xl mx-auto mt-2 px-4 pb-3">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 pt-3 pb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Your Timesheets
          </h1>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleFilterChange(setStartDate)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-blue-500"
                />
                <span className="text-gray-400 text-sm">→</span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={handleFilterChange(setEndDate)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={handleFilterChange(setStatusFilter)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white outline-none focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="INCOMPLETE">Incomplete</option>
                <option value="MISSING">Missing</option>
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm border border-gray-200 rounded-lg px-4 py-2 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={slice}
            emptyMessage="No timesheets match the selected filters."
          />
        </div>
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white outline-none focus:border-blue-500"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 1}
              className="px-3 h-8 rounded-md border border-gray-200 text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            {pageNumbers.map((p, idx) => {
              const prev = pageNumbers[idx - 1];
              return (
                <span key={p} className="flex items-center gap-1">
                  {prev && p - prev > 1 && (
                    <span className="text-gray-400 text-sm px-0.5">···</span>
                  )}
                  <button
                    onClick={() => goPage(p)}
                    className={`w-8 h-8 rounded-md border text-sm font-medium transition ${safePage === p ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600"}`}
                  >
                    {p}
                  </button>
                </span>
              );
            })}
            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="px-3 h-8 rounded-md border border-gray-200 text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

"use client";

import TimesheetList from "@/components/timesheet/TimesheetList";
import { useTimesheetList } from "@/hooks/useTimesheets";
import { useParams } from "next/navigation";
import { RefreshCcw } from "lucide-react";

export default function TimesheetDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: timesheet, isLoading, error } = useTimesheetList(id as string);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <RefreshCcw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center h-40 border border-solid border-red-500 ">
        <p className="text-lg text-red-600 text-center">
          Error loading timesheet.
        </p>
      </div>
    );
  if (!timesheet) return;
  <div className="fixed inset-0 flex items-center justify-center h-40 border border-solid border-red-500 ">
    <p className="text-lg text-red-600 text-center">Timesheet not found.</p>
  </div>;

  return (
    <>
      <TimesheetList timesheet={timesheet} />
    </>
  );
}

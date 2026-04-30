// app/api/timesheets/[id]/route.ts
import { timesheetsData } from "@/lib/mockData";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  // ← await it
  const timesheet = timesheetsData.find((t) => t.id === Number(id));

  if (!timesheet) {
    return Response.json({ error: "Timesheet not found" }, { status: 404 });
  }

  return Response.json(timesheet);
}
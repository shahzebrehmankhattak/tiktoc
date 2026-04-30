// app/api/timesheets/route.ts
import { timesheetsData } from "@/lib/mockData";

export async function GET() {
  return Response.json(timesheetsData);
}

export async function POST(req: Request) {
  const body = await req.json();
  timesheetsData.push({ id: Date.now(), ...body });
  return Response.json({ success: true });
}
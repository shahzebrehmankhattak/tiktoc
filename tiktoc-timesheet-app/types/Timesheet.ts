export type Day = { label: string; key: string };
export type Task = {
  id: number;
  dayKey: string;
  project: string;
  workType: string;
  description: string;
  hours: number;
};
export type Timesheet = {
  id: number;
  week: number;
  startDate: string;
  endDate: string;
  status: string;
  tasks: Task[];
  days: Day[];
};

export type Status = "COMPLETED" | "INCOMPLETE" | "MISSING";

export interface TimesheetRow {
  id: number;
  week: number;
  startDate: string;
  endDate: string;
  status: Status;
}

export type Column<T> = {
  header: string;
  accessor: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

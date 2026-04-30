export const users = [
  {
    email: "admin@test.com",
    password: "123456",
    token: "fake-token",
  },
];


export const timesheetsData = [
  {
    id: 1,
    week: 1,
    startDate: "2024-01-21",
    endDate: "2024-01-25",
    status: "COMPLETED",
    tasks: [
      { id: 1, dayKey: "jan21", project: "Homepage Development", workType: "Bug Fixes",          description: "", hours: 8 },
      { id: 2, dayKey: "jan22", project: "Mobile App",           workType: "Feature Development", description: "", hours: 6 },
    ],
    days: [
      { label: "Jan 21", key: "jan21" },
      { label: "Jan 22", key: "jan22" },
      { label: "Jan 23", key: "jan23" },
      { label: "Jan 24", key: "jan24" },
      { label: "Jan 25", key: "jan25" },
    ],
  },
  {
    id: 2,
    week: 2,
    startDate: "2024-01-28",
    endDate: "2024-02-01",
    status: "COMPLETED",
    tasks: [],
    days: [
      { label: "Jan 28", key: "jan28" },
      { label: "Jan 29", key: "jan29" },
      { label: "Jan 30", key: "jan30" },
      { label: "Jan 31", key: "jan31" },
      { label: "Feb 01", key: "feb01" },
    ],
  },
  {
    id: 3,
    week: 3,
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    status: "INCOMPLETE",
    tasks: [],
    days: [
      { label: "Jan 15", key: "jan15" },
      { label: "Jan 16", key: "jan16" },
      { label: "Jan 17", key: "jan17" },
      { label: "Jan 18", key: "jan18" },
      { label: "Jan 19", key: "jan19" },
    ],
  },
  {
    id: 4,
    week: 4,
    startDate: "2024-01-22",
    endDate: "2024-01-26",
    status: "COMPLETED",
    tasks: [],
    days: [
      { label: "Jan 22", key: "jan22" },
      { label: "Jan 23", key: "jan23" },
      { label: "Jan 24", key: "jan24" },
      { label: "Jan 25", key: "jan25" },
      { label: "Jan 26", key: "jan26" },
    ],
  },
  {
    id: 5,
    week: 5,
    startDate: "2024-01-28",
    endDate: "2024-02-01",
    status: "MISSING",
    tasks: [],
    days: [
      { label: "Jan 28", key: "jan28" },
      { label: "Jan 29", key: "jan29" },
      { label: "Jan 30", key: "jan30" },
      { label: "Jan 31", key: "jan31" },
      { label: "Feb 01", key: "feb01" },
    ],
  },
];


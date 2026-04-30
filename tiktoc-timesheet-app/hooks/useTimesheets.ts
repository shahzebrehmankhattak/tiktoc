"use client";

import { useQuery } from "@tanstack/react-query";

export const useTimesheets = () => {
  return useQuery({
    queryKey: ["timesheets"],
    queryFn: async () => {
      const res = await fetch("/api/timesheets");
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Transform API data (no mock fallback)
      return data.map((item: any) => ({
        id: item.id,
        week: item.week,
        startDate: item.startDate || item.date,
        endDate: item.endDate || item.date,
        status: item.status,
      }));
    },
  });
};

export const useTimesheetList = (id: string | string[]) => {
  return useQuery({
    queryKey: ["timesheetList", id],
    queryFn: async () => {
      const res = await fetch(`/api/timesheets/${id}`);

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      return res.json();
    },
    enabled: !!id,
  });
};
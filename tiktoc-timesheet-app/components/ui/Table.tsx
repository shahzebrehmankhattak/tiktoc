"use client";

import { Props } from "@/types/Table";

const DataTable = ({ columns, data, emptyMessage = "No data found" }: Props) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-t border-b border-gray-200">
          {columns.map((col, i) => (
            <th
              key={i}
              className={`text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider ${col.className || ""}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {columns.map((col, i) => (
                <td key={i} className="px-6 py-4 text-gray-600">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
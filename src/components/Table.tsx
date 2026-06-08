import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { cn } from "@/utils/cn";

type TableProps<TData, TValue> = Readonly<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}>;

export function Table<TData, TValue>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available",
  className,
}: TableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-250 border-collapse text-left">
        <thead className="bg-slate-900/35">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-8 py-5 text-xs font-bold uppercase tracking-wide text-slate-400"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-slate-700/80 bg-slate-800/40"
              >
                {columns.map((_, columnIndex) => (
                  <td key={columnIndex} className="px-8 py-6">
                    <div
                      className={cn(
                        "h-5 animate-pulse rounded bg-slate-600/45",
                        columnIndex === 0 ? "w-36" : "w-24",
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-700/80 bg-slate-800/50 transition-colors hover:bg-slate-700/30"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-8 py-6 text-base font-semibold text-slate-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border-t border-slate-700/80">
              <td
                colSpan={columns.length}
                className="px-8 py-10 text-center text-sm font-medium text-slate-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

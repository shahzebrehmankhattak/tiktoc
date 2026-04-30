
export type Column = {
  header: string;
  accessor: string;
  className?: string;
  render?: (row: any) => React.ReactNode;
};

export type Props = {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
};

export type ColumnAlignment = "left" | "center" | "right";

export interface Column {
  id: string;
  name: string;
  dataType: "string" | "number" | "boolean";
  visible: boolean;
  alignment: ColumnAlignment;
}

export interface Row {
  id: string;
  data: Record<string, any>;
}

export interface TableData {
  columns: Column[];
  rows: Row[];
}

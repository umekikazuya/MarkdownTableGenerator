import { TableData, Column, Row } from "./tableUtils";
import { v4 as uuidv4 } from "uuid";

const parseCSV = (input: string): string[][] => {
  const rows = input.trim().split("\n");
  return rows.map((row) => row.split(","));
};

const parseTSV = (input: string): string[][] => {
  const rows = input.trim().split("\n");
  return rows.map((row) => row.split("\t"));
};

const parseJSON = (input: string): string[][] => {
  try {
    const data = JSON.parse(input);
    if (!Array.isArray(data) || data.length === 0) return [[]];

    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((header) => row[header]));
    return [headers, ...rows];
  } catch (error) {
    console.error("Invalid JSON format");
    return [[]];
  }
};

const parseAsciiTable = (input: string): string[][] => {
  const rows = input
    .trim()
    .split("\n")
    .filter((row) => row.startsWith("|"));
  if (rows.length === 0) return [[]];

  return rows.map((row) =>
    row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim())
  );
};

const createTableData = (data: string[][]): TableData => {
  const headers = data[0] || [];
  const columns: Column[] = headers.map((header, index) => ({
    id: uuidv4(),
    name: header || `Column ${index + 1}`,
    dataType: "string",
    visible: true,
    alignment: "left",
  }));

  const rows: Row[] = (data.slice(1) || []).map((rowData) => {
    const row: Row = {
      id: uuidv4(),
      data: {},
    };
    columns.forEach((column, index) => {
      row.data[column.id] = rowData[index] || "";
    });
    return row;
  });

  return { columns, rows };
};

export const parseTableString = (input: string): TableData => {
  if (input.trim() === "") return createTableData([[]]);

  if (input.includes(",")) {
    return createTableData(parseCSV(input));
  }
  if (input.includes("\t")) {
    return createTableData(parseTSV(input));
  }
  try {
    JSON.parse(input);
    return createTableData(parseJSON(input));
  } catch (error) {
    // Not a valid JSON, continue to next format
  }
  if (input.includes("+--") || input.includes("|")) {
    return createTableData(parseAsciiTable(input));
  }

  return createTableData([[]]);
};

export const generateMarkdownTable = (
  { columns, rows }: TableData,
  isCompact: boolean,
  useHeader: boolean
): string => {
  if (columns.length === 0) return "";

  const visibleColumns = columns.filter((c) => c.visible);

  const header = visibleColumns.map((c) => c.name).join(" | ");
  const separator = visibleColumns
    .map((c) => {
      const dash = isCompact ? "---" : "------";
      switch (c.alignment) {
        case "left":
          return `:${dash}`;
        case "center":
          return `:${dash}:`;
        case "right":
          return `${dash}:`;
        default:
          return dash;
      }
    })
    .join("|");

  const body = rows
    .map((row) =>
      visibleColumns.map((c) => row.data[c.id] || "").join(" | ")
    )
    .join("\n");

  let table = "";
  if (useHeader) {
    table += `| ${header} |\n`;
    table += `| ${separator} |\n`;
  }
  table += body ? `${body.split('\n').map(row => `| ${row} |`).join('\n')}`: "";

  return table;
};

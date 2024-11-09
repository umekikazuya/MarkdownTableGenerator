export const generateMarkdownTable = (
  data: string[][],
  isCompact: boolean,
  useHeader: boolean
): string => {
  if (!data.length) return "";

  const separator = data[0].map(() => (isCompact ? "---" : "------")).join("|");

  const rows = data.map((row) => row.map((cell) => cell.trim()).join(" | "));

  if (useHeader) {
    rows.splice(1, 0, separator);
  }

  return rows.map((row) => `| ${row} |`).join("\n");
};

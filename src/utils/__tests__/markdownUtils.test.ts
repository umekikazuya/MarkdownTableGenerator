import { describe, it, expect } from "vitest";
import { parseTableString } from "../markdownUtils";

describe("markdownUtils", () => {
  describe("parseTableString", () => {
    it("should parse CSV correctly", () => {
      const input = "a,b,c\\n1,2,3";
      const result = parseTableString(input);
      expect(result.columns.map((c) => c.name)).toEqual(["a", "b", "c"]);
      expect(result.rows.length).toBe(1);
      const rowData = Object.values(result.rows[0].data);
      expect(rowData).toEqual(["1", "2", "3"]);
    });

    it("should parse TSV correctly", () => {
      const input = "a\\tb\\tc\\n1\\t2\\t3";
      const result = parseTableString(input);
      expect(result.columns.map((c) => c.name)).toEqual(["a", "b", "c"]);
      expect(result.rows.length).toBe(1);
      const rowData = Object.values(result.rows[0].data);
      expect(rowData).toEqual(["1", "2", "3"]);
    });

    it("should parse JSON correctly", () => {
      const input = '[{"a":1,"b":2},{"a":3,"b":4}]';
      const result = parseTableString(input);
      expect(result.columns.map((c) => c.name)).toEqual(["a", "b"]);
      expect(result.rows.length).toBe(2);
      const firstRowData = Object.values(result.rows[0].data);
      expect(firstRowData).toEqual([1, 2]);
    });

    it("should parse ASCII table correctly", () => {
      const input = "| a | b |\\n|---|---|\\n| 1 | 2 |";
      const result = parseTableString(input);
      expect(result.columns.map((c) => c.name)).toEqual([" a ", " b "]);
      expect(result.rows.length).toBe(2);
      const firstRowData = Object.values(result.rows[0].data);
      expect(firstRowData).toEqual(["---", "---"]);
    });

    it("should handle empty input", () => {
      const input = "";
      const result = parseTableString(input);
      expect(result.columns.length).toBe(0);
      expect(result.rows.length).toBe(0);
    });
  });
});

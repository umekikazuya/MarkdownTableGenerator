import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useTableData } from "../useTableData";

describe("useTableData", () => {
  it("should initialize with default data", () => {
    const { result } = renderHook(() => useTableData());
    expect(result.current.tableData.columns.length).toBe(3);
    expect(result.current.tableData.rows.length).toBe(3);
  });

  it("should add a row", () => {
    const { result } = renderHook(() => useTableData());
    act(() => {
      result.current.addRow();
    });
    expect(result.current.tableData.rows.length).toBe(4);
  });

  it("should add a column", () => {
    const { result } = renderHook(() => useTableData());
    act(() => {
      result.current.addColumn();
    });
    expect(result.current.tableData.columns.length).toBe(4);
  });

  it("should remove a row", () => {
    const { result } = renderHook(() => useTableData());
    const rowIdToRemove = result.current.tableData.rows[0].id;
    act(() => {
      result.current.removeRow(rowIdToRemove);
    });
    expect(result.current.tableData.rows.length).toBe(2);
  });

  it("should remove a column", () => {
    const { result } = renderHook(() => useTableData());
    const columnIdToRemove = result.current.tableData.columns[0].id;
    act(() => {
      result.current.removeColumn(columnIdToRemove);
    });
    expect(result.current.tableData.columns.length).toBe(2);
  });

  it("should sort a column", () => {
    const { result } = renderHook(() => useTableData());
    const columnToSort = result.current.tableData.columns[0];

    act(() => {
      result.current.handleCellChange(result.current.tableData.rows[0].id, columnToSort.id, "b");
      result.current.handleCellChange(result.current.tableData.rows[1].id, columnToSort.id, "a");
      result.current.handleCellChange(result.current.tableData.rows[2].id, columnToSort.id, "c");
    });

    act(() => {
      result.current.sortColumn(columnToSort.id, "asc");
    });

    expect(result.current.tableData.rows[0].data[columnToSort.id]).toBe("a");
    expect(result.current.tableData.rows[1].data[columnToSort.id]).toBe("b");
    expect(result.current.tableData.rows[2].data[columnToSort.id]).toBe("c");
  });

  it("should reorder columns", () => {
    const { result } = renderHook(() => useTableData());
    const initialColumns = result.current.tableData.columns.map(c => c.id);

    act(() => {
      result.current.reorderColumn(0, 2);
    });

    const reorderedColumns = result.current.tableData.columns.map(c => c.id);
    expect(reorderedColumns[0]).toBe(initialColumns[1]);
    expect(reorderedColumns[2]).toBe(initialColumns[0]);
  });
});

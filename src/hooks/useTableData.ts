import { useState, useCallback } from "react";
import { TableData, Column, Row, ColumnAlignment } from "@/utils/tableUtils";
import { v4 as uuidv4 } from "uuid";

const createInitialData = (): TableData => {
  const columns: Column[] = [
    {
      id: uuidv4(),
      name: "Header 1",
      dataType: "string",
      visible: true,
      alignment: "left",
    },
    {
      id: uuidv4(),
      name: "Header 2",
      dataType: "string",
      visible: true,
      alignment: "left",
    },
    {
      id: uuidv4(),
      name: "Header 3",
      dataType: "string",
      visible: true,
      alignment: "left",
    },
  ];

  const rows: Row[] = Array.from({ length: 3 }, () => {
    const row: Row = {
      id: uuidv4(),
      data: {},
    };
    columns.forEach((column) => {
      row.data[column.id] = "";
    });
    return row;
  });

  return { columns, rows };
};

export const useTableData = (initialData?: TableData) => {
  const [tableData, setTableData] = useState<TableData>(
    initialData || createInitialData()
  );

  const setData = (input: TableData) => {
    setTableData(input);
  };

  const handleCellChange = useCallback(
    (rowId: string, columnId: string, value: any) => {
      setTableData((prevData) => ({
        ...prevData,
        rows: prevData.rows.map((row) =>
          row.id === rowId ? { ...row, data: { ...row.data, [columnId]: value } } : row
        ),
      }));
    },
    []
  );

  const addRow = useCallback(() => {
    setTableData((prevData) => {
      const newRow: Row = {
        id: uuidv4(),
        data: {},
      };
      prevData.columns.forEach((column) => {
        newRow.data[column.id] = "";
      });
      return { ...prevData, rows: [...prevData.rows, newRow] };
    });
  }, []);

  const addColumn = useCallback(() => {
    setTableData((prevData) => {
      const newColumn: Column = {
        id: uuidv4(),
        name: `Header ${prevData.columns.length + 1}`,
        dataType: "string",
        visible: true,
        alignment: "left",
      };
      const newRows = prevData.rows.map((row) => ({
        ...row,
        data: { ...row.data, [newColumn.id]: "" },
      }));
      return {
        ...prevData,
        columns: [...prevData.columns, newColumn],
        rows: newRows,
      };
    });
  }, []);

  const removeRow = useCallback((rowId: string) => {
    setTableData((prevData) => ({
      ...prevData,
      rows: prevData.rows.filter((row) => row.id !== rowId),
    }));
  }, []);

  const removeColumn = useCallback((columnId: string) => {
    setTableData((prevData) => ({
      ...prevData,
      columns: prevData.columns.filter((column) => column.id !== columnId),
      rows: prevData.rows.map((row) => {
        const newData = { ...row.data };
        delete newData[columnId];
        return { ...row, data: newData };
      }),
    }));
  }, []);

  const sortColumn = useCallback((columnId: string, direction: "asc" | "desc") => {
    setTableData((prevData) => {
      const sortedRows = [...prevData.rows].sort((a, b) => {
        const aValue = a.data[columnId];
        const bValue = b.data[columnId];
        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
      return { ...prevData, rows: sortedRows };
    });
  }, []);

  const reorderColumn = useCallback((fromIndex: number, toIndex: number) => {
    setTableData((prevData) => {
      const newColumns = [...prevData.columns];
      const [movedColumn] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, movedColumn);
      return { ...prevData, columns: newColumns };
    });
  }, []);

  const setColumnAlignment = useCallback(
    (columnId: string, alignment: ColumnAlignment) => {
      setTableData((prevData) => ({
        ...prevData,
        columns: prevData.columns.map((column) =>
          column.id === columnId ? { ...column, alignment } : column
        ),
      }));
    },
    []
  );

  return {
    tableData,
    setData,
    handleCellChange,
    addRow,
    addColumn,
    removeRow,
    removeColumn,
    sortColumn,
    reorderColumn,
    setColumnAlignment,
  };
};

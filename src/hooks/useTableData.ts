import { useState } from "react";

import {
  addColumn as addColumnUtil,
  addRow as addRowUtil,
  removeColumn as removeColumnUtil,
  removeRow as removeRowUtil,
} from "@/utils/tableUtils";

export const useTableData = (
  initialData: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]
) => {
  const [data, setData] = useState<string[][]>(initialData);

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    setData((prevData) =>
      prevData.map((row, i) =>
        i === rowIndex
          ? row.map((cell, j) => (j === colIndex ? value : cell))
          : row
      )
    );
  };

  const addRow = () => setData(addRowUtil(data));
  const addColumn = () => setData(addColumnUtil(data));
  const removeRow = () => setData(removeRowUtil(data));
  const removeColumn = () => setData(removeColumnUtil(data));

  return {
    data,
    handleCellChange,
    addRow,
    addColumn,
    removeRow,
    removeColumn,
  };
};

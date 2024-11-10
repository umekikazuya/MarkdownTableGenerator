export const addRow = (data: string[][]): string[][] => {
  return [...data, Array(data[0].length).fill("")];
};

export const addColumn = (data: string[][]): string[][] => {
  return data.map((row) => [...row, ""]);
};

export const removeRow = (data: string[][]): string[][] => {
  return data.length > 1 ? data.slice(0, -1) : data;
};

export const removeColumn = (data: string[][]): string[][] => {
  return data[0].length > 1 ? data.map((row) => row.slice(0, -1)) : data;
};

"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Copy,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useMarkdownGenerator } from "@/hooks/useMarkDownGenerator";
import { useClipboard } from "@/hooks/useClipboard";
import { useState } from "react";
import { useTableData } from "@/hooks/useTableData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseTableString } from "@/utils/markdownUtils";

const MarkdownTableGenerator: React.FC = () => {
  const {
    tableData,
    setData,
    addRow,
    addColumn,
    removeRow,
    removeColumn,
    handleCellChange,
    setColumnAlignment,
  } = useTableData();

  const [isCompact, setIsCompact] = useState(false);
  const [useHeader, setUseHeader] = useState(false);
  const [rawText, setRawText] = useState("");
  const markdown = useMarkdownGenerator({
    data: tableData,
    isCompact,
    useHeader,
  });

  const copyToClipboard = useClipboard();

  const handleRawTextParse = () => {
    const parsedData = parseTableString(rawText);
    setData(parsedData);
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="mb-4">
          <CardContent className="p-4">
            <section className="mb-8">
              <Textarea
                placeholder="Paste your CSV, TSV, JSON, or ASCII table here"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={5}
                className="mb-4"
              />
              <Button onClick={handleRawTextParse}>Parse</Button>
            </section>
            <section className="mb-8">
              <div className="flex gap-2 mt-4 mb-4">
                {tableData.columns.map((col) => (
                  <Tooltip key={col.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setColumnAlignment(col.id, "left")}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Left Align</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </section>
            <section className="mb-8">
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-10 bg-muted text-center text-sm p-2"></th>
                      {tableData.columns.map((col) => (
                        <th key={col.id} className="p-2 bg-muted">
                          {col.name}
                        </th>
                      ))}
                      <th className="w-20 bg-muted p-2">
                        <div className="flex justify-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={addColumn}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add Column</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeColumn(tableData.columns[tableData.columns.length - 1].id)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove Column</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.rows.map((row, i) => (
                      <tr
                        key={row.id}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="w-10 bg-muted text-center text-sm p-2 border-r">
                          {i + 1}
                        </td>
                        {tableData.columns.map((col) => (
                          <td key={col.id} className="border p-0">
                            <input
                              type="text"
                              value={row.data[col.id] || ""}
                              onChange={(e) =>
                                handleCellChange(row.id, col.id, e.target.value)
                              }
                              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td
                        className="w-20 bg-muted p-2 border-r"
                        colSpan={tableData.columns.length + 2}
                      >
                        <div className="flex justify-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={addRow}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add Row</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  removeRow(tableData.rows[tableData.rows.length - 1].id)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove Row</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="compact"
                    checked={isCompact}
                    onCheckedChange={(checked) =>
                      setIsCompact(checked as boolean)
                    }
                  />
                  <label htmlFor="compact" className="text-sm">
                    Compact
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useHeader"
                    checked={useHeader}
                    onCheckedChange={(checked) =>
                      setUseHeader(checked as boolean)
                    }
                  />
                  <label htmlFor="useHeader" className="text-sm">
                    Use first row as header
                  </label>
                </div>
              </div>
            </section>
            <section className="mb-8">
              <div className="relative">
                <Textarea
                  value={markdown}
                  readOnly
                  className="font-mono"
                  rows={10}
                />
                <Button
                  className="absolute top-2 right-2"
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(markdown)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default MarkdownTableGenerator;

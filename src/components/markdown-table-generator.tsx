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

const MarkdownTableGenerator: React.FC = () => {
  // テーブルデータ管理のフック
  const { data, addRow, addColumn, removeRow, removeColumn, handleCellChange } =
    useTableData();

  // Markdown生成設定
  const [isCompact, setIsCompact] = useState(false);
  const [useHeader, setUseHeader] = useState(false);
  const markdown = useMarkdownGenerator({ data, isCompact, useHeader });

  const copyToClipboard = useClipboard();

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="mb-4">
          <CardContent className="p-4">
            <section className="mb-8">
              <div className="flex gap-2 mt-4 mb-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>左揃え</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>中央揃え</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>右揃え</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </section>

            <section className="mb-8">
              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-10 bg-muted text-center text-sm p-2"></th>
                      {data[0].map((_, index) => (
                        <th key={index} className="p-2 bg-muted">
                          {String.fromCharCode(65 + index)}
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
                              <p>列を追加</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={removeColumn}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>列を削除</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="w-10 bg-muted text-center text-sm p-2 border-r">
                          {i + 1}
                        </td>
                        {row.map((cell, j) => (
                          <td key={j} className="border p-0">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) =>
                                handleCellChange(i, j, e.target.value)
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
                        colSpan={data[0].length + 2}
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
                              <p>行を追加</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={removeRow}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>行を削除</p>
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
                    コンパクト形式
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
                    最初の行をヘッダーとして使用
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

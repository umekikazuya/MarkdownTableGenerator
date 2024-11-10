import { useState, useEffect } from "react";
import { generateMarkdownTable } from "@/utils/markdownUtils";

interface UseMarkdownGeneratorProps {
  data: string[][];
  isCompact: boolean;
  useHeader: boolean;
}

export const useMarkdownGenerator = ({
  data,
  isCompact,
  useHeader,
}: UseMarkdownGeneratorProps) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const generatedMarkdown = generateMarkdownTable(data, isCompact, useHeader);
    setMarkdown(generatedMarkdown);
  }, [data, isCompact, useHeader]);

  return markdown;
};

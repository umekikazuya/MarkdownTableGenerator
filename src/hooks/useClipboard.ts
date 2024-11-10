import { showToast } from "@/components/ui/toast";

export const useClipboard = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast({
        title: "コピーしました",
        description: "Markdownテーブルがクリップボードにコピーされました。",
      });
    });
  };
  return copyToClipboard;
};

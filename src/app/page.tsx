import MarkdownTableGenerator from "@/components/markdown-table-generator";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="container mx-auto p-4 max-w-4xl text-2xl font-bold mb-4">
        Markdownテーブルジェネレーター
      </h1>
      <MarkdownTableGenerator />
    </main>
  );
}

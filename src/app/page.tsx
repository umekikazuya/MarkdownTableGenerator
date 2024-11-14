import MarkdownTableGenerator from "@/components/markdown-table-generator";

export default function Home() {
  return (
    <main className="p-6 min-h-screen flex justify-center">
      <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          QMTG - Quick Markdown Table Generator
        </h1>
        <div>
          <MarkdownTableGenerator />
        </div>
      </div>
    </main>
  );
}

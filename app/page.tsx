import InvoiceTable from "./components/InvoiceTable";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard Invoice</h1>

      <InvoiceTable searchParams={searchParams} />
    </main>
  );
}

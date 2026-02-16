import InvoiceTable from "./components/InvoiceTable";

export default async function Home() {
  return (
    <main className="bg-slate-600 p-10 h-screen">
      <InvoiceTable />
    </main>
  );
}

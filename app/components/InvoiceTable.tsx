import { deleteInvoice, updateStatus } from "@/action";
import supabase from "@/lib/supabaseClient";
import FilterInvoice from "./FilterInvoice";
import Link from "next/link";

export default async function InvoiceTable({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { data: invoices } = await supabase.from("invoices").select("*");
  const params = await searchParams;
  const filterStatus = params?.status;

  const filteredInvoices = invoices?.filter((invoice) => {
    if (!filterStatus || filterStatus === "all") return true;
    return invoice.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const totalPaid = filteredInvoices
    ?.filter((invoice) => invoice.status.toLowerCase() === "paid")
    .reduce((total, jumlah) => total + jumlah.amount, 0);

  const totalPending = filteredInvoices
    ?.filter((invoice) => invoice.status.toLowerCase() === "pending")
    .reduce((total, jumlah) => total + jumlah.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-4 mb-4">
        <div className="p-4 bg-green-100 rounded-lg border border-green-200">
          <h3 className="text-green-800 text-sm font-bold">Total Pendapatan</h3>
          <p className="text-2xl font-bold text-green-900">
            {formatRupiah(totalPaid)}
          </p>
        </div>

        <div className="p-4 me-auto bg-yellow-100 rounded-lg border border-yellow-200">
          <h3 className="text-yellow-800 text-sm font-bold">
            Tagihan Tertunda
          </h3>
          <p className="text-2xl font-bold text-yellow-900">
            {formatRupiah(totalPending)}
          </p>
        </div>

        <div className="flex items-center">
          <h2 className="text-xl font-bold mb-2">Daftar Invoice</h2>
          <FilterInvoice />
        </div>
      </div>

      <Link href="/create" className="bg-blue-600 p-2 rounded">
        Create Invoice
      </Link>

      <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-sm mt-3">
        <thead className="bg-slate-900">
          <tr>
            <th className="border p-2 text-center">Client Name</th>
            <th className="border p-2 text-center">Email</th>
            <th className="border p-2 text-center">Amount</th>
            <th className="border p-2 text-center">Status</th>
            <th className="border p-2 text-center">Due Date</th>
            <th className="border p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredInvoices?.map((invoice) => (
            <tr
              key={invoice.id}
              className="border hover:bg-slate-700 text-center"
            >
              <td className="border p-3">{invoice.client_name}</td>
              <td className="border p-3">{invoice.email}</td>
              <td className="border p-3 font-mono">
                {formatRupiah(invoice.amount)}
              </td>
              <td className="border p-3">
                {invoice.status.toLowerCase() === "paid" ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                    Lunas
                  </span>
                ) : (
                  <form action={updateStatus.bind(null, invoice.id, "paid")}>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 transition cursor-pointer"
                      title="Klik untuk tandai Lunas"
                    >
                      {invoice.status}
                    </button>
                  </form>
                )}
              </td>
              <td className="border p-3">{invoice.due_date}</td>
              <td className="flex p-3 gap-4 justify-center">
                <Link
                  href={`/edit/${invoice.id}`}
                  className="bg-blue-600 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Edit
                </Link>
                <form action={deleteInvoice.bind(null, invoice.id)}>
                  <button className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {filteredInvoices?.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                Tidak ada data invoice dengan status {filterStatus}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

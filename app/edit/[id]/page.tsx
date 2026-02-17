import { updateInvoice } from "@/action";
import supabase from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: invoice } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (!invoice) {
    redirect("/");
  }

  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Invoice</h1>

      <form action={updateInvoiceWithId} className="space-y-4">
        <div>
          <label className="block mb-1">Client Name</label>
          <input
            name="client_name"
            defaultValue={invoice.client_name}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="text"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            defaultValue={invoice.email}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="email"
          />
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            name="amount"
            defaultValue={invoice.amount}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="number"
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            defaultValue={invoice.status}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Due Date</label>
          <input
            name="due_date"
            defaultValue={invoice.due_date}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="date"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
        >
          Update Data
        </button>
      </form>
    </div>
  );
}

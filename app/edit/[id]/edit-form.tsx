"use client";

import { useActionState } from "react";
import { updateInvoice, State } from "@/action";
import { InvoiceType } from "@/lib/types";

export default function EditForm({ invoice }: { invoice: InvoiceType }) {
  const initialState: State = { errors: {}, message: null };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction, isPending] = useActionState(
    updateInvoiceWithId,
    initialState,
  );
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Invoice</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1">Client Name</label>
          <input
            name="client_name"
            defaultValue={invoice.client_name}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="text"
          />
          {state?.errors?.client_name && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.client_name[0]}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            defaultValue={invoice.email}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="email"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            name="amount"
            defaultValue={invoice.amount}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="number"
          />
          {state?.errors?.amount && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.amount[0]}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            defaultValue={invoice.status}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
          >
            <option value="" disabled>
              -- Pilih Status --
            </option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
          {state?.errors?.status && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.status[0]}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Due Date</label>
          <input
            name="due_date"
            defaultValue={invoice.due_date}
            className="w-full p-2 rounded bg-slate-900 outline-1 outline-white/10 focus:outline-indigo-500"
            type="date"
          />
          {state?.errors?.due_date && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.due_date[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
        >
          {isPending ? "Menyimpan..." : "Simpan Data"}{" "}
        </button>
      </form>
    </div>
  );
}

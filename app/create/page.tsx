import createInvoice from "@/action";

export default function form() {
  return (
    <form action={createInvoice} className="p-4 h-screen w-full bg-slate-900">
      <div className="mb-2 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10">
        <label>Client Name</label>
        <input
          type="text"
          id="client"
          name="client_name"
          className="block mb-2 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />

        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="block mb-2 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />

        <label>Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="block mb-2 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />

        <label>Status</label>
        <select
          name="status"
          id="status"
          className="block mb-2 rounded-md bg-slate-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        >
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          className="block rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>
      <button type="submit" className="bg-indigo-800 p-2 rounded">
        Simpan
      </button>
    </form>
  );
}

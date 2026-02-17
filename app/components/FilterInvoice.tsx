"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterInvoice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("status") || "all";

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;

    if (selectedStatus === "all") {
      router.push("/");
    } else {
      router.push(`/?status=${selectedStatus}`);
    }
  };

  return (
    <select
      value={currentFilter}
      onChange={handleFilterChange}
      className="p-2 m-2 mb-4 bg-slate-800 rounded outline-1 outline-white/10 focus:outline-indigo-500"
    >
      <option value="all">Semua Status</option>
      <option value="paid">Paid (Lunas)</option>
      <option value="pending">Pending (Belum Lunas)</option>
    </select>
  );
}

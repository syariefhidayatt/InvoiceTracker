import { z } from "zod";

export const InvoiceSchema = z.object({
  client_name: z.string().min(3, "Nama client minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  amount: z.coerce.number().gt(0, "Nominal harus lebih besar dari 0"),
  status: z.enum(["pending", "paid"], {
    message: "Pilih status yang valid",
  }),
  due_date: z.string().min(1, "Tanggal jatuh tempo wajib diisi"),
});

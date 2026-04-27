export type InvoiceType = {
  id: number;
  client_name: string;
  email: string;
  amount: number;
  status: "pending" | "paid";
  due_date: string;
};

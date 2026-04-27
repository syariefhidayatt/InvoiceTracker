"use server";

import { revalidatePath } from "next/cache";
import supabase from "./lib/supabaseClient";
import { redirect } from "next/navigation";
import { InvoiceSchema } from "./lib/invoiceSchema";

export type State = {
  errors?: {
    client_name?: string[];
    email?: string[];
    amount?: string[];
    status?: string[];
    due_date?: string[];
  };
  message?: string | null;
};

export default async function createInvoice(
  prevState: State,
  formData: FormData,
) {
  const validatedFields = InvoiceSchema.safeParse({
    client_name: formData.get("client_name"),
    email: formData.get("email"),
    amount: formData.get("amount"),
    status: formData.get("status"),
    due_date: formData.get("due_date"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal membuat data. Periksa kembali input Anda.",
    };
  }
  const cleanData = validatedFields.data;
  const { error } = await supabase.from("invoices").insert(cleanData);
  if (error) {
    console.log("error saat create dari supabase", error.message);
    throw new Error("Gagal menyimpan ke database");
  }
  revalidatePath("/");
  redirect("/");
}

export async function deleteInvoice(id: number) {
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) {
    console.log("error dari supabase", error.message);
  }
  revalidatePath("/");
}

export async function updateInvoice(
  id: number,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = InvoiceSchema.safeParse({
    client_name: formData.get("client_name"),
    email: formData.get("email"),
    amount: formData.get("amount"),
    status: formData.get("status"),
    due_date: formData.get("due_date"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Gagal update data. Periksa kembali input Anda.",
    };
  }
  const cleanData = validatedFields.data;
  const { error } = await supabase
    .from("invoices")
    .update(cleanData)
    .eq("id", id);
  if (error) {
    console.log("error saat update dari supabase", error.message);
    throw new Error("Gagal menyimpan ke database");
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateStatus(id: number, newStatus: string) {
  const { error } = await supabase
    .from("invoices")
    .update({ status: newStatus })
    .eq("id", id);
  if (error) {
    console.log("error saat update status dari supabase", error.message);
  }
  revalidatePath("/");
}

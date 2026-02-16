"use server";

import { revalidatePath } from "next/cache";
import supabase from "./lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function createInvoice(formData: FormData) {
  const rawFormData = {
    client_name: formData.get("client_name"),
    email: formData.get("email"),
    amount: formData.get("amount"),
    status: formData.get("status"),
    due_date: formData.get("due_date"),
  };
  const { error } = await supabase.from("invoices").insert(rawFormData);
  if (error) {
    console.log("error dari supabase", error.message);
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

export async function updateStatus(id: number, newStatus: string) {
  const { error } = await supabase
    .from("invoices")
    .update({ status: newStatus })
    .eq("id", id);
  if (error) {
    console.log("error dari supabase", error.message);
  }
  revalidatePath("/");
}

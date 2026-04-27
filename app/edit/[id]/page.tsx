import supabase from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import EditForm from "./edit-form";

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
  return (
    <div className="max-w-md mx-auto mt-10">
      <EditForm invoice={invoice} />
    </div>
  );
}

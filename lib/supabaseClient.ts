import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kzmhicnunrlulkfkfwxm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6bWhpY251bnJsdWxrZmtmd3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTU0NzEsImV4cCI6MjA4NjQ3MTQ3MX0.ggsFso3VGFGy3Us_0Nm79dVxsLUVdSKWX3grkyKw1lE",
);
export default supabase;

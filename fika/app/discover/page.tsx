import { Suspense } from "react";
import { DiscoverContent } from "@/components/discover-content";
import { createClient } from "@/lib/supabase/server";

export default async function DiscoverPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen flex flex-col items-center pt-12 relative">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <Suspense fallback={<div>Loading discover content...</div>}>
          <DiscoverContent user={user} />
        </Suspense>
      </div>
    </main>
  );
}

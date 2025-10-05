"use client";

import { Suspense } from "react";
import { DiscoverContent } from "@/components/discover-content";

export default function DiscoverPage() {


  return (
    <main className="min-h-screen flex flex-col items-center pt-12">
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <Suspense fallback={<div>Loading discover content...</div>}>
          <DiscoverContent />
        </Suspense>
      </div>
    </main>
  );
}

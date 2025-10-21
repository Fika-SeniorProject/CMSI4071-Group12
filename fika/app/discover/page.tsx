"use client";

import { Suspense } from "react";
import { DiscoverContent } from "@/components/discover-content";
import Image from "next/image";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-12 relative">
      <Image
        src="/cardamomBun.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block absolute top-10 left-10 z-[-1]"
      />
      <Image
        src="/swanLatte.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block absolute top-1/3 left-5 z-[-1]"
      />
      <Image
        src="/icedMatchaLatte.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block absolute top-20 right-10 z-[-1]"
      />
      <Image
        src="/hotMatchaLatte.png"
        alt="decoration"
        width={96}
        height={96}
        className="hidden sm:block absolute top-2/3 right-5 z-[-1]"
      />
      <Image
        src="/creamTopLatte.png"
        alt="decoration"
        width={95}
        height={95}
        className="hidden sm:block absolute top-1/4 right-12 z-[-1]"
      />
      <Image
        src="/icedLatte.png"
        alt="decoration"
        width={95}
        height={95}
        className="hidden sm:block absolute top-1/2 left-10 z-[-1]"
      />
      <Image
        src="/cakeSlice.png"
        alt="decoration"
        width={120}
        height={120}
        className="hidden sm:block absolute bottom-1/4 left-10 z-[-1]"
      />
      <div className="flex-1 w-full flex flex-col gap-12 items-center">
        <Suspense fallback={<div>Loading discover content...</div>}>
          <DiscoverContent />
        </Suspense>
      </div>
    </main>
  );
}

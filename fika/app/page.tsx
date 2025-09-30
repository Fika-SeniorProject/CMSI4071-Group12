import { CafeQuickView } from "@/components/cafe-quick-view";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <NavBar />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Cafes</h2>
            <CafeQuickView />
          </main>
        </div>
        <Footer />
      </div>
    </main>
  );
}


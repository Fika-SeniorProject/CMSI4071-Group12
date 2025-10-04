import Link from "next/link";

export function NavBar({ authButton }: { authButton: React.ReactNode }) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-lg">
        <div className="font-semibold">
          <Link href={"/"}>fika</Link>
        </div>
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/discover"}>discover</Link>
          {authButton}
        </div>
      </div>
    </nav>
  );
}

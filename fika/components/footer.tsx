import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full flex items-start justify-center border-t mx-auto text-center text-xs gap-8 pb-4">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/tablescape.png"
          alt="Table logo"
          width={300}
          height={300}
        />
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </div>
    </footer>
  );
}

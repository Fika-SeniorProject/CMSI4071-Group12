import Image from "next/image";

type FooterProps = {
  isAfterHours?: boolean;
};

export function Footer({ isAfterHours }: FooterProps) {
  return (
    <footer className="w-full flex items-start justify-center border-t mx-auto text-center text-xs gap-8 pb-4">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={isAfterHours ? "/tablescapeDark.png" : "/tablescape.png"}
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
        <p>© 2025 fika</p>
      </div>
    </footer>
  );
}

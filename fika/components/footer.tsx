import Image from "next/image";

type FooterProps = {
  isAfterHours?: boolean;
  setIsAfterHours?: (value: boolean) => void;
  isWineBar?: boolean | null;
};

export function Footer({ isAfterHours, setIsAfterHours, isWineBar }: FooterProps) {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-8 pb-4">
      <div className="relative">
        <Image
          src={isAfterHours ? "/tablescapeDark.png" : "/tablescape.png"}
          alt="Table logo"
          width={300}
          height={300}
        />
        {isWineBar && setIsAfterHours && (
          <div
            className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-1 translate-x-8"
            onClick={() => setIsAfterHours(!isAfterHours)}
          >
            <Image
              src={isAfterHours ? "/wineGlassDark.png" : "/wineGlass.png"}
              alt="Wine Glass Icon"
              width={40}
              height={40}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-2">
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

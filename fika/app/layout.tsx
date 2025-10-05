import { AuthButton } from "@/components/auth-button";
import { NavBar } from "@/components/nav-bar";
import type { Metadata } from "next";
import { Karla } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Fika",
  description: "A coffee shop rating app.",
};

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const kate = localFont({
  src: [
    {
      path: "./fonts/Kate-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Kate-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kate",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${karla.className} ${kate.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar authButton={<AuthButton />} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

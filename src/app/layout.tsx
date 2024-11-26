import "../styles/globals.css";
import "../../public/fonts/icons/style.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/components/providers";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Header } from "./_components/header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-inter",
});

export const metadata: Metadata = {
  title: "TODO App",
  description: "Best todo application!",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

type Props = React.PropsWithChildren & {};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
      </head>
      <body
        className={`${inter.variable} min-h-screen min-w-full light:bg-zinc-50 light:text-zinc-900 dark:bg-neutral-950 dark:text-neutral-50`}
      >
        <Providers>
          <Suspense>
            <Header showUserNav />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}

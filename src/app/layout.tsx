import "./globals.css";
import "../../public/fonts/icons/style.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/components/query-provider/query-provider";
import { Header } from "@/components/header";
import {Container} from "@/components/container";
import {ToastProvider} from "@/components/toast-provider/toast-provider";
import {Footer} from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-inter",
});

export const metadata: Metadata = {
  title: "TODO App",
  description: "Best todo application!",
};

type Props = React.PropsWithChildren & {
  createTaskModal: React.ReactNode;
};

export default function RootLayout({ children, createTaskModal }: Props) {
  return (
    <html lang="en">
      <body className={`${ inter.variable } bg-zinc-50 text-zinc-900 min-h-screen`}>
      <ToastProvider>
        <QueryProvider>
          <Container>
            <Header />
                {children}
                {createTaskModal}
            <Footer/>
          </Container>
        </QueryProvider>
      </ToastProvider>
      </body>
    </html>
  );
}

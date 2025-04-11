import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi-vendor E-Commerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <ClientLayout>{children}</ClientLayout>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            toastClassName="w-[200px] sm:w-[250px] lg:w-[300px] text-sm lg:text-xl rounded-md"
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

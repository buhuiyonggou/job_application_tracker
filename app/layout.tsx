import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";
import NavBar from "./NavBar";
import { fonts } from "./fonts";
import { Providers } from "./Providers";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body className={inter.className}>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <QueryClientProvider>
            <NavBar />
            <main className="p-4">{children}</main>
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}

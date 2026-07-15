import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {

  title: "iAmHuman | Human Verification Platform",

  description:
    "Create, share, and verify human identity profiles with iAmHuman.",

  keywords: [
    "human verification",
    "identity verification",
    "verified profile",
    "digital identity",
  ],

  icons: {
    icon: "/icon.svg",
  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">

        <Navbar />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
            },
          }}
        />

        <main className="flex-1">
          {children}
        </main>

      </body>

    </html>

  );

}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/footer";
import { SiteProvider } from "@/components/dealership/SiteProvider";
import { getSiteSettings } from "@/lib/portal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IDI Motors | Lusaka",
  description: "A considered collection of exceptional cars, thoughtfully chosen in Lusaka, Zambia.",

  applicationName: "IDI Motors",
  manifest: "/manifest.json",
  icons: { icon: "/idi-motors-icon.svg" },

  openGraph: {
    title: "IDI Motors | Lusaka",
    description: "A considered collection of exceptional cars, thoughtfully chosen in Lusaka, Zambia.",
    siteName: "IDI Motors",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "IDI Motors | Lusaka",
    description: "A considered collection of exceptional cars, thoughtfully chosen in Lusaka, Zambia.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f8f5",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f8f5] text-[#22251f]`}>
        <NextTopLoader color="#b8d77b" showSpinner={false} />
        <SiteProvider settings={settings}>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SiteProvider>
      </body>
    </html>
  );
}

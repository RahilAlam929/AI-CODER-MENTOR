
import type { Metadata } from "next";
import { Poppins, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EngineerOS – Premium AI Engineering Platform",
  description: "Futuristic, premium engineering workspace with AI, project engine, and more. Modern black theme, glassmorphism, and neon UI.",
  keywords: [
    "AI",
    "Engineering",
    "Dashboard",
    "Projects",
    "Glassmorphism",
    "Neon",
    "Premium UI",
    "Dark Theme",
    "Modern",
    "Responsive",
    "Next.js",
  ],
  openGraph: {
    title: "EngineerOS – Premium AI Engineering Platform",
    description: "Futuristic, premium engineering workspace with AI, project engine, and more. Modern black theme, glassmorphism, and neon UI.",
    type: "website",
    locale: "en_US",
    url: "https://engineeros.com/",
    siteName: "EngineerOS",
  },
  metadataBase: new URL("https://engineeros.com/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${robotoMono.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;600;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-[#00eaff33]">
        <div id="__next-root" className="flex flex-col min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}

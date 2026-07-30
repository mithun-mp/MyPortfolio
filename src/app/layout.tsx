import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mithun M P | Full Stack Software Engineer & MCA Student",
  description:
    "Futuristic portfolio of Mithun M P — MCA Student, Aspiring Software Engineer, and Full Stack Developer. Featuring interactive 3D workstation, projects command deck, stack lab, and capability constellation.",
  keywords: [
    "Mithun M P",
    "Software Engineer",
    "Full Stack Developer",
    "MCA Student",
    "GEC Thrissur",
    "Next.js",
    "Python Django",
    "Flutter",
    "MongoDB",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Mithun M P" }],
  openGraph: {
    title: "Mithun M P | Personal Command Portfolio",
    description: "Futuristic supercomputer portfolio & engineering trajectory of Mithun M P.",
    url: "https://mithun-mp.onrender.com",
    siteName: "Mithun M P Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-space-bg text-gray-100 font-sans antialiased selection:bg-signal-cyan selection:text-space-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Open_Sans, Bad_Script, Aref_Ruqaa } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const badScript = Bad_Script({
  variable: "--font-bad-script",
  subsets: ["latin"],
  weight: "400",
});

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Wills, Trusts & Probate | Devonshires Claims",
  description:
    "Plan your legacy with confidence & care. Devonshires Claims is dedicated to protect what matters most to you and your family, with measured advice, fixed fees and a steady hand through life's most personal decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${badScript.variable} ${arefRuqaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import { Inter } from "next/font/google";

// Inter is used across the whole admin area only (the public site keeps its own fonts).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.className}>{children}</div>;
}

import "./globals.css";
import { Gowun_Batang } from "next/font/google";

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={gowunBatang.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
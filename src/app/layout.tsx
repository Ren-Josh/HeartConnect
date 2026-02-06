import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { HeartPulse, QrCode, ScanLine } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col`}
      >
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-700 no-underline"
              >
                <HeartPulse size={28} strokeWidth={2.5} />
                <span className="text-2xl font-extrabold tracking-tight">
                  HEART-CONNECT
                </span>
              </Link>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
                Medical Identification System
              </p>
            </div>

            <nav className="flex gap-3">
              <Link
                href="/generate"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-sm"
              >
                <QrCode size={18} /> Generate QR
              </Link>
              <Link
                href="/scan"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all"
              >
                <ScanLine size={18} /> Scan QR
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center grow min-dvh">
          <div className="w-full max-w-6xl p-6">{children}</div>
        </main>

        <footer className="py-4 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
          © 2026 Heart-Connect Healthcare System • Secure • Reliable.
        </footer>
      </body>
    </html>
  );
}

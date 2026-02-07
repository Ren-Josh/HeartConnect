import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { HeartPulse, QrCode, ScanLine } from "lucide-react";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://heart-connect-qr.vercel.app"),
  title: {
    default: "Heart Connect | Medical ID QR Code System for Schools & Clinics",
    template: "%s | Heart Connect Medical QR",
  },
  description:
    "Heart-Connect is a medical identification system designed for schools and clinics. Generate secure QR codes for student or scan existing codes to retrieve personal medical information in seconds.",
  keywords: [
    "medical ID QR code",
    "student medical identification",
    "school medical QR system",
    "emergency medical QR code",
    "clinic patient QR system",
    "digital medical ID",
    "healthcare QR platform",
    "secure medical records QR",
    "medical alert QR code",
  ],
  authors: [{ name: "Heart Connect" }],
  creator: "Heart Connect",
  publisher: "Heart Connect",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "F5uRklSmP7A5vqlKItvPT9c0kiok_l4AbjCucmU_bvc",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://heart-connect-qr.vercel.app/",
    title: "Heart Connect – Medical ID QR Codes for Schools & Clinics",
    description:
      "Generate and scan medical identification QR codes for students and patients. Designed for schools, clinics, and emergency access.",
    siteName: "Heart Connect",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Heart Connect Medical ID QR System",
      },
    ],
  },
  category: "healthcare",
};

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
                <HeartPulse
                  size={28}
                  strokeWidth={2.5}
                  className="text-red-500"
                />
                <span className="text-2xl font-extrabold tracking-tight">
                  <span className="text-red-500">HEART</span>-CONNECT
                </span>
              </Link>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
                Medical Identification System
              </p>
            </div>

            <nav className="flex gap-3">
              <Link
                href="/generate"
                className="w-38 flex text-sm items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-sm"
              >
                <QrCode size={18} /> Generate QR
              </Link>
              <Link
                href="/scan"
                className="w-38 text-sm flex justify-center items-center gap-2 px-5 py-2.5 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all"
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
          © 2026 Heart-Connect • Accessible • Reliable.
        </footer>
      </body>
    </html>
  );
}

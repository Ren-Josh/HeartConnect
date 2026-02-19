import Link from "next/link";
import { QrCode, ScanLine } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="bg-white border-b border-slate-200 shadow-sm ">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Vital Information,{" "}
            <span className="text-blue-600">Instantly Accessible.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Heart-Connect is a medical identification system designed for
            schools and clinics. Generate secure QR codes for patients or scan
            existing codes to retrieve personal medical information in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/generate"
              className="min-w-60 w-60 sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
            >
              <QrCode size={22} /> Generate QR
            </Link>
            <Link
              href="/scan"
              className="min-w-60 w-60 sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 rounded-xl font-bold text-md transition-all active:scale-95"
            >
              <ScanLine size={22} /> Scan Existing QR
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

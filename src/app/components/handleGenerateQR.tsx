import { useState } from "react";

import { QrCode, Printer, Download } from "lucide-react";

export function HandleGenerateQR({ qrUrl, formData }: any) {
  const [loading, setLoading] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Heart-Connect | ${formData.name}</title>
            <style>
              body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
              img { width: 96px; height: 96px; border: 1px solid #eee; }
              h2 { color: #1d4ed8; margin-top: 20px; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <img src="${qrUrl}" />
            <h2>${formData.name}</h2>
            <p>Medical Identification QR Code</p>
            <script>window.onload = function() { window.print(); window.close(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDownload = async () => {
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `HeartConnect_${formData.name.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="lg:col-span-5 sticky top-28 print:hidden md:w-1/3 w-full">
      <div className="w-full flex flex-col items-center justify-center bg-blue-50 p-8 rounded-2xl border-2 border-dashed border-blue-200 min-h-125">
        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-blue-800 font-bold uppercase tracking-wider animate-pulse text-sm">
              Encoding...
            </p>
          </div>
        ) : qrUrl ? (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6 ring-1 ring-blue-100">
              <img
                src={qrUrl}
                alt="QR"
                className="w-64 h-64"
                onLoad={() => setLoading(false)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-blue-200 text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition shadow-sm"
              >
                <Printer size={18} /> Print
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
              >
                <Download size={18} /> Save
              </button>
            </div>
            <p className="mt-4 text-slate-400 text-xs text-center leading-relaxed">
              {formData.name}'s QR contains encoded personal and medical data
              for medical access.
            </p>
          </div>
        ) : (
          <div className="text-center group">
            <div className="bg-white p-8 rounded-full inline-block mb-4 border border-slate-100 shadow-sm">
              <QrCode size={64} className="text-slate-200" />
            </div>
            <p className="text-slate-400 text-sm italic">
              Waiting for details...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

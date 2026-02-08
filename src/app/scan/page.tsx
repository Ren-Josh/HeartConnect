"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  UploadCloud,
  Camera,
  RefreshCw,
  ScanLine,
  ShieldAlert,
  HeartPulse,
} from "lucide-react";

export default function ScanQR() {
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const dataFromUrl = searchParams.get("data");

    if (dataFromUrl) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataFromUrl));
        setPatientData(decodedData);
      } catch (err) {
        console.error("Failed to parse data from URL ", err);
      }
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        rememberLastUsedCamera: false,
      },
      false,
    );

    const onScanSuccess = (decodedText: string) => {
      try {
        let finalData: any = null;

        if (decodedText.includes("?data=")) {
          const urlParts = decodedText.split("?data=");
          const rawJson = decodeURIComponent(urlParts[1]);
          finalData = JSON.parse(rawJson);
        } else if (decodedText.startsWith("{")) {
          finalData = JSON.parse(decodedText);
        } else {
          const lines = decodedText.split("\n");
          const data: any = {};
          lines.forEach((line) => {
            const [key, ...val] = line.split(": ");
            if (key) data[key.toLowerCase().trim()] = val.join(": ").trim();
          });
          finalData = data;
        }

        if (finalData) {
          setPatientData(finalData);
          scanner.clear().catch((err) => console.error("Clear error", err));
        }
      } catch (err) {
        console.error("Decoding error:", err);
        alert("Could not parse medical data from this QR code.");
      }
    };

    scanner.render(onScanSuccess, (error) => {});

    return () => {
      scanner.clear().catch((err) => console.error("Cleanup error", err));
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {!patientData && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-blue-700 p-6 text-white flex justify-between items-center max-dvh">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Camera size={24} /> QR Heart-Connect Scanner
              </h2>
              <p className="text-blue-100 text-sm opacity-80 mt-1">
                Live Camera or Image Upload
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer"
              title="Restart Scanner"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          <div className="p-8 flex flex-col items-center">
            <div
              id="reader"
              className="md:max-w-3/4 border-2  border-dashed border-blue-100 rounded-2xl bg-slate-50 overflow-hidden"
            ></div>

            <div className="mt-6 flex items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <Camera size={14} className="text-blue-500" /> Live Feed
              </div>
              <div className="h-4 w-px bg-slate-200"></div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <UploadCloud size={14} className="text-blue-500" /> Drag & Drop
              </div>
            </div>
          </div>
        </div>
      )}

      {patientData && (
        <div className="gap-5 flex flex-col">
          <div className="mt-8 bg-white overflow-hidden rounded-2xl border border-blue-200 shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold uppercase tracking-widest text-sm flex gap-2 items-center">
                <HeartPulse />
                Medical Profile
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h3 className="text-md font-bold text-slate-400 uppercase mb-2">
                  Basic Information
                </h3>
                <p className="text-md">
                  <strong>Name:</strong> {patientData.name}
                </p>
                <p className="text-md">
                  <strong>Age:</strong> {patientData.age}
                </p>
                <p className="text-md">
                  <strong>Sex: </strong>
                  {patientData.sex}
                </p>
                <p className="text-md flex gap-1">
                  <strong>Blood Type:</strong>{" "}
                  <span className="text-red-600 ">{patientData.blood}</span>
                </p>
              </section>
              <section>
                <h3 className="text-md font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                  Contact Info
                </h3>
                <p className="whitespace-pre-line">
                  <strong>Address: </strong>
                  {patientData.street}, {patientData.barangay},{" "}
                  {patientData.municipality}, {patientData.province}
                </p>
                <p className="text-md">
                  <strong>Phone Number:</strong> {patientData.phone}
                </p>
              </section>
              <section className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="text-xs font-bold text-blue-800 uppercase mb-2 flex items-center gap-1">
                  <ShieldAlert size={12} /> Medical History & Allergies
                </h3>
                <p className="text-slate-800">{patientData.medical}</p>
              </section>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-fit self-center flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-md transition-all shadow-lg hover:shadow-blue-200 active:scale-95 cursor-pointer"
          >
            <ScanLine size={18} />
            Scan Another
          </button>
        </div>
      )}
    </div>
  );
}

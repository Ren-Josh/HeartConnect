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

  const handleAge = () => {
    const today = new Date();
    const birthdate = new Date(patientData.birthdate);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;

      return age;
    }
  };

  const handleBMI = () => {
    const height = patientData.height / 100;
    const weight = patientData.weight;

    const BMI = parseFloat((weight / (height * height)).toFixed(2));
    let remarks = "";

    if (BMI < 18.5) {
      remarks = "Underweight";
    } else if (BMI >= 18.5 || BMI <= 24.9) {
      remarks = "Normal weight";
    } else if (BMI >= 25 || BMI <= 29.9) {
      remarks = "Over weight";
    } else if (BMI > 30) {
      remarks = "Obese";
    } else {
      remarks = "N/A";
    }

    return BMI + " (" + remarks + ")";
  };

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
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <HeartPulse className="w-6 h-6" />
                <div>
                  <h2 className="font-bold text-lg tracking-wide">
                    Medical Profile
                  </h2>
                  <p className="text-xs opacity-80">
                    Emergency Identification Record
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="px-6">
              {/* BASIC INFORMATION */}
              <section className="border-b-2 border-gray-300 py-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 ">
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Name:</strong> {patientData.name}
                  </p>
                  <p>
                    <strong>Sex:</strong> {patientData.sex}
                  </p>
                  <p>
                    <strong>Birthdate:</strong> {patientData.birthdate}
                  </p>
                  <p>
                    <strong>Age:</strong> {handleAge()}
                  </p>
                  <p>
                    <strong>Height:</strong> {patientData.height} cm
                  </p>
                  <p>
                    <strong>Weight:</strong> {patientData.weight} kg
                  </p>
                  <p>
                    <strong>BMI:</strong> {handleBMI()}
                  </p>
                  <p>
                    <strong>Civil Status:</strong> {patientData.civilStatus}
                  </p>
                </div>

                {patientData.sex === "Female" && patientData.menstruation && (
                  <div className="mt-3 text-sm text-pink-600 font-medium">
                    Menstruation: {patientData.menstruation}
                  </div>
                )}
              </section>

              {/* CONTACT INFORMATION */}
              <section className="border-b-2 border-gray-300 py-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Contact Information
                </h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Address:</strong> {patientData.street},{" "}
                    {patientData.barangay}, {patientData.municipality},{" "}
                    {patientData.province}
                  </p>
                  <p>
                    <strong>Phone:</strong> {patientData.phone}
                  </p>
                </div>
              </section>

              {/* EMERGENCY CONTACT (HIGHLIGHTED) */}
              <section className="bg-red-50 border border-red-200 p-4 rounded-xl my-6">
                <h3 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
                  Emergency Contact
                </h3>
                <p className="text-sm font-medium">
                  {patientData.emergencyContactPerson}
                </p>
                <p className="text-sm text-red-700">
                  {patientData.emergencyContactNumber}
                </p>
              </section>

              {/* MEDICAL CONDITIONS */}
              <section className="border-y-2 border-gray-300 py-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert size={14} />
                  Medical & Allergy Information
                </h3>

                <div className="space-y-2 text-sm">
                  {patientData.hasMedication && (
                    <p>
                      <strong>Active Medication:</strong>{" "}
                      {patientData.medicationDetails}
                    </p>
                  )}

                  {patientData.hasLatexAllergy && (
                    <p className="text-red-600 font-semibold">
                      Has Latex Allergy
                    </p>
                  )}

                  {patientData.hasOtherAllergies && (
                    <p>
                      <strong>Other Allergies:</strong>{" "}
                      {patientData.otherAllergyDetails}
                    </p>
                  )}
                </div>
              </section>

              {/* FAMILY HISTORY */}
              {patientData.familyHistory?.length > 0 && (
                <section className="border-b-2 border-gray-300 py-6">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Family History
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {patientData.familyHistory.map((item: any, index: any) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                      >
                        {item.replace("_", " ")}
                      </span>
                    ))}
                  </div>

                  {patientData.familyHistory.includes("Other") && (
                    <p className="text-sm mt-2 bg-blue-100 text-blue-700 rounded-md border-blue-400 border p-2">
                      {patientData.familyHistoryOtherDetails}
                    </p>
                  )}
                </section>
              )}

              {/* LIFESTYLE SUMMARY */}
              <section className="py-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Lifestyle Overview
                </h3>

                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <p>
                    <strong>Smoking:</strong> {patientData.smokingStatus}
                  </p>
                  <p>
                    <strong>E-Cigarette:</strong>{" "}
                    {patientData.isUsingECigarrete ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Alcohol:</strong> {patientData.drinkingStatus}
                  </p>
                  <p>
                    <strong>Physical Activity:</strong>{" "}
                    {patientData.physicalActivity}
                  </p>
                  <p>
                    <strong>Diet:</strong> {patientData.dietType}
                  </p>
                  <p>
                    <strong>Eating Frequency:</strong>{" "}
                    {patientData.eatingFrequency}
                  </p>
                  <p>
                    <strong>Sleep:</strong> {patientData.sleepPattern}
                  </p>
                </div>
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

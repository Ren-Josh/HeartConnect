"use client";
import { useState } from "react";

import { HandleFormQR } from "../components/handleFormQR";
import { HandleGenerateQR } from "../components/handleGenerateQR";

export default function GenerateQR() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    blood: "",
    sex: "",
    menstruation: "",
    street: "",
    barangay: "",
    municipality: "",
    province: "",
    religion: "",
    phone: "",
    emergencyContactPerson: "",
    emergencyContactNumber: "",
    weight: "",
    height: "",
    civilStatus: "",
    smokingStatus: "",
    isUsingECigarrete: false,

    drinkingStatus: "",

    physicalActivity: "",

    dietType: "",
    eatingFrequency: "",

    sleepPattern: "",

    hasMedication: "",
    medicationDetails: "",

    hasLatexAllergy: "",

    hasOtherAllergies: "",
    otherAllergyDetails: "",

    familyHistory: [],
    familyHistoryOtherDetails: "",
  });
  const [qrUrl, setQrUrl] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <HandleFormQR
        formData={formData}
        setFormData={setFormData}
        qrUrl={qrUrl}
        setQrUrl={setQrUrl}
      />
      <HandleGenerateQR qrUrl={qrUrl} formData={formData} />
    </div>
  );
}

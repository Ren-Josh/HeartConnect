"use client";
import { useState } from "react";

import { HandleFormQR } from "../components/handleFormQR";
import { HandleGenerateQR } from "../components/handleGenerateQR";

export default function GenerateQR() {
  const [formData, setFormData] = useState({
    n: "",
    bd: "",
    bt: "",
    sex: "",
    mens: "",
    st: "",
    brgy: "",
    muni: "",
    province: "",
    religion: "",
    phone: "",
    ecp: "",
    ecn: "",
    w: "",
    h: "",
    cs: "",
    ss: "",
    eCig: false,

    ds: "",

    pa: "",

    dt: "",
    ef: "",

    sp: "",

    hm: "",
    md: "",

    hla: "",

    hoa: "",
    oad: "",

    famh: [],
    famhod: "",
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

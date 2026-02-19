import { PersonalInformation } from "./formComponents/personalInformation";
import { EmergencyContact } from "./formComponents/emergencyContact";
import { FamilyMedicalHistory } from "./formComponents/familyMedicalHistory";
import { LifeStye } from "./formComponents/lifestyle";

export function HandleFormQR({ formData, setFormData, setQrUrl }: any) {
  const generateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.sex == "Select Sex" ||
      (formData.sex === "Female" && !formData.menstruation) ||
      !formData.civilStatus ||
      !formData.hasMedication ||
      !formData.hasLatexAllergy ||
      !formData.hasOtherAllergies ||
      formData.smokingStatus == "" ||
      formData.drinkingStatus == "" ||
      formData.physicalActivity == "" ||
      formData.dietType == "" ||
      formData.eatingFrequency == "" ||
      formData.sleepPattern == ""
    ) {
      document.getElementById("error-message")!.classList.remove("hidden");
      setQrUrl("");
    } else {
      document.getElementById("error-message")!.classList.add("hidden");

      const encodedData = encodeURIComponent(JSON.stringify(formData));
      const baseUrl = "https://heart-connect-qr.vercel.app/scan";
      const redirectUrl = `${baseUrl}?data=${encodedData}`;
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(redirectUrl)}&size=1000x1000&qzone=5&margin=10`,
      );
    }
  };

  return (
    <form
      onSubmit={generateQR}
      className="w-full md:w-2/3 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-800">
        Patient Registration
      </h2>

      <PersonalInformation formData={formData} setFormData={setFormData} />
      <LifeStye formData={formData} setFormData={setFormData} />
      <EmergencyContact formData={formData} setFormData={setFormData} />
      <FamilyMedicalHistory formData={formData} setFormData={setFormData} />

      <p className="text-red-500 text-sm hidden" id="error-message">
        Please fill up all the fields before generating QR.
      </p>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition cursor-pointer"
      >
        Generate Heart-Connect QR
      </button>
    </form>
  );
}

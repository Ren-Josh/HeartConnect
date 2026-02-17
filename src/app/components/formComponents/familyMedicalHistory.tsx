import { FileText } from "lucide-react";
import { formDataInterface } from "@/app/interface/formData";

export function FamilyMedicalHistory({
  formData,
  setFormData,
}: formDataInterface) {
  const handleCheckBox = (val: String) => {
    setFormData((prev: any) => {
      const alreadySelected = prev.familyHistory.includes(val);

      return {
        ...prev,
        familyHistory: alreadySelected
          ? prev.familyHistory.filter((item: any) => item !== val)
          : [...prev.familyHistory, val],
      };
    });
  };
  return (
    <>
      <div className="mt-8 space-y-2">
        <label className="text-md font-medium flex items-center gap-2">
          <FileText size={16} /> Family Medical History
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 space-x-10 space-y-2">
          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Hypertension"
              onChange={(e) => handleCheckBox(e.target.value)}
            />
            <span>Hypertension</span>
          </label>

          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Diabetes"
              onChange={(e) => handleCheckBox(e.target.value)}
            />
            <span>Diabetes</span>
          </label>

          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Cancer"
              onChange={(e) => handleCheckBox(e.target.value)}
            />
            <span>Cancer</span>
          </label>

          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Heart Disease"
              onChange={(e) => handleCheckBox(e.target.value)}
            />
            <span>Heart Disease</span>
          </label>

          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Asthma"
              onChange={(e) => handleCheckBox(e.target.value)}
            />
            <span>Asthma</span>
          </label>

          <label className="cursor-pointer space-x-2">
            <input
              type="checkbox"
              value="Depression"
              onChange={(e) => handleCheckBox(e.target.value)}
            />
            <span>Depression</span>
          </label>

          <div className="col-span-2">
            <label className="cursor-pointer space-x-2">
              <input
                type="checkbox"
                value="Other"
                onChange={(e) => handleCheckBox(e.target.value)}
              />
              <span>Other</span>
            </label>

            {formData.familyHistory.includes("Other") && (
              <div>
                <label className="text-sm font-medium ">Please specify:</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-400/50 p-2 rounded"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      familyHistoryOtherDetails: e.target.value,
                    })
                  }
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

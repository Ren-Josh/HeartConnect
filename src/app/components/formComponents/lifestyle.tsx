import { TreePalm } from "lucide-react";
import { formDataInterface } from "@/app/interface/formData";

export function LifeStye({ formData, setFormData }: formDataInterface) {
  return (
    <>
      <div className="py-4 border-b-2 border-gray-400 md:col-span-2 space-y-2">
        <label className="text-md font-medium flex items-center gap-2">
          <TreePalm size={16} />
          Lifestyle Information
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm flex items-center gap-2 font-medium">
              Smoking Status
            </label>
            <select
              className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
              required
              value={formData.ss}
              onChange={(e) => {
                setFormData({ ...formData, ss: e.target.value });
              }}
            >
              <option value="" selected hidden>
                Select Status
              </option>
              <option>Never Smoked</option>
              <option>Smoking</option>
              <option>Former Smoker</option>
            </select>
          </div>

          {(formData.smokingStatus == "Smoking" ||
            formData.smokingStatus == "Former Smoker") && (
            <div className="space-x-5 space-y-3">
              <label className="text-sm flex items-center font-medium">
                Used/Using E-Cigarrete/Vape
              </label>
              <label className="cursor-pointer space-x-2">
                <input
                  type="radio"
                  name="usingECig"
                  value={1}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      eCig: e.target.value,
                    });
                  }}
                />
                <span>Yes</span>
              </label>
              <label className="cursor-pointer space-x-2">
                <input
                  type="radio"
                  name="usingECig"
                  value={0}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      eCig: e.target.value,
                    });
                  }}
                />
                <span>No</span>
              </label>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm flex items-center gap-2 font-medium">
              Drinking Alcohol Status
            </label>
            <select
              className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
              required
              value={formData.ds}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ds: e.target.value,
                });
              }}
            >
              <option value="" selected hidden>
                Select Status
              </option>
              <option>Does not drink</option>
              <option>Occasional</option>
              <option>Weekly (1-7x per week)</option>
              <option>Frequent (8+ per week)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm flex items-center gap-2 font-medium">
              Physical Activity Status
            </label>
            <select
              className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
              required
              value={formData.physicalActivity}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  pa: e.target.value,
                });
              }}
            >
              <option value="" selected hidden>
                Select Status
              </option>
              <option>Sedentary (little to no exercise)</option>
              <option>Light activity (1–2x /week)</option>
              <option>Moderate activity (3–4x /week)</option>
              <option>Active (5+ times/week)</option>
              <option>Athlete</option>
            </select>
          </div>

          <div>
            <label className="text-sm flex items-center gap-2 font-medium">
              Diet Type
            </label>
            <select
              className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
              required
              value={formData.dietType}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  dt: e.target.value,
                });
              }}
            >
              <option value="" selected hidden>
                Select diet type
              </option>
              <option>Balanced / Regular diet</option>
              <option>Vegetarian</option>
              <option>Junk Foods</option>
            </select>
          </div>

          <div>
            <label className="text-sm flex items-center gap-2 font-medium">
              Eating Frequency
            </label>
            <select
              className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
              required
              value={formData.eatingFrequency}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  ef: e.target.value,
                });
              }}
            >
              <option value="" selected hidden>
                Select eating frequency
              </option>
              <option>1 meal per day</option>
              <option>2 meals per day</option>
              <option>3 meals per day</option>
              <option>4 or more meals per day</option>
              <option>Irregular meal schedule</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm flex items-center gap-2 font-medium">
              Average Sleep Duration
            </label>
            <select
              className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
              required
              value={formData.sleepPattern}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  sp: e.target.value,
                });
              }}
            >
              <option value="" selected hidden>
                Select sleep duration
              </option>
              <option>Less than 5 hours</option>
              <option>5-6 hours</option>
              <option>6-8 hours</option>
              <option>More than 8 hours</option>
              <option>Irregular sleep schedule</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium ">Has Medication?</label>
                <div className="space-x-5">
                  <label className="cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="hasMedication"
                      value={"yes"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hm: e.target.value,
                        })
                      }
                    />
                    <span>Yes</span>
                  </label>
                  <label className="cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="hasMedication"
                      value={"no"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hm: e.target.value,
                        })
                      }
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.hasMedication == "yes" && (
                <div>
                  <label className="text-sm font-medium ">
                    Please specify:
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-400/50 p-2 rounded"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        md: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium ">
                  Has latex / glove allergies?
                </label>
                <div className="space-x-5">
                  <label className="cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="hasLatexAllergy"
                      value={"yes"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hla: e.target.value,
                        })
                      }
                    />
                    <span>Yes</span>
                  </label>
                  <label className="cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="hasLatexAllergy"
                      value={"no"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hla: e.target.value,
                        })
                      }
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium ">
                  Has other allergies?
                </label>
                <div className="space-x-5">
                  <label className="cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="hasOtherAllergies"
                      value={"yes"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hoa: e.target.value,
                        })
                      }
                    />
                    <span>Yes</span>
                  </label>
                  <label className="cursor-pointer space-x-2">
                    <input
                      type="radio"
                      name="hasOtherAllergies"
                      value={"no"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hoa: e.target.value,
                        })
                      }
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formData.hasOtherAllergies == "yes" && (
                <div>
                  <label className="text-sm font-medium ">
                    Please specify:
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-400/50 p-2 rounded"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oad: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* end */}
        </div>
      </div>
    </>
  );
}

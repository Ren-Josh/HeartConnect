import { formDataInterface } from "@/app/interface/formData";
import {
  User,
  HeartPlus,
  Phone,
  VenusAndMars,
  Cake,
  MapPin,
  Ruler,
  Weight,
} from "lucide-react";

export function PersonalInformation({
  formData,
  setFormData,
}: formDataInterface) {
  return (
    <>
      <div className="pb-4 border-b-2 border-gray-400 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-md font-medium flex items-center gap-2">
            <User size={16} /> Full Name
          </label>
          <input
            className="w-full border-2 border-gray-400/50 p-2 rounded"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-md flex items-center gap-2 font-medium">
            <Cake size={16} />
            BirthDate
          </label>
          <input
            type="date"
            min={1}
            className="w-full border-2 border-gray-400/50 p-2 rounded "
            onChange={(e) =>
              setFormData({ ...formData, birthdate: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-md flex items-center gap-2 font-medium">
            <VenusAndMars size={16} /> Sex
          </label>
          <select
            className="w-full border-2 border-gray-400/50 p-2 rounded cursor-pointer"
            required
            value={formData.sex}
            onChange={(e) => {
              if (formData.sex === "Male")
                setFormData({ ...formData, menstruation: "" });
              setFormData({ ...formData, sex: e.target.value });
            }}
          >
            <option className="text-gray-400" selected hidden>
              Select Sex
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {formData.sex === "Female" ? (
          <div className="space-y-2 space-x-5">
            <label className="text-md flex items-center gap-2 font-medium">
              <HeartPlus size={16} />
              Menstruation Status
            </label>
            <label className="cursor-pointer space-x-2">
              <input
                type="radio"
                value={"Regular Menstruation"}
                name="menstruation"
                id="regular"
                onChange={(e) =>
                  setFormData({ ...formData, menstruation: e.target.value })
                }
              />
              <span>Regular</span>
            </label>
            <label className="cursor-pointer space-x-2">
              <input
                type="radio"
                value={"Irregular Menstruation"}
                name="menstruation"
                onChange={(e) =>
                  setFormData({ ...formData, menstruation: e.target.value })
                }
              />
              <span>Irregular</span>
            </label>
          </div>
        ) : (
          <div className="space-y-2 space-x-5"></div>
        )}

        <div className="space-y-2">
          <label className="text-md font-medium flex items-center gap-2">
            <Ruler size={16} /> Height
          </label>
          <input
            className="w-full border-2 border-gray-400/50 p-2 rounded"
            type="number"
            value={formData.height}
            min={0}
            placeholder={`000 centimeters`}
            onChange={(e) =>
              setFormData({ ...formData, height: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-md font-medium flex items-center gap-2">
            <Weight size={16} /> Weight
          </label>
          <input
            className="w-full border-2 border-gray-400/50 p-2 rounded"
            type="number"
            value={formData.weight}
            min={0}
            placeholder={`0.00 kilograms`}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-md font-medium flex items-center gap-2">
            <User size={16} /> Civil Status
          </label>
          <div className="space-x-5">
            <label className="cursor-pointer space-x-2">
              <input
                type="radio"
                name="civilStatus"
                value="Single"
                onChange={(e) => {
                  setFormData({ ...formData, civilStatus: e.target.value });
                }}
              />
              <span>Single</span>
            </label>
            <label className="cursor-pointer  space-x-2">
              <input
                type="radio"
                name="civilStatus"
                value="Married"
                onChange={(e) => {
                  setFormData({ ...formData, civilStatus: e.target.value });
                }}
              />
              <span>Married</span>
            </label>
            <label className="cursor-pointer space-x-2">
              <input
                type="radio"
                name="civilStatus"
                value="Widowed"
                onChange={(e) => {
                  setFormData({ ...formData, civilStatus: e.target.value });
                }}
              />
              <span>Widowed</span>
            </label>
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-md font-medium flex items-center gap-2">
            <Phone size={16} />
            Phone Number
          </label>
          <input
            type="tel"
            inputMode="numeric"
            className="w-full border-2 border-gray-400/50 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="09XXXXXXXXX or +639XXXXXXXXX"
            value={formData.phone}
            onChange={(e) => {
              let input = e.target.value;

              // Remove any character that isn't a digit or a plus sign
              let cleaned = input.replace(/[^0-9+]/g, "");

              // Prevent multiple plus signs
              if ((cleaned.match(/\+/g) || []).length > 1) return;

              if (cleaned.startsWith("+")) {
                if (cleaned.length >= 3 && !cleaned.startsWith("+63")) {
                  cleaned = "+63" + cleaned.replace("+", "").replace(/^63/, "");
                }
                cleaned = cleaned.slice(0, 13); // +63 + 10 digits
              } else {
                if (cleaned.length >= 2 && !cleaned.startsWith("09")) {
                  cleaned = "09" + cleaned.replace(/^0+/, "").replace(/^9/, "");
                }
                cleaned = cleaned.slice(0, 11);
              }

              setFormData({ ...formData, phone: cleaned });
            }}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-md font-medium flex items-center gap-2">
            <MapPin size={16} />
            Address
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium ">
                House No./Street/Subdivision:
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-400/50 p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Barangay:</label>
              <input
                type="text"
                className="w-full border-2 border-gray-400/50 p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, barangay: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Municipality:</label>
              <input
                type="text"
                className="w-full border-2 border-gray-400/50 p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, municipality: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Province:</label>
              <input
                type="text"
                className="w-full border-2 border-gray-400/50 p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

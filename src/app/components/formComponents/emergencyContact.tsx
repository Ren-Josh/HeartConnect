import { User, Phone, PhoneOutgoing } from "lucide-react";

import { formDataInterface } from "@/app/interface/formData";

export function EmergencyContact({ formData, setFormData }: formDataInterface) {
  return (
    <>
      <div className="py-4 border-b-2 border-gray-400 space-y-2">
        <label className="text-md font-medium flex items-center gap-2">
          <PhoneOutgoing size={16} />
          Emergency Contact
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-md font-medium flex items-center gap-2">
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Maria C. Dela Cruz"
              className="w-full border-2 border-gray-400/50 p-2 rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ecp: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="text-md font-medium flex items-center gap-2">
              <Phone size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              inputMode="numeric"
              className="w-full border-2 border-gray-400/50 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="09XXXXXXXXX or +639XXXXXXXXX"
              value={formData.ecn}
              onChange={(e) => {
                let input = e.target.value;

                // Remove any character that isn't a digit or a plus sign
                let cleaned = input.replace(/[^0-9+]/g, "");

                // Prevent multiple plus signs
                if ((cleaned.match(/\+/g) || []).length > 1) return;

                if (cleaned.startsWith("+")) {
                  if (cleaned.length >= 3 && !cleaned.startsWith("+63")) {
                    cleaned =
                      "+63" + cleaned.replace("+", "").replace(/^63/, "");
                  }
                  cleaned = cleaned.slice(0, 13); // +63 + 10 digits
                } else {
                  if (cleaned.length >= 2 && !cleaned.startsWith("09")) {
                    cleaned =
                      "09" + cleaned.replace(/^0+/, "").replace(/^9/, "");
                  }
                  cleaned = cleaned.slice(0, 11);
                }

                setFormData({ ...formData, ecn: cleaned });
              }}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}

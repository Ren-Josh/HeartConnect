import {
  User,
  Activity,
  Phone,
  FileText,
  VenusAndMars,
  Cake,
  MapPin,
} from "lucide-react";

export function HandleFormQR({ formData, setFormData, qrUrl, setQrUrl }: any) {
  const generateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sex || !formData.blood) {
      document.getElementById("error-message")!.classList.remove("hidden");
    } else {
      document.getElementById("error-message")!.classList.add("hidden");
      const dataString = encodeURIComponent(JSON.stringify(formData));
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${dataString}`,
      );
    }
  };

  return (
    <form
      onSubmit={generateQR}
      className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-sm border border-slate-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-800">
        Patient Registration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-md font-medium flex items-center gap-2">
            <User size={16} /> Full Name
          </label>
          <input
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-md flex items-center gap-2 font-medium">
            <Cake size={16} />
            Age
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-md font-medium flex items-center gap-2">
            <Activity size={16} /> Blood Type
          </label>
          <select
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, blood: e.target.value })
            }
          >
            <option className="text-gray-400" selected disabled hidden>
              Select Blood Type
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-md flex items-center gap-2 font-medium">
            <VenusAndMars size={16} /> Sex
          </label>
          <select
            className="w-full border p-2 rounded"
            required
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          >
            <option className="text-gray-400" selected disabled hidden>
              Select Sex
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <label className="text-md font-medium flex items-center gap-2">
          <MapPin size={16} />
          Address
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium ">
              House Number/Street/Subdivision:
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, province: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <label className="text-md font-medium flex items-center gap-2">
            <Phone size={16} />
            Phone Number
          </label>
          <input
            type="tel"
            inputMode="numeric"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
      </div>

      <div className="mt-8 space-y-2">
        <label className="text-md font-medium flex items-center gap-2">
          <FileText size={16} /> Past Medical History
        </label>
        <textarea
          className="w-full border p-2 rounded resize-none"
          rows={3}
          placeholder="Past illnesses and allergies, N/A if none"
          onChange={(e) =>
            setFormData({ ...formData, medical: e.target.value })
          }
          required
        />
      </div>
      <p className="text-red-500 text-sm hidden" id="error-message">
        Please fill up all the fields before generating QR.
      </p>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        Generate Heart-Connect QR
      </button>
    </form>
  );
}

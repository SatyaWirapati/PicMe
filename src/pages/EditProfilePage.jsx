import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postUpdateProfile } from "../api/userApi";
import { useNotification } from "../context/NotificationContext";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { showNotification } = useNotification();
  const [step, setStep] = useState(1); // <-- STEP 1 or STEP 2

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    profilePictureUrl: "",
    phoneNumber: "",
    bio: "",
    website: "",
  });

  const step1Fields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
    },
  ];

  const step2Fields = [
    { name: "bio", label: "Bio", type: "text", required: false },
    { name: "website", label: "Website", type: "text", required: false },
    {
      name: "profilePictureUrl",
      label: "Profile Picture URL",
      type: "text",
      required: false,
    },
  ];

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  // Cek apakah Step 1 valid
  const isStep1Valid = step1Fields.every(
    (f) => formData[f.name]?.trim() !== ""
  );

  const goNext = () => {
    if (!isStep1Valid) {
      return setError("Isi semua field terlebih dahulu.");
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log("ini formData",formData);
      const response = await postUpdateProfile(formData);
      showNotification(response.message);
      
        login({ ...user, ...formData });
      navigate("/explore");
    } catch (err) {
      const message =
        err.response?.data?.message || "Update gagal. Periksa data Anda.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        name: user.name || "",
        profilePictureUrl: user.profilePictureUrl || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        website: user.website || "",
      });
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-3 pb-40">
      <div className="text-3xl mb-8 font-bold">
        <h1>PicMe</h1>
      </div>

      <div className="w-full max-w-lg  pb-3.5 shadow-md rounded-lg p-6 border bg-red-300">
        <span className="px-3 text-xl">
          {step === 1 ? "Update Profile — Step 1" : "Update Profile — Step 2"}
        </span>

        <form className="flex flex-col gap-4     mt-3" onSubmit={handleSubmit}>
          {error && (
            <div className="w-full text-center text-md font-bold text-red-600 border border-red-400 bg-red-100 p-2 rounded-md mb-2">
              {error}
            </div>
          )}

          {/* STEP 1 */}
          <div className="grid grid-cols-2 gap-3 items-end">
            {step === 1 &&
              step1Fields.map((field) => (
                <div key={field.name} className="w-full ">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>

                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    required={field.required}
                    className="border w-full bg-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              ))}
          </div>

          {/* STEP 2 */}
          {step === 2 &&
            step2Fields.map((field) => (
              <div key={field.name} className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  className="border w-full bg-white rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            ))}

          {/* BUTTONS */}
          {step === 1 && (
            <button
              type="button"
              onClick={goNext}
              className={`bg-blue-500 text-white rounded-md py-2 px-6 text-lg mt-4 transition duration-300 shadow-md 
              ${
                !isStep1Valid
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
              }`}
              disabled={!isStep1Valid}
            >
              Next
            </button>
          )}

          {step === 2 && (
            <button
              type="submit"
              className={`bg-blue-500 text-white rounded-md py-2 px-6 text-lg mt-4 transition duration-300 shadow-md 
              ${
                isLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Submiting..." : "Submit"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;

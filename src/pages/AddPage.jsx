import { useState } from "react";
import { createPost } from "../api/postApi";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    caption: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { user } = useAuth();

  const { showNotification } = useNotification();

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      return setError("Image Url tidak boleh kosong");
    }

    if (!isValidImageUrl(formData.imageUrl)) {
      return setError(
        "Masukkan URL gambar yang valid (.jpg, .png, .jpeg, .gif, .webp)"
      );
    }

    try {
      setIsLoading(true);
      const response = await createPost(formData);
      showNotification(response.message);
      navigate(`/profile/${user.userId}`);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat upload gambar";

      setError(message);
      showNotification(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center max-h-screen p-2.5 bg-gray-50">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Upload your post...!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 max-w-lg bg-gray-200 flex flex-col items-center  rounded-md p-6 gap-6"
      >
        {/* imageUrl */}
        <div className="flex flex-col items-start gap-2 ">
          <label>Image URL</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            name="imageUrl"
            placeholder="Enter image URL"
            className="bg-white rounded-md px-2 py-1 w-100"
          />
        </div>

        {/* preview */}

        <div className="flex flex-col  justify-center items-center gap-4 w-full ">
          <div className="w-64 h-64 border-2 rounded-xl border-dashed border-gray-400 flex justify-center items-center overflow-hidden bg-white">
            {formData.imageUrl && isValidImageUrl(formData.imageUrl) ? (
              <img
                src={formData.imageUrl}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm text-center px-4">
                Image preview will appear here
              </span>
            )}
          </div>
        </div>

        {/* caption */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="textarea">Caption</label>
          <textarea
            name="caption"
            value={formData.caption}
            id=""
            onChange={handleChange}
            placeholder="Write your caption..."
            className="bg-white rounded-md px-2 py-1 w-100"
          ></textarea>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        <div className="flex justify-center w-full">
          <button
            type="submit"
            disabled={isLoading}
            className={`
          w-1/2 
          py-3 
          rounded-xl 
          text-white 
          font-semibold 
          transition-all 
          duration-200
          ${
            isLoading
              ? "bg-gray-400"
              : "bg-black active:scale-95 hover:bg-gray-900"
          }
        `}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddPage;

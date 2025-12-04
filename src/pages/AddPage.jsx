import { useState } from "react";
import { createPost } from "../api/postApi";

const AddPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    caption: "" 
  })
  const [error, setError] = useState(null);

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
    setError(null)
  }
  const handleSubmit = async() => {
      if (!imageUrl) {
        return setError("Image Url tidak boleh kosong")
      }
      
      if (!isValidImageUrl(imageUrl)) {
          return setError("Masukkan URL gambar yang valid (.jpg, .png, .jpeg, .gif, .webp)")
      }

      try {
        const response = await createPost()
        
      } catch (err) {
        setError("Upload Image");
      } 
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Upload your post...!</h2>
      <form action="">

        {/* imageUrl */}
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>

          {/* preview */}
        <div>
          <p></p>
          <img src="" alt="" />
        </div>

        {/* caption */}
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
      </form>
    </div>
  );
};
export default AddPage;

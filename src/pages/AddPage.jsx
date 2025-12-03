import { useState } from "react";

const AddPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(null);

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  const handleSubmit = () => {
      if (!imageUrl) {
        return setError("Image Url tidak boleh kosong")
      }
      
      if (!isValidImageUrl(imageUrl)) {
          return setError("Masukkan URL gambar yang valid (.jpg, .png, .jpeg, .gif, .webp)")
      }

      try {
          
      }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Upload your post...!</h2>
      <div></div>
    </div>
  );
};
export default AddPage;

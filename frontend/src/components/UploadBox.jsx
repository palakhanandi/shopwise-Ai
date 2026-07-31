import { useState } from "react";
import api from "../api";
import Loader from "./Loader";

function UploadBox({ setResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post("/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.detail || "Backend Error");
      } else {
        alert("Cannot connect to backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-box">
      <h2>📸 Upload Product Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="preview"
        />
      )}

      <button
        className="btn"
        onClick={handleUpload}
      >
        Analyze Product
      </button>

      {loading && <Loader />}
    </div>
  );
}

export default UploadBox;
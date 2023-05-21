import { useState } from "react";
import no_image from "../images/no_image.png";

export function ImageUploader({ setImage }) {
  const [imgPreview, setImgPreview] = useState(no_image);

  const onFileChange = (e) => {
    const selectedImage = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImgPreview(reader.result);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setImgPreview(no_image);
    }

    setImage(selectedImage);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 auto" }}>
      {imgPreview && <img src={imgPreview} className="modal-dish-img" />}
      <label
        id="input_label"
        style={{
          margin: "5px auto",
          width: "120px",
          fontSize: "14px",
          padding: "8px 10px",
          textAlign: "center",
          borderRadius: "14px",
          cursor: "pointer",
        }}
      >
        写真を選択
        <input accept="image/*" type="file" onChange={onFileChange}></input>
      </label>
    </div>
  );
}

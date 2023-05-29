import React, { useState } from "react";
import no_image from "../images/no_image.png";

interface Props {
  setImage: any;
}

export const ImageUploader: React.FC<Props> = (props) => {
  const [imgPreview, setImgPreview] = useState<any>(no_image);

  const onFileChange = (e: any) => {
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

    props.setImage(selectedImage);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      {imgPreview && <img src={imgPreview} className="modal-dish-img" />}
      <label id="input_label">
        写真を選択
        <input accept="image/*" type="file" onChange={onFileChange}></input>
      </label>
    </div>
  );
};

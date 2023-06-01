import React, { useState } from "react";
import no_image from "../images/no_image.png";

interface Props {
  setImage: (value: File) => void;
}

export const ImageUploader: React.FC<Props> = (props) => {
  const [imgPreview, setImgPreview] = useState<string | null>(no_image);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedImage = e.target.files![0];
    const reader = new FileReader();

    reader.onload = () => {
      setImgPreview(reader.result as string | null);
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

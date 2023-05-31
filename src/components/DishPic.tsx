import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { dishInFM } from "../models/dishInFM.model";

interface Props {
  dishInFM: dishInFM;
}

export const DishPic: React.FC<Props> = (props) => {
  const [dishImgURL, setDishImgURL] = useState<string>("");

  useEffect(() => {
    const imgPathRef = ref(
      storage,
      props.dishInFM.imageURL !== undefined
        ? props.dishInFM.imageURL
        : "images/others/no_image.png"
    );
    getDownloadURL(imgPathRef).then((url) => {
      setDishImgURL(url);
    });
  }, [props.dishInFM.imageURL]);
  return (
    <div>
      <img
        src={dishImgURL}
        style={{ width: "100%", aspectRatio: "16 / 11" }}
      ></img>
      <p>{props.dishInFM.name}</p>
    </div>
  );
};

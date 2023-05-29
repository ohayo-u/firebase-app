import React, { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

interface Props {
  containDish: any;
}

export const DishPic: React.FC<Props> = (props) => {
  const [dishImgURL, setDishImgURL] = useState<any>();

  useEffect(() => {
    const imgPathRef = ref(
      storage,
      props.containDish.imageURL !== undefined
        ? props.containDish.imageURL
        : "images/others/no_image.png"
    );
    getDownloadURL(imgPathRef).then((url) => {
      setDishImgURL(url);
    });
  }, [props.containDish.imageURL]);
  return (
    <div>
      <img
        src={dishImgURL}
        style={{ width: "100%", aspectRatio: "16 / 11" }}
      ></img>
      <p>{props.containDish.name}</p>
    </div>
  );
};

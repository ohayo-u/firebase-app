import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export function DishPic({ containDish }) {
  const [dishImgURL, setDishImgURL] = useState();

  useEffect(() => {
    const imgPathRef = ref(
      storage,
      containDish.imageURL !== undefined
        ? containDish.imageURL
        : "images/others/no_image.png"
    );
    getDownloadURL(imgPathRef).then((url) => {
      setDishImgURL(url);
    });
  }, [containDish.imageURL]);
  return (
    <div>
      <img
        src={dishImgURL}
        style={{ width: "100%", aspectRatio: "16 / 11" }}
      ></img>
      <p>{containDish.name}</p>
    </div>
  );
}

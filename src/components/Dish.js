import { useEffect, useState } from "react";
import { DishModal } from "./DishModal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

export function Dish({ dish, user }) {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [imgURL, setImgURL] = useState();

  useEffect(() => {
    const imgPathRef = ref(
      storage,
      dish.imageURL !== undefined ? dish.imageURL : "images/others/no_image.png"
    );
    getDownloadURL(imgPathRef).then((url) => {
      setImgURL(url);
    });
  }, [dish.imageURL]);

  const dishModal = isDishModalOpen ? (
    <DishModal
      dish={dish}
      user={user}
      setIsDishModalOpen={setIsDishModalOpen}
      imgURL={imgURL}
    />
  ) : null;

  return (
    <>
      {dishModal}
      <div
        style={{
          cursor: "pointer",
          flex: "0 1 400px",
          padding: "0 20px",
        }}
        onClick={() => setIsDishModalOpen(true)}
      >
        <img
          src={imgURL ? imgURL : undefined}
          style={{ width: "280px", height: "200px" }}
        />
        <h3>{dish.name}</h3>
      </div>
    </>
  );
}

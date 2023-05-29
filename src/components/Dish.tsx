import React, { useEffect, useState } from "react";
import { DishModal } from "./DishModal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

interface Props {
  dish: any;
  user: any;
}

export const Dish: React.FC<Props> = (props) => {
  const [isDishModalOpen, setIsDishModalOpen] = useState<any>(false);
  const [imgURL, setImgURL] = useState<any>();

  useEffect(() => {
    const imgPathRef = ref(
      storage,
      props.dish.imageURL !== undefined
        ? props.dish.imageURL
        : "images/others/no_image.png"
    );
    getDownloadURL(imgPathRef).then((url) => {
      setImgURL(url);
    });
  }, [props.dish.imageURL]);

  const dishModal = isDishModalOpen ? (
    <DishModal
      dish={props.dish}
      user={props.user}
      setIsDishModalOpen={setIsDishModalOpen}
      imgURL={imgURL}
    />
  ) : null;

  return (
    <>
      {dishModal}
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setIsDishModalOpen(true)}
      >
        <img
          src={imgURL ? imgURL : undefined}
          style={{ width: "280px", height: "200px" }}
        />
        <h3>{props.dish.name}</h3>
      </div>
    </>
  );
};

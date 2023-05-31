import React, { useEffect, useState } from "react";
import { DishModal } from "./DishModal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { DishType } from "../models/dish.model";
import { User } from "firebase/auth";

interface Props {
  dish: DishType;
  user: User;
}

export const Dish: React.FC<Props> = (props) => {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [imgURL, setImgURL] = useState<string | undefined>();

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
          src={imgURL || undefined}
          style={{ width: "280px", height: "200px" }}
        />
        <h3>{props.dish.name}</h3>
      </div>
    </>
  );
};

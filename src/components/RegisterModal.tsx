import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FoodSelect } from "./FoodSelect";
import { ImageUploader } from "./ImageUploader";
import { User } from "firebase/auth";
import { CustomedSubmitEvent } from "../models/submitEvent.model";

interface Props {
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  user: User;
}

export const RegisterModal: React.FC<Props> = (props) => {
  const [image, setImage] = useState<File>();
  const [foodlist, setFoodlist] = useState<string[]>([]);
  const [dishName, setDishName] = useState<string>("");

  const handleSubmit = (e: CustomedSubmitEvent) => {
    e.preventDefault();
    const dishName = e.target.elements.dishName.value;

    const dishListCollectionRef = collection(
      db,
      "users",
      props.user.uid,
      "dish-list"
    );
    if (image) {
      const imageUrl = `images/dish/${props.user.uid}/${image.name}`;
      const dishImageRef = ref(storage, imageUrl);
      uploadBytes(dishImageRef, image).then(() => {
        addDoc(dishListCollectionRef, {
          name: dishName,
          usedFoodId: foodlist,
          imageURL: imageUrl,
        });
      });
    } else {
      addDoc(dishListCollectionRef, {
        name: dishName,
        usedFoodId: foodlist,
      });
    }
    props.setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal" onClick={() => props.setIsModalOpen(false)}></div>
      <div className="modal-inner form-modal">
        <form onSubmit={handleSubmit}>
          <ImageUploader setImage={setImage} />
          <input
            name="dishName"
            onChange={(e) => setDishName(e.target.value)}
            placeholder="料理名"
            type="text"
            value={dishName}
          ></input>
          <FoodSelect
            setFoodlist={setFoodlist}
            isModify={false}
            defaultDish={undefined}
          />
          <button className="save-btn">保存</button>
        </form>
      </div>
    </>
  );
};

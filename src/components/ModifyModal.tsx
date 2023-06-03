import React, { useState } from "react";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { FoodSelect } from "./FoodSelect";
import { ImageUploader } from "./ImageUploader";
import { LoadingIcon } from "./LoadingIcon";
import { User } from "firebase/auth";
import { DishType } from "../models/dish.model";
import { CustomedSubmitEvent } from "../models/submitEvent.model";

interface Props {
  setIsModifyModalOpen: (value: React.SetStateAction<boolean>) => void;
  user: User;
  defaultDish: DishType;
}

export const ModifyModal: React.FC<Props> = (props) => {
  const [image, setImage] = useState<File>();
  const [foodlist, setFoodlist] = useState<string[]>(
    props.defaultDish.usedFoodId
  );
  const [dishName, setDishName] = useState<string>(props.defaultDish.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: CustomedSubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    const dishName = e.target.elements.dishName.value;

    const defaultDishDocRef = doc(
      db,
      "users",
      props.user.uid,
      "dish-list",
      props.defaultDish.id
    );
    props.defaultDish.imageURL &&
      deleteObject(ref(storage, props.defaultDish.imageURL));
    if (image) {
      const imageUrl = `images/dish/${props.user.uid}/${image.name}`;
      const dishImageRef = ref(storage, imageUrl);
      uploadBytes(dishImageRef, image).then(() => {
        setDoc(defaultDishDocRef, {
          name: dishName,
          usedFoodId: foodlist,
          imageURL: imageUrl,
        });
      });
    } else {
      setDoc(defaultDishDocRef, {
        name: dishName,
        usedFoodId: foodlist,
      });
    }
    setLoading(false);
    props.setIsModifyModalOpen(false);
  };

  return (
    <>
      {loading ? <LoadingIcon /> : null}
      <div
        className="modal"
        onClick={() => props.setIsModifyModalOpen(false)}
      ></div>
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
            isModify={true}
            defaultDish={props.defaultDish}
          />
          <button className="save-btn">保存</button>
        </form>
      </div>
    </>
  );
};

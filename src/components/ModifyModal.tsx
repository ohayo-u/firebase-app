import React, { useState } from "react";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { FoodSelect } from "./FoodSelect";
import { ImageUploader } from "./ImageUploader";

interface Props {
  setIsModifyModalOpen: any;
  user: any;
  defaultDish: any;
}

export const ModifyModal: React.FC<Props> = (props) => {
  const [displayOptions, setDisplayOptions] = useState<any>([]);
  const [image, setImage] = useState<any>();
  const [foodlist, setFoodlist] = useState<any>(props.defaultDish.usedFoodId);
  const [dishName, setDishName] = useState<any>(props.defaultDish.name);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dishName = e.target!.elements.dishName.value;

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
    props.setIsModifyModalOpen(false);
  };

  return (
    <>
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
            displayOptions={displayOptions}
            setDisplayOptions={setDisplayOptions}
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

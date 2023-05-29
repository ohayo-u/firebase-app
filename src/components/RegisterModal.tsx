import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FoodSelect } from "./FoodSelect";
import { ImageUploader } from "./ImageUploader";

interface Props {
  setIsModalOpen: any;
  user: any;
}

export const RegisterModal: React.FC<Props> = (props) => {
  const [displayOptions, setDisplayOptions] = useState<any>([]);
  const [image, setImage] = useState<any>();
  const [foodlist, setFoodlist] = useState<any>([]);
  const [dishName, setDishName] = useState<any>("");

  const handleSubmit = (e: any) => {
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
            displayOptions={displayOptions}
            setDisplayOptions={setDisplayOptions}
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

import { useState } from "react";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { FoodSelect } from "./FoodSelect";

export function ModifyModal({ setIsModifyModalOpen, user, defaultDish }) {
  const [displayOptions, setDisplayOptions] = useState([]);
  const [image, setImage] = useState();
  const [foodlist, setFoodlist] = useState(defaultDish.usedFoodId);
  const [dishName, setDishName] = useState(defaultDish.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishName = e.target.elements.dishName.value;

    const defaultDishDocRef = doc(
      db,
      "users",
      user.uid,
      "dish-list",
      defaultDish.id
    );
    defaultDish.imageURL && deleteObject(ref(storage, defaultDish.imageURL));
    if (image) {
      const imageUrl = `images/dish/${user.uid}/${image.name}`;
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
    setIsModifyModalOpen(false);
  };

  return (
    <>
      <div className="modal" onClick={() => setIsModifyModalOpen(false)}></div>
      <div className="modal-inner" id="form_modal">
        <form onSubmit={handleSubmit}>
          <input
            accept=".png, .jpg, .jpeg"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
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
            defaultDish={defaultDish}
          />
          <button className="save-btn">保存</button>
        </form>
        <button
          className="modal-close-btn"
          onClick={() => setIsModifyModalOpen(false)}
        >
          ×
        </button>
      </div>
    </>
  );
}

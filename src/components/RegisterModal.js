import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FoodSelect } from "./FoodSelect";

export function RegisterModal({ setIsModalOpen, user }) {
  const [displayOptions, setDisplayOptions] = useState([]);
  const [image, setImage] = useState();
  const [foodlist, setFoodlist] = useState([]);
  const [dishName, setDishName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishName = e.target.elements.dishName.value;

    const dishListCollectionRef = collection(
      db,
      "users",
      user.uid,
      "dish-list"
    );
    if (image) {
      const imageUrl = `images/dish/${user.uid}/${image.name}`;
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
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal" onClick={() => setIsModalOpen(false)}></div>
      <div className="modal-inner" id="form_modal">
        <form onSubmit={handleSubmit}>
          {/* <ImageUpploader 
          setImage={setImage}
          /> */}
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
            isModify={false}
          />
          <button className="save-btn">保存</button>
        </form>
        <button
          className="modal-close-btn"
          onClick={() => setIsModalOpen(false)}
        >
          ×
        </button>
      </div>
    </>
  );
}

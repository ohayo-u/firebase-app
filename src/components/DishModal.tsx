import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { Food } from "./Food";
import { ModifyModal } from "./ModifyModal";
import { deleteObject, ref } from "firebase/storage";
import { DishType } from "../models/dish.model";
import { User } from "firebase/auth";
import { FoodType } from "../models/food.model";

interface Props {
  dish: DishType;
  user: User;
  setIsDishModalOpen: (value: React.SetStateAction<boolean>) => void;
  imgURL: string | undefined;
}

export const DishModal: React.FC<Props> = (props) => {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [usedFood, setUsedFood] = useState<FoodType[]>([]);
  const dishDocRef = doc(
    db,
    "users",
    props.user.uid,
    "dish-list",
    props.dish.id
  );

  useEffect(() => {
    const unsub = onSnapshot(dishDocRef, (dishDocSnapshot) => {
      const usedFoodId = dishDocSnapshot.data()!.usedFoodId;
      Promise.all(
        usedFoodId.map(async (foodId: string) => {
          const usedFoodDocRef = doc(db, "food", foodId);
          const usedFoodDocSnapshot = await getDoc(usedFoodDocRef);
          return { id: foodId, name: usedFoodDocSnapshot.data()!.name };
        })
      ).then((usedFoodDocs) => setUsedFood(usedFoodDocs));
    });

    return unsub;
  }, []);

  const deleteDish = () => {
    props.setIsDishModalOpen(false);

    if (props.dish.imageURL !== undefined) {
      const dishImageRef = ref(storage, props.dish.imageURL);
      deleteObject(dishImageRef).then(() => {
        deleteDoc(dishDocRef);
      });
    } else {
      deleteDoc(dishDocRef);
    }
  };

  const modal = isModifyModalOpen ? (
    <ModifyModal
      setIsModifyModalOpen={setIsModifyModalOpen}
      user={props.user}
      defaultDish={props.dish}
    />
  ) : null;

  return (
    <>
      <div
        className="modal"
        onClick={() => props.setIsDishModalOpen(false)}
      ></div>
      <div className="modal-inner">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button id="delete_btn" onClick={() => deleteDish()}>
            削除
          </button>
          <button id="modify_btn" onClick={() => setIsModifyModalOpen(true)}>
            修正
          </button>
        </div>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <img src={props.imgURL || undefined} className="modal-dish-img" />
          <h2>{props.dish.name}</h2>
        </div>
        <h3>この料理で使った食材</h3>
        <ul
          style={{
            display: "grid",
            gridGap: "3rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          }}
        >
          {usedFood.map((food: FoodType) => (
            <Food key={food.id} food={food} user={props.user} />
          ))}
        </ul>
      </div>
      {modal}
    </>
  );
};

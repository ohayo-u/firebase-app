import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { Food } from "./Food";
import { ModifyModal } from "./ModifyModal";
import { deleteObject, ref } from "firebase/storage";

export function DishModal({ dish, user, setIsDishModalOpen, imgURL }) {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [usedFood, setUsedFood] = useState([]);
  const dishDocRef = doc(db, "users", user.uid, "dish-list", dish.id);

  useEffect(() => {
    const unsub = onSnapshot(dishDocRef, (dishDocSnapshot) => {
      const usedFoodId = dishDocSnapshot.data().usedFoodId;
      Promise.all(
        usedFoodId.map(async (foodId) => {
          const usedFoodDocRef = doc(db, "food", foodId);
          const usedFoodDocSnapshot = await getDoc(usedFoodDocRef);
          return { id: foodId, name: usedFoodDocSnapshot.data().name };
        })
      ).then((usedFoodDocs) => setUsedFood(usedFoodDocs));
    });

    return unsub;
  }, []);

  const deleteDish = () => {
    setIsDishModalOpen(false);

    if (dish.imageURL !== undefined) {
      const dishImageRef = ref(storage, dish.imageURL);
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
      user={user}
      defaultDish={dish}
      usedFood={usedFood}
    />
  ) : null;

  return (
    <>
      <div className="modal" onClick={() => setIsDishModalOpen(false)}></div>
      <div className="modal-inner">
        <div style={{ textAlign: "center" }}>
          <img src={imgURL ? imgURL : undefined} className="modal-dish-img" />
          <h1>{dish.name}</h1>
        </div>
        <h3 className="list-title">この料理で使った食材</h3>
        <ul style={{ display: "flex" }}>
          {usedFood.map((food) => (
            <Food key={food.id} food={food} user={user} />
          ))}
        </ul>
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button id="delete_btn" onClick={() => deleteDish()}>
            削除
          </button>
          <button id="modify_btn" onClick={() => setIsModifyModalOpen(true)}>
            修正
          </button>
        </div>
      </div>
      {modal}
    </>
  );
}

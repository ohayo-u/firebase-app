import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Food } from "./Food";
import { RegisterModal } from "./RegisterModal";

export function Dish({dish, user, setIsModalOpen}) {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [usedFood, setUsedFood] = useState([]);

  useEffect(() => {
    // 使った食材がリアルタイムで修正されないので要修正　あとasync/awaitのほうがいいかも
    const dishDocRef = doc(db, 'users', user.uid, 'dish-list', dish.id);
    getDoc(dishDocRef).then((documentSnapshot) => {
      const usedFoodId = documentSnapshot.data().usedFoodId;
      Promise.all(usedFoodId.map(async (foodId) => {
        const usedFoodDocRef = doc(db, 'food', foodId);
        const documentSnapshot = await getDoc(usedFoodDocRef);
        return { id: foodId, name: documentSnapshot.data().name};
      })).then((usedFoodDocs) => setUsedFood(usedFoodDocs));
    })
    
  }, []);

  const deleteDish = () => {
    const dishDocRef = doc(db, 'users', user.uid, 'dish-list', dish.id);
    deleteDoc(dishDocRef);
  }
  
  const modal = isModifyModalOpen ? (
    <RegisterModal 
      setIsModalOpen={setIsModalOpen}
      setIsModifyModalOpen={setIsModifyModalOpen}
      user={user}
      defaultDish={dish}
      usedFood={usedFood}
      isNewRegistration={false}
      />
  ) : (null);

  const DishModal = isDishModalOpen ? (
    <>
      <div className="modal">
        <div className="modal-inner">  
          <h1>{dish.name}</h1>
          <h2 className="section-title">この料理で使った食材</h2>
          {usedFood.map((food) => (
            <Food
              key={food.id}
              food={food}
              user={user}
            /> 
          ))}
          <div className="del-and-mod-btn">
            <button className="delete-btn" onClick={() => deleteDish()}>削除</button>
            <button className="modify-btn" onClick={() => setIsModifyModalOpen(true)}>修正</button>
          </div>
          <button
            className='modal-close-btn'
            onClick={() => setIsDishModalOpen(false)}
            >
            ×
          </button>
        </div>
      </div>
      {modal}
    </>
  ) : (null);

  return (
    <div className="dish">
      {DishModal}
      <h3 onClick={() => setIsDishModalOpen(true)}>{dish.name}</h3>
    </div>
  );
}
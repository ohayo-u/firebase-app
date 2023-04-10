import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Food } from "./Food";
import { RegisterModal } from "./RegisterModal";
import { DishModal } from "./DishModal";

export function Dish({dish, user, setIsModalOpen}) {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  // const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  // const [usedFood, setUsedFood] = useState([]);
  
  // const dishDocRef = doc(db, 'users', user.uid, 'dish-list', dish.id);
  
  // useEffect(() => {
  //   const unsub = onSnapshot(dishDocRef, (dishDocSnapshot) => {
  //     const usedFoodId = dishDocSnapshot.data().usedFoodId;
  //     Promise.all(usedFoodId.map(async (foodId) => {
  //       const usedFoodDocRef = doc(db, 'food', foodId);
  //       const usedFoodDocSnapshot = await getDoc(usedFoodDocRef);
  //       return { id: foodId, name: usedFoodDocSnapshot.data().name};
  //     })).then((usedFoodDocs) => setUsedFood(usedFoodDocs));
  //   });

  // return unsub;
    
  // }, []);

  // const modal = isModifyModalOpen ? (
  //   <RegisterModal 
  //     setIsModalOpen={setIsModalOpen}
  //     setIsModifyModalOpen={setIsModifyModalOpen}
  //     user={user}
  //     defaultDish={dish}
  //     usedFood={usedFood}
  //     isNewRegistration={false}
  //     />
  // ) : (null);

  const dishModal = isDishModalOpen ? (
    // <>
    //   <div className="modal">
    //     <div className="modal-inner">  
    //       <h1>{dish.name}</h1>
    //       <h2 className="section-title">この料理で使った食材</h2>
    //       {usedFood.map((food) => (
    //         <Food
    //           key={food.id}
    //           food={food}
    //           user={user}
    //         /> 
    //       ))}
    //       <div className="del-and-mod-btn">
    //         <button className="delete-btn" onClick={() => deleteDoc(dishDocRef)}>削除</button>
    //         <button className="modify-btn" onClick={() => setIsModifyModalOpen(true)}>修正</button>
    //       </div>
    //       <button
    //         className='modal-close-btn'
    //         onClick={() => setIsDishModalOpen(false)}
    //         >
    //         ×
    //       </button>
    //     </div>
    //   </div>
    //   {modal}
    // </>
    <DishModal 
      dish={dish}
      user={user}
      setIsModalOpen={setIsModalOpen} 
      setIsDishModalOpen={setIsDishModalOpen}
    />
  ) : (null);

  return (
    <div className="dish">
      {dishModal}
      <h3 onClick={() => setIsDishModalOpen(true)}>{dish.name}</h3>
    </div>
  );
}
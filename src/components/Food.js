import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import heart1 from '../images/heart1.png';
import heart2 from '../images/heart2.png';
import heart3 from '../images/heart3.png';
import heart4 from '../images/heart4.png';
import heart5 from '../images/heart5.png';
import { Dish } from "./Dish";

export function Food({food, user}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containDishList, setContainDishList] = useState([]);

  useEffect(() => {
    const dishListCollectionRef = collection(db, 'users', user.uid, 'dish-list');
    const containDishDocs = query(dishListCollectionRef, where('usedFoodId', 'array-contains', food.id));
    const unsub = onSnapshot(containDishDocs, (querySnapshot) => {
        setContainDishList(querySnapshot.docs.map((doc) => ({name: doc.data().name, id: doc.id})));
    });

    return unsub;
  }, []);

  const dishCount = containDishList.length;
  let nakayoshiImg;
  let relation;

  if(dishCount <= 3) {
    nakayoshiImg = heart1;
    relation = '顔見知り';
  } else if (dishCount > 3 && dishCount <= 6) {
    nakayoshiImg = heart2;
    relation = 'お知り合い'; 
  } else if (dishCount > 6 && dishCount <= 9) {
    nakayoshiImg = heart3;
    relation = 'おともだち'; 
  } else if (dishCount > 9 && dishCount <= 12) {
    nakayoshiImg = heart4;
    relation = 'すっごく仲良し'; 
  } else if (dishCount > 12) {
    nakayoshiImg = heart5;
    relation = '大親友'; 
  }

  const modal = isModalOpen ? (
    <>
      <div className="modal" onClick={() => setIsModalOpen(false)}></div>
      <div className="modal-inner">  
        <p>あなたと{food.name}は</p>
        <h1>{relation}</h1> 
        <h3>仲良し度</h3> 
        <img src={nakayoshiImg} id='nakayoshi_heart'></img> 
        <h2 className="section-title">今までにつくった{food.name}料理</h2>
        <ul className="dish-list">
          {containDishList.map((containDish) => (
            <li key={containDish.id}>{containDish.name}</li>
          ))} 
        </ul>
        <button
          className='modal-close-btn'
          onClick={() => setIsModalOpen(false)}
          >
          ×
        </button>
      </div>
    </>
  ) : (null);

  return (
    <>
      <div className="food">
        <h3  onClick={() => setIsModalOpen(true)}>{food.name}</h3>
        <img src={nakayoshiImg}></img>
      </div>
        {modal}
    </>
  );
}
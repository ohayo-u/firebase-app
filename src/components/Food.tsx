import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import heart1 from "../images/heart1.png";
import heart2 from "../images/heart2.png";
import heart3 from "../images/heart3.png";
import heart4 from "../images/heart4.png";
import heart5 from "../images/heart5.png";
import { FoodModal } from "./FoodModal";
import { FoodType } from "../models/food.model";
import { User } from "firebase/auth";
import { dishInFM } from "../models/dishInFM.model";

interface Props {
  food: FoodType;
  user: User;
}

export const Food: React.FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dishListInFM, setDishListInFM] = useState<dishInFM[]>([]);
  const [foodImgURL, setFoodImgURL] = useState<string>("");

  useEffect(() => {
    const dishListCollectionRef = collection(
      db,
      "users",
      props.user.uid,
      "dish-list"
    );
    const containDishDocs = query(
      dishListCollectionRef,
      where("usedFoodId", "array-contains", props.food.id)
    );
    const unsub = onSnapshot(containDishDocs, (querySnapshot) => {
      setDishListInFM(
        querySnapshot.docs.map((doc) => ({
          name: doc.data().name as string,
          imageURL: doc.data().imageURL as string | undefined,
          id: doc.id,
        }))
      );
    });
    const imgPathRef = ref(storage, `images/food/${props.food.id}.png`);
    getDownloadURL(imgPathRef).then((url) => {
      setFoodImgURL(url);
    });
    return unsub;
  }, []);

  const dishCount = dishListInFM.length;
  let nakayoshiImg: string = "";
  let relation: string = "";

  if (dishCount <= 3) {
    nakayoshiImg = heart1;
    relation = "顔見知り";
  } else if (dishCount > 3 && dishCount <= 6) {
    nakayoshiImg = heart2;
    relation = "お知り合い";
  } else if (dishCount > 6 && dishCount <= 9) {
    nakayoshiImg = heart3;
    relation = "おともだち";
  } else if (dishCount > 9 && dishCount <= 12) {
    nakayoshiImg = heart4;
    relation = "すっごく仲良し";
  } else if (dishCount > 12) {
    nakayoshiImg = heart5;
    relation = "大親友";
  }

  const modal = isModalOpen ? (
    <FoodModal
      setIsModalOpen={setIsModalOpen}
      food={props.food}
      relation={relation}
      nakayoshiImg={nakayoshiImg}
      dishListInFM={dishListInFM}
      foodImgURL={foodImgURL}
    />
  ) : null;

  return (
    <>
      <div
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={foodImgURL}></img>
        <h3>{props.food.name}</h3>
        <img src={nakayoshiImg}></img>
      </div>
      {modal}
    </>
  );
};

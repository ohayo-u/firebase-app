import { useEffect, useState } from "react";
import { DishModal } from "./DishModal";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

export function Dish({dish, user, setIsModalOpen}) {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [imgURL, setImgURL] = useState(false);

  useEffect(() => {
    const imgPathRef = ref(
      storage, dish.imageURL !== undefined ? dish.imageURL : 'images/others/no_image.png' 
      );
    getDownloadURL(imgPathRef).then((url) => {
      setImgURL(url);
    });
  }, []);
  
  const dishModal = isDishModalOpen ? (
    <DishModal 
      dish={dish}
      user={user}
      setIsModalOpen={setIsModalOpen} 
      setIsDishModalOpen={setIsDishModalOpen}
      imgURL={imgURL}
    />
  ) : (null);

  return (
    <div className="dish-wrapper">
      {dishModal}
      <div className="dish" onClick={() => setIsDishModalOpen(true)}>
        <img src={imgURL ? imgURL : undefined} />
        <h3>{dish.name}</h3>
      </div>
    </div>
  );
}
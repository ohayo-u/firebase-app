import { useState } from "react";
import { DishModal } from "./DishModal";

export function Dish({dish, user, setIsModalOpen}) {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  const dishModal = isDishModalOpen ? (
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
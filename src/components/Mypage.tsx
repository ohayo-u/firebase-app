import React, { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";
import { Dish } from "./Dish";
import { Food } from "./Food";
import { Header } from "./Header";
import { RegisterModal } from "./RegisterModal";
import { Login } from "./Login";
import { FoodType } from "../models/food.model";
import { DishType } from "../models/dish.model";
import fixed_add_btn from "../images/fixed_add_btn.png";

export const Mypage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dishList, setDishList] = useState<DishType[]>([]);
  const [friendFoodList, setFriendFoodList] = useState<FoodType[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        return redirect("/login");
      }

      const dishListCollectionRef = collection(
        db,
        "users",
        currentUser.uid,
        "dish-list"
      );
      const unsub = onSnapshot(dishListCollectionRef, (querySnapshot) => {
        setDishList(
          querySnapshot.docs.map((doc) => ({
            ...(doc.data() as {
              name: string;
              usedFoodId: string[];
              imageURL?: string;
            }),
            id: doc.id,
          }))
        );

        const duplicatedFoodId: string[] = [];
        querySnapshot.docs.forEach((doc) => {
          duplicatedFoodId.push(...doc.data().usedFoodId);
        });
        const friendFoodIds = Array.from(new Set(duplicatedFoodId));
        Promise.all(
          friendFoodIds.map(async (foodId: string) => {
            const friendFoodDocRef = doc(db, "food", foodId);
            const documentSnapshot = await getDoc(friendFoodDocRef);
            return { id: foodId, name: documentSnapshot.data()!.name };
          })
        ).then((friendFoodDocs) => setFriendFoodList(friendFoodDocs));
      });

      return unsub;
    });
  }, []);

  const modal =
    user && isModalOpen ? (
      <RegisterModal setIsModalOpen={setIsModalOpen} user={user} />
    ) : null;

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Login />
          ) : (
            <>
              <Header setIsModalOpen={setIsModalOpen} user={user} />
              <main style={{ paddingTop: "130px" }}>
                <div className="container" id="food_index">
                  <h3 className="section-title">あなたと仲良しの食材</h3>
                  <div
                    style={{
                      display: "grid",
                      gridGap: "3rem",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                    }}
                  >
                    {friendFoodList.map((friendFood: FoodType) => (
                      <Food key={friendFood.id} food={friendFood} user={user} />
                    ))}
                  </div>
                </div>

                <div className="container" id="dish_index">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h3 className="section-title">作った料理</h3>
                    <button
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "20px",
                      }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      +
                    </button>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridGap: "3rem",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(240px, 1fr))",
                    }}
                  >
                    {dishList.map((dish: DishType) => (
                      <Dish key={dish.id} dish={dish} user={user} />
                    ))}
                  </div>
                </div>

                <img
                  src={fixed_add_btn}
                  style={{
                    position: "fixed",
                    width: "200px",
                    bottom: "50px",
                    right: "50px",
                    zIndex: 9,
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(true)}
                />
                {modal}
              </main>
            </>
          )}
        </>
      )}
    </>
  );
};

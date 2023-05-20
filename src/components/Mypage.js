import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { Dish } from "./Dish";
import { Food } from "./Food";
import { Header } from "./Header";
import { RegisterModal } from "./RegisterModal";
import { useState, useEffect } from "react";
import fixed_add_btn from "../images/fixed_add_btn.png";
import { Login } from "./Login";

export function Mypage() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dishList, setDishList] = useState([]);
  const [friendFoodList, setFriendFoodList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      const dishListCollectionRef = collection(
        db,
        "users",
        currentUser.uid,
        "dish-list"
      );
      const unsub = onSnapshot(dishListCollectionRef, (querySnapshot) => {
        setDishList(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        const duplicatedFoodId = [];
        querySnapshot.docs.forEach((doc) => {
          duplicatedFoodId.push(...doc.data().usedFoodId);
        });
        const friendFoodIds = Array.from(new Set(duplicatedFoodId));
        Promise.all(
          friendFoodIds.map(async (foodId) => {
            const friendFoodDocRef = doc(db, "food", foodId);
            const documentSnapshot = await getDoc(friendFoodDocRef);
            return { id: foodId, name: documentSnapshot.data().name };
          })
        ).then((friendFoodDocs) => setFriendFoodList(friendFoodDocs));
      });

      return unsub;
    });
  }, []);

  const modal = isModalOpen ? (
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
              <main>
                <div className="container" id="food-index">
                  <h3 className="section-title">あなたと仲良しの食材</h3>
                  <div
                    className="food-list"
                    style={{
                      display: "grid",
                      gridGap: "3rem",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(100px, 1fr))",
                    }}
                  >
                    {friendFoodList.map((friendFood) => (
                      <Food key={friendFood.id} food={friendFood} user={user} />
                    ))}
                  </div>
                </div>

                <div className="container" id="dish-index">
                  <div className="title-and-btn">
                    <h3 className="section-title">作った料理</h3>
                    <button
                      className="add-btn"
                      onClick={() => setIsModalOpen(true)}
                    >
                      +
                    </button>
                  </div>
                  <div className="dish-list">
                    {dishList.map((dish) => (
                      <Dish
                        key={dish.id}
                        dish={dish}
                        user={user}
                        setIsModalOpen={setIsModalOpen}
                      />
                    ))}
                  </div>
                </div>

                <img
                  src={fixed_add_btn}
                  id="fixed-add-btn"
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
}

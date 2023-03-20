import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const DishList = () => {
    const [dishList, setDishList] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        const dishListCollectionRef = collection(db, 'users',user.uid ,'dish-list');
        const unsub = onSnapshot(dishListCollectionRef, (querySnapshot) => {
            setDishList(
                querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        });
        return unsub;
        },[]);

    return(
        <ul>
            {dishList.map((dish) => (
                <li key={dish.id}>{dish.name}</li>
            ))}
        </ul>
    )
}

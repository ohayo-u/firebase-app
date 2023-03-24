// friend-foodコレから参照しているが、dishドキュメントのused-food配列にIDのあるfoodコレクションのドキュメントを表示するように変更する

import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const FriendFood = () =>{
    const [friendFood, setFriendFood] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        const friendFoodCollectionRef = collection(db, 'users',user.uid ,'friend-food');
        const unsub = onSnapshot(friendFoodCollectionRef, (querySnapshot) => {
            setFriendFood(
                querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            );
        });
        return unsub;
        },[]);

    return(
        <ul className="list">
            {friendFood.map((food) => (
                <li key={food.id}>
                    <p>{food.name}</p> 
                </li>
            ))}
        </ul>
    )
}

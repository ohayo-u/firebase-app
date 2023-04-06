import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

export const FriendFood = () =>{
    const user = auth.currentUser;
    const [friendFood, setFriendFood] = useState([]);

    useEffect(() => {
        
        const dishCollectionRef = collection(db, 'users', user.uid, 'dish-list');
        const unsub = onSnapshot(dishCollectionRef, (querySnapshot) => {
            const dupFoodId = [];
            querySnapshot.docs.map((doc) => dupFoodId.push(...doc.data().usedFoodId));

            const foodId = Array.from(new Set(dupFoodId));
    
            const foodList = [];
    
            foodId.forEach(async (id) => {
                const friendFoodDocRef = doc(db, 'food', id);
                await getDoc(friendFoodDocRef).then((documentSnapshot) => {
                    foodList.push({id: id, name: documentSnapshot.data().name});
                })
                setFriendFood(foodList);
            });
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



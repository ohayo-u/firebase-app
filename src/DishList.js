import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export const DishList = () => {
    const [dishList, setDishList] = useState([]);
    const user = auth.currentUser;

    const deleteDish = async (id) => {
        const dishDocumentRef = doc(db, 'users', user.uid, 'dish-list', id);
        await deleteDoc(dishDocumentRef);
    };
    
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
        <ul className="list">
            {dishList.map((dish) => (
                <li key={dish.id}>
                    <p>{dish.name}</p> 
                    <button onClick={() => deleteDish(dish.id)}>削除</button>
                </li>
            ))}
        </ul>
    )
}

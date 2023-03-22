import { addDoc, arrayUnion, collection, doc, DocumentSnapshot, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const FoodRegister = () => {
    const [user, setUser] = useState("");
    const [usedFoodId, setUsedFoodId] = useState([]);
    const [foodlist, setFoodlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usedFood, setUsedFood] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        const foodCollectionRef = collection(db, 'food');
        getDocs(foodCollectionRef).then((querySnapshot) => {
            setFoodlist(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        });
        
        
    }, []);

    const handleClick = (foodId) => {
        setUsedFoodId([...usedFoodId, foodId]);
        console.log(usedFoodId);
        setFoodlist(
            foodlist.filter((food) => (food.id !== foodId))
        );
        console.log(foodlist);

        const usedFoodDocumentRef = doc(db, 'food', foodId);
        getDoc(usedFoodDocumentRef).then((documentSnapshot) => {
            setUsedFood([...usedFood, {...documentSnapshot.data(), id: foodId}]);
        });

        console.log(usedFood);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const dishName = e.target.elements.dishName;
        const dishListCollectionRef = collection(db, 'users', user.uid, 'dish-list');
        const dishDocumentRef = await addDoc(dishListCollectionRef, {
            name: dishName.value
        });

        // dishドキュメント内のused-food配列にusedFoodId配列を追加するに変更する
        await updateDoc(dishDocumentRef, {
            usedFoodId: arrayUnion(...usedFoodId)
        });
    } ;

    return (
        <>
            {!loading && (
                <>
                    {!user ? (
                        <Navigate to={`/login/`} /> 
                    ) : (
                        <div className="container">
                            <h1>料理の登録</h1>
                            <form onSubmit={handleSubmit}>
                                <h3>料理名</h3>
                                <input
                                    type="text"
                                    name="dishName"
                                    >
                                </input>
                                <h3>食材一覧</h3>
                                {/* foodコレクションの表示 onclickでusedFoodId配列にid追加*/}
                                <ul>
                                    {foodlist.map((food) => (
                                        <li key={food.id} onClick={() => handleClick(food.id)}>{food.name}</li>
                                    ))}
                                </ul>
                                <h3>使った食材</h3>
                                    {usedFood.map((food) => (
                                        <li key={food.id}>{food.name}</li>
                                    ))}
                                <button>登録する</button>
                            </form>
                            <Link to={`/`}>マイページ</Link>
                        </div>
                        )
                    }
                </>
            )}
        </>
    );
};


// form内で食材リストをfoodコレクションから持ってきて表示させる
// クリックするとuseStateの配列、usedFoodIdにfoodドキュメントのIDが追加される
// handleSubmitが実行されたら、usedFoodId配列がdishドキュメントのusedFoodIdフィールドに追加される

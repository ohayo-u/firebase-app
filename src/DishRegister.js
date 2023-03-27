import { addDoc, arrayUnion, collection, doc, DocumentSnapshot, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FoodSelect } from "./FoodSelect";

export const DishRegister = () => {
    const [user, setUser] = useState("");
    const [foodlist, setFoodlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dishName = e.target.elements.dishName;
        const dishListCollectionRef = collection(db, 'users', user.uid, 'dish-list');
        const dishDocumentRef = await addDoc(dishListCollectionRef, {
            name: dishName.value
        });

        // 入力した食材のIDを料理のusedfood配列に追加する
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
                                    <h3>使った食材</h3>
                                <FoodSelect />
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
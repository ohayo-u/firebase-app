import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Select from "react-select";

export const DishRegister = () => {
    const [user, setUser] = useState("");
    const [foodlist, setFoodlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        const foodCollectionRef = collection(db, 'food');
        getDocs(foodCollectionRef).then((querySnapshot) => {
            setOptions(querySnapshot.docs.map((doc) => ({ value: doc.id, label: doc.data().name})))
        });

    }, []);

    const handleChange = (selectedOptions) => {
        const selectedFood = [];
        selectedOptions.forEach((selectedOption) => {
            selectedFood.push(selectedOption.value);   
        });
        setFoodlist(selectedFood);
        console.log(foodlist);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dishName = e.target.elements.dishName;
        const dishListCollectionRef = collection(db, 'users', user.uid, 'dish-list');
        const dishDocumentRef = await addDoc(dishListCollectionRef, {
            name: dishName.value
        });

        // 入力した食材のIDを料理のusedfood配列に追加する
        updateDoc(dishDocumentRef, {
            usedFoodId: foodlist
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
                                    <h3>使った食材</h3>
                                    <Select 
                                        options={options}
                                        isMulti
                                        onChange={handleChange}
                                    />
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
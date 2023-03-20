import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";

export const FoodRegister = () => {
    const user = auth.currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dishName = e.target.elements.dishName;
        const dishListCollectionRef = collection(db, 'users',user.uid ,'dish-list');
         await addDoc(dishListCollectionRef, {
            name: dishName.value
        });
    } ;

    return (
        <div className="food-register">
            <h2>料理の登録</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="dishName"
                    >
                </input>
                <button>登録する</button>
            </form>
        </div>
    );
};

// formで値が送信された時に、そのユーザーのdish-listサブコレクションに
// 料理名がnameフィールドに入っているドキュメントが生成されるようにする

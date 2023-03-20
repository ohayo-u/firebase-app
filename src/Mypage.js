import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { 
    useNavigate,
    Navigate
 } from "react-router-dom";
 import { FoodRegister } from "./FoodRegister";
import { DishList } from "./DishList";

export const Mypage = () => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        
    }, []);

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("/login/");
    }

    return (
      <>
      {!loading && (
      <>
      {!user ? (
        <Navigate to={`/login`} />
      ) : (
        <>
            <h1>マイページ</h1>
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
            <div className="user-image"><img src={user?.photoURL} /></div>
            <FoodRegister />
            <h2>作った料理</h2>
            <DishList />
            <button onClick={logout}>ログアウト</button>
        </>
        )}
        </>
        )}
      </>
    );
  };
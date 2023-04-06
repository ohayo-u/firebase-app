import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { 
    useNavigate,
    Navigate,
    Link
 } from "react-router-dom";
import { DishList } from "./DishList";
import { FriendFood } from "./FriendFood";

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
            <Link to={`/dish-register/`}>料理を追加する</Link>
            <h2>作った料理</h2>
            <DishList />
            <h2>仲良し食材</h2>
            <FriendFood />
            <button onClick={logout}>ログアウト</button>
        </>
        )}
        </>
        )}
      </>
    );
  };
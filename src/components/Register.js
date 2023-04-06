import { useState, useEffect } from "react";
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "../firebase";
import { Navigate, Link } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { SignInButton } from "./SignInButton";

export const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            const user = result.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    email: user.email
                });
            }
        } catch(error) {
            alert("正しく入力してください");
        }
    };

    const [user, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    },[]);

    return (
      <>
        {user ? (
            <Navigate to={`/`} />
        ) : (
            <>
                <h1>新規登録</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input
                    name="email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                    name="password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </div>
                <button>登録する</button>
                <p>ログインは<Link to={`/login/`}>こちら</Link></p>
                </form>


        <SignInButton />
            </>
        )}
      </>
    );
  };
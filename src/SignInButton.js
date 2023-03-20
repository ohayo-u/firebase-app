import { db, auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const SignInButton = () => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    email: user.email
                });
            }
        } catch (error) {
            alert("ユーザー登録に失敗しました");
        }
    };

    return <button onClick={signInWithGoogle}>
        <p>Googleでサインイン</p>
    </button>
  };
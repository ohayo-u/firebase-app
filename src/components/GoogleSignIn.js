import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";

export function GoogleSignIn() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
        });
      }
    } catch (error) {
      alert("サインインに失敗しました");
    }
  };

  return (
    <button onClick={signInWithGoogle}>
      <p>Googleでサインイン</p>
    </button>
  );
}

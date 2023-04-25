import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";

export function GoogleMigration() {
  // 本当は匿名状態の時の情報を引き継いでアカウント作成をしたいけど難しいので一旦諦める
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
    <button id="google_sign_in" onClick={signInWithGoogle}>
      Googleで新規アカウント作成
    </button>
  );
}

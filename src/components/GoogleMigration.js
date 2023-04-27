import { updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase";
import { linkWithPopup } from "firebase/auth";

export function GoogleMigration() {
  const signInWithGoogle = () => {
    linkWithPopup(auth.currentUser, provider)
      .then((result) => {
        const user = result.user;
        const googleData = user.providerData.find((data) => {
          return data.providerId == "google.com";
        });
        const photoURL = googleData.photoURL;
        updateProfile(user, {
          photoURL: photoURL,
        });
      })
      .catch((error) => {
        alert("サインインに失敗しました");
      });
  };
  return (
    <button id="google_sign_in" onClick={signInWithGoogle}>
      Googleでアカウント作成
    </button>
  );
}

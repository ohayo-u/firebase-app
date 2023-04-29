import { updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase";
import { linkWithPopup } from "firebase/auth";

export function GoogleMigration() {
  const signInWithGoogle = () => {
    linkWithPopup(auth.currentUser, provider)
      .then(async (result) => {
        // linkWithPopupはonAuthStateChangedのトリガーにならないため、リロードさせているがもっといいやり方あるかも
        const user = result.user;
        const googleData = user.providerData.find((data) => {
          return data.providerId === "google.com";
        });
        const photoURL = googleData.photoURL;
        await updateProfile(user, {
          photoURL: photoURL,
        });
        window.location.reload();
      })
      .catch((error) => {
        alert("サインインに失敗しました");
      });
  };
  return (
    <button id="google_sign_in" onClick={signInWithGoogle}>
      Googleサインイン
    </button>
  );
}

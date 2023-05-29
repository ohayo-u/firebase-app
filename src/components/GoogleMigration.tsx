import { updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase";
import { linkWithPopup } from "firebase/auth";
import React from "react";

export const GoogleMigration: React.FC = () => {
  const signInWithGoogle = () => {
    linkWithPopup(auth.currentUser!, provider)
      .then(async (result) => {
        // linkWithPopupはonAuthStateChangedのトリガーにならないため、リロードさせているがもっといいやり方あるかも
        const user = result.user;
        const googleData = user.providerData.find((data) => {
          return data.providerId === "google.com";
        });
        const photoURL = googleData!.photoURL;
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
    <li>
      <button
        style={{
          borderRadius: "15px",
          padding: "5px 15px",
          fontSize: "16px",
          backgroundColor: "#fff",
        }}
        onClick={signInWithGoogle}
      >
        Googleサインイン
      </button>
    </li>
  );
};

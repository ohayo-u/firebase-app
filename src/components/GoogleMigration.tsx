import { updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase";
import { linkWithPopup } from "firebase/auth";
import React from "react";
import { redirect } from "react-router-dom";

export const GoogleMigration: React.FC = () => {
  const signInWithGoogle = () => {
    linkWithPopup(auth.currentUser!, provider)
      .then(async (result) => {
        // linkWithPopupはonAuthStateChangedのトリガーにならないため、リロードさせているがもっといいやり方あるかも
        const user = result.user;
        const googleData = user.providerData.find((data) => {
          return data.providerId === "google.com";
        });
        if (!googleData) {
          alert("googleアカウントでのサインインに失敗しました");
          return redirect("login");
        }
        const photoURL = googleData.photoURL;
        await updateProfile(user, {
          photoURL: photoURL,
        });
        window.location.reload();
      })
      .catch(() => {
        alert("googleアカウントでのサインインに失敗しました");
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

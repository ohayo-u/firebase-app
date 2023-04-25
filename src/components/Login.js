import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { GoogleSignIn } from "./GoogleSignIn";
import { AnonymousSignIn } from "./AnonymousSignIn";
import { Mypage } from "./Mypage";
import logo2400 from "../images/logo2400.png";

export function Login() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading && (
        <>
          {user ? (
            <Mypage />
          ) : (
            <div className="login">
              <img src={logo2400} id="logo_img" />
              <div className="sign-in-buttons">
                <GoogleSignIn />
                <AnonymousSignIn />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

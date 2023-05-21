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
            <div style={{ textAlign: "center" }}>
              <img src={logo2400} style={{ width: "1200px" }} />
              <div>
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

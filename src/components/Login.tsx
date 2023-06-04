import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { GoogleSignIn } from "./GoogleSignIn";
import { AnonymousSignIn } from "./AnonymousSignIn";
import { Mypage } from "./Mypage";
import logo2400 from "../images/logo2400.png";

export const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
              <img
                src={logo2400}
                style={{ width: "1200px" }}
                data-testid="login-image"
              />
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
};

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import { GoogleSignIn } from "./GoogleSignIn";
import { Mypage } from "./Mypage";

export const Login = () => {

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

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
            <h1>MOG</h1>
            <div className="sign-in-buttons"> 
              <GoogleSignIn />
              {/* <TwitterSignIn /> */}
            </div>
          </div>
          )}
        </>

      )}</>
    );
  };
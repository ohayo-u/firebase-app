import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import { GoogleSignIn } from "./GoogleSignIn";

export const Login = () => {

  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

    return (
      <>
      {/* {user ? (
        <Navigate to={`/`} />
      ) : ( */}
        <div className="login">
          <h1>MOG!</h1>
          <div className="sign-in-buttons"> 
            <GoogleSignIn />
            {/* <TwitterSignIn /> */}
          </div>
          
        </div>
        {/* )} */}
      </>
    );
  };